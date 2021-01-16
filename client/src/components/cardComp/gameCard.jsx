import React from "react";
import { useHistory } from "react-router-dom";

const GameCard = (props) => {
  const history = useHistory();
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "max-content",
          height: "max-content",
          margin: "20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            background: "rgb(254, 141, 27) none repeat scroll 0% 0%",
            width: "50px",
            height: "50px",
            bottom: "-8px",
            left: "-8px",
            "border-radius": "15px",
            "z-index": 0,
          }}
        ></div>
        <div className="gameCardWrapper">
          <img
            src="https://s1.gaming-cdn.com/images/products/1995/271x377/playerunknowns-battlegrounds-cover.jpg"
            className="gameImg"
          />
          <div className="gameName">
            <h3>Pubg Tournament</h3>|<span>Public</span>
          </div>

          <span className="gameDesc">
            This is description text for game Description This is description
            text for game Description This is description text for game
            Description This is description text for game Description
          </span>
          <div className="gameInfo">
            <span>By: Vikrant</span>|<span>44 Slots Left</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gameCardWrapper {
          display: flex;
          flex-direction: column;
          border: 0px solid;
          box-shadow: rgba(200, 200, 200, 0.63) 1px 1px 4px 1px;
          height: 330px;
          width: 250px;
          border-top-color: #fe8d1b;
          border-top-width: 8px;
          border-radius: 15px;
          position: relative;
          background: #ffffff;
          z-index: 2;
          padding: 10px;
          justify-content: space-between;
          cursor: pointer;
        }
        .gameImg {
          height: 140px;
        }
        .gameInfo,
        .gameName {
          display: flex;
          justify-content: space-around;
        }
        .gameDesc {
          height: 90px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default GameCard;
