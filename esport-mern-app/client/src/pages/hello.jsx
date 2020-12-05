import React, {Component} from "react";
import axios from "axios";
import {G_API_URL} from "../constants/constants";

class Hello extends Component {
    state = {
        name: ""
    };

    componentDidMount() {

    }

    render() {
        return (
                <>
                    Hello 
                </> 
        )
    }
}

export default Hello;
