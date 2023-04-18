import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
// import style from './style.module.css'
import google from './google.svg';
import axios from 'axios';
import '../Login/auth.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const isDisabled = !(user.email && user.password && user.fullname);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const result = await axios.post(process.env.REACT_APP_BACKEND_API + '/auth/register', user);
    console.log(result.data);
    if (result.data.message === 'REGISTER SUCCESS') {
      alert('success');
      navigate('/login');
    } else {
      alert('register failed');
    }
  };
  return (
    <>
      <div className="container-fluid bg-light auth-container d-flex align-items-center">
        <div className="container d-flex justify-content-center">
          <div className="register bg-white p-5 auth-box my-3">
            <div className="title row">
              <div className="col-1">
                <Link to={'/login'}>
                  <i className="bi bi-chevron-left auth-color-text"></i>
                </Link>
              </div>
              <div className="col-10">
                <h5 className="text-center fw-bold auth-color-text mb-4">Register</h5>
              </div>
            </div>

            <p className="fw-semibold">Let’s create your account!</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label className=" mt-3">Name</label>
              <div class="input-group mb-3 border-bottom border-dark">
                <input type="text" className="border-dark border-0 form-control" placeholder="Input username" aria-describedby="button-addon2" name="fullname" id="fullname" onChange={(e) => handleChange(e)} />
              </div>
              <label className=" mt-3">Email</label>
              <div class="input-group mb-3 border-bottom border-dark">
                <input type="email" className="border-dark border-0 form-control" placeholder="telegram@mail.com" aria-describedby="button-addon2" name="email" id="email" onChange={(e) => handleChange(e)} />
              </div>
              <label className=" mt-2">Password</label>
              <div class="input-group mb-3 border-bottom border-dark">
                <input type="password" className="border-0 form-control" placeholder="Input your password here" aria-describedby="button-addon2" name="password" id="password" onChange={(e) => handleChange(e)} />
                <button class="btn border-0" type="button" id="button-addon2">
                  <i className="bi bi-eye-fill text-dark"></i>
                </button>
              </div>
              <p className="text-end auth-color-text mt-4">Forgot password?</p>
              <button className="w-100 auth-color text-white fw-semibold py-3 auth-button-radius border-0 mt-4">Register</button>
              {/* <p className="text-muted my-4 text-center">Login width</p> */}
              <div className="login-with d-flex justify-content-between my-4">
                <hr className="line" />
                <p className="text-muted text-center">Register with</p>
                <hr className="line" />
              </div>
              <button className="w-100 auth-color-white bg-white auth-color-text fw-semibold py-3 auth-button-radius mb-4">
                <i class="bi bi-google"></i> Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
