import React , { useState } from 'react';
import './Login.css';
import FloatingLabelInput from 'react-floating-label-input';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import doctor_icon from './img/doctor-icon.png';
// import moon from './img/moon.svg';
// import sunRay from './img/sun_ray.svg';



function Login(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);

  function login(username,password,history){
    axios.post('http://localhost:8080/login',{
      username: username,
      password: password
    }).then(res=>{
      if(res.status === 200){
        console.log('success')
        localStorage.setItem('token', res.data.user.token)
        history.push({
          pathname:'/Dashboard',
          state: { username: username,_id: res.data.user._id}
        });
      }
    }).catch(err=>{
      if(err.response.status === 400){
        // setStatus('*ชื่อผู้ใช้หรือรหัสผ่านผิด')
      }
      if(err.response.status === 422){
        let res = err.response.data
        if(res.errors.password){
          // setStatus('*กรุณากรอกรหัสผ่าน')
        }
        if(res.errors.username){
          // setStatus('*กรุณากรอกชื่อผู้ใช้')
        }
      }
    })
  }

  return (
    <div className="container" >
        <img 
        src={doctor_icon} 
        width="260x" 
        height="250px"
        />
      <div className="inputContainer" style={{height:'200px'}}>
        <FloatingLabelInput
          label="ชื่อผู้ใช้"
          id="username"
          className="input"
          onChange={event =>setUser(event.target.value)}
          value={username}
        />
        <FloatingLabelInput
          label="รหัสผ่าน"
          id="password"
          className="input"
          onChange={event =>setPass(event.target.value)}
          type="password"
          value={password}
        />
      </div>
      <div className="LogButton" onClick={()=>login(username,password,props.history)}>
        <p>เข้าสู่ระบบ</p>
      </div>
    </div>
  );
}

export default withRouter(Login);
