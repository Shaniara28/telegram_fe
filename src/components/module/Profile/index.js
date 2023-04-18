import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import calvin from './calvin.jpg';
import Button from '../../base/Button';

const Profile = ({ data, setEditModal, socket }) => {
  return (
    <div className={style.profile}>
      <img
        src={data?.photo || calvin}
        alt=""
        style={{
          borderRadius: '25px',
        }}
      />
      {/* <img src={logout} alt="" className={style.logout} onClick={handleLogout} /> */}
      <h5 className="my-0 mt-2 fs-1 fw-bold">{data.fullname}</h5>
      <p className="mx-0 my-0 py-0 text-muted fs-5">{data.email}</p>
      <Button
        title="Edit Profile"
        style={{
          width: '50%',
          margin: '5px auto',
        }}
        onClick={() => setEditModal((current) => !current)}
      />
    </div>
  );
};

export default Profile;
