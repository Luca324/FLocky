import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomProvider } from 'rsuite';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomProvider>
    <App />
    </CustomProvider >
  </React.StrictMode>
);
;
