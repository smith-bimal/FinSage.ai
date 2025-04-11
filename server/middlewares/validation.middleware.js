import { z } from 'zod';

const simulationSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  financialId: z.string().optional(),
  currentState: z.object({
    goals: z.array(
      z.object({
        type: z.string().nonempty("Goal type is required"),
        timeline: z.number().positive("Timeline must be a positive number"),
        targetAmount: z.number().positive("Target amount must be a positive number"),
        priority: z.string().nonempty("Priority is required")
      })
    ).optional()
  }).optional(),
  futureState: z.array(
    z.object({
      type: z.enum(['job', 'city', 'business', 'asset'], "Invalid scenario type"),
      timeline: z.number().positive("Timeline must be a positive number"),
      details: z.record(z.any()).optional()
    })
  ).optional(),
  results: z.object({
    projections: z.array(
      z.object({
        year: z.number().positive("Year must be a positive number"),
        value: z.number().optional()
      })
    ).optional(),
    recommendations: z.array(z.string()).optional()
  }).optional()
});

export const validateSimulation = (req, res, next) => {
  try {
    simulationSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: "Validation error",
      errors: error.errors.map((err) => err.message)
    });
  }
};