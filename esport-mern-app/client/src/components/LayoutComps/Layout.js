import React, { Component } from "react";

import Header from "./Header";
import Footer from "./Footer";


export class Layout extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Header />
                <div className="layoutBody" style={{ padding: '50px' }} >
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Layout;
