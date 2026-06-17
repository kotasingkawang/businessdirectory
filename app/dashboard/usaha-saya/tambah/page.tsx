"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, kecamatanList, kelurahanList } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function AddBusinessPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama_usaha: "",
    kategori_id: "",
    deskripsi: "",
    alamat: "",
    kecamatan: "",
    kelurahan: "",
    telepon: "",
    foto: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.nama_usaha) newErrors.nama_usaha = "Nama usaha wajib diisi";
    if (!formData.kategori_id) newErrors.kategori_id = "Kategori wajib dipilih";
    if (!formData.alamat) newErrors.alamat = "Alamat wajib diisi";
    if (!formData.kecamatan) newErrors.kecamatan = "Kecamatan wajib dipilih";
    if (!formData.telepon) newErrors.telepon = "Telepon wajib diisi";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Usaha berhasil disimpan",
      description: "Menunggu review dari admin.",
    });

    router.push("/dashboard/usaha-saya");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard/usaha-saya">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Tambah Usaha Baru</h1>
        <p className="text-muted-foreground">Isi informasi usaha Anda di bawah ini</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informasi Usaha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="nama_usaha">Nama Usaha *</Label>
              <Input
                id="nama_usaha"
                value={formData.nama_usaha}
                onChange={(e) => {
                  setFormData({ ...formData, nama_usaha: e.target.value });
                  if (errors.nama_usaha) setErrors({ ...errors, nama_usaha: "" });
                }}
                placeholder="Contoh: Warung Makan Bahari"
                className={errors.nama_usaha ? "border-destructive" : ""}
              />
              {errors.nama_usaha && (
                <p className="text-sm text-destructive">{errors.nama_usaha}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori *</Label>
              <Select
                value={formData.kategori_id}
                onValueChange={(value) => {
                  setFormData({ ...formData, kategori_id: value });
                  if (errors.kategori_id) setErrors({ ...errors, kategori_id: "" });
                }}
              >
                <SelectTrigger className={errors.kategori_id ? "border-destructive" : ""}>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.nama_kategori}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.kategori_id && (
                <p className="text-sm text-destructive">{errors.kategori_id}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Ceritakan tentang usaha Anda..."
                rows={4}
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat Lengkap *</Label>
              <Textarea
                id="alamat"
                value={formData.alamat}
                onChange={(e) => {
                  setFormData({ ...formData, alamat: e.target.value });
                  if (errors.alamat) setErrors({ ...errors, alamat: "" });
                }}
                placeholder="Contoh: Jl. Diponegoro No. 45"
                rows={2}
                className={errors.alamat ? "border-destructive" : ""}
              />
              {errors.alamat && (
                <p className="text-sm text-destructive">{errors.alamat}</p>
              )}
            </div>

            {/* Kecamatan & Kelurahan */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="kecamatan">Kecamatan *</Label>
                <Select
                  value={formData.kecamatan}
                  onValueChange={(value) => {
                    setFormData({ ...formData, kecamatan: value, kelurahan: "" });
                    if (errors.kecamatan) setErrors({ ...errors, kecamatan: "" });
                  }}
                >
                  <SelectTrigger className={errors.kecamatan ? "border-destructive" : ""}>
                    <SelectValue placeholder="Pilih kecamatan" />
                  </SelectTrigger>
                  <SelectContent>
                    {kecamatanList.map((kec) => (
                      <SelectItem key={kec} value={kec}>
                        {kec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.kecamatan && (
                  <p className="text-sm text-destructive">{errors.kecamatan}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="kelurahan">Kelurahan</Label>
                <Select
                  value={formData.kelurahan}
                  onValueChange={(value) => setFormData({ ...formData, kelurahan: value })}
                  disabled={!formData.kecamatan}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelurahan" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.kecamatan &&
                      kelurahanList[formData.kecamatan]?.map((kel) => (
                        <SelectItem key={kel} value={kel}>
                          {kel}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="telepon">Nomor Telepon *</Label>
              <Input
                id="telepon"
                value={formData.telepon}
                onChange={(e) => {
                  setFormData({ ...formData, telepon: e.target.value });
                  if (errors.telepon) setErrors({ ...errors, telepon: "" });
                }}
                placeholder="Contoh: 0562-123456 atau 081234567890"
                className={errors.telepon ? "border-destructive" : ""}
              />
              {errors.telepon && (
                <p className="text-sm text-destructive">{errors.telepon}</p>
              )}
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <Label htmlFor="foto">URL Foto</Label>
              <Input
                id="foto"
                value={formData.foto}
                onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
              <p className="text-sm text-muted-foreground">
                Masukkan URL foto usaha Anda
              </p>
            </div>

            {/* Coordinates */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="0.9092"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="108.9843"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-6 justify-end">
          <Button variant="outline" asChild>
            <Link href="/dashboard/usaha-saya">Batal</Link>
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}
