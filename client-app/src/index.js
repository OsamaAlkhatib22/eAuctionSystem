//primary js file

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Components/Context';
import { SkillsProvider } from './Components/FreeLancerSkillsContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
       <SkillsProvider>

           <App />

        </SkillsProvider>
    </AuthProvider>
  </React.StrictMode>
);

