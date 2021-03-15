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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
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
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      { props.cartList.length != 0 ? (
      <div>
        <Button id="button" variant="outlined" color="primary" onClick={handleClickOpen}>
          Check Out
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          id="dialog"
        >
          <DialogTitle id="responsive-dialog-title">Cart Summary</DialogTitle>
          <DialogContent>
            <div className="item_number">
              <h3>Total Items:</h3>
              <h3>{props.totalItems}</h3>
            </div>
            <div className="item_number">
              <h3>Total Price:</h3>
              <h3> {`$${props.totalPrice}`} </h3>
            </div>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} color="primary" id="cancel_dialog">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" id="pay_dialog">
              Proceed To Pay
            </Button>
          </DialogActions>
        </Dialog>
      </div>) : (
        <h1> </h1>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  let totalItems = 0;
  let totalPrice = 0;
  state.cartList.map((item) => {
    totalItems += item.quantity;
    totalPrice += item.quantity * item.price;
  });
  return {
    cartList: state.cartList,
    cartValue: state.cartValue,
    totalItems: totalItems,
    totalPrice: totalPrice,
  };
};

export default connect(mapStateToProps)(Cart);
