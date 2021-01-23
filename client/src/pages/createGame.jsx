import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import { Form, Input, Button, Upload, DatePicker, Switch } from "antd";
import axios from "axios";
import { G_API_URL } from "../constants/constants";
import { check_login, getToken, showNotification } from "../utils/user.util";
import { useHistory } from "react-router-dom";
import imageFileToBase64 from "image-file-to-base64-exif";

export default function CreateGame(props) {
  const [loggingIn, setLoggingIn] = useState(false);
  const [fileList, setFileList] = useState([]);
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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onGameCreateInit = (values) => {
    if (values?.game_image?.file) {
      imageFileToBase64(values?.game_image?.file).then(function(base64) {
        values.game_image = base64;
      });
    }
    console.log(values);
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <Layout>
      <div className="createGameWrapper">
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
            <h2 style={{ "text-align": "center" }}>Create Game</h2>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onGameCreateInit}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="game_name"
                rules={[
                  {
                    required: true,
                    message: "Game name is required",
                  },
                ]}
              >
                <Input placeholder="Game Name" />
              </Form.Item>

              <Form.Item
                name="game_description"
                rules={[
                  {
                    required: true,
                    message: "Game description is required",
                  },
                ]}
              >
                <Input.TextArea rows={5} placeholder="Game description" />
              </Form.Item>
              <Form.Item
                name="game_time"
                rules={[
                  {
                    required: true,
                    message: "Game start & end time is required",
                  },
                ]}
              >
                <DatePicker.RangePicker
                  placeholder={["Game Start Time", "Game End Time"]}
                  showTime
                />
              </Form.Item>
              <Form.Item
                name="game_user_limit"
                rules={[
                  {
                    required: true,
                    message: "Game registeration limit is required",
                  },
                ]}
              >
                <Input placeholder="Registeration Limit" />
              </Form.Item>

              <Form.Item name="game_image">
                <Upload {...uploadProps}>
                  <Button>Select Game Image</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Game Type">
                <Switch
                  onChange={() => {}}
                  checkedChildren="Private game"
                  unCheckedChildren="Public Game"
                />
              </Form.Item>

              <Form.Item
                name="game_join_info"
                rules={[
                  {
                    required: true,
                    message: "Game join info is required",
                  },
                ]}
              >
                <Input.TextArea rows={5} placeholder="Join information" />
              </Form.Item>
              <Form.Item
                label="Join code will be available to users 1 hr before the game"
                name="game_join_code"
                rules={[
                  {
                    required: false,
                    message: "Game description is required",
                  },
                ]}
              >
                <Input placeholder="Join code" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="primaryBtn-2"
                  style={{ width: "100%" }}
                  htmlType="submit"
                  loading={loggingIn}
                >
                  Create Game
                </Button>
                <br />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .createGameWrapper {
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
