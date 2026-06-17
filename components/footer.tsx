import Link from "next/link";
import { Building2, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">
                Direktori Usaha Singkawang
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Platform direktori usaha dan UMKM resmi Kota Singkawang,
              Kalimantan Barat.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Navigasi</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Beranda
              </Link>
              <Link href="/kategori" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Kategori
              </Link>
              <Link href="/usaha" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                UMKM
              </Link>
              <Link href="/tentang" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tentang
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Layanan</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Masuk
              </Link>
              <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Daftar Usaha
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Kontak</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Kantor Pemerintah Kota Singkawang, Kalimantan Barat</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(0562) 123456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@singkawangkota.go.id</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Direktori Usaha Kota Singkawang. Hak cipta dilindungi.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link href="/kebijakan-privasi" className="hover:text-foreground transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-foreground transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
