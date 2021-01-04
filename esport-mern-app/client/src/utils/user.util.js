import { notification } from "antd";
import axios from "axios";
import { G_API_URL } from "../constants/constants";

const showNotification = (type = "error", msg = "Something went wrong") => {
    notification[type]({
        message: msg,
        duration: 2
    });
};


const login_user = (data) => {
    if (data?.user_token) {
        localStorage.setItem("u_token", data.user_token)
    }
};

const check_login = () => {
    if (localStorage.getItem("u_token"))
        return true;
    return false;
};

const logout_user = () => {
    axios.post(G_API_URL + "user/logout", {}, {
        headers: {
            'Authorization': getToken()
        }
    }).then((res) => {
        showNotification("success", "You are logged out successfully")
    }).catch(() => {
        console.log("Unable to invalidate token, clearing token from localstorage")
    });
    localStorage.clear();
    setTimeout(() => {
        window.location.href = process.env.PUBLIC_URL + '/login';
    }, 1500)
};

const getToken = () => {
    return localStorage.getItem("u_token")
};

export { login_user, check_login, logout_user, showNotification, getToken };
