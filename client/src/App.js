import React, { useState, useEffect } from 'react';

// Styles
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [post, setPost] = useState('')

  // Get API
  useEffect(() => {
    async function getApi() {
      // Load the response
      const response = await fetch('/api/turbovote', {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const body = await response.json();
      console.log(body)
      // Error handler
      if (response.status !== 200) throw Error('Error');

      // setResponse(body.message)
    }
    getApi()
  }, [])
  
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/hello', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const body = await response.json();

  //   setResponseToPost(body.message)
  // };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <form
        // onSubmit={handleSubmit}
      >
        <p>
          <strong>Post to Server:</strong>
        </p>
        <input
          type="text"
          value={post}
          onChange={e => setPost(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;