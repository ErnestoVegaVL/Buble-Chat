import React from 'react';
import Chat from './Componentes/chat.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Buble Chat</h1>
      </header>
      <main className="App-main">
        <Chat />
      </main>
    </div>
  );
}

export default App;
