import React , { useState, useEffect } from 'react';
import './Dashboard.css';
import FloatingLabelInput from 'react-floating-label-input';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import doctor_icon from './img/doctor-icon.png';
import PatientModal from './PatientModal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Paper, InputBase, IconButton, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PatientCard from './PatientCard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MobileStepper from '@material-ui/core/MobileStepper';

function Dashboard(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);
  const [patients, setPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [pageOffset, setPageOffset] = useState(0);


  function enterCreatePatient(){
    props.history.push({
      pathname:'/CreatePatient',
      state: { username: props.location.state.username,_id: props.location.state._id}
    });
  }

  function onLogout(){
    localStorage.setItem('token', null);
    window.location.reload();
  }

  function renderList(patients, pageOffset){

    if(search == ""){

      let renderPatients = patients.slice(pageOffset, pageOffset + 5); 

      return (      
        renderPatients.map((patient) => {
          return (
            <div key={patient._id} style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
              <PatientCard first_name = {patient.firstname} last_name = {patient.lastname} _id = {patient._id} />
            </div>
          )
        })
      )
    }
    var count = 0;
    return (  
      patients.map((patient) => {
        if(patient.firstname.toLowerCase().includes(search.toLowerCase()) || patient.lastname.toLowerCase().includes(search.toLowerCase())){
          return (
            <div key={patient._id} style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
              <PatientCard first_name = {patient.firstname} last_name = {patient.lastname} _id = {patient._id} />
            </div>
          )
        }
        else{
          count = count + 1;
          if(count == patients.length){
            return (
              <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                  Not Found
            </div>
            )
          }
        }
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
    <div className="mainContainer">
      <div className="header">
          <h4 style = {{paddingLeft: '5%'}} className="welcomeText">Welcome  {props.location.state.username} 
            <button onClick={()=>onLogout()}>Logout</button>
          </h4> 
      </div>
      <div>
      <h4 style = {{paddingLeft: '5%'}}>Patient List 
      <Fab color="primary" aria-label="add"  style={{marginLeft:'60%', marginTop:'0%', width:'8.6%', height:'47%'}}onClick={()=>enterCreatePatient()}>
          <AddIcon />
      </Fab></h4>
      
      </div>
      <Paper className='search'>
        <InputBase
          className='inputPatient'
          placeholder="Search your patient"
          inputProps={{ 'aria-label': 'search patient' }}
          id="search"
          onChange={event =>setSearch(event.target.value)}
        />
        <IconButton type="submit" className='iconBtn' aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div style={{justifyContent: 'center', alignItems: 'center' }}>
        {renderList(patients, pageOffset)}
        <div style={{justifyContent: 'center', alignItems: 'center' }}>
        <MobileStepper
          steps={patients.length}
          position="static"
          activeStep={pageOffset}
          nextButton={
            <Button size="small" onClick={()=>setPageOffset(pageOffset+5)} disabled={pageOffset === patients.length - 1}>
              Next
            </Button>
          }
          backButton={
            <Button size="small" onClick={()=>setPageOffset(pageOffset-5)} disabled={pageOffset === 0}>
              Back
            </Button>
          }
      />
      </div>
      </div>
    </div>
  );
}

export default withRouter(Dashboard);
