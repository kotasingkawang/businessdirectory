"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { BusinessCard } from "@/components/business-card";
import { categories, businesses, kecamatanList, kelurahanList } from "@/lib/data";
import { Kategori } from "@/lib/types";

export default function UsahaPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialKategori = searchParams.get("kategori") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedKategori, setSelectedKategori] = useState(initialKategori);
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const ALL_CATEGORY = "__all_category__";
  const ALL_KECAMATAN = "__all_kecamatan__";
  const ALL_KELURAHAN = "__all_kelurahan__";

  const handleKategoriChange = (value: string) =>
    setSelectedKategori(value === ALL_CATEGORY ? "" : value);

  const handleKecamatanChange = (value: string) => {
    const val = value === ALL_KECAMATAN ? "" : value;
    setSelectedKecamatan(val);
    if (val === "") setSelectedKelurahan("");
  };

  const handleKelurahanChange = (value: string) =>
    setSelectedKelurahan(value === ALL_KELURAHAN ? "" : value);

  const filteredBusinesses = useMemo(() => {
    let filtered = businesses.filter((b) => b.status === "approved");

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.nama_usaha.toLowerCase().includes(query) ||
          b.deskripsi.toLowerCase().includes(query) ||
          b.kategori?.nama_kategori.toLowerCase().includes(query)
      );
    }

    if (selectedKategori) {
      filtered = filtered.filter((b) => b.kategori_id === selectedKategori);
    }

    if (selectedKecamatan) {
      filtered = filtered.filter((b) => b.kecamatan === selectedKecamatan);
    }

    if (selectedKelurahan) {
      filtered = filtered.filter((b) => b.kelurahan === selectedKelurahan);
    }

    return filtered;
  }, [searchQuery, selectedKategori, selectedKecamatan, selectedKelurahan]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedKategori("");
    setSelectedKecamatan("");
    setSelectedKelurahan("");
  };

  const hasActiveFilters = searchQuery || selectedKategori || selectedKecamatan || selectedKelurahan;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">Kategori</Label>
        <Select value={selectedKategori} onValueChange={handleKategoriChange}>
          <SelectTrigger>
            <SelectValue placeholder="Semua kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_CATEGORY}>Semua kategori</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.nama_kategori}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Kecamatan</Label>
        <Select value={selectedKecamatan} onValueChange={handleKecamatanChange}>
          <SelectTrigger>
            <SelectValue placeholder="Semua kecamatan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_KECAMATAN}>Semua kecamatan</SelectItem>
            {kecamatanList.map((kec) => (
              <SelectItem key={kec} value={kec}>
                {kec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedKecamatan && kelurahanList[selectedKecamatan] && (
        <div>
          <Label className="text-sm font-medium mb-2 block">Kelurahan</Label>
          <Select value={selectedKelurahan} onValueChange={handleKelurahanChange}>
            <SelectTrigger>
              <SelectValue placeholder="Semua kelurahan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_KELURAHAN}>Semua kelurahan</SelectItem>
              {kelurahanList[selectedKecamatan].map((kel) => (
                <SelectItem key={kel} value={kel}>
                  {kel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Hapus Filter
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">Direktori Usaha UMKM</h1>
          <p className="text-white/90 mb-6">
            Temukan berbagai usaha dan UMKM di Kota Singkawang
          </p>

          <div className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari usaha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white text-foreground border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-72 shrink-0">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Filter</CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterContent />
                </CardContent>
              </Card>
            </aside>

            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filter & Sortir
                    {hasActiveFilters && (
                      <span className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                        Aktif
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filter</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Business Listing */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Menampilkan {filteredBusinesses.length} usaha
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Terbaru</SelectItem>
                    <SelectItem value="name">Nama A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredBusinesses.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Tidak ada usaha ditemukan</h3>
                    <p className="text-muted-foreground mb-4">
                      Coba ubah filter atau kata kunci pencarian Anda
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Hapus Filter
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {filteredBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
