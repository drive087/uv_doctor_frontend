import Card from '@material-ui/core/Card';

function PatientCard(props) {
    const [username, setUser] = useState(null);
    const [password, setPass] = useState(null);
    const [patients, setPatient] = useState(null);


    return (
        <Card style={{ marginBottom: '10px', height: '290px', backgroundColor: '#86FDD9', opacity: '80%', borderRadius: '3%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <h2>{this.JobName}</h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p> : {this.Wages} ฿</p>&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p> : {this.Date}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p> : {this.Location}</p>
                </div>
          </div>
        </Card>
      );
}