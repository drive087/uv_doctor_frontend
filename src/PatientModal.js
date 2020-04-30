import React, { useState,useEffect } from 'react';
import axios from '../node_modules/axios';
import Modal from 'react-modal';
import './PatientModal.css';


const PatientModal = ({ _id }) => {

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
    axios.get('http://localhost:8080/test101/getpatients',
    {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    })
    .then(res=>{
        if(res.status === 200){
            var patientlist = []
            for(var x in res.data){
              console.log(res.data[x]._id)
              console.log(_id)
              if(res.data[x]._id == _id){
                setPatient(res.data[x])
              }
            }
        }
    })
},[])

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
            <h1>Patient</h1>
            <ul>
                <li>Name: {patient.firstname}</li>
                <li>Surname: {patient.surname}</li>
                <li>Age: {patient.age}</li>
                <li>Startdate: {patient.startDate.substring(0,9)}</li>
                <li>Skintype: {patient.skin}</li>
            </ul>
        </div>    

        </Modal>
      </div>
    )

  


}
export default PatientModal;