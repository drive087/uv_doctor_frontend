import React , { useState, useEffect } from 'react';
import './Dashboard.css';
import FloatingLabelInput from 'react-floating-label-input';
import axios from '../node_modules/axios';
import { withRouter } from 'react-router-dom';
import doctor_icon from './img/doctor-icon.png';
import PatientModal from './PatientModal';
// import moon from './img/moon.svg';
// import sunRay from './img/sun_ray.svg';


// function renderList(patients){
//   console.log(patients)
//   return (
    
//     patients.map((patient) => {
//       console.log(patient)
//       return (

//         <div>
          
//         </div>
//       )

//     })
//   )
// }


function Dashboard(props) {
  const [username, setUser] = useState(null);
  const [password, setPass] = useState(null);
  const [patients, setPatient] = useState(null);

    
  function renderList(patients){
    console.log(patients)
  return (
    
    patients.map((patient) => {
      console.log(patient)
      return (

        <div>
          <li className="patient-container">
          <p>{patient.firstname}</p> <p>{patient.surname}</p><PatientModal _id={patient._id}/>
          </li>
        </div>
      )

    })
  )
  }

  useEffect(() => {
        axios.get('http://localhost:8080/test101/getpatients',
        {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        })
        .then(res=>{
            if(res.status === 200){
                var patientlist = []
                for(var x in res.data){
                  console.log(res.data[x])
                  patientlist.push(res.data[x])
                }

                setPatient(patientlist);
            }
        })
    },[])


  // renderList(() => {
  //   return (
  
  //     patients.map((patient) => {
  //       return (
  
  //         <div>
  //           <li>
  //             <p>{patient.firstname}</p>
  //           </li>
  //         </div>
  //       )
  
  //     })
  //   )
  // })

  if(patients == null){
    return(<div>Loading</div>)
  }
  return (
    <div>
        <p>Welcome  {props.location.state.username}</p>
        <p>Patient List</p>
        <ul>{renderList(patients)}</ul>
    </div>
  );
}

export default withRouter(Dashboard);
