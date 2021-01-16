import React from "react";
import Layout from "../components/LayoutComps/Layout";
import { Button } from "antd";
import notfound from "../assets/imgs/404.png";
import { useHistory } from "react-router-dom";

export default function NotFound(props) {
  const history = useHistory();

  return (
    <Layout>
      <div className="notFoundWrapper">
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              background: "rgb(254, 141, 27) none repeat scroll 0% 0%",
              width: "191px",
              height: "191px",
              top: "30px",
              left: "-12px",
              "border-radius": "15px",
              "z-index": 0,
            }}
          ></div>
          <div className="formHolder">
            <img
              src={notfound}
              height={300}
              width={300}
              style={{ "align-self": "center" }}
            />
            <Button
              type="primary"
              className="primaryBtn-2"
              style={{ width: "100%" }}
              onClick={() => {
                history.replace("/");
              }}
            >
              Go to home page.
            </Button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .notFoundWrapper {
            display: flex;
            justify-content: center;
          }
          .formHolder {
            position: relative;
            width: 500px;
            background: #ffffff;
            padding: 100px 50px;
            box-shadow: rgba(200, 200, 200, 0.63) 2px 2px 7px 2px;
            margin-top: 40px;
            border-radius: 15px;
            z-index: 0;
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </Layout>
  );
}
