import React , { useState, useEffect } from 'react';
import './Dashboard.css';
import FloatingLabelInput from 'react-floating-label-input';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import doctor_icon from './img/doctor-icon.png';
import PatientModal from './PatientModal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


function Dashboard(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);
  const [patients, setPatient] = useState(null);


  function enterCreatePatient(){
    props.history.push({
      pathname:'/CreatePatient',
      state: { username: props.location.state.username,_id: props.location.state._id}
    });
  }

  

  function renderList(patients){
  return (
    
    patients.map((patient) => {
      return (

        <div>
          <li className="patient-container">
            <p>
              {patient.firstname}
            </p> 
            <p>
              {patient.lastname}
            </p>
            <PatientModal _id={patient._id} props={props}/>
          </li>
        </div>
      )

    })
  )
  }

  useEffect(() => {

        axios.get('http://localhost:8080/'+props.location.state._id+'/getpatients',
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
            }
        })
    },[])

  if(patients == null){
    return(<div>Loading</div>)
  }
  return (
    <div>
      <div className="header">
          <p className="welcomeText">Welcome  {props.location.state.username}</p> 
      </div>
      <p>Patient List
        <Fab color="primary" aria-label="add"  style={{marginLeft:'3%', marginTop:'0%', width:'8.6%', height:'47%'}}onClick={()=>enterCreatePatient()}>
          <AddIcon />
        </Fab>
      </p>
      <Paper className='search'>
        <InputBase
          className='inputPatient'
          placeholder="Search your patient"
          inputProps={{ 'aria-label': 'search patient' }}
        />
        <IconButton type="submit" className='iconBtn' aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <ul>{renderList(patients)}</ul>
      
    </div>
  );
}

export default withRouter(Dashboard);
