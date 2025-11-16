import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AudioProvider } from './store/contexts/AudioContext';
import { Provider } from 'react-redux';
import { store } from './store/store';

const rootContainer = document.getElementById('root');

if (!rootContainer) {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <Provider store={store}>
      <AudioProvider>
        <App />
      </AudioProvider>
    </Provider>
  </React.StrictMode>
);
