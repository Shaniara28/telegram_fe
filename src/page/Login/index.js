import React, { useState } from 'react';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
// import style from './style.module.css'
import { useNavigate } from 'react-router-dom';
import google from './google.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import './auth.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const isDisabled = !(user.email && user.password);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await axios.post(process.env.REACT_APP_BACKEND_API + '/auth/login', user);
    const message = result.data.message;
    if (message == 'USERNAME OR PASSWORD WRONG') {
      return alert('username or password wrong');
    } else if (message == 'USER NOT REGISTERED') {
      alert('user not registered');
      setLoading(false);
      navigate('/register');
    } else {
      toast('test');
      localStorage.setItem('token', result.data.data.token);
      setLoading(false);
      navigate('/');
    }
  };
  return (
    <>
      <div className="container-fluid bg-light auth-container d-flex align-items-center">
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className="container d-flex justify-content-center">
          <div className="login bg-white p-5 auth-box my-3">
            <h5 className="text-center fw-bold auth-color-text mb-4">Login</h5>
            <p className="fw-semibold">Hi, welcome back!</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label className=" mt-3">Email</label>
              <div class="input-group mb-3 border-bottom border-dark">
                <input type="email" className="border-dark border-0 form-control" placeholder="telegram@mail.com" name="email" id="email" onChange={(e) => handleChange(e)} aria-describedby="button-addon2" />
              </div>
              <label className=" mt-2">Password</label>
              <div class="input-group mb-3 border-bottom border-dark">
                <input type="password" className="border-0 form-control" placeholder="Input your password here" aria-describedby="button-addon2" name="password" id="password" onChange={(e) => handleChange(e)} />
                <button class="btn border-0" type="button" id="button-addon2">
                  <i className="bi bi-eye-fill text-dark"></i>
                </button>
              </div>
              <p className="text-end auth-color-text mt-4">Forgot password?</p>
              <button className="w-100 auth-color text-white fw-semibold py-3 auth-button-radius border-0 mt-4">Login</button>
              {/* <p className="text-muted my-4 text-center">Login width</p> */}
              <div className="login-with d-flex justify-content-between my-4">
                <hr className="line" />
                <p className="text-muted text-center">Login with</p>
                <hr className="line" />
              </div>
              <button className="w-100 auth-color-white bg-white auth-color-text fw-semibold py-3 auth-button-radius mb-4">
                <i class="bi bi-google"></i> Google
              </button>
            </form>
            <p className="text-center">
              Don't have an account?{' '}
              <Link to={'/register'} className="text-decoration-none">
                <span className="auth-color-text fw-semibold">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
