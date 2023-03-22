import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSnackbar } from "notistack";
import { useCart } from "react-use-cart";
// import "../../pages/products/product.css";
import { CNavLink } from "@coreui/react";

export default function RecipeReviewCard({ item }) {
  const [qty, setQty] = useState(1);
  const { addItem, updateItemQuantity } = useCart();

  const { enqueueSnackbar } = useSnackbar();

  // add product to cart
  const addProduct = (e, product, qty) => {
    e.preventDefault();
    let newObject = { ...product, price: product.mrp, from: product.from }
    newObject.quantity = qty;
    addItem(newObject);
    enqueueSnackbar("Product has been added to cart ", { variant: "success" });
  };
 const available_qty = item.quantity ? item.quantity : item.qty
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={item.product.name}
        subheader={item.product.category.name}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          className="description"
        >
         <b>Stock Quantity: </b> {available_qty} <br></br>
        <p className="mt-2"> {item.product.description.substring(1, 60)} .... <CNavLink className="text-primary" to={"/dashboard/show-product/" + item.product.id }>Read More</CNavLink></p> 
        </Typography>

        {/* Add To Cart */}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <small
              className="cart-operator"
              onClick={() => (qty ? setQty(qty - 1) : setQty(1))}
            >
              -
            </small>
            <small href="#" className="qty-border">
              {qty}
            </small>
            <small onClick={() => setQty(qty + 1)} className="cart-operator">
              +
            </small>
          </div>
          <div className="add_to_cart_button">
            { available_qty > 0 ?
            <button
              className="addToCart py-1"
              onClick={(e) => addProduct(e, {...item.product, image: item.image}, qty)}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Add to cart
            </button> : (
              <button
                className="addToCart bg-warning py-1"
                onClick={(e) => addProduct(e, {...item.product, image: item.image}, qty)}
              >
                <i className="fas fa-shopping-cart me-2"></i>
                Stock Out
            </button>
            ) }
          </div>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <div className="pro-amount">Tk {item.product.mrp}</div>
      </CardActions>
    </Card>
  );
}
