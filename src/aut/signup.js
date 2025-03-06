import React from "react";
import { auth, googleProvider, facebookProvider, signInWithPopup } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaFacebookF, FaGoogle } from "react-icons/fa";


function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
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

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { name, email, password } = state;
    alert(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    );

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
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
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>đăng kí</h1>
       <div className="social-container">
            <button type="button" onClick={signInWithFacebook} className="social facebook-btn">
            <FaFacebookF /> 
            </button>
            <button type="button" onClick={signInWithGoogle} className="social google-btn">
            <FaGoogle /> 
            </button>
        </div>
        <span>Hoặc </span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Đăng kí</button>
      </form>
    </div>
  );
}

export default SignUpForm;
