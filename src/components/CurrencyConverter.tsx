import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { useExchangeRates } from '../contexts/ExchangeRatesContext';

const currencies = ['EUR', 'USD', 'INR', 'AUD'];

const CurrencyConverter: React.FC = () => {
  const { rates } = useExchangeRates();
  const [sourceCurrency, setSourceCurrency] = useState<string>('');
  const [targetCurrency, setTargetCurrency] = useState<string>('');
  const [amount, setAmount] = useState<number | string>('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [calculation, setCalculation] = useState<string | null>(null);

  const resetFields = () => {
    setConvertedAmount(null);
    setCalculation(null);
  };

  const handleConvert = () => {
    if (!sourceCurrency || !targetCurrency || !amount) {
      toast.error('Please fill in all fields!');
      resetFields();
      return;
    }

    if (sourceCurrency === targetCurrency) {
      toast.error('Please select different currencies for conversion!');
      resetFields();
      return;
    }

    const pair = `${sourceCurrency}/${targetCurrency}`;
    let conversionRate = rates[pair];

    if (!conversionRate) {
      const reversePair = `${targetCurrency}/${sourceCurrency}`;
      const reverseRate = rates[reversePair];

      if (reverseRate) {
        conversionRate = 1 / reverseRate;
      } else {
        toast.error('No conversion rate found. Try selecting the currency pair that matches the market table.');
        resetFields();
        return;
      }
    }

    if (isNaN(conversionRate)) {
      toast.error('Invalid conversion rate!');
      resetFields();
      return;
    }

    const result = Number(amount) * conversionRate;
    setConvertedAmount(result);
    setCalculation(`${amount} ${sourceCurrency} * ${conversionRate.toFixed(4)} = ${result.toFixed(2)} ${targetCurrency}`);
  };

  return (
    <Paper sx={{ padding: '20px', border: '2px solid #ccc' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Currency Converter
      </Typography>
      <TextField
        select
        label="Source Currency"
        fullWidth
        value={sourceCurrency}
        onChange={(e) => setSourceCurrency(e.target.value)}
        sx={{ marginBottom: '16px' }}
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Target Currency"
        fullWidth
        value={targetCurrency}
        onChange={(e) => setTargetCurrency(e.target.value)}
        sx={{ marginBottom: '16px' }}
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Amount"
        type="number"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ marginBottom: '16px' }}
      />
      <Button variant="contained" fullWidth onClick={handleConvert}>
        Exchange
      </Button>
      {convertedAmount !== null && (
        <>
          <Typography variant="h6" align="center" sx={{ marginTop: '16px', color: 'green' }}>
            Estimated Converted Amount: {convertedAmount.toFixed(2)} {targetCurrency}
          </Typography>
          {calculation && (
            <Typography variant="body1" align="center" sx={{ marginTop: '8px', color: 'gray' }}>
              Calculation: {calculation}
            </Typography>
          )}
        </>
      )}
    </Paper>
  );
};

export default CurrencyConverter;
