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
                            position: absolute;
                            left: 0;
                            right: 0;
                            padding: 50px;
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
