import { getProducts } from "@/services/strapi";
import { ProductGrid } from "@/components/product-grid";

export default async function ProductsPage() {
  const { data: products } = await getProducts();

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
