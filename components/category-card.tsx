"use client";

import Link from "next/link";
import {
  Utensils,
  Coffee,
  Store,
  Monitor,
  Shirt,
  Fish,
  Cookie,
  Wrench,
  Scissors,
  Printer,
  Pill,
  Package,
  Smartphone,
  Gem
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Kategori } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  utensils: Utensils,
  "utensils-crossed": Utensils,
  coffee: Coffee,
  cookie: Cookie,
  shirt: Shirt,
  monitor: Monitor,
  smartphone: Smartphone,
  gem: Gem,
  fish: Fish,
  wrench: Wrench,
  scissors: Scissors,
  printer: Printer,
  pill: Pill,
  package: Package,
};

interface CategoryCardProps {
  category: Kategori;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Store;

  return (
    <Link href={`/usaha?kategori=${category.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm bg-card">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
            <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
          </div>
          <span className="text-sm font-medium line-clamp-2">{category.nama_kategori}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
