import React from "react";
import { useCart } from "react-use-cart";

export default function CartNotification() {
  const { isEmpty, emptyCart } = useCart();

  return (
    <>
      {!isEmpty && (
        <button
          onClick={() => emptyCart()}
          className="px-2 py-1 text-white bg-black"
        >
          Clear cart
        </button>
      )}
    </>
  );
}
