import React, { useEffect, useState } from 'react';
import Card from '../components/module/Card';
import ChatSpace from '../components/module/ChatSpace';
import SearchBar from '../components/module/SearchBar';
import Title from '../components/module/Title';
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../configs/redux/actions/userAction';
import io from 'socket.io-client';
import Profile from '../components/module/Profile';
import axios from 'axios';
import ModalEdit from '../components/module/ModalEdit';
import ChatSpaceGroup from '../components/module/ChatSpaceGroup';
import CardGroup from '../components/module/CardGroup';

const Home = () => {
  const { userOnline } = useSelector((state) => state);
  const [updating, setUpdating] = useState(0);
  const token = localStorage.getItem('token');
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const [receiver_id, setReceiver_id] = useState('');
  const [socket, setSocket] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [room, setRoom] = useState(undefined);
  console.log(room);

  const [me, setMe] = useState({});

  const fetchMe = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const result = await axios.get(process.env.REACT_APP_BACKEND_API + '/profile/', config);
      setMe(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(userAction(token));
    const result = io(process.env.REACT_APP_BACKEND_API, {
      query: {
        token: token,
      },
    });
    setSocket(result);
    fetchMe(token);
  }, [updating]);

  useEffect(() => {
    if (socket) {
      console.log('ada socket masuk');
      console.log(me);
      if (me) {
        socket.emit('present', me.id);
      }
      socket.on('online', (data) => {
        console.log('reaching user online');
        dispatch({ type: 'UPDATE_ONLINE', payload: data });
      });
    }
  }, [socket, me]);

  const handleProfile = () => {
    setShowProfile((current) => !current);
  };

  const { user } = useSelector((state) => state);

  const handleSearch = (search) => {
    console.log(search);
    dispatch(userAction(token, search));
  };

  return (
    <div className={style.main}>
      {modalEdit ? <ModalEdit setEditModal={setModalEdit} setUpdating={setUpdating} token={token} data={me} /> : ''}
      <section className={style.sidebar}>
        <Title callback={handleProfile} />
        {showProfile ? <Profile socket={socket} data={me} setEditModal={setModalEdit} /> : ''}
        <SearchBar handleSearch={(data) => handleSearch(data)} />
        <div className="d-md-flex justify-content-around py-2 d-none">
          <button className={`py-2 px-3 ${style.btnChatList}`}>All</button>
          <button className={`py-2 px-3 ${style.btnChatList}`}>Important</button>
          <button className={`py-2 px-3 ${style.btnChatList}`}>Unread</button>
        </div>
        <div className={style.chatlist}>
          {user ? (
            user.map((data) => <Card name={data.fullname} selected={data.id === receiver_id} photo={data.photo} key={data.id} lastTime={data.lastTime} lastMessage={data.lastMessage} onClick={() => setReceiver_id(data.id)} />)
          ) : (
            <div>No User</div>
          )}

          {/* <CardGroup onClick={() => setRoom('Group')} /> */}
        </div>
      </section>
      <section className={style.mainchat}>
        <ChatSpace receiver_id={receiver_id} socket={socket} />
        {/* {room === undefined ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <p>Click to start chat</p>
          </div>
        ) : (
          <ChatSpaceGroup room={room} socket={socket} me={me?.fullname} />
        )} */}
      </section>
    </div>
  );
};

export default Home;
