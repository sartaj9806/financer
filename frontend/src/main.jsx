import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './Context/AppContext.jsx';
import { AdminContextProvider } from './Context/AdminContex.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
)
