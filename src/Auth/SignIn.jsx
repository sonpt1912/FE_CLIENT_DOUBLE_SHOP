import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import User from "../API/User";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { changeCount } from "../Redux/Action/ActionCount";
import { Button, Form, Input } from "antd";
import "./Signin.css";

function SignIn(props) {
  const dispatch = useDispatch();

  const [username, set_username] = useState("");
  const [password, set_password] = useState("");

  const [error_username, set_error_username] = useState(false);
  const [error_password, set_error_password] = useState(false);

  const [redirect, set_redirect] = useState(false);

  // Get carts từ redux khi user chưa đăng nhập
  const carts = useSelector((state) => state.Cart.listCart);

  // Get isLoad từ redux để load lại phần header
  const count_change = useSelector((state) => state.Count.isLoad);

  const handler_signin = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      const params = {
        username,
        password,
      };

      try {
        const response = await User.Get_Detail_User(params);
        console.log("Response: ", response);

        if (response.message === "Khong Tìm Thấy User") {
          set_error_username(true);
        } else if (response.message === "Sai Mat Khau") {
          set_error_username(false);
          set_error_password(true);
        } else {
          console.log(response.data);
          localStorage.setItem("token", response.data.access_token);

          const action_count_change = changeCount(count_change);
          dispatch(action_count_change);

          set_redirect(true);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  };

  return (
    <GoogleOAuthProvider clientId="371453517569-sdlqpnul2t1iihsrk3u2apb6qvik0cvh.apps.googleusercontent.com">
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img
              src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
              alt="Login"
            />
          </div>
          <Form
            id="login-form"
            name="login-form"
            onFinish={handler_signin}
            //   onFinishFailed={onFinishFailed}
          >
            <p className="form-title">Welcome back</p>
            <p></p>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản!" },
              ]}
            >
              <Input
                value={username}
                placeholder="Username"
                onChange={(e) => set_username(e.target.value)}
              />
              {error_username && (
                <span style={{ color: "red" }}>* Wrong Username!</span>
              )}
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => set_password(e.target.value)}
              />
              {error_password && (
                <span style={{ color: "red" }}>* Wrong Password!</span>
              )}
            </Form.Item>

            <Form.Item>
              <GoogleLogin
                //   onSuccess={onSuccessGoogle}
                //   onFailure={onFailureGoogle}
                shape="square"
                useOneTap="true"
              />
            </Form.Item>
            <hr className="hr-login" />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handler_signin}
              >
                LOGIN
              </Button>
              {redirect && <Redirect to="/" />}
            </Form.Item>
            <div className="rigisterAndForget">
            <div className="check-box d-inline-block ml-0 ml-md-2 ">
              {" "}
              <Link to="/signup">Do You Have Account?</Link>
            </div>

            <div className=" text-left text-md-right">
            <Link to="/forgetpassword"> Forgotten password?</Link>
            </div>
            </div>
           
          </Form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignIn;
