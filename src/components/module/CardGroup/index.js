import React from 'react';
import style from './style.module.css';
import calvin from './calvin.jpg';
import { useRef } from 'react';

const CardGroup = ({ onClick, ...props }) => {
  const thisRef = useRef(null);
  return (
    <div className={style.card} onClick={onClick}>
      <img
        src={calvin}
        alt=""
        style={{
          borderRadius: '100%',
        }}
      />
      <div className={style.middle}>
        <div className={style.name}>
          <h6>{'Group'}</h6>
        </div>
        <div className={style.message}>
          <p className="text-muted">{'LastMessage'}</p>
        </div>
      </div>
      <div className={style.last}>
        <div className={style.lastime}>
          <span className="text-muted">{'LastTime'}</span>
        </div>
        {/* <div className={style.notification}>
          <span>2</span>
        </div> */}
      </div>
    </div>
  );
};

export default CardGroup;
