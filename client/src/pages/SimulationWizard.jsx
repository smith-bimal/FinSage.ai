import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import api from '../config/axios.config';
import PersonalInfoStep from '../components/simulation/PersonalInfoStep';
import ScenarioStep from '../components/simulation/ScenarioStep';
import ResultsStep from '../components/simulation/ResultsStep';

const SimulationWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [simulationData, setSimulationData] = useState({
    currentState: {
      monthlyIncome: 0,
      expenses: {},
      savings: 0,
      investments: {},
      personalDetails: {}
    },
    futureState: {
      scenario: '',
      timeline: 0,
      detailedScenario: {}
    }
  });

  const steps = ['Personal Information', 'Choose Scenario', 'View Results'];

  const handleNext = async () => {
    try {
      if (activeStep === steps.length - 2) {
        const userId = localStorage.getItem('userId');
        const { data } = await api.post(`/simulations/${userId}/step`, {
          step: activeStep + 1,
          data: simulationData
        });
        setSimulationData(data);
      }
      setActiveStep(prev => prev + 1);
    } catch (error) {
      console.error('Error creating simulation:', error);
      // Add error handling UI here
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <PersonalInfoStep 
            data={simulationData}
            onUpdate={setSimulationData}
            onNext={handleNext}
          />
        )}
        {activeStep === 1 && (
          <ScenarioStep
            data={simulationData}
            onUpdate={setSimulationData}
            onNext={handleNext}
          />
        )}
        {activeStep === 2 && (
          <ResultsStep 
            data={simulationData}
          />
        )}
      </Box>
    </Box>
  );
};

export default SimulationWizard;
