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
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import { connect } from 'react-redux';
import data from "../cards/Data.json";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    margin: "20px",
  },
  media: {
    height: 350,

  },
 
});

function Cart(props) {
  const classes = useStyles();
  return (
    <div>
    {props.cartList.map((val, key) => {
        return (<Card  className={classes.root}>
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
            </Card>)
    })
    }
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        cartList: state.cartList
    }
}

export default connect(mapStateToProps)(Cart)