import React, { useState } from "react"; // ✅ Thêm useState vào import
import { auth, googleProvider, facebookProvider, signInWithPopup } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaFacebookF, FaGoogle } from "react-icons/fa";


function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, state.email, state.password);
      alert(`Logged in as ${userCredential.user.email}`);

      // ✅ Reset state sau khi đăng nhập thành công
      setState({ email: "", password: "" });

    } catch (error) {
      console.error("Email/Password Sign-in Error:", error);
      alert(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Login Success:", result.user);
      alert(`Logged in as ${result.user.displayName}`);
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook Login Success:", result.user);
      alert(`Logged in as ${result.user.displayName}`);
    } catch (error) {
      console.error("Facebook Sign-in Error:", error);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Đăng nhập</h1>
        <div className="social-container">
          <button type="button" onClick={signInWithFacebook} className="social facebook-btn">
          <FaFacebookF /> 
          </button>
          <button type="button" onClick={signInWithGoogle} className="social google-btn">
          <FaGoogle /> 
          </button>
        </div>
        <span>Hoặc đăng nhập bằng</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
