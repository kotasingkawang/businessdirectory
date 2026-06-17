"use client";

import Link from "next/link";
import { Store, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories, businesses } from "@/lib/data";

export default function KategoriPage() {
  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: businesses.filter((b) => b.kategori_id === cat.id && b.status === "approved").length,
  }));

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">Kategori Usaha</h1>
          <p className="text-white/90">
            Jelajahi usaha berdasarkan kategori di Kota Singkawang
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoriesWithCount.map((category) => (
              <Link key={category.id} href={`/usaha?kategori=${category.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {category.nama_kategori}
                      </CardTitle>
                      <Store className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {category.count} usaha terdaftar
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
