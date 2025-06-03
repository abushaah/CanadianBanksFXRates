import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    axios.get('/api')
      .then(res => setData(res.data))
      .catch(err => console.error(err));

    axios.get('/test-db')
      .then(res => setDb(res))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Frontend (React)</h1>
      <p>Testing API calls from backend:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>Testing database from backend:</p>
      <pre>{JSON.stringify(db, null, 2)}</pre>
    </div>
  );
}

export default App;
