import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { login, logout } from './store/slice/auth/auth';
import { instance, instanceAuth } from './utils/axios/axios';
import { allmessages } from './store/slice/messages/messages';
import { allofficers } from './store/slice/officers/officers';

function App() {

  const token = window.localStorage.getItem('token') || null

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const regSubmit = async (obj) => {
    try {
      await instance.post('auth/sign_up', obj)
      navigate('/auth/sign_in')
    } catch (e) {
      alert(e.response.data.message)
    }

  }

  const authSubmit = (obj) => {
    try {
      instance.post('auth/sign_in', obj)
        .then(response => {
          dispatch(login(response.data))
          window.localStorage.setItem('token', response.data.data.token)
        })
      navigate('/')
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('token')
    dispatch(logout({}))
    navigate('/')
  }

  useEffect(() => {
    if (token) {
      instanceAuth.get('auth').then(response => {
        dispatch(login(response.data))
      })
    }
  }, [])

  useEffect(() => {
    if(token) {
      instanceAuth.get('officers').then(response => dispatch(allofficers(response.data.officers)))
    }
  }, [])

  useEffect(() => {
    if(token) {
      instanceAuth.get('cases').then(response => dispatch(allmessages(response.data.data)))
    }
  }, [])

  const { user } = useSelector(state => state.auth)

  return (
    <div className="App">
      <Header logOut={logOut} />
      <Main regSubmit={regSubmit} authSubmit={authSubmit} user={user.data} />
      <Footer />
    </div>
  );
}

export default App;