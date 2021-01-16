import React, { useState, useEffect } from "react";
import Layout from "../components/LayoutComps/Layout";
import axios from "axios";
import { G_API_URL, G_HOME_URL } from "../constants/constants";
import { check_login, showNotification } from "../utils/user.util";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

export default function VerifyAccount(props) {
  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    if (check_login()) {
      history.push(process.env.PUBLIC_URL);
    }
    let params = queryString.parse(props.location.search);
    verifyUser({
      username: params.u_name,
      v_code: params.vcode,
    });
  });

  const verifyUser = (values) => {
    axios
      .post(G_API_URL + "user/verify", values)
      .then((res) => {
        if (res.data.status) {
          showNotification("success", "Account Successfully Verified");
          window.location = G_HOME_URL + "login";
        } else showNotification("info", "Invalid or expired verification code");
      })
      .catch(() => {
        showNotification();
      });
  };

  return (
    <Layout>
      <div className="verification"></div>
      <style jsx>{``}</style>
    </Layout>
  );
}
