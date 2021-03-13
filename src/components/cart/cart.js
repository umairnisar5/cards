import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import history from "../../history";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AddIcon from "@material-ui/icons/Add";

import RemoveIcon from "@material-ui/icons/Remove";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import store from "../../store/store";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    margin: "20px",
  },
  media: {
    height: 350,
  },
});

let delItem = (value) => {
  store.dispatch({
    type: "DEL_ITEM",
    value: value,
  });
};

let handleQuantity = (type, value) => {
  if (type === "+") {
    store.dispatch({
      type: "ADD_QUANTITY",
      value: value,
    });
  } else if (type === "-") {
    store.dispatch({
      type: "SUBTRACT_QUANTITY",
      value: value,
    });
  }
};

function Cart(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <nav className="nav_tag">
        <HomeIcon
          onClick={() => {
            history.push("/");
          }}
          id="mall_icon"
        />
        <input
          type="text"
          className="input_tag"
          placeholder="search...."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <DeleteIcon className="delete_icon" color="white" onClick={delItem} />
      </nav>
      <h1 className="item">Cart Item</h1>
      <div className="cardscss">
        {props.cartList.map((val, index) => {
          return (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={val.imgsrc}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {val.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {val.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button
                  className="Add_item"
                  id="add_cart_btn"
                  size="small"
                  color="primary"
                  onClick={() => handleQuantity("+", val)}
                >
                  +
                </Button> */}
                <AddIcon
                  className="Add_item"
                  id="add_cart_btn"
                  size="small"
                  color="primary"
                  onClick={() => handleQuantity("+", val)}
                />
                <Typography gutterBottom variant="h5" component="h2">
                  {val.quantity}
                </Typography>
                <RemoveIcon
                  className="Add_item"
                  id="add_cart_btn"
                  size="small"
                  color="primary"
                  onClick={() => handleQuantity("-", val)}
                />
                <Button
                  className="Add_item"
                  id="add_cart_btn"
                  size="small"
                  color="primary"
                  onClick={() => delItem(val)}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                >
                  Delete Item
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
      <div className="chcek_item">
        <h1 className="summary">Summary </h1>
        <h2>Total Items: 1</h2>
        <h2>Total Price $2</h2>
        <button className="button_chcek">
          Chcek item
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartList: state.cartList,
  };
};

export default connect(mapStateToProps)(Cart);
