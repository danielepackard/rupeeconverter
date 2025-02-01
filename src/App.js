import React, { useState } from 'react';
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

  const rupeeToUsdRate = 82;

  const convertCurrency = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    let result = 0;
    switch (currencyType) {
      case 'rupees':
        result = amountNum / rupeeToUsdRate;
        break;
      case 'lakhs':
        result = (amountNum * 100000) / rupeeToUsdRate;
        break;
      case 'crores':
        result = (amountNum * 10000000) / rupeeToUsdRate;
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
        backgroundColor: '#f0f8ff', // Full background color across the viewport
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
            background: 'linear-gradient(135deg, #dceeff, #b0d5ff)', // Gradient from light to more intense Alice Blue
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
    </Box>
  );
};

export default Converter;
