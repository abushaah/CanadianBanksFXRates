import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Frontend (React)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>This is my app setup</p>
      <p>abc</p>
      <p>yay it worksss!</p>
    </div>
  );
}

export default App;
