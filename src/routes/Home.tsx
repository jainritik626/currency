import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Markets from "../components/Markets";
import CurrencyConverter from "../components/CurrencyConverter";
import { useExchangeRates } from "../contexts/ExchangeRatesContext";

const Home: React.FC = () => {
  const { setRates } = useExchangeRates();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRates((prevRates) => {
        const updatedRates: Record<string, number> = {};
        for (let pair in prevRates) {
          const fluctuation = (Math.random() - 0.5) * 0.06;
          updatedRates[pair] = +(prevRates[pair] * (1 + fluctuation)).toFixed(4);
        }
        return updatedRates;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setRates]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        padding: "20px",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Markets />
      </Box>
      <Box sx={{ flex: 1 }}>
        <CurrencyConverter />
      </Box>
    </Box>
  );
};

export default Home;
