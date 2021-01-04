import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";
import './index.css';
import Hello from "./pages/index";
import SignIn from "./pages/login";
import SignUp from "./pages/signUp";
import ForgetPassword from "./pages/forgetPassword";
import 'antd/dist/antd.css'
import ChangePassword from "./pages/changePassword";
import VerifyAccount from "./pages/verifyAccount";

function App() {
    return (
        <Switch>
            <Route path={`${process.env.PUBLIC_URL}/`} exact component={Hello} />
            <Route path={`${process.env.PUBLIC_URL}/login`} exact component={SignIn} />
            <Route path={`${process.env.PUBLIC_URL}/signup`} exact component={SignUp} />
            <Route path={`${process.env.PUBLIC_URL}/forget-password`} exact component={ForgetPassword} />
            <Route path={`${process.env.PUBLIC_URL}/verify-account`} exact component={VerifyAccount} />
            <Route path={`${process.env.PUBLIC_URL}/change-password`} exact component={ChangePassword} />
        </Switch>

    );
}

render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
