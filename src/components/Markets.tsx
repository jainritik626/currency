import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useExchangeRates } from '../contexts/ExchangeRatesContext';

const Markets: React.FC = () => {
  const { rates } = useExchangeRates();

  return (
    <TableContainer component={Paper} style={{ border: "2px solid #ccc" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Markets
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Currency Pair</TableCell>
            <TableCell>Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(rates).map((pair: string) => (
            <TableRow key={pair}>
              <TableCell>{pair}</TableCell>
              <TableCell>{rates[pair]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Markets;
