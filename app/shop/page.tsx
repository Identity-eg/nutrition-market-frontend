import SortBy from "./components/sortBy";
import FilterProducts from "./components/filter";
import ShoppingItem from "./components/shoppingItem";

export default function ShopPage() {
  return (
    <section className="py-6 grid grid-cols-[278px,1fr] gap-x-4 gap-y-8">
      <SortBy />
      <FilterProducts />
      <article className="col-span-2 media-md:col-span-1">
        <ShoppingItem
          name='shopping'
          description='description'
          price={200}
          images={[{ name: 'image', size: 90, url: '' }]}
          numReviews={4}
          _id='dfdddfdf' />
      </article>
    </section>
  );
}
