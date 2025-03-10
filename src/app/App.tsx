import React from 'react';
import logo from './logo.svg';
import './App.css';

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1.5rem'
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <strong style={{fontSize: '4rem', paddingBottom: '2rem'}}>
          Сергей Нечаве
        </strong>
        <div style={styles.item}>
          <strong>Цель:</strong>
          <p>систематизировать знания по React</p>
        </div>
        <div style={styles.item}>
          <strong>Технологии:</strong>
          <p>Full Stack developer (PHP, Go, React, Vue)</p>
        </div>
        <div style={styles.item}>
          <strong>Опыт:</strong>
          <p>7+ лет в разработке</p>
        </div>
      </header>
    </div>
  );
}

export default App;
