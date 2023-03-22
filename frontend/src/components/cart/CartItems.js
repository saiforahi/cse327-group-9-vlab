import React from "react";
import { useCart } from "react-use-cart";
import "../../pages/cart/cart.css";

export default function CartItems() {
  const removeProduct = (e, id) => {
    e.preventDefault();
    removeItem(id);
  };
  const { isEmpty, items, updateItemQuantity, removeItem } = useCart();
 console.log(items, 'dd')
  if (isEmpty)
    return <h4 className="text-center text-muted">Cart is empty.</h4>;
  return (
    <>
      {items.map((item, index) => {
        return (
          <div key={index} className="row border-top border-bottom">
            <div className="row main align-items-center">
              <div className="col-2">
                <img
                  className="img-fluid"
                  height="100"
                  src={item.image}
                  alt="product_image"
                />
              </div>
              <div className="col">
                <div className="row text-muted">{item.name}</div>
                <div className="row">{item.short_desc}</div>
              </div>
              <div className="col">
                <button
                  className="border border-white me-2"
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <button className="qty-border-cart">{item.quantity}</button>
                <button
                  className="border border-white ms-2"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="col">
                {parseFloat((item.price * item.quantity).toFixed(2))}
                <button
                  onClick={(e) => removeProduct(e, item.id)}
                  className="close px-2 py-2"
                  style={{ backgroundColor: "#000" }}
                >
                  <i
                    className="fa-solid fa-xmark text-white"
                    style={{ fontSize: 15 }}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
