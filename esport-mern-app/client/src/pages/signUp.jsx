import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { G_API_URL } from "../constants/constants";
import { check_login, login_user, showNotification } from "../utils/user.util";

export default function SignUp(props) {
  const history = useHistory();
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (check_login()) {
      history.push(process.env.PUBLIC_URL);
    }
  });

  const regiterUser = (values) => {
    setLoggingIn(true);
    axios
      .post(G_API_URL + "user/signup", values)
      .then((res) => {
        setLoggingIn(false);
        if (res.data.status) {
          showNotification(
            "success",
            "Account created successfully, please check your mail to verify your account"
          );
          history.push(process.env.PUBLIC_URL + "/login");
        } else showNotification("info", "Account not found");
      })
      .catch(() => {
        setLoggingIn(false);
        showNotification();
      });
  };

  return (
    <Layout>
      <div className="signUpWrapper">
        <div
          style={{
            position: "relative",
          }}
        >
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
            <h2 style={{ "text-align": "center" }}>Register</h2>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={regiterUser}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
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
                  Register
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
          .signUpWrapper {
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
