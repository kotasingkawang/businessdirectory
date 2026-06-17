export type UserLevel = 'admin' | 'member';
export type BusinessStatus = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  nama: string;
  level: UserLevel;
  created_at: string;
}

export interface Kategori {
  id: string;
  nama_kategori: string;
  icon: string;
  created_at: string;
}

export interface Usaha {
  id: string;
  user_id: string;
  kategori_id: string;
  nama_usaha: string;
  deskripsi: string;
  alamat: string;
  kecamatan: string;
  kelurahan: string;
  telepon: string;
  foto: string;
  latitude: number | null;
  longitude: number | null;
  status: BusinessStatus;
  created_at: string;
  kategori?: Kategori;
  profile?: Profile;
}

export interface DashboardStats {
  totalUsers: number;
  totalKategori: number;
  totalUsaha: number;
  approvedUsaha: number;
  pendingUsaha: number;
}
