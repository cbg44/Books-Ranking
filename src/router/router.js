import React from "react";
import { Route } from "react-router-dom";
import Header from "../Header";
import BookList from "../Components/BookList";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header/>
            <Route exact path="/2017-2018/dcs/dev_39/client_app/" component={BookList} />
            <Route exact path="/2017-2018/dcs/dev_39/client_app/rank/:rank" component={BookList} />
            <Route exact path="/2017-2018/dcs/dev_39/client_app/rank/:rank/:authorRank" component={BookList} />
        </React.Fragment>
    );}

export default ReactRouter;
