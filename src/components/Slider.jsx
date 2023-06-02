import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Stack } from '@mui/material';

export default function RangeSlider({currentPrices, setCurrentPrices}) {
  

  const handleChange = (event, newValue) => {
    setCurrentPrices(newValue); 
  };

  return (
    <Box sx={{ width: 300 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
      <Slider
        min={5}
        step={1}
        max={20}  
        getAriaLabel={() => 'Price range'}
        value={currentPrices}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Stack>
    </Box>
  );
}