import Nav from "./nav/Nav";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Overview from "./overview/Overview";
import Edit from "./create/Edit";
import New from "./create/New";

function App() {
    return (
        <Router>
            <Nav/>
            <Switch>

                <Route exact path="/">
                    <New/>
                </Route>

                <Route exact path="/edit/:path" component={Edit} />

                <Route exact path="/overview">
                    <Overview/>
                </Route>
                <Route exact path="/template">
                    <h1>template</h1>
                </Route>
            </Switch>

        </Router>
    );
}

export default App;
