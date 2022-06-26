import React from "react";
import axios from "axios";
import {
  Grid,
  Input,
  TextareaAutosize,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addArcticle} from '../redux/rootReducer';


const useStyles = makeStyles(() => ({
  nameInput: {
    width: "100%",
  },
  descInput: {
    width: "100%",
    maxWidth: "500px",
  },
}));

function CreateNews() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newArticle, setNewAtricle] = React.useState({
    name: "",
    description: "",
  });

  const fileInput = React.createRef();

  const clickAdd = (e) => {
    e.preventDefault();
    if(!fileInput.current.files[0] || (!newArticle.name && newArticle.description)){
      return alert("Заполните все поля");
    }
    const fd = new FormData();
    fd.append("name", newArticle.name);
    fd.append("description", newArticle.description);
    fd.append(
      "name",
      fileInput.current.files[0],
      fileInput.current.files[0].name
    );
    dispatch(addArcticle(fd));
  };

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <form id="formElem" onSubmit={clickAdd} encType="multipart/form-data">
          <Grid item xs={12} justify="center" alignItems="center">
            {" "}
            <TextareaAutosize
              placeholder="Заголовок"
              className={classes.nameInput}
              value={newArticle.name}
              onChange={(e) =>
                setNewAtricle({ ...newArticle, name: e.target.value })
              }
            ></TextareaAutosize>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
            placeholder="Описание"
              className={classes.descInput}
              value={newArticle.description}
              onChange={(e) =>
                setNewAtricle({ ...newArticle, description: e.target.value })
              }
            ></TextareaAutosize>
          </Grid>

          <Button variant="contained">
            <input type="file" ref={fileInput} accept="image/*" />
          </Button>
          <Button variant="contained" size="small">
            <Input type="submit" value="Добавить" ></Input>
          </Button>
        </form>
        <Grid container xs={10} justify="center" alignItems="center">
          {" "}
          <Link to="/">
            <Button variant="contained" color="primary">Все новости</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateNews;
