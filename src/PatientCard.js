import React , { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import PatientModal from './PatientModal';

function PatientCard(props) {
    const [first_name , setFirstName] = useState(props.first_name);
    const [last_name, setLastName] = useState(props.last_name);
    const [_id, setID] = useState(props._id);


    return (
        <Card style={{ marginBottom: '10px', height: '70px', width: '300px', backgroundColor: '#FFFFFF', opacity: '80%', borderRadius: '15px', justifyContent: 'center',alignItems: 'center'}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height: '40px' }}>
                  <h2>{first_name} {last_name}</h2>
                </div>
                <div style={{ display: 'flex' , justifyContent: 'right', alignItems: 'right'}}>
                  <PatientModal _id={_id} props={props}/>
                </div>           
        </Card>
      );
}

export default withRouter(PatientCard);
