import React, { Component } from "react";
import GameCard from "../components/cardComp/gameCard";
import Layout from "../components/LayoutComps/Layout";

class Hello extends Component {
  state = {
    name: "",
  };

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <GameCard />
      </Layout>
    );
  }
}

export default Hello;
