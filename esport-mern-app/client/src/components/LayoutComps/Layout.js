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
            <>
                <div style={{ "height": '100%', display: 'flex', flexDirection: "column" }}>
                    <div style={{ 'flex': 1 }}>
                        <Header />
                    </div>
                    <div className="layoutBody" style={{ padding: '50px', 'flex': 8 }} >
                        {this.props.children}
                    </div>
                    <div style={{ 'flex': 1 }}>
                        <Footer />
                    </div>
                </div>
                <style jsx>{
                    `
                    #root{
                        height: 100%;
                    }
                    `
                }
                </style>
            </>
        );
    }
}

export default Layout;
