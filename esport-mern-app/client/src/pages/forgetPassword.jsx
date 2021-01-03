import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { G_API_URL } from "../constants/constants";
import { check_login, login_user, showNotification } from "../utils/user.util";
import { useHistory } from "react-router-dom";

export default function ForgetPassword(props) {
  const [loggingIn, setLoggingIn] = useState(false);
  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    if (check_login()) {
      history.push(process.env.PUBLIC_URL);
    }
  });

  const restorePassword = (values) => {
    setLoggingIn(true);
    axios
      .post(G_API_URL + "user/forget-password", values)
      .then((res) => {
        setLoggingIn(false);
        if (res.data.status) {
          showNotification("success", "Password reset link sent successfully");
          history.push(process.env.PUBLIC_URL + "/login");
        } else showNotification("info", "Account not found");
      })
      .catch(() => {
        setLoggingIn(false);
        showNotification();
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <div className="forgetPasswordWrapper">
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
            <h2 style={{ "text-align": "center" }}>Reset Password</h2>
            <Form
              name="basic"
              onFinish={restorePassword}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="primaryBtn-2"
                  style={{ width: "100%" }}
                  htmlType="submit"
                  loading={loggingIn}
                >
                  Reset Password
                </Button>
                <br />
                <a
                  onClick={() => {
                    history.push(process.env.PUBLIC_URL + "/login");
                  }}
                  className="primaryColor"
                >
                  Return to Login
                </a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .forgetPasswordWrapper {
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
          }
        `}
      </style>
    </Layout>
  );
}
