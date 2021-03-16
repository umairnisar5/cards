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

let clear =(value) => {
  store.dispatch({
    type: "CLEAR_CART",
    value: value,
  })
}

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
  const [itemDetail, setItemDetail] = useState({});
  const [openDialog, setOpenDialog] = useState (false) ;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  let clickOpen = (SelectedItem) => {
    setOpenDialog(true) 
    setItemDetail(SelectedItem)
   }
  
  let clickClose = () => {
    setOpenDialog(false)
  }

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
        <DeleteIcon className="delete_icon" color="white" onClick={clear} />
      </nav>
      <h1 className="item">Cart Item</h1>
      <div className="cardscss">
        {props.cartList.map((val, index) => {
          return (
            <Card className={classes.root}>
              <CardActionArea onClick={()=> clickOpen(val)}>
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
          <Button onClick={handleClose} variant="outlined" color="primary" id="cancel_dialog">
              Cancel
            </Button>
            <Button onClick={handleClose} variant="outlined" color="primary" id="pay_dialog">
              Proceed To Pay
            </Button>
          </DialogActions>
        </Dialog>
      </div>) : (
        <h1> </h1>
      )}

      <div className="item_detail_div">
        <Dialog
          fullScreen={fullScreen}
          open={openDialog}
          onClose={clickClose}
          aria-labelledby="responsive-dialog-title"
        >
          <h2
            id="responsive-dialog-title"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "30px",
              color: "rgb(26, 178, 255)",
              fontFamily: "Anton, sans-serif",
            }}
          >
            {itemDetail?.name}
          </h2>
          <DialogContent>
            <div
              className="img_div"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={itemDetail?.imgsrc}
                alt="Dog Image"
                width="250"
                height="300"
              />
            </div>
            <h2
              id="responsive-dialog-title"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
                color: "rgb(77, 77, 77)",
                fontFamily: "'Akaya Telivigala', cursive",
              }}
            >
              {`Price $${itemDetail?.price}`}
            </h2>
            <h2
              id="responsive-dialog-title"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
                color: "rgb(77, 77, 77)",
                fontFamily: "'Akaya Telivigala', cursive",
              }}
            >
              {`Size  ${itemDetail?.size}`}
            </h2>
            <h2
              id="responsive-dialog-title"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
                color: "rgb(77, 77, 77)",
                fontFamily: "'Akaya Telivigala', cursive",
              }}
            >
              {`Color  ${itemDetail?.Color}`}
            </h2>
            <DialogContentText
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "25px",
                color: "rgb(77, 77, 77)",
                fontFamily: "'Anton', sans-serif",
              }}
            >
              {itemDetail?.desc}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              id="close_dialog"
              onClick={clickClose}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
