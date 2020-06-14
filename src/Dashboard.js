import React , { useState, useEffect } from 'react';
import './Dashboard.css';
import FloatingLabelInput from 'react-floating-label-input';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import doctor_icon from './img/doctor-icon.png';
import PatientModal from './PatientModal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


function Dashboard(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);
  const [patients, setPatient] = useState(null);


  function enterCreatePatient(){
    props.history.push({
      pathname:'/CreatePatient',
      state: { username: props.location.state.username}
    });
  }

  

  function renderList(patients){
    console.log(Date.now())
  return (
    
    patients.map((patient) => {
      console.log(patient)
      return (

        <div>
          <li className="patient-container">
            <p>{patient.firstname}</p> <p>{patient.lastname}</p><PatientModal _id={patient._id} props={props}/>
          </li>
        </div>
      )

    })
  )
  }

  useEffect(() => {
        axios.get('http://localhost:8080/'+props.location.state.username+'/getpatients',
        {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        })
        .then(res=>{
            if(res.status === 200){
                var patientlist = []
                for(var x in res.data){
                  patientlist.push(res.data[x])
                }

                setPatient(patientlist);
                console.log(patientlist);
            }
        })
    },[])

  if(patients == null){
    return(<div>Loading</div>)
  }
  return (
    <div>
      <div>
      <p className="welcomeText">Welcome  {props.location.state.username}</p> 
      <Fab color="primary" aria-label="add"  style={{marginLeft:'40%', marginTop:'5%'}}onClick={()=>enterCreatePatient()}>
        <AddIcon />
      </Fab>
      </div>
      <p>Patient List</p>
      <ul>{renderList(patients)}</ul>
      
    </div>
  );
}

export default withRouter(Dashboard);
