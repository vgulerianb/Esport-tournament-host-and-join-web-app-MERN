import React, { Component } from "react";
import GameCard from "../components/cardComp/gameCard";
import NewsGameCard from "../components/cardComp/newsGameCardWrapper";
import Layout from "../components/LayoutComps/Layout";
import { Drawer, Button } from "antd";
import { check_login } from "../utils/user.util";

class Hello extends Component {
  state = {
    activityDrawer: false,
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
          {check_login() ? (
            <>
              <Drawer
                visible={this.state.activityDrawer}
                onClose={() => this.setState({ activityDrawer: false })}
                width={"440px"}
              >
                <NewsGameCard />
                <NewsGameCard />
                <NewsGameCard />
                <NewsGameCard />
                <NewsGameCard />
                <NewsGameCard />
              </Drawer>
              <Button
                className="floatBtn"
                onClick={() => {
                  this.setState({
                    activityDrawer: !this.state.activityDrawer,
                  });
                }}
              >
                My Activity
              </Button>
            </>
          ) : (
            ""
          )}
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
          .floatBtn {
            position: fixed;
            width: 125px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #0c9;
            color: #fff;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #999;
            z-index: 10;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Hello;
