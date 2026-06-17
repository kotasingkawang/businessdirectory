"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { businesses, categories } from "@/lib/data";
import { Usaha, BusinessStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<BusinessStatus, string> = {
  pending: "bg-warning text-black",
  approved: "bg-success text-white",
  rejected: "bg-destructive text-white",
};

export default function UsahaSayaPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<Usaha | null>(null);

  const filteredBusinesses = businesses.filter(
    (b) =>
      b.nama_usaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteDialog) {
      toast({
        title: "Usaha dihapus",
        description: `${deleteDialog.nama_usaha} berhasil dihapus.`,
      });
      setDeleteDialog(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Usaha Saya</h1>
          <p className="text-muted-foreground">Kelola usaha yang Anda daftarkan</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/usaha-saya/tambah">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Usaha
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Usaha</CardTitle>
          <CardDescription>
            Total {filteredBusinesses.length} usaha terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari usaha..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Business List */}
          <div className="space-y-4">
            {filteredBusinesses.map((business) => (
              <div
                key={business.id}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="relative h-16 w-16 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={business.foto}
                    alt={business.nama_usaha}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{business.nama_usaha}</h3>
                    <Badge className={statusColors[business.status]}>
                      {business.status === "approved" && "Disetujui"}
                      {business.status === "pending" && "Menunggu"}
                      {business.status === "rejected" && "Ditolak"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {business.kategori?.nama_kategori} • {business.kecamatan}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/usaha/${business.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Lihat
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/usaha-saya/edit/${business.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setDeleteDialog(business)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            {filteredBusinesses.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>Tidak ada usaha ditemukan</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Usaha</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus "{deleteDialog?.nama_usaha}"? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
