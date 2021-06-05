import React, { Component } from "react";
import GameCard from "../components/cardComp/gameCard";
import NewsGameCard from "../components/cardComp/newsGameCardWrapper";
import Layout from "../components/LayoutComps/Layout";
import { Drawer, Button } from "antd";
import { check_login, showNotification } from "../utils/user.util";
import { G_API_URL } from "../constants/constants";
import axios from "axios";
import { Spin } from "antd";
class Hello extends Component {
  state = {
    activityDrawer: false,
    gameData: [],
    loading: true,
  };

  componentDidMount() {
    let apiUrl = G_API_URL + "game/";
    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.status && res.data?.data) {
          console.log(res.data.data, "ddd");
          this.setState({
            gameData: res.data.data,
            loading: false,
          });
        } else showNotification("error", "Unable to fetch games");
      })
      .catch(() => {
        showNotification("error", "Unable to fetch games");
      });
  }

  render() {
    return (
      <Layout>
        <Spin tip="Fetching games..." spinning={this.state.loading}>
          <div className="mainWrapper">
            <div className="gameListing">
              {this.state.gameData && this.state.gameData.length > 0
                ? this.state.gameData.map((item) => (
                    <GameCard
                      name={item.game_name}
                      type={item.game_type}
                      image={item.game_image}
                      start_time={item.start_time}
                      description={item.game_description}
                      author="Vikrant"
                    />
                  ))
                : ""}
            </div>
            {check_login() ? (
              <>
                <Drawer
                  visible={this.state.activityDrawer}
                  onClose={() => this.setState({ activityDrawer: false })}
                  className="my-drawer"
                >
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
              width: 456px !important;
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
        </Spin>
      </Layout>
    );
  }
}

export default Hello;
