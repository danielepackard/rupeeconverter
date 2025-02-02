// INR to USD Currency Converter with Real-time Exchange Rates
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [currencyType, setCurrencyType] = useState('lakhs');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    setLoading(true);
    try {
      console.log('Fetching with key:', process.env.REACT_APP_EXCHANGE_RATE_API_KEY ? 'Key exists' : 'No key found');
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_RATE_API_KEY}/latest/INR`
      );
      const data = await response.json();
      console.log('API Response:', data);
      if (data.result === 'success') {
        setExchangeRate(data.conversion_rates.USD);
        setError(null);
      } else {
        throw new Error('Failed to fetch rate');
      }
    } catch (err) {
      console.error('Error details:', err);
      setError('Failed to fetch exchange rate. Using fallback rate of 1/82');
      setExchangeRate(1/82);
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    let result = 0;
    switch (currencyType) {
      case 'rupees':
        result = amountNum * exchangeRate;
        break;
      case 'lakhs':
        result = (amountNum * 100000) * exchangeRate;
        break;
      case 'crores':
        result = (amountNum * 10000000) * exchangeRate;
        break;
      default:
        alert('Invalid currency type selected.');
        return;
    }
    setConvertedAmount(`${amountNum.toLocaleString()} ${currencyType} = $${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f0f8ff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          Fetching latest exchange rate...
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: '#f1f5f9',
          padding: 4,
          borderRadius: 3,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3 }}>
          INR to USD Converter
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 3,
            gap: 2,
          }}
        >
          <TextField
            label="Enter amount"
            variant="outlined"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            sx={{
              backgroundColor: '#ffffff',
              boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(255, 255, 255, 0.5)',
              borderRadius: 2,
            }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Currency Type</InputLabel>
            <Select
              value={currencyType}
              onChange={(e) => setCurrencyType(e.target.value)}
              label="Currency Type"
              sx={{
                backgroundColor: '#ffffff',
                boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(255, 255, 255, 0.5)',
                borderRadius: 2,
              }}
            >
              <MenuItem value="rupees">Rupees</MenuItem>
              <MenuItem value="lakhs">Lakhs</MenuItem>
              <MenuItem value="crores">Crores</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="contained"
          onClick={convertCurrency}
          sx={{
            background: 'linear-gradient(135deg, #dceeff, #b0d5ff)',
            color: '#333',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: 4,
            padding: '12px 24px',
            fontSize: 16,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #b0d5ff, #dceeff)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
              transform: 'scale(1.05)',
            },
          }}
        >
          🚀 Convert to USD 🚀
        </Button>
        {convertedAmount && (
          <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
            {convertedAmount}
          </Typography>
        )}
      </Container>
      
      {exchangeRate && (
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 2, 
            color: '#666666',
            fontSize: '0.875rem'
          }}
        >
          Exchange rate used is {(1/exchangeRate).toFixed(2)} INR to 1 USD. Current as of {new Date().toLocaleString()}
        </Typography>
      )}
    </Box>
  );
};

export default Converter;
