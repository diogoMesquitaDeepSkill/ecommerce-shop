import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/services/strapi";

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = await params.locale;
  const { data: products } = await getProducts(locale);

  return (
    <div className="container px-4 py-8">
      <ProductGrid products={products} />
    </div>
  );
}
