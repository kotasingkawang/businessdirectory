"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Globe, ArrowLeft, Star, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BusinessCard } from "@/components/business-card";
import { businesses, categories } from "@/lib/data";

export default function BusinessDetailPage() {
  const params = useParams();
  const businessId = params.id as string;

  const business = businesses.find((b) => b.id === businessId);

  if (!business) {
    notFound();
  }

  const similarBusinesses = businesses
    .filter((b) => b.id !== businessId && b.kategori_id === business.kategori_id && b.status === "approved")
    .slice(0, 3);

  const category = categories.find((c) => c.id === business.kategori_id);
  const whatsappLink = business.telepon
    ? `https://wa.me/${business.telepon.replace(/[^0-9]/g, "")}?text=Halo, saya tertarik dengan usaha Anda: ${business.nama_usaha}`
    : "#";

  const rating = (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Back Navigation */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <Link href="/usaha" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Usaha
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={business.foto || "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"}
                  alt={business.nama_usaha}
                  fill
                  className="object-cover"
                />
                {category && (
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-white">
                    {category.nama_kategori}
                  </Badge>
                )}
              </div>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">{business.nama_usaha}</CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="font-medium text-foreground">{rating}</span>
                        <span className="text-sm">(12 ulasan)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {business.deskripsi}
                </p>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lokasi & Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {business.alamat && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Alamat</p>
                      <p className="text-muted-foreground">{business.alamat}</p>
                      <p className="text-muted-foreground">{business.kelurahan}, {business.kecamatan}</p>
                    </div>
                  </div>
                )}

                {business.telepon && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Telepon</p>
                      <p className="text-muted-foreground">{business.telepon}</p>
                    </div>
                  </div>
                )}

                {/* Map Placeholder */}
                <div className="mt-6 aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p>Peta Lokasi</p>
                    {business.latitude && business.longitude && (
                      <p className="text-sm">{business.latitude}, {business.longitude}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Actions */}
            <Card className="sticky top-24">
              <CardContent className="pt-6 space-y-4">
                {business.telepon && (
                  <>
                    <Button className="w-full" size="lg" asChild>
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" asChild>
                      <a href={`tel:${business.telepon}`}>
                        <Phone className="h-5 w-5 mr-2" />
                        Telepon
                      </a>
                    </Button>
                  </>
                )}
                <Separator />
                <div className="space-y-3 text-sm text-muted-foreground">
                  {business.alamat && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{business.kecamatan}</span>
                    </div>
                  )}
                  {business.telepon && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{business.telepon}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Gallery Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Galeri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">{i}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Businesses */}
        {similarBusinesses.length > 0 && (
          <section className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Usaha Serupa</h2>
              <Button variant="outline" asChild>
                <Link href={`/usaha?kategori=${business.kategori_id}`}>Lihat Semua</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarBusinesses.map((similar) => (
                <BusinessCard key={similar.id} business={similar} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
