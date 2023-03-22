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

export default function RecipeReviewCard({ item }) {
  const [qty, setQty] = useState(1);
  const { addItem, updateItemQuantity } = useCart();

  const { enqueueSnackbar } = useSnackbar();

  // add product to cart
  const addProduct = (e, product, qty) => {
    e.preventDefault();
    let newObject = { ...product };
    newObject.quantity = qty;
    addItem(newObject);
    enqueueSnackbar("Product has been added to cart ", { variant: "success" });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.name}
        subheader={item.category.name}
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
          {item.description.substring(1, 100)}
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
            <button
              className="addToCart py-2"
              onClick={(e) => addProduct(e, item, qty)}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Add to cart
            </button>
          </div>
        </div>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <div className="pro-amount">Tk {item.unit_price}</div>
      </CardActions>
    </Card>
  );
}
