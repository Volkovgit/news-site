import React from "react";
import "./App.css";
import AllNews from "./Components/AllNews";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "./redux/rootReducer";
import CreateNews from "./Components/CreateNews";
import ChangeNews from "./Components/ChangeNews";


function App() {
  const dispatch = useDispatch();

  const currentPage = useSelector(state=>state.currentPage);
  // console.log(currentPage);
  React.useEffect(() => {
    dispatch(getNews(currentPage));
  }, [currentPage]);
  return (
    <Router>
      
      <Switch>
        <Route exact path="/">
          <Redirect to="/news" />
        </Route>
        <Route exact path="/news">
            <Route exact path="/news"><AllNews /></Route>
            
        </Route>
        <Route exact path="/news/edit/:id">
              <ChangeNews />
            </Route>
        <Route path="/add">
          <CreateNews />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
