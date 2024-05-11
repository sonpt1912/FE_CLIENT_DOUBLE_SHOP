import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import User from "../API/User";
import { useDispatch, useSelector } from "react-redux";
import { changeCount } from "../Redux/Action/ActionCount";
import { Button, Form, Input, message } from "antd";
import "./Signin.css";

function ForgetPassword(props) {
  const dispatch = useDispatch();
  const [checkEmail, setCheckEmail] = useState(false);
  const [otp, set_otp] = useState("");
  const [password, set_password] = useState("");
  const [confirmPassword, set_confirm_password] = useState("");

  const [email, setEmail] = useState("");

  const [error_otp, set_error_otp] = useState(false);
  const [error_email, set_error_email] = useState(false);
  const [error_password, set_error_password] = useState(false);
  const [error_confirm_password, set_error_confirm_password] = useState(false);

  const [redirect, set_redirect] = useState(false);

  // Get carts từ redux khi user chưa đăng nhập
  const carts = useSelector((state) => state.Cart.listCart);

  // Get isLoad từ redux để load lại phần header
  const count_change = useSelector((state) => state.Count.isLoad);

  const handler_check_email = (e) => {
    e.preventDefault();

    const GetCheckEmailUser = async () => {
      const params = {
        email,
      };

      try {
        const response = await User.Get_Check_Email_User(params);
        console.log("Check email", response);

        if (response === "Authentication failed") {
          message.error("Gửi mail thất bại! Vui lòng thử lại")
        } else {
          const action_count_change = changeCount(count_change);
          setTimeout(() => {
            setCheckEmail(true);
          }, 1000);
          dispatch(action_count_change);
        }
      } catch (error) {
        message.error("Vui lòng kiểm tra lại thông tin email!")
        console.error("Error: ", error);
      }
    };

    GetCheckEmailUser();
  };

  const handler_confirm_email = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      set_error_confirm_password(true);
      message.error("Mật khẩu không trùng khớp! Hãy thử lại");
      return;
    }

    const GetConfirmEmailUser = async () => {
      const params = {
        email,
        password,
        otp,
      };

      try {
        const response = await User.Forgot_Password_User(params);
        console.log("Response cf", response);

        if (response.message === "otp khong chinh xac") {
          message.error("Đã xảy ra lỗi! Vui lòng kiểm tra lại OTP");
        } else {
          const action_count_change = changeCount(count_change);
          message.success("Đổi mật khẩu thành công!");
          set_redirect(true)
          dispatch(action_count_change);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    GetConfirmEmailUser();
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        {!checkEmail && (
          <Form id="login-form" name="login-form">
            <p className="form-title">Quên Mật Khẩu</p>
            <p></p>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {error_email && (
                <span style={{ color: "red" }}>* Wrong Email!</span>
              )}
            </Form.Item>

            <hr className="hr-login" />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handler_check_email}
              >
                Send Email
              </Button>
              {redirect && <Redirect to="/" />}
            </Form.Item>
            <div className="rigisterAndForget">
              <div className="check-box d-inline-block ml-0 ml-md-2 ">
                {" "}
                <Link to="/signin">Quay lại....</Link>
              </div>
            </div>
          </Form>
        )}
        {checkEmail && (
          <>
            <Form id="login-form" name="login-form">
              <p className="form-title">Xác Nhận Mật Khẩu</p>
              <p></p>
              <Form.Item
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

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu" },
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => set_confirm_password(e.target.value)}
                />
                {error_password && (
                  <span style={{ color: "red" }}>
                    * Wrong Confirm Password!
                  </span>
                )}
              </Form.Item>

              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tài khoản!" },
                ]}
              >
                <Input
                  value={otp}
                  placeholder="Otp"
                  onChange={(e) => set_otp(e.target.value)}
                />
                {error_otp && (
                  <span style={{ color: "red" }}>* Wrong Otp!</span>
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={handler_confirm_email}
                >
                  Xác Nhận
                </Button>
                {redirect && <Redirect to="/signin" />}
              </Form.Item>

              <div className="rigisterAndForget">
                <div className="check-box d-inline-block ml-0 ml-md-2 ">
                  <Link to="/signin">Quay lại....</Link>
                </div>
                <div className=" text-left text-md-right">
                  <Link
                    onClick={() => {
                      setCheckEmail(false);
                    }}
                  >
                    Bạn chưa nhận được mã ?
                  </Link>
                </div>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
