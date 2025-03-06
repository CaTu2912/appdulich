import React, { useState } from "react";
import "../assets/css/login.css";
import SignInForm from "./signin";
import SignUpForm from "./signup";
import SImage from '../assets/img/S.jpg';
import SSImage from '../assets/img/VN.jpg';




export default function Login() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left"
              style={{ backgroundImage: `url(${SImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <h1>Chào mừng bạn đã đến với</h1>
              <p>
                Thế giới của những chuyến đi!!!!
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Đăng Nhập
              </button>
            </div>
            <div className="overlay-panel overlay-right"
            style={{ backgroundImage: `url(${SSImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <h1>Hãy đến đây và đăng ký</h1>
              <p>Để cùng nhau chia sẻ hành trình của bản thân nhé!!</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
