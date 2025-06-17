import React from 'react';
import { ProductList } from 'src/components/ecommerce/ProductList';
import { Header } from 'src/components/layout/Header/Header';
import { LocalizationProvider } from 'src/shared/providers/LangProvider';
import { ThemeProvider } from 'src/shared/providers/ThemeProvider';
import 'src/shared/styles/theme.scss';
import s from './App.module.css';

function App() {
  return (
    <div className="theme-transition">
      <LocalizationProvider>
        <ThemeProvider>
          <div className={s.container}>
            <Header />
            <div className={s.content}>
              <div className={s.productList}>
                <ProductList />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
