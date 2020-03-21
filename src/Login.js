import React , { useState } from 'react';
import './Login.css';
import FloatingLabelInput from 'react-floating-label-input';
// import axios from './axios.js';
import { withRouter } from 'react-router-dom';
// import moment from "moment";
import doctor_icon from './img/doctor-icon.png';
// import moon from './img/moon.svg';
// import sunRay from './img/sun_ray.svg';



function Login(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);

//   function login(username,password,history){
//     axios.post('/login',{
//       username: username,
//       password: password
//     }).then(res=>{
//       if(res.status === 200){
//         localStorage.setItem('token', res.data.user.token)
//         localStorage.setItem('startDate',moment(res.data.user.startDate,"YYYY-MM-DD"));
//         localStorage.setItem('maxEUV',res.data.user.maxEUV);
//         history.push({
//           pathname:'/calendar',
//           state: { username: username}
//         });
//       }
//     }).catch(err=>{
//       if(err.response.status === 400){
//         setStatus('*ชื่อผู้ใช้หรือรหัสผ่านผิด')
//       }
//       if(err.response.status === 422){
//         let res = err.response.data
//         if(res.errors.password){
//           setStatus('*กรุณากรอกรหัสผ่าน')
//         }
//         if(res.errors.username){
//           setStatus('*กรุณากรอกชื่อผู้ใช้')
//         }
//       }
//     })
//   }

  return (
    <div className="container" >
        <img 
        src={doctor_icon} 
        width="260x" 
        height="250px"
        />
      <div className="inputContainer">
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
      {/* onClick={()=>login(username,password,props.history)} */}
      <div className="LogButton" >
        <p>เข้าสู่ระบบ</p>
      </div>
    </div>
  );
}

export default withRouter(Login);
