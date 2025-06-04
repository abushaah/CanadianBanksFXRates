import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [bmoData, setBMOData] = useState(null);
  const [scotiaData, setScotiaData] = useState(null);
  const [rbcData, setRBCData] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    axios.get('/bmo')
      .then(res => setBMOData(res.data))
      .catch(err => console.error(err));

    axios.get('/scotia')
      .then(res => setScotiaData(res.data))
      .catch(err => console.error(err));

    axios.get('/rbc')
      .then(res => setRBCData(res.data))
      .catch(err => console.error(err));

    axios.get('/test-db')
      .then(res => setDb(res))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Frontend (React)</h1>
      <h2>Testing API calls from backend:</h2>
      <h3>BMO</h3>
      <pre>{JSON.stringify(bmoData, null, 2)}</pre>
      <h3>Scotia</h3>
      <pre>{JSON.stringify(scotiaData, null, 2)}</pre>
      <h3>RBC</h3>
      <pre>{JSON.stringify(rbcData, null, 2)}</pre>
      <h2>Testing database from backend:</h2>
      <pre>{JSON.stringify(db, null, 2)}</pre>
    </div>
  );
}

export default App;
