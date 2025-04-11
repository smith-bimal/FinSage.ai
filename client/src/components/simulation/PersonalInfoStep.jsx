import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Button
} from '@mui/material';

const PersonalInfoStep = ({ data, onUpdate, onNext }) => {
  const handleChange = (field, value) => {
    onUpdate(prev => ({
      ...prev,
      currentState: {
        ...prev.currentState,
        [field]: value
      }
    }));
  };

  const handleExpenseChange = (category, value) => {
    onUpdate(prev => ({
      ...prev,
      currentState: {
        ...prev.currentState,
        expenses: {
          ...prev.currentState.expenses,
          [category]: Number(value)
        }
      }
    }));
  };

  const handleInvestmentChange = (type, value) => {
    onUpdate(prev => ({
      ...prev,
      currentState: {
        ...prev.currentState,
        investments: {
          ...prev.currentState.investments,
          [type]: Number(value)
        }
      }
    }));
  };

  const handlePersonalDetailsChange = (field, value) => {
    onUpdate(prev => ({
      ...prev,
      currentState: {
        ...prev.currentState,
        personalDetails: {
          ...prev.currentState.personalDetails,
          [field]: value
        }
      }
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Tell us about your current finances
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Income & Savings
            </Typography>
            <TextField
              fullWidth
              label="Monthly Income"
              type="number"
              value={data.currentState.monthlyIncome}
              onChange={(e) => handleChange('monthlyIncome', Number(e.target.value))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Current Savings"
              type="number"
              value={data.currentState.savings}
              onChange={(e) => handleChange('savings', Number(e.target.value))}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Expenses
            </Typography>
            {['food', 'rent', 'shopping', 'utilities', 'transportation', 'entertainment', 'others'].map(category => (
              <TextField
                key={category}
                fullWidth
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                type="number"
                value={data.currentState.expenses[category] || ''}
                onChange={(e) => handleExpenseChange(category, e.target.value)}
                sx={{ mb: 2 }}
              />
            ))}
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Current Investments
            </Typography>
            {['stocks', 'mutualFunds', 'fixedDeposits', 'others'].map(type => (
              <TextField
                key={type}
                fullWidth
                label={type.split(/(?=[A-Z])/).join(' ')}
                type="number"
                value={data.currentState.investments?.[type] || ''}
                onChange={(e) => handleInvestmentChange(type, e.target.value)}
                sx={{ mb: 2 }}
              />
            ))}
          </CardContent>
        </Card>
        
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <TextField
              fullWidth
              label="Age"
              type="number"
              value={data.currentState.personalDetails?.age || ''}
              onChange={(e) => handlePersonalDetailsChange('age', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Occupation"
              value={data.currentState.personalDetails?.occupation || ''}
              onChange={(e) => handlePersonalDetailsChange('occupation', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Current City"
              value={data.currentState.personalDetails?.location || ''}
              onChange={(e) => handlePersonalDetailsChange('location', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Family Size"
              type="number"
              value={data.currentState.personalDetails?.familySize || ''}
              onChange={(e) => handlePersonalDetailsChange('familySize', e.target.value)}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={!data.currentState.monthlyIncome}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default PersonalInfoStep;
