import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import { Form, Input, Button, Modal } from "antd";
import axios from "axios";
import { G_API_URL } from "../constants/constants";
import { check_login, getToken, showNotification } from "../utils/user.util";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

export default function EnableTfa(props) {
  const [loggingIn, setLoggingIn] = useState(false);
  const [tfaModalVisible, setTfaModalVisible] = useState(false);
  const [tfaQr, setTfaQr] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!check_login()) {
      history.replace("/login");
    }
  });

  const enableTfaInit = () => {
    axios
      .put(
        G_API_URL + "user/tfa",
        {},
        {
          headers: {
            Authorization: getToken(),
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setTfaQr(res.data.img);
          setTfaModalVisible(true);
        }
      })
      .catch(() => {});
  };

  const validateTfa = (val) => {
    axios
      .put(G_API_URL + "user/verify-tfa", val, {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setTfaModalVisible(false);
          setTfaQr(false);
          showNotification("success", "2fa enabled successfully");
        } else showNotification("info", res.data.message);
      });
  };

  return (
    <Layout>
      <Modal
        title="Enable 2fa"
        visible={tfaModalVisible}
        onCancel={() => {
          setTfaModalVisible(false);
          setTfaQr("");
        }}
        footer={null}
      >
        <Form
          name="tfaForm"
          initialValues={{
            remember: true,
          }}
          onFinish={validateTfa}
          style={{
            "text-align": "center",
          }}
        >
          <img src={tfaQr} height={150} width={150}></img>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "2fa code is required",
              },
            ]}
          >
            <Input style={{ width: 170 }} placeholder="Input 2fa code" />
          </Form.Item>

          <Button htmlType="submit">Verify & Setup 2fa</Button>
        </Form>
      </Modal>
      <div className="tfaWrapper">
        <div style={{ position: "relative" }}>
          <Button loading={loggingIn} onClick={enableTfaInit}>
            Enable 2fa
          </Button>
        </div>
      </div>
      <style jsx>
        {`
          .tfaWrapper {
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </Layout>
  );
}
