import React, { useState,useEffect } from 'react';
import axios from '../node_modules/axios';
import Modal from 'react-modal';
import DatePicker from './DatePicker';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import './PatientModal.css';


const PatientModal = ({ _id,props }) => {

  const [modalIsOpen, setmodalIsOpen] = useState('');
  const [patient, setPatient] = useState(null);
  const [editAble, seteditAble] = useState(false);
  const [username, setUsername] = useState(false);

  const [startDate, setStartDate] = useState('');    
  const [skin, setSkinType] = useState('');


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

  function onEdit(){
    seteditAble(true);
  }

  function onCloseEdit(){
    seteditAble(false);
  }

  function onEditPatient(){

      axios.post('http://localhost:8080/patient/save',{username,startDate,skin},
    {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },  
    }).then(res=>{
      if(res.status === 201){
        closeModal();
      }
    })
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
              if(res.data[x]._id == _id){
                setPatient(res.data[x]);
                setUsername(res.data[x].username);
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
    seteditAble(false);
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

    if(editAble){
      return (
        <div className = 'moreContainer'style={{ display: 'flex', justifyContent: 'center'}}>
          <button className="moreBtn" onClick={openModal}>More</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={()=>closeModal()}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {    console.log(patient)}
          <div style={{width:'250px'}}>
              <h1>Patient <CloseIcon style={{float:'right'}} onClick={()=>onCloseEdit()}/></h1>
              <ul>
                <li>Name: {patient.firstname}</li>
                <li>Surname: {patient.lastname}</li>
                <li>Age: {calcAge(patient.birthDate)}</li>
                <li><DatePicker
                                  id='workDate'
                                  label="Select Start Date"
                                  type='date'
                                  className="dateinput"
                                  defaultValue={patient.startDate.substring(0,10)}
                                  onChange={event =>setStartDate(event.target.value)}
                                /> </li>
                <li>Skintype: <select class="Column" name="cars" id="cars" onChange={event =>setSkinType(event.target.value)}>
                    <option value={patient.skin} selected disabled hidden>{patient.skin}</option> 
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select> 
            </li>
              </ul>

            <div className="SubmitBtn" onClick={()=>onEditPatient()}>
              <p>Submit</p>
            </div>
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
            <h1>Patient <EditIcon style={{float:'right'}} onClick={()=>onEdit()}/></h1>
            <ul>
                <li>Name: {patient.firstname}</li>
                <li>Surname: {patient.lastname}</li>
                <li>Age: {calcAge(patient.birthDate)}</li>
                <li>Startdate: {patient.startDate.substring(0,10)} </li>
                <li>Skintype: {patient.skin} </li>
            </ul>
        </div>    
        </Modal>
      </div>
    )

  


}
export default PatientModal;