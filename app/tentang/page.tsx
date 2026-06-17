"use client";

import { Building2, Mail, Phone, MapPin, Users, Target, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex p-4 rounded-full bg-white/10 mb-6">
            <Building2 className="h-12 w-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Direktori Usaha Kota Singkawang
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Platform resmi direktori usaha dan UMKM Kota Singkawang, Kalimantan Barat.
            Membantu warga menemukan usaha lokal dan membantu pelaku usaha memasarkan produk mereka.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="inline-flex p-4 rounded-full bg-primary/10 mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Mempromosikan usaha lokal kepada masyarakat Singkawang dan sekitarnya,
                  membantu pelaku usaha mendapatkan lebih banyak pelanggan.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="inline-flex p-4 rounded-full bg-primary/10 mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Menjadi platform direktori usaha terpercaya yang menghubungkan
                  masyarakat dengan usaha lokal di Kota Singkawang.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="inline-flex p-4 rounded-full bg-primary/10 mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Komitmen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Me-verifikasi setiap usaha yang terdaftar untuk memastikan
                  informasi akurat dan terpercaya bagi pengunjung.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Hubungi Kami</CardTitle>
              <CardDescription>Punya pertanyaan atau masukan? Hubungi kami.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="font-medium">Alamat</p>
                  <p className="text-muted-foreground">Kantor Pemerintah Kota Singkawang, Kalimantan Barat</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="font-medium">Telepon</p>
                  <p className="text-muted-foreground">(0562) 123456</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Mail className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">info@singkawangkota.go.id</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
