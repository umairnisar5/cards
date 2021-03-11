import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import Data from "./Data.json";
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Badge from "@material-ui/core/Badge";
import history from "../../history";
import store from "../../store/store";
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    margin: "20px",
  },
  media: {
    height: 350,

  },
 
});

function MediaCard(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  // const dispatch = useDispatch();

  let Addme = (value) => {
    store.dispatch({
      type: "ADD_ITEM",
      value: value
    })

  };

  let clear = () => {
    // setNewData(0);
    store.dispatch({
      type: "CLEAR_CART"
    })
  };

  return (
    <div className="main_div">
      <nav className="nav_tag">
      <LocalMallIcon id="mall_icon" />
        {/* <img
          src="https://i.pinimg.com/564x/08/bd/69/08bd692665c8ddd52337528a8f88a919.jpg"
          width="45px"
        /> */}
        {/* <MenuIcon className="menu_icon" /> */}
        <input
          type="text"
          className="input_tag"
          placeholder="search...."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />

        <Badge
          badgeContent={props.cartValue}
          className="addCartNumbers"
          color="secondary"
        >
          <DeleteIcon  className="delete_icon" color="white" onClick={clear} />

          <LocalGroceryStoreIcon onClick={()=>{history.push("/cart")}} className="LocalGroceryStoreIcon" />
        </Badge>
      </nav>
      <div className="cardscss">
        {Data.filter((val) => {
          if (searchTerm == "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          } else if (
            val.desc.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        }).map((val, key) => {
          return (
            <Card  className={classes.root}>
              <CardActionArea >
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
                <Button className="Add_item" id="ADD"
                 onClick={()=>Addme(val)} size="small" color="primary">
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartValue: state.cartValue
  }
}

export default connect(mapStateToProps)(MediaCard)