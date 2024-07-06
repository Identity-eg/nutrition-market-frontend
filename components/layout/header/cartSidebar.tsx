import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
// UI
import { Button } from "components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/sheet";
import CartSideItem from "./cartItem";
// Utils
import { useGetCart } from "apis/cart";

export function CartSidebar() {
  const cartQuery = useGetCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="secondary" className="flex gap-2">
          <ShoppingCartIcon />
          <span>{cartQuery.data?.totalItems ?? 0}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="capitalize">shopping cart</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        {!cartQuery.data || cartQuery.data.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-y-8 mt-8">
            <Image
              src="noCartFound.svg"
              className="w-1/5 "
              alt="No products found in cart"
              width={500}
              height={500}
            />
            <h1 className="text-center text-gray-800">
              No products found in your cart
            </h1>
          </div>
        ) : (
          <div className="grid h-[calc(100vh-160px)] grid-rows-[1fr,auto,auto] gap-4">
            <ul className="divide-y divide-gray-200 overflow-y-auto">
              {cartQuery.data.items?.map((item) => (
                <CartSideItem key={item._id} {...item} />
              ))}
            </ul>

            <hr />

            {/* Footer */}
            <SheetFooter>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between gap-2  text-base font-medium text-gray-900">
                  <div>
                    <p>Subtotal</p>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                  </div>
                  {/* <FormatNumber value={cart.totalPrice} /> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <SheetClose asChild>
                    <Button variant="destructive" asChild>
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="outline" asChild>
                      <Link href="/cart">View Cart</Link>
                    </Button>
                  </SheetClose>
                </div>
                <div className="flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <SheetClose asChild>
                      <Link
                        href="/products"
                        className="font-medium text-neutral-800 hover:text-neutral-700"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </SheetClose>
                  </p>
                </div>
              </div>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
