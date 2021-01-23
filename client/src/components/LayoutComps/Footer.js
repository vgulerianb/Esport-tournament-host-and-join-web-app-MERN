import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Footer extends Component {
    render() {
        return (
            <>
                <div className="footer-container">
                    <div className="footer-copyrights">
                        &copy; VG
                    </div>
                </div>
                <style jsx>
                    {`
                        .footer-container{
                            color: #ffffff;
                            background: black;
                            position: relative;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            padding: 50px;
                            height: 100%;
                           }
                        .footer-copyrights {
                            text-align: center;
                        }
                    `}
                </style>
            </>
        );
    }
}

export default Footer;
