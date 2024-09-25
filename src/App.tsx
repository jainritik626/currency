import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import { ExchangeRatesProvider } from './contexts/ExchangeRatesContext';

const App: React.FC = () => {
  return (
    <ExchangeRatesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </ExchangeRatesProvider>
  );
};

export default App;
