import React, { useState,useEffect } from 'react';
import axios from '../node_modules/axios';
import Modal from 'react-modal';
import EditIcon from '@material-ui/icons/Edit';
import './PatientModal.css';


const PatientModal = ({ _id,props }) => {

  const [modalIsOpen, setmodalIsOpen] = useState('');
  const [patient, setPatient] = useState(null);


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '0%',
      transform: 'translate(-50%, -50%)',
      justifyContent: 'center',
      borderRadius:'28px'
    }

  };
  
  useEffect(() => {
    axios.get('http://localhost:8080/'+props.location.state.username+'/getpatients',
    {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    })
    .then(res=>{
        if(res.status === 200){
            var patientlist = []
            for(var x in res.data){
              if(res.data[x]._id == _id){
                setPatient(res.data[x])
              }
            }
        }
    })
},[])

function calcAge(dateString) {
  dateString = dateString.substring(0,10);
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

  const openModal = async () => {
    await setmodalIsOpen(true);
  }
  // useEffect(() => {
  //   fetchGroupName();
  // },[]);


  const closeModal = async () => {
    await setmodalIsOpen(false);
  }


    if(patient == null){
      return (
      
        <div className = 'moreContainer'style={{ display: 'flex', justifyContent: 'center'}}>
          <button className="moreBtn" onClick={openModal}>More</button>
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal()}
            onRequestClose={()=>closeModal()}
            style={customStyles}
            contentLabel="Example Modal"
          >
          <div style={{width:'250px'}}>
              <h1>Loading...</h1>
          </div>    
  
          </Modal>
        </div>
      )
    }
  

    return (
      
      <div className = 'moreContainer'style={{ display: 'flex', justifyContent: 'center'}}>
        <button className="moreBtn" onClick={openModal}>More</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={()=>closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div style={{width:'250px'}}>
            <h1>Patient <EditIcon style={{float:'right'}}/></h1>
            <ul>
                <li>Name: {patient.firstname}</li>
                <li>Surname: {patient.lastname}</li>
                <li>Age: {calcAge(patient.birthDate)}</li>
                <li>Startdate: {patient.startDate.substring(0,10)} </li>
                <li>Skintype: {patient.skin} </li>
            </ul>
            <button>Edit</button>
        </div>    

        </Modal>
      </div>
    )

  


}
export default PatientModal;