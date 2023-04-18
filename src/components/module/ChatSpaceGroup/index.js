import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import logout from './logout.png';
import calvin from './calvin.jpg';
import axios from 'axios';
import { useRef } from 'react';
import { userAction } from '../../../configs/redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';

const ChatSpaceGroup = ({ socket, room, me }) => {
  const [username, setUsername] = useState();
  const [group, setGroup] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');
  console.log(me);

  useEffect(() => {
    socket.emit('join-room', { room: room, username: me });
    setUsername(me);
    setGroup(room);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off('newMessage');
      socket.on('newMessage', (data) => {
        setMessages((current) => [...current, data]);
      });
      socket.on('notifAdmin', (data) => {
        setMessages((current) => [...current, data]);
      });
    }
  }, [socket]);

  const handleSendMessage = () => {
    let dataMessage = {
      sender: username,
      body: message,
      room: group,
    };
    console.log(dataMessage);
    socket.emit('messageRoom', dataMessage);
    setMessage('');
  };

  console.log(messages);

  return (
    <div className="d-flex flex-row">
      <div className={style.chatspace}>
        <div className={style.headchat}>
          <img
            src={calvin}
            alt=""
            id="photo"
            style={{
              borderRadius: '100%',
            }}
          />
          <h5>{'Group'}</h5>
        </div>
        <div className={style.bodychat}>
          {messages
            ? messages.map((data) => {
                return (
                  <div id="message" key={data.id} className={data.sender !== me ? style.left : style.right}>
                    <p className="m-0" style={{ fontSize: '12px', fontWeight: 'bolder', color: 'black' }}>
                      {data?.sender}
                    </p>
                    {data.body}
                    <span
                      style={{
                        position: 'relative',
                        fontSize: '9px',
                        display: 'block',
                        textAlign: data.sender !== me ? 'left' : 'right',
                      }}
                    >
                      {data.date}
                    </span>
                  </div>
                );
              })
            : ''}
          <div
            // ref={bottomRef}
            style={{
              visibility: 'hidden',
            }}
          />
        </div>
        <div className={style.chatinput}>
          <input type="text" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={() => handleSendMessage()}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatSpaceGroup;
