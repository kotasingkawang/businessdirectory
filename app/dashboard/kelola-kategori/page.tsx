"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categories, businesses } from "@/lib/data";
import { Kategori } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type KategoriWithCount = Kategori & { count: number };

export default function KelolaKategoriPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [editDialog, setEditDialog] = useState<KategoriWithCount | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<KategoriWithCount | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("");

  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: businesses.filter((b) => b.kategori_id === cat.id).length,
  }));

  const filteredCategories = categoriesWithCount.filter((cat) =>
    cat.nama_kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    toast({
      title: "Kategori disimpan",
      description: `Kategori berhasil ${editDialog?.id ? "diperbarui" : "ditambahkan"}.`,
    });
    setEditDialog(null);
  };

  const handleDelete = () => {
    if (!deleteDialog) return;

    if (deleteDialog.count > 0) {
      toast({
        title: "Tidak dapat menghapus",
        description: "Kategori masih memiliki usaha terdaftar.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Kategori dihapus",
        description: `${deleteDialog.nama_kategori} berhasil dihapus.`,
      });
    }

    setDeleteDialog(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola Kategori</h1>
          <p className="text-muted-foreground">Tambah, edit, dan hapus kategori usaha</p>
        </div>
        <Button onClick={() => setEditDialog({ id: "", nama_kategori: "", icon: "", created_at: "", count: 0 } as KategoriWithCount)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Kategori
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kategori</CardTitle>
          <CardDescription>
            Total {categories.length} kategori
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead className="text-center">Total Usaha</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.nama_kategori}</TableCell>
                    <TableCell>{category.icon || "-"}</TableCell>
                    <TableCell className="text-center">{category.count}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditDialog(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog(category)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredCategories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      Tidak ada kategori ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editDialog} onOpenChange={() => setEditDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editDialog?.id ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
            <DialogDescription>
              {editDialog?.id
                ? "Perbarui informasi kategori"
                : "Tambahkan kategori baru"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Kategori</Label>
              <Input
                value={editDialog?.nama_kategori || ""}
                onChange={(e) =>
                  setEditDialog(
                    editDialog ? { ...editDialog, nama_kategori: e.target.value } : null
                  )
                }
                placeholder="Contoh: Warung Makan"
              />
            </div>

            <div className="space-y-2">
              <Label>Icon</Label>
              <Input
                value={editDialog?.icon || ""}
                onChange={(e) =>
                  setEditDialog(
                    editDialog ? { ...editDialog, icon: e.target.value } : null
                  )
                }
                placeholder="Contoh: utensils"
              />
              <p className="text-sm text-muted-foreground">
                Gunakan nama icon dari Lucide React
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialog(null)}>
              Batal
            </Button>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Kategori</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kategori "{deleteDialog?.nama_kategori}"?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(null)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
