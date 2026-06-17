"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Usaha } from "@/lib/types";

interface BusinessCardProps {
  business: Usaha;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const whatsappLink = business.telepon
    ? `https://wa.me/${business.telepon.replace(/[^0-9]/g, "")}`
    : "#";

  const rating = (Math.random() * 2 + 3).toFixed(1);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={business.foto || "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600"}
          alt={business.nama_usaha}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {business.kategori && (
          <Badge className="absolute top-3 left-3 bg-primary/90 text-white">
            {business.kategori.nama_kategori}
          </Badge>
        )}
      </div>

      <CardContent className="flex-1 p-4 flex flex-col">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{business.nama_usaha}</h3>

        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">(12 ulasan)</span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
          {business.deskripsi}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{business.alamat}, {business.kecamatan}</span>
          </div>
          {business.telepon && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span>{business.telepon}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Button asChild className="flex-1" size="sm">
            <Link href={`/usaha/${business.id}`}>Lihat Detail</Link>
          </Button>
          {business.telepon && (
            <Button variant="outline" size="sm" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
