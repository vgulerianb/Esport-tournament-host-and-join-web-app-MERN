import React from "react";
import { useHistory } from "react-router-dom";

const NewsGameCard = (props) => {
  const history = useHistory();
  return (
    <>
      <div className="newsgameCardWrapper">
        <img
          src="https://s1.gaming-cdn.com/images/products/1995/271x377/playerunknowns-battlegrounds-cover.jpg"
          className="gameImg"
        />
        <div className="gameInfo">
          <div style={{ display: "flex", width: "100%" }}>
            <h3 style={{ flex: 3 }}>Pubg Tournament</h3>
            <span className="gameStatus">44 min Left</span>
          </div>
          <span className="gameDesc">
            This is description This is descriptionThis is description This is
            description This is description This is description This is
            description This is description This is description
          </span>
        </div>
      </div>
      <style jsx>{`
        .newsgameCardWrapper {
          display: flex;
          border: 0px solid;
          box-shadow: rgba(200, 200, 200, 0.63) 1px 1px 4px 1px;
          height: 110px;
          width: 364px;
          border-top-color: #fe8d1b;
          border-top-width: 8px;
          border-radius: 15px;
          background: #ffffff;
          z-index: 2;
          padding: 10px;
          cursor: pointer;
          margin: 10px;
        }
        .newsgameCardWrapper .gameImg {
          height: 65px;
          width: 65px;
          flex: 1;
          align-self: center;
        }
        .newsgameCardWrapper .gameInfo {
          display: flex;
          padding: 2px;
          flex-direction: column;
          flex: 3;
        }
        .newsgameCardWrapper .gameStatus {
          flex: 2;
          text-align: end;
        }
        .newsgameCardWrapper .gameDesc {
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default NewsGameCard;
