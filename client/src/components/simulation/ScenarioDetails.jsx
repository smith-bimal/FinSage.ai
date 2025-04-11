import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

const ScenarioDetails = ({ scenario, data, onChange }) => {
  const renderJobChangeInputs = () => (
    <>
      <TextField
        fullWidth
        label="Expected Salary"
        type="number"
        value={data.expectedSalary || ''}
        onChange={(e) => onChange('expectedSalary', Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Target Industry"
        value={data.targetIndustry || ''}
        onChange={(e) => onChange('targetIndustry', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Expected Growth (%)"
        type="number"
        value={data.expectedGrowth || ''}
        onChange={(e) => onChange('expectedGrowth', Number(e.target.value))}
      />
    </>
  );

  const renderCityRelocationInputs = () => (
    <>
      <TextField
        fullWidth
        label="Target City"
        value={data.targetCity || ''}
        onChange={(e) => onChange('targetCity', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Expected Rent"
        type="number"
        value={data.expectedExpenses?.rent || ''}
        onChange={(e) => onChange('expectedExpenses', { 
          ...data.expectedExpenses, 
          rent: Number(e.target.value) 
        })}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Expected Cost of Living"
        type="number"
        value={data.expectedExpenses?.costOfLiving || ''}
        onChange={(e) => onChange('expectedExpenses', { 
          ...data.expectedExpenses, 
          costOfLiving: Number(e.target.value) 
        })}
      />
    </>
  );

  const renderBusinessInputs = () => (
    <>
      <TextField
        fullWidth
        label="Business Type"
        value={data.businessPlan?.type || ''}
        onChange={(e) => onChange('businessPlan', { 
          ...data.businessPlan, 
          type: e.target.value 
        })}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Initial Investment"
        type="number"
        value={data.businessPlan?.investment || ''}
        onChange={(e) => onChange('businessPlan', { 
          ...data.businessPlan, 
          investment: Number(e.target.value) 
        })}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Expected Monthly Expenses"
        type="number"
        value={data.businessPlan?.monthlyExpenses || ''}
        onChange={(e) => onChange('businessPlan', { 
          ...data.businessPlan, 
          monthlyExpenses: Number(e.target.value) 
        })}
      />
    </>
  );

  const scenarioInputs = {
    job: renderJobChangeInputs,
    city: renderCityRelocationInputs,
    business: renderBusinessInputs
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {scenario.charAt(0).toUpperCase() + scenario.slice(1)} Details
      </Typography>
      {scenarioInputs[scenario]?.()}
    </Box>
  );
};

export default ScenarioDetails;
