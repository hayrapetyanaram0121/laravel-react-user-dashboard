import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '../../css/app.css';

const root = createRoot(document.getElementById('root'));

if (document.getElementById('root')) {
    root.render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>,
    );
}
