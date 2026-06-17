"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Shield, User as UserIcon, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useToast } from "@/hooks/use-toast";

// Mock users data
const mockUsers = [
  { id: "1", nama: "Admin", email: "admin@singkawang.go.id", level: "admin" as const, created_at: "2024-01-01" },
  { id: "2", nama: "Budi Santoso", email: "budi@email.com", level: "member" as const, created_at: "2024-01-15" },
  { id: "3", nama: "Siti Rahayu", email: "siti@email.com", level: "member" as const, created_at: "2024-02-01" },
  { id: "4", nama: "Ahmad Hidayat", email: "ahmad@email.com", level: "member" as const, created_at: "2024-02-15" },
  { id: "5", nama: "Dewi Lestari", email: "dewi@email.com", level: "member" as const, created_at: "2024-03-01" },
];

export default function KelolaPenggunaPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState<typeof mockUsers[0] | null>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = !levelFilter || user.level === levelFilter;

    return matchesSearch && matchesLevel;
  });

  const handleDelete = () => {
    if (!deleteDialog) return;

    toast({
      title: "Pengguna dihapus",
      description: `${deleteDialog.nama} berhasil dihapus.`,
    });

    setDeleteDialog(null);
  };

  const handleToggleLevel = (user: typeof mockUsers[0]) => {
    toast({
      title: "Level diubah",
      description: `${user.nama} sekarang adalah ${user.level === "admin" ? "member" : "admin"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kelola Pengguna</h1>
        <p className="text-muted-foreground">Kelola akun pengguna direktori usaha</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>
            Total {filteredUsers.length} pengguna
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Tanggal Daftar</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.nama.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.nama}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.level === "admin" ? "default" : "secondary"}>
                        {user.level === "admin" ? "Admin" : "Member"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleLevel(user)}
                        title={user.level === "admin" ? "Jadikan Member" : "Jadikan Admin"}
                      >
                        <Shield className={`h-4 w-4 ${user.level === "admin" ? "text-primary" : "text-muted-foreground"}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteDialog(user)}
                        disabled={user.level === "admin"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      Tidak ada pengguna ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Pengguna</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pengguna "{deleteDialog?.nama}"?
              Semua usaha milik pengguna ini juga akan dihapus.
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
