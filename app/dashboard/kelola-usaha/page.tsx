"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Eye, Check, X, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { businesses, categories } from "@/lib/data";
import { Usaha, BusinessStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<BusinessStatus, string> = {
  pending: "bg-warning text-black",
  approved: "bg-success text-white",
  rejected: "bg-destructive text-white",
};

export default function KelolaUsahaPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedBusiness, setSelectedBusiness] = useState<Usaha | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    type: "approve" | "reject";
    business: Usaha;
  } | null>(null);

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch =
      b.nama_usaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.kecamatan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !statusFilter || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAction = () => {
    if (!actionDialog) return;

    toast({
      title: actionDialog.type === "approve" ? "Usaha disetujui" : "Usaha ditolak",
      description: `${actionDialog.business.nama_usaha} berhasil ${actionDialog.type === "approve" ? "disetujui" : "ditolak"}.`,
    });

    setActionDialog(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kelola Usaha</h1>
        <p className="text-muted-foreground">Review dan kelola usaha yang terdaftar</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Usaha</CardTitle>
          <CardDescription>
            Total {filteredBusinesses.length} usaha ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari usaha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Semua status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="approved">Disetujui</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Business Table */}
          <div className="rounded-md border">
            <div className="hidden md:grid md:grid-cols-12 p-4 bg-muted/50 text-sm font-medium">
              <div className="col-span-4">Usaha</div>
              <div className="col-span-2">Pemilik</div>
              <div className="col-span-2">Kategori</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Aksi</div>
            </div>

            <div className="divide-y">
              {filteredBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="grid md:grid-cols-12 p-4 items-center gap-4 hover:bg-muted/30"
                >
                  {/* Business Info */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={business.foto}
                        alt={business.nama_usaha}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{business.nama_usaha}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {business.alamat}
                      </p>
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="col-span-2 hidden md:block">
                    <p className="text-sm truncate">user-{business.user_id}</p>
                  </div>

                  {/* Category */}
                  <div className="col-span-2 hidden md:block">
                    <p className="text-sm truncate">{business.kategori?.nama_kategori}</p>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <Badge className={statusColors[business.status]}>
                      {business.status === "approved" && "Disetujui"}
                      {business.status === "pending" && "Menunggu"}
                      {business.status === "rejected" && "Ditolak"}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex justify-end items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedBusiness(business)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {business.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-success hover:bg-success/10"
                          onClick={() =>
                            setActionDialog({ type: "approve", business: business })
                          }
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            setActionDialog({ type: "reject", business: business })
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {filteredBusinesses.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  Tidak ada usaha ditemukan
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedBusiness} onOpenChange={() => setSelectedBusiness(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Usaha</DialogTitle>
          </DialogHeader>
          {selectedBusiness && (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={selectedBusiness.foto}
                  alt={selectedBusiness.nama_usaha}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nama Usaha</p>
                  <p className="font-semibold">{selectedBusiness.nama_usaha}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Kategori</p>
                  <p>{selectedBusiness.kategori?.nama_kategori}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Deskripsi</p>
                  <p>{selectedBusiness.deskripsi}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Alamat</p>
                    <p>{selectedBusiness.alamat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kecamatan</p>
                    <p>{selectedBusiness.kecamatan}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Kelurahan</p>
                    <p>{selectedBusiness.kelurahan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p>{selectedBusiness.telepon}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={statusColors[selectedBusiness.status]}>
                    {selectedBusiness.status === "approved" && "Disetujui"}
                    {selectedBusiness.status === "pending" && "Menunggu"}
                    {selectedBusiness.status === "rejected" && "Ditolak"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={!!actionDialog} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog?.type === "approve" ? "Setujui Usaha" : "Tolak Usaha"}
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin{" "}
              {actionDialog?.type === "approve" ? "menyetujui" : "menolak"} usaha "
              {actionDialog?.business.nama_usaha}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Batal
            </Button>
            <Button
              onClick={handleAction}
              className={actionDialog?.type === "reject" ? "bg-destructive" : ""}
            >
              {actionDialog?.type === "approve" ? "Setujui" : "Tolak"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
