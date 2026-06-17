/*
# Create Business Directory Schema for Singkawang City

1. New Tables
- `profiles` (extends auth.users)
  - `id` (uuid, primary key, references auth.users)
  - `nama` (text, user's full name)
  - `level` (text, either 'admin' or 'member', defaults to 'member')
  - `created_at` (timestamptz)

- `kategori` (business categories)
  - `id` (uuid, primary key)
  - `nama_kategori` (text, category name)
  - `icon` (text, icon identifier)
  - `created_at` (timestamptz)

- `usaha` (businesses/listings)
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles, defaults to auth.uid())
  - `kategori_id` (uuid, references kategori)
  - `nama_usaha` (text, business name)
  - `deskripsi` (text, business description)
  - `alamat` (text, full address)
  - `kecamatan` (text, district)
  - `kelurahan` (text, village)
  - `telepon` (text, phone number)
  - `foto` (text, photo URL)
  - `latitude` (decimal, geographic coordinate)
  - `longitude` (decimal, geographic coordinate)
  - `status` (text: 'pending', 'approved', 'rejected', defaults to 'pending')
  - `created_at` (timestamptz)

2. Security
- Enable RLS on all tables
- Profiles: users can read all, update own profile
- Kategori: public read, admin manage
- Usaha: public can read approved businesses, owners can manage their own, admins can manage all

3. Indexes
- Index on usaha.user_id for owner lookups
- Index on usaha.kategori_id for category filtering
- Index on usaha.status for approval filtering
- Index on usaha.kecamatan and kelurahan for location filtering
*/

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nama text NOT NULL,
  level text NOT NULL DEFAULT 'member' CHECK (level IN ('admin', 'member')),
  created_at timestamptz DEFAULT now()
);

-- Create kategori table
CREATE TABLE IF NOT EXISTS kategori (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_kategori text NOT NULL UNIQUE,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Create usaha table
CREATE TABLE IF NOT EXISTS usaha (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  kategori_id uuid NOT NULL REFERENCES kategori(id) ON DELETE RESTRICT,
  nama_usaha text NOT NULL,
  deskripsi text,
  alamat text,
  kecamatan text,
  kelurahan text,
  telepon text,
  foto text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE kategori ENABLE ROW LEVEL SECURITY;
ALTER TABLE usaha ENABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_usaha_user_id ON usaha(user_id);
CREATE INDEX IF NOT EXISTS idx_usaha_kategori_id ON usaha(kategori_id);
CREATE INDEX IF NOT EXISTS idx_usaha_status ON usaha(status);
CREATE INDEX IF NOT EXISTS idx_usaha_kecamatan ON usaha(kecamatan);
CREATE INDEX IF NOT EXISTS idx_usaha_kelurahan ON usaha(kelurahan);

-- Profiles RLS policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Kategori RLS policies (public read, admin manage)
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON kategori;
CREATE POLICY "Categories are viewable by everyone"
  ON kategori FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can insert categories" ON kategori;
CREATE POLICY "Admins can insert categories"
  ON kategori FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND level = 'admin')
  );

DROP POLICY IF EXISTS "Admins can update categories" ON kategori;
CREATE POLICY "Admins can update categories"
  ON kategori FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND level = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND level = 'admin')
  );

DROP POLICY IF EXISTS "Admins can delete categories" ON kategori;
CREATE POLICY "Admins can delete categories"
  ON kategori FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND level = 'admin')
  );

-- Usaha RLS policies
-- Public can read approved businesses
DROP POLICY IF EXISTS "Approved businesses are viewable by everyone" ON usaha;
CREATE POLICY "Approved businesses are viewable by everyone"
  ON usaha FOR SELECT
  TO anon, authenticated
  USING (status = 'approved' OR auth.uid() = user_id);

-- Business owners can insert their own businesses
DROP POLICY IF EXISTS "Users can insert own businesses" ON usaha;
CREATE POLICY "Users can insert own businesses"
  ON usaha FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Business owners can update their own businesses, admins can update all
DROP POLICY IF EXISTS "Users can update own businesses" ON usaha;
CREATE POLICY "Users can update own businesses"
  ON usaha FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND level = 'admin'))
  WITH CHECK (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND level = 'admin'));

-- Business owners can delete their own businesses, admins can delete all
DROP POLICY IF EXISTS "Users can delete own businesses" ON usaha;
CREATE POLICY "Users can delete own businesses"
  ON usaha FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND level = 'admin'));

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, nama, level)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nama', split_part(NEW.email, '@', 1)),
    'member'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();