import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { G_API_URL } from "../constants/constants";
import { check_login, login_user, showNotification } from "../utils/user.util";
import { useHistory } from "react-router-dom";

export default function SignIn(props) {
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

  const loginUser = (values) => {
    setLoggingIn(true);
    axios
      .post(G_API_URL + "user/login", values)
      .then((res) => {
        setLoggingIn(false);
        if (res.data.status) {
          showNotification("success", "You are logged in successfully");
          login_user(res.data.data);
          history.push(process.env.PUBLIC_URL);
        } else
          showNotification(
            "info",
            res?.data?.message ??
              "Account not found, please check your username or password"
          );
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
      <div className="signInWrapper">
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
            <h2 style={{ "text-align": "center" }}>Log In</h2>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={loginUser}
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

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="primaryBtn-2"
                  style={{ width: "100%" }}
                  htmlType="submit"
                  loading={loggingIn}
                >
                  Log In
                </Button>
                <br />
                <a
                  onClick={() => {
                    history.push(process.env.PUBLIC_URL + "/forget-password");
                  }}
                  className="primaryColor"
                >
                  Forgot Password?
                </a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .signInWrapper {
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
