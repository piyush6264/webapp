import React from 'react';
function App() {
  const [msg, setMsg] = React.useState('');

  React.useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setMsg(data.msg));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Frontend - React</h1>
      <p>Message from backend: {msg}</p>
    </div>
  );
}
export default App;
