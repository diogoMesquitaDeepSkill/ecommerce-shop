import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function CategorySection() {
  const categories = [
    {
      name: "Fine Wines",
      image: "/placeholder.svg?height=600&width=400",
      href: "/products/wines",
    },
    {
      name: "Gourmet Foods",
      image: "/placeholder.svg?height=600&width=400",
      href: "/products/foods",
    },
    {
      name: "Gift Sets",
      image: "/placeholder.svg?height=600&width=400",
      href: "/products/gift-sets",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
        <p className="text-muted-foreground max-w-[600px]">
          Explore our curated selection of premium wines and gourmet foods
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="overflow-hidden h-[300px] transition-all hover:shadow-lg">
              <CardContent className="p-0 h-full relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
