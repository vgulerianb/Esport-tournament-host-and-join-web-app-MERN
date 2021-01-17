import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import { Form, Input, Button, Alert } from "antd";
import axios from "axios";
import { G_API_URL } from "../constants/constants";
import { check_login, login_user, showNotification } from "../utils/user.util";
import { useHistory } from "react-router-dom";

export default function SignIn(props) {
  const [loggingIn, setLoggingIn] = useState(false);
  const [tfaLogin, setTfaLogin] = useState(false);
  const [tfaId, setTfaId] = useState("");
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

  const loginUser = (values, mode = 1) => {
    setLoggingIn(true);
    let apiUrl = G_API_URL + "user/login";
    if (mode === 2) {
      values["auth_id"] = tfaId;
      apiUrl = G_API_URL + "user/tfa-login";
    }

    axios
      .post(apiUrl, values)
      .then((res) => {
        setLoggingIn(false);
        if (res.data.status && !res.data?.data?.auth_id) {
          showNotification("success", "You are logged in successfully");
          login_user(res.data.data);
          history.push(process.env.PUBLIC_URL);
        } else if (res.data?.data?.auth_id) {
          setTfaLogin(true);
          setTfaId(res.data?.data?.auth_id);
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
            {!tfaLogin ? (
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={(e) => loginUser(e, 1)}
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
            ) : (
              <>
                <Alert
                  message="PLease enter your 2fa code,  you can use forget password option to reset your 2fa."
                  type="warning"
                />
                <div style={{ margin: "30px" }} />
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={(e) => loginUser(e, 2)}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="code"
                    rules={[
                      {
                        required: true,
                        message: "Please input your 2fa code!",
                      },
                    ]}
                  >
                    <Input placeholder="2fa code" />
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
                        history.push(
                          process.env.PUBLIC_URL + "/forget-password"
                        );
                      }}
                      className="primaryColor"
                    >
                      Forgot Password?
                    </a>
                  </Form.Item>
                </Form>
              </>
            )}
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
