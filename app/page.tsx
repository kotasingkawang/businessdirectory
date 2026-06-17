"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building2, Users, ShoppingBag, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/category-card";
import { BusinessCard } from "@/components/business-card";
import { categories, businesses } from "@/lib/data";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/usaha?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredBusinesses = businesses.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Temukan Usaha dan UMKM di Kota Singkawang
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Cari warung makan, toko, restoran, UMKM, dan berbagai usaha lokal dengan mudah.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari nama usaha atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-white text-foreground border-0"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 bg-accent hover:bg-accent/90">
                Cari
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Building2, label: "Total Usaha", value: "250+" },
              { icon: Users, label: "Pengguna Aktif", value: "150+" },
              { icon: ShoppingBag, label: "Kategori", value: "14" },
              { icon: TrendingUp, label: "Transaksi", value: "500+" },
            ].map((stat, idx) => (
              <Card key={idx} className="text-center py-6 bg-background border-0 shadow-sm">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Kategori Usaha</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jelajahi berbagai kategori usaha dan UMKM yang tersedia di Kota Singkawang
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Usaha Unggulan</h2>
              <p className="text-muted-foreground">Beberapa usaha populer di Kota Singkawang</p>
            </div>
            <Button variant="outline" asChild>
              <a href="/usaha">Lihat Semua</a>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Punya Usaha di Singkawang?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Daftarkan usaha Anda sekarang dan jangkau lebih banyak pelanggan!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <a href="/register">Daftar Sekarang</a>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
              <a href="/tentang">Pelajari Lebih Lanjut</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
