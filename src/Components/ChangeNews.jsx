import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getNewsById, changeName, changeDescription,changeArticle } from "../redux/rootReducer";

import {
  Grid,
  Input,
  TextareaAutosize,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link} from "react-router-dom";


const useStyles = makeStyles(() => ({
  nameInput: {
    width: "100%",
  },
  descInput: {
    width: "100%",
    maxWidth: "500px",
  },
}));

function ChangeNews() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentArticle = useSelector((state) => state.currentNews);
  const fileInput = React.createRef();
  useEffect(() => {
    dispatch(getNewsById(id));
  }, []);

  if (!currentArticle.id) {
    return <div>Wait</div>;
  }

  const clickAdd = (e) => {
    e.preventDefault();
    if(!fileInput.current.files[0] || (!currentArticle.name && currentArticle.description)){
      return alert("Заполните все поля");
    }
    const fd = new FormData();
    fd.append("name", currentArticle.name);
    fd.append("description", currentArticle.description);
    fd.append(
      "name",
      fileInput.current.files[0],
      fileInput.current.files[0].name
    );
    dispatch(changeArticle(fd,id));
  };

  return (

    <Grid container direction="row" justify="center" alignItems="center">
        <form id="formElem" onSubmit={clickAdd} encType="multipart/form-data">
          <Grid item xs={12}  >
            {" "}
            <TextareaAutosize
              placeholder="Заголовок"
              className={classes.nameInput}
              value={currentArticle.name}
              onChange={(e) => dispatch(changeName(e.target.value))
              }
            ></TextareaAutosize>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
            placeholder="Описание"
              className={classes.descInput}
              value={currentArticle.description}
              onChange={(e) => dispatch(changeDescription(e.target.value))
              }
            ></TextareaAutosize>
          </Grid>

          <Button variant="contained">
            <input type="file" ref={fileInput} accept="image/*" />
          </Button>
          <Button variant="contained" size="small">
            <Input type="submit" value="Изменить" ></Input>
          </Button>
        </form>
        <Grid container xs={10} justify="center" >
          {" "}
          <Link to="/">
            <Button variant="contained" color="primary">Все новости</Button>
          </Link>
        </Grid>
      </Grid>
  
  );
}

export default ChangeNews;
