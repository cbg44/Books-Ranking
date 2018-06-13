import React from "react";
import { Route } from "react-router-dom";
import Header from "../Header";
import BookList from "../Components/BookList";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header />
            <Route exact path="https://booksranking.herokuapp.com/" component={BookList} />
            <Route exact path="/rank/:rank" component={BookList} />
            <Route exact path="/rank/:rank/:authorRank" component={BookList} />
        </React.Fragment>
    );}

export default ReactRouter;
