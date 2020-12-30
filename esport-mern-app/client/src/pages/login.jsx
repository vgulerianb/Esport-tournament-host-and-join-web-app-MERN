import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import { Form, Input, Button } from "antd";

export default function SignIn(props) {
  const [showErrorMsg, setErrorMsg] = useState("");
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    console.log("hello");
  });

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
              onFinish={() => {}}
              onFinishFailed={null}
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
                >
                  Submit
                </Button>
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
