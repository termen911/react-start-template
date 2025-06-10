import React from 'react';
import { Header } from 'src/components/layout/Header/Header';
import { ThemeProvider } from 'src/shared/providers/ThemeProvider';
import 'src/shared/styles/theme.scss';
import s from './App.module.css';
import logo from './logo.svg';
import { LocalizationProvider } from 'src/shared/providers/LangProvider';

function App() {
  return (
    <div className="theme-transition">
      <LocalizationProvider>
        <ThemeProvider>
          <div className={s.container}>
            <Header />
            <div className={s.content}>
              <img src={logo} className={s.logo} alt="logo" />
            </div>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
