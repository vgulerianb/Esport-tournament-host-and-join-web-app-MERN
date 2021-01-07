import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { G_API_URL } from "../constants/constants";
import { check_login, getToken, showNotification } from "../utils/user.util";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

export default function ResetPassword(props) {
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

  const ChangePass = (values) => {
    setLoggingIn(true);
    let params = queryString.parse(props.location.search);
    axios
      .post(
        G_API_URL + "user/reset-password",
        { ...values, ...{ r_code: params.r_code } },
        {
          headers: {
            Authorization: getToken(),
          },
        }
      )
      .then((res) => {
        setLoggingIn(false);
        if (res.data.status) {
          showNotification("success", "Password Changed Successfully");
          history.replace("/login");
        } else
          showNotification(
            "info",
            res?.data?.message ?? "Unable to reset password"
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
      <div className="resetPassWrapper">
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
              initialValues={{
                remember: true,
              }}
              onFinish={ChangePass}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  { min: 5, message: "Username must be minimum 5 characters." },
                ]}
              >
                <Input.Password min={5} placeholder="New Password" />
              </Form.Item>

              <Form.Item
                name="confirm_password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm New Password" />
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
                    history.replace("/login");
                  }}
                  className="primaryColor"
                >
                  Go back to login
                </a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .resetPassWrapper {
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
