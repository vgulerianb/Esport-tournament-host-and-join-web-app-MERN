import React from "react";
import { useHistory } from "react-router-dom";
import { check_login, showNotification } from "../../utils/user.util";

const GameCard = (props) => {
  const history = useHistory();
  const handleGameCardClick = () => {
    if (!check_login()) {
      showNotification("info", "You need to login to join a game");
      history.push(process.env.PUBLIC_URL + "login");
    } else showNotification("info", "Oops unable to join game");
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "max-content",
          height: "max-content",
          margin: "20px",
        }}
        onClick={handleGameCardClick}
      >
        <div className="bottomBox"></div>
        <div className="gameCardWrapper">
          <img src={props.image} className="gameImg" />
          <div className="gameName">
            <h3>{props.name}</h3>|<span>Public</span>
          </div>

          <span className="gameDesc">{props.description}</span>
          <div className="gameInfo">
            <span>By: {props.author}</span>|
            <span>{props.slots ?? 100} Slots Left</span>
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
        .bottomBox {
          position: absolute;
          background: rgb(254, 141, 27) none repeat scroll 0% 0%;
          width: 50px;
          height: 50px;
          bottom: -8px;
          left: -8px;
          border-radius: 15px;
          z-index: 0;
        }
      `}</style>
    </>
  );
};

export default GameCard;
