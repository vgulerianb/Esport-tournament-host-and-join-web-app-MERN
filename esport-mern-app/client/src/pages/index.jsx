import React, {Component} from "react";
import Layout from "../components/LayoutComps/Layout";

class Hello extends Component {
    state = {
        name: ""
    };

    componentDidMount() {

    }

    render() {
        return (
            <Layout >
                Hello 
            </Layout>
        )
    }
}

export default Hello;
