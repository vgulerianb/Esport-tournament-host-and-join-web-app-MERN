import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { G_API_URL } from "../constants/constants";
import { check_login, getToken, showNotification } from "../utils/user.util";
import { useHistory } from "react-router-dom";

export default function ChangePassword(props) {
  const [loggingIn, setLoggingIn] = useState(false);
  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    if (!check_login()) {
      history.push(process.env.PUBLIC_URL + "login");
    }
  });

  const ChangePass = (values) => {
    setLoggingIn(true);
    axios
      .post(G_API_URL + "user/change-password", values, {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        setLoggingIn(false);
        if (res.data.status) {
          showNotification("success", "Password Changed Successfully");
          history.push(process.env.PUBLIC_URL);
        } else
          showNotification(
            "info",
            res?.data?.message ?? "Unable to change password"
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
      <div className="changePassWrapper">
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
            <h2 style={{ "text-align": "center" }}>Change Password</h2>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={ChangePass}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="old_pass"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
              >
                <Input.Password placeholder="Olp Password" />
              </Form.Item>

              <Form.Item
                name="new_pass"
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
                dependencies={["new_pass"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("new_pass") === value) {
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
                  Update Password
                </Button>
                <br />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .changePassWrapper {
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
