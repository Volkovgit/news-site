import React from "react";
import { deleteById, deleteCurNews } from "../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Navigation from "./Navigation";

const useStyles = makeStyles(() => ({
  media:{
    width:"50%",
    height:"30%",
    paddingLeft:"25%"
  },
  articles:{
    textAlign:"center"
  },
  article:{
    maxWidth:"auto"
  },
}));

function AllNews() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const allNews = useSelector((state) => state.allNews);

  const onClickDelete = (id) => {

    dispatch(deleteById(id));
  };
  // console.log(allNews);
  return (
    <Container>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          
          <Link to={`/add`}>
            <Button variant="contained" color="primary">
              Add news
            </Button>
          </Link>
        </Grid>
        <Grid container className={classes.articles}>
          {allNews.map((news) => {
            return (
              <Grid key={news.id} item xs={12} textalign="center" className={classes.article}>
                <Card>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    image={`http://phpserv/${news.img}`}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="h5">{news.name}</Typography>
                    <Typography paragraph>{news.description}</Typography>
                    <Typography paragraph>{news.date}</Typography>
                    <Link to={`/news/edit/${news.id}`}>
                      <Button className={classes.btnChange} size="small" variant="contained" color="primary">Change</Button>
                    </Link>
                    <Button className={classes.btnDelete}
                     size="small" variant="contained" color="secondary"
                      onClick={() => onClickDelete(news.id)}
                    >
                      Delete
                    </Button>
                  </CardContent>{" "}
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Navigation/>
      </Grid>
    </Container>
  );
}

export default AllNews;
