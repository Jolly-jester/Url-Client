import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [Url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(''); // State to store the shortened URL

  async function submit(ev) {
    ev.preventDefault();
    console.log({ Url });

    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        body: JSON.stringify({ Url }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setShortUrl(`http://localhost:4000/${data.short}`); // Update state with the shortened URL
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>fakeUrl</h1>
        <input
          type="text"
          placeholder="Paste Your Url"
          value={Url}
          onChange={(ev) => {
            setUrl(ev.target.value);
          }}
        />
        <button onClick={submit}>Shorten URL</button>

        {shortUrl && (
          <div>
            <h2>Shortened URL:</h2>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
