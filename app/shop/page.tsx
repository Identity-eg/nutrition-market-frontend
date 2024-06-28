"use client";

import { useGetProducts } from "@/apis/products";
import ShoppingItem from "./components/shoppingItem";

export default function ShopPage() {
  const productsQuery = useGetProducts();

  // if (productsQuery.isLoading) return <LoaderComponent />;
  if (productsQuery.isError) return <div>error</div>;

  const products =
    productsQuery.data?.pages.flatMap((page) => page.products) ?? [];
  return (
    <section>
      {products.map((p) => (
        <ShoppingItem key={p._id} {...p} />
      ))}
    </section>
  );
}
