import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { check_login, logout_user } from "../../utils/user.util"

const menu = (
    <>
        <div className="profile-menu-container">

            <div
                className="menu-item"

            >
                Profile
            </div>

            <div
                className="menu-item"
            >
                Change Password
            </div>
            <div className="menu-item logout-btn">
                Logout
            </div>
        </div>
    </>
);

const Header = props => {
    const history = useHistory();
    return (
        <>
            <div className="navbar-container">
                <div className="right-container">
                    <div
                        className="brand-logo"
                    >
                        <Link to={process.env.PUBLIC_URL}>
                            Logo
                        </Link>
                    </div>
                </div>
                {!check_login() ?
                    <div className="loggedOutStateOpt" style={{ display: 'flex' }}>
                        <div className="loginBtn primaryBtn-1" onClick={() => history.push(process.env.PUBLIC_URL + '/login')}>
                            Log In
                    </div>
                        <div className="signUpBtn primaryBtn-2" onClick={() => history.push(process.env.PUBLIC_URL + '/signup')}>
                            Sign Up
                    </div>
                    </div> : <div className="primaryBtn-1" onClick={() => { logout_user() }}>Log Out</div>}

            </div>

            <style jsx>
                {`
                    .navbar-container {
                        height: 54px;
                        background: #ffffff;
                        box-shadow: 0px 5px 11px 0px rgba(50,50,50,0.08);
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 1000;
                        padding-right: 30px;
                        padding-left: 30px;
                        align-items: center;
                        display: flex;
                        justify-content: space-between;
                    }
                    .navbar-container .brand-logo {
                        margin-right: 2.4rem;
                    }
                    .loginBtn, .signUpBtn{
                        height: 35px;
                    }
                `}
            </style>
        </>
    );
};

export default Header;
