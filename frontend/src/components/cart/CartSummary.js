import React from "react";
import { useCart } from "react-use-cart";
import { API, USER_GUARD } from "../../Config";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
import { fetchUserData } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";


const CartSummary = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  let { cartTotal, totalUniqueItems, totalItems, items, emptyCart } = useCart();

  const onSubmit = (e) => {
    e.preventDefault();

    const formattedItems = items.map((item) => {
      const obj = { product_id: item.id, quantity: item.quantity, price: item.price, from: item.from, dealer_id: item.dealer_id };
      return obj;
    });

    // request data
    const body = {
      products: formattedItems,
      totalAmount: cartTotal
    };

    if (sessionStorage.getItem(USER_GUARD) === "tycoon"){
      API.post("tycoon-panel/product/order/store", body)
        .then((res) => {
          if (res.data.success) {
            dispatch(fetchUserData())
            emptyCart();
            Swal.fire(
              "Good Job!",
              res.data.message,
              "success"
            );
          } else {
              enqueueSnackbar(res.data.message, { variant: "warning" });
          }
        })
        .catch((error) => {
          Swal.fire("Opps!", `${error.message}`, "error");
        });
      
    } else {
      API.put("dealer/product/stock", body)
        .then((res) => {
          if (res.data.success) {
            emptyCart();
            Swal.fire(
              "Good Job!",
              res.data.message,
              "success"
            );
          } else {
              enqueueSnackbar(res.data.message, { variant: "warning" });
          }
        })
        .catch((error) => {
          console.log(error, "dealer product_add");
          Swal.fire("Opps!", `${error.message}`, "error");
        });

    }

  };

  return (
    <div className="col-md-4 summary">
      <div>
        <h5>
          <b>Summary</b>
        </h5>
      </div>
      <hr />
      <div className="row">
        <div className="col" style={{ paddingLeft: "0px" }}>
          <p> TOTAL QUANTITY</p>
        </div>
        <p className="col text-right">{totalItems}</p>
      </div>

      <div className="row mt-4">
        <div className="col" style={{ paddingLeft: "0px" }}>
          <p> TOTAL PRODUCT</p>
        </div>
        <p className="col text-right">{totalUniqueItems}</p>
      </div>

      <div
        className="row"
        style={{
          borderTop: "1px solid rgba(0,0,0,.1)",
          padding: "2vh 0",
        }}
      >
        <div className="col">TOTAL PRICE</div>
        <div className="col text-right">{parseFloat(cartTotal.toFixed(2))}</div>
      </div>
      <button onClick={onSubmit} className="btn py-3">
        PLACE ORDER
      </button>
    </div>
  );
};

export default CartSummary;
