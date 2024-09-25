import React, { createContext, useContext, useState, ReactNode } from "react";

interface ExchangeRatesContextType {
  rates: { [key: string]: number };
  setRates: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

const initialRates = {
  "EUR/USD": 1.05,
  "USD/INR": 80.05,
  "AUD/USD": 0.67,
};

const ExchangeRatesContext = createContext<ExchangeRatesContextType | undefined>(undefined);

export const ExchangeRatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<{ [key: string]: number }>(initialRates);

  return (
    <ExchangeRatesContext.Provider value={{ rates, setRates }}>
      {children}
    </ExchangeRatesContext.Provider>
  );
};

export const useExchangeRates = () => {
  const context = useContext(ExchangeRatesContext);
  if (!context) {
    throw new Error("useExchangeRates must be used within an ExchangeRatesProvider");
  }
  return context;
};
