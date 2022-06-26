import axios from "axios";

const initialState = {
  allNews: [],
  currentNews: {},
  pageCount: 0,
  currentPage: 0,
};

const SET_NEWS = "SET_NEWS";
const SET_CURRENT_NEWS = "SET_CURRENT_NEWS";
const CHANGE_NAME = "CHANGE_NAME";
const CHANGE_DESCRIPTION = "CHANGE_DESCRIPTION";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS: {
      return { ...state, allNews: [...action.data], pageCount: action.pages };
    }
    case SET_CURRENT_NEWS: {
      return { ...state, currentNews: { ...action.data } };
    }
    case CHANGE_NAME: {
      return {
        ...state,
        currentNews: { ...state.currentNews, name: action.text },
      };
    }
    case SET_CURRENT_PAGE:{
      return{...state,currentPage:action.number}
    }
    case CHANGE_DESCRIPTION: {
      return {
        ...state,
        currentNews: { ...state.currentNews, description: action.text },
      };
    }
    default:
      return state;
  }
};

const setNews = (data, pages) => ({
  type: SET_NEWS,
  data: data,
  pages,
});

const setCurrentNews = (data) => ({
  type: SET_CURRENT_NEWS,
  data,
});

export const changeName = (text) => ({
  type: CHANGE_NAME,
  text,
});

export const changeDescription = (text) => ({
  type: CHANGE_DESCRIPTION,
  text,
});

export const setCurPage = (number) => ({
  type: SET_CURRENT_PAGE,
  number,
});

export const getNews = (pageNumber=0) => {
  return (dispatch) => {
    // console.log(pageNumber);
      axios.get(`http://phpserv/news/${pageNumber}`).then((response) => {
        if (response.data != null)
        
          dispatch(setNews(response.data.newsList, response.data.row_count));
      });
  };
};

export const getNewsById = (id) => {
  return (dispatch) => {
    if (id) {
      axios.get(`http://phpserv/getOneArticle/${id}`).then((response) => {
        if (response.data != null) dispatch(setCurrentNews(response.data[0]));
      });
    }
  };
};

export const deleteById = (id) => {
  return (dispatch) => {
    axios.delete(`http://phpserv/news/${id}`).then((response) => {
      console.log(response);
      dispatch(getNews());
    });
  };
};

export const addArcticle = (data) => {
  console.log(data);
  return (dispatch) => {
    axios
      .post("http://phpserv/news", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data);
        dispatch(getNews());
      });
  };
};

export const changeArticle = (data, id) => {
  return (dispatch) => {
    axios
      .post(`http://phpserv/edit/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(getNews());
      });
  };
};
