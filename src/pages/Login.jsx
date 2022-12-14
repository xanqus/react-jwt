import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { authenticatedState } from './recoil/store'

const Login = ({ to }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [setAuthenticated] = useSetRecoilState(authenticatedState)
  const onChangeIdInput = e => {
    setUserId(e.target.value)
  }
  const onChnagePasswordInput = e => {
    setUserPassword(e.target.value)
  }

  const doLogin = async e => {
    e.preventDefault()
    try {
      const data = await axios({
        method: 'post',
        url: 'http://localhost:8287/login',
        data: {
          username: userId,
          password: userPassword,
        },
      })

      if (data.headers.authorization) {
        setAuthenticated(true)
        localStorage.setItem('login-token', data.headers.authorization)
        if (location.pathname === '/login') return navigate('/')
      }
    } catch (e) {
      console.log(e)
      alert('로그인 실패')
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={doLogin}>
        <input
          type="text"
          placeholder="ID"
          value={userId}
          onChange={onChangeIdInput}
        />
        <input
          type="text"
          placeholder="PASSWORD"
          value={userPassword}
          onChange={onChnagePasswordInput}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}

export default Login
