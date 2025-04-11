import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button
} from '@mui/material';
import ScenarioDetails from './ScenarioDetails';

const ScenarioStep = ({ data, onUpdate, onNext }) => {
  const handleScenarioChange = (scenario) => {
    onUpdate(prev => ({
      ...prev,
      futureState: {
        ...prev.futureState,
        scenario,
        detailedScenario: {}
      }
    }));
  };

  const handleDetailChange = (field, value) => {
    onUpdate(prev => ({
      ...prev,
      futureState: {
        ...prev.futureState,
        detailedScenario: {
          ...prev.futureState.detailedScenario,
          [field]: value
        }
      }
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Choose your "What If" scenario
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <RadioGroup
              value={data.futureState.scenario}
              onChange={(e) => handleScenarioChange(e.target.value)}
            >
              <FormControlLabel value="job" control={<Radio />} label="Change Job" />
              <FormControlLabel value="city" control={<Radio />} label="Move to New City" />
              <FormControlLabel value="business" control={<Radio />} label="Start Business" />
              <FormControlLabel value="asset" control={<Radio />} label="Buy Asset" />
            </RadioGroup>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        {data.futureState.scenario && (
          <Card>
            <CardContent>
              <ScenarioDetails
                scenario={data.futureState.scenario}
                data={data.futureState.detailedScenario}
                onChange={handleDetailChange}
              />
            </CardContent>
          </Card>
        )}
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={!data.futureState.scenario}
        >
          Generate Prediction
        </Button>
      </Grid>
    </Grid>
  );
};

export default ScenarioStep;
