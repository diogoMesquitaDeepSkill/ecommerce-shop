import { getProducts } from "@/services/strapi";
import { ProductGrid } from "@/components/product-grid";

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const awaitedParams = await params;
  const locale = await awaitedParams.locale;
  const { data: products } = await getProducts(locale);

  return (
    <div className="container px-4 py-8">
      <ProductGrid products={products} />
    </div>
  );
}
