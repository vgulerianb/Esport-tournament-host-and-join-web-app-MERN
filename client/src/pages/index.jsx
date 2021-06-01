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
                className="my-drawer"
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
            grid-template-columns: repeat(auto-fill, minmax(250px, auto));
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
          .ant-drawer-content-wrapper {
            width: 256px !important;
          }

          @media screen and (max-width: 600px) {
            .gameCardWrapper {
              width: 200px;
              height: 300px;
              font-size: 12px;
            }
            .gameListing {
              grid-template-columns: repeat(auto-fill, minmax(200px, auto));
            }
            .floatBtn {
              width: 80px;
              height: 42px;
              font-size: 11px;
            }
            .ant-drawer-content-wrapper {
              width: 100% !important;
            }
            .newsgameCardWrapper {
              height: 78px !important;
              width: 308px !important;
            }
          }
          @media screen and (max-width: 400px) {
            .gameCardWrapper {
              width: 160px;
              height: 240px;
              font-size: 10px;
            }
            .gameListing {
              grid-template-columns: repeat(auto-fill, minmax(160px, auto));
            }
            .layoutBody {
              padding-right: 15px !important;
              padding-left: 0px !important;
            }
            .bottomBox {
              visibility: hidden;
            }
          }
        `}</style>
      </Layout>
    );
  }
}

export default Hello;
