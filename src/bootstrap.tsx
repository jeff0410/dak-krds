import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'src/App';

const root = document.getElementById('app');

if (!root) {
  throw new Error('root is not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
