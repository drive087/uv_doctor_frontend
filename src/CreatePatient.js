import React , { useState, useEffect } from 'react';
import './Dashboard.css';
import Container from '@material-ui/core/Container';
import FloatingLabelInput from 'react-floating-label-input';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import DatePicker from './DatePicker';
import doctor_icon from './img/doctor-icon.png';
import PatientModal from './PatientModal';
import './CreatePatient.css';
import CloseIcon from '@material-ui/icons/Close';



function CreatePatient(props) {

    const [doctor, setDoctor] = useState(props.location.state._id);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [birthDate,setbirthDate] = useState('');
    const [startDate, setStartDate] = useState('');    
    const [skin, setSkinType] = useState('');
    
    
    function onCreatePatient(){

      //let body = firstname,lastname,{birthDate},{startDate},{skinType};
      if(firstname.trim().length == 0 || lastname.trim().length == 0 || birthDate.trim().length == 0 || startDate.trim().length == 0 || skin.trim().length == 0){
        alert('Please Fill Empty')

      }
      else{
        axios.post('http://localhost:8080/patient/addpatient',{doctor,firstname,lastname,birthDate,startDate,skin},
      {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },  
      }).then(res=>{
        if(res.status === 201){
          props.history.push({
            pathname:'/Dashboard',
            state: { username: props.location.state.username,_id: props.location.state._id}
          });
        }
      })
      }

      
  
      // .catch(err=>{
      //   if(err.response.status === 400){
      //     // setStatus('*ชื่อผู้ใช้หรือรหัสผ่านผิด')
      //   }
      //   if(err.response.status === 422){
      //     let res = err.response.data
      //     if(res.errors.password){
      //       // setStatus('*กรุณากรอกรหัสผ่าน')
      //     }
      //     if(res.errors.username){
      //       // setStatus('*กรุณากรอกชื่อผู้ใช้')
      //     }
      //   }
      // })
    }

    function onClose(){
      props.history.push({
        pathname:'/Dashboard',
        state: { username: props.location.state.username,_id: props.location.state._id}
      });
    }
    
  
  return (
    <div className="container" >
        <CloseIcon onClick={()=>onClose()} style={{alignSelf:'flex-end', margin:'5px'}}/>
        <h1>Create Patient</h1>
        <div className="inputContainer">
            <div class="Row">
              <p class="Column">Firstname:</p>
              <TextField
              className="input"
              id="firstname"
              onChange={event =>setFirstName(event.target.value)}
            />
            </div>
            <div class="Row">
              <p class="Column">Lastname:</p>
              <TextField
              className="input"
              id="lastname"
              onChange={event =>setLastName(event.target.value)}
              />
            </div>
            <div class="Row">
            <p class="Column">Birth Date:</p>
            <DatePicker
              id='workDate'
              label="Select Birth Date"
              type='date'
              className="dateinput"
              onChange={event =>setbirthDate(event.target.value)}
            />
            </div>
            <div class="Row">
            <p class="Column">Start Date:</p>
            <DatePicker
              id='workDate'
              label="Select Start Date"
              type='date'
              className="dateinput"
              onChange={event =>setStartDate(event.target.value)}
            />
            </div>
            <div class="Row">
            <p class="Column">Skin Type:</p>
            <select class="Column" name="cars" id="cars" onChange={event =>setSkinType(event.target.value)}>
              <option value="none" selected disabled hidden>Please Select</option> 
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            </div>
        </div>
        <div className="CreateBtn" onClick={()=>onCreatePatient()}>
            <p>Create</p>
        </div>
    </div>

  );
}

export default withRouter(CreatePatient);
