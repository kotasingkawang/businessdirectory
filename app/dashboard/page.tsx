"use client";

import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, FolderTree, TrendingUp, Clock } from "lucide-react";
import { businesses, categories } from "@/lib/data";

export default function DashboardPage() {
  const { profile } = useAuth();
  const isAdmin = profile?.level === "admin";

  const stats = [
    {
      title: "Total Usaha",
      value: businesses.length,
      description: isAdmin ? "Semua usaha" : "Usaha saya",
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Disetujui",
      value: businesses.filter((b) => b.status === "approved").length,
      description: "Usaha aktif",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Menunggu",
      value: businesses.filter((b) => b.status === "pending").length,
      description: "Pending review",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    ...(isAdmin
      ? [
          {
            title: "Total Kategori",
            value: categories.length,
            description: "Kategori usaha",
            icon: FolderTree,
            color: "text-secondary",
            bgColor: "bg-secondary/10",
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang kembali, {profile?.nama}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terakhir</CardTitle>
          <CardDescription>Update terbaru pada usaha Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {businesses.slice(0, 5).map((business) => (
              <div
                key={business.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{business.nama_usaha}</p>
                  <p className="text-sm text-muted-foreground">{business.kategori?.nama_kategori}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm capitalize">{business.status}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(business.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
