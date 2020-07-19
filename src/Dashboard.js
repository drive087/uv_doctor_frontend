import React , { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Paper, InputBase, IconButton, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PatientCard from './PatientCard';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  welcome: {
    margin: theme.spacing(1),
    marginLeft: 0,
    textTransform: 'capitalize',
    color: 'white',
    display: 'inline-flex',
    paddingLeft: '5%',
    alignItems: 'center'
  }
}));


function Dashboard(props) {
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
            <div key={patient._id} style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
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
            <div key={patient._id} style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <PatientCard first_name = {patient.firstname} last_name = {patient.lastname} _id = {patient._id} />
            </div>
          )
        }
        else{
          count = count + 1;
          if(count == patients.length){
            return (
              <div key={patient._id} style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                  <h2>Not Found</h2>
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
      <p className="welcomeText">{props.location.state.username}</p> <ExitToAppIcon style={{paddingTop:"1%", paddingRight:"1%"}} className="logoutBtn" onClick={()=>onLogout()}/>
      </div>
      <div className="patientList">
        <h3 className="patientListText">Patient List</h3> 
        <Fab color="primary" aria-label="add" size="small" style={{marginLeft:'50%', marginTop:'0%'}} onClick={()=>enterCreatePatient()}>
            <AddIcon />
        </Fab>
      </div>
      <div className="searchContainer">
      <Paper className='search'>
        <InputBase
          className='inputPatient'
          placeholder="Search your patient"
          inputProps={{ 'aria-label': 'search patient' }}
          autoFocus="True"
          id="search"
          onChange={event =>setSearch(event.target.value)}
        />
        <IconButton type="submit" className='iconBtn' aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      </div>
      <div style={{justifyContent: 'center', alignItems: 'center' }}>
        {renderList(patients, pageOffset)}
        <div className='footer' style={{marginTop:"5%", justifyContent: 'center', alignItems: 'center'}}>
          <MobileStepper
            steps={parseInt((patients.length+4)/5)}
            position="static"
            activeStep={parseInt((pageOffset+4)/5)}
            nextButton={
              <IconButton variant="contained" size="small" onClick={()=>setPageOffset(pageOffset+(patients.length%5))} disabled={pageOffset + 5 >= patients.length - 1}>
               <NavigateNextIcon/>
              </IconButton>
            }
            backButton={
              <IconButton variant="contained" size="small" onClick={()=>setPageOffset(pageOffset-(patients.length%5))} disabled={pageOffset === 0}>
                 <NavigateBeforeIcon/>
              </IconButton>
            }
        />
      </div>
      </div>
    </div>
  );
}

export default withRouter(Dashboard);
