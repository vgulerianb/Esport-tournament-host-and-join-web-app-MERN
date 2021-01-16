import React, { Component } from "react";
import GameCard from "../components/cardComp/gameCard";
import NewsGameCard from "../components/cardComp/newsGameCardWrapper";
import Layout from "../components/LayoutComps/Layout";

class Hello extends Component {
  state = {
    name: "",
  };

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <div className="mainWrapper">
          <div className="gameListing">
            <GameCard />
            <GameCard /> <GameCard /> <GameCard /> <GameCard />
          </div>
          <div className="newsWrapper">
            <NewsGameCard />
            <NewsGameCard />
            <NewsGameCard />
            <NewsGameCard />
            <NewsGameCard />
            <NewsGameCard />
          </div>
        </div>
        <style jsx>{`
          .mainWrapper {
            display: flex;
          }
          .gameListing {
            flex: 8;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          .newsWrapper {
            flex: 2;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Hello;
