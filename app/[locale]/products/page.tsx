import { getProducts } from "@/services/strapi";
import { ProductGrid } from "@/components/product-grid";

export default async function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { data: products } = await getProducts(locale);

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
