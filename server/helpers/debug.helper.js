/**
 * Utility to debug AI response and simulation data storage
 */
export const debugAIResponse = (aiResponse) => {
  console.log("AI Response Structure:");
  console.log("Type:", typeof aiResponse);
  console.log("Has accuracyPercentage:", aiResponse.hasOwnProperty('accuracyPercentage'));
  console.log("AccuracyPercentage value:", aiResponse.accuracyPercentage);
  console.log("Keys in response:", Object.keys(aiResponse));
  
  return aiResponse;
};

export const validateSimulationData = (simulationData) => {
  // Log key information about the simulation data
  console.log("Simulation Data Before Save:");
  console.log("Type:", typeof simulationData);
  console.log("Has accuracyPercentage:", simulationData.hasOwnProperty('accuracyPercentage'));
  console.log("AccuracyPercentage value:", simulationData.accuracyPercentage);
  
  return simulationData;
};
