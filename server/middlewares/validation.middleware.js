import { z } from 'zod';
import Joi from 'joi';

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
  }),
  futureState: z.array(
    z.object({
      type: z.enum(['job', 'city', 'business', 'asset'], "Invalid scenario type"),
      timeline: z.number().positive("Timeline must be a positive number"),
      details: z.record(z.any()).optional()
    })
  ).optional(),
  analysis: z.object({
    yearlyProjections: z.array(
      z.object({
        year: z.number().positive("Year must be a positive number"),
        currentPath: z.number().optional(),
        newPath: z.number().optional(),
        difference: z.number().optional()
      })
    ).optional(),
    risks: z.array(
      z.object({
        type: z.string().nonempty("Risk type is required"),
        probability: z.string().optional(),
        impact: z.number().optional()
      })
    ).optional(),
    opportunities: z.array(
      z.object({
        type: z.string().nonempty("Opportunity type is required"),
        potentialBenefit: z.number().optional(),
        requirements: z.array(z.string()).optional()
      })
    ).optional()
  }).optional(),
  retrospective: z.object({
    historicalScenario: z.object({
      startDate: z.string().optional(),
      assumedSavings: z.number().optional(),
      assumedInvestments: z.array(
        z.object({
          type: z.string().nonempty("Investment type is required"),
          amount: z.number().positive("Investment amount must be positive"),
          returnRate: z.number().optional()
        })
      ).optional()
    }).optional(),
    missedOpportunities: z.array(
      z.object({
        type: z.string().nonempty("Missed opportunity type is required"),
        potentialValue: z.number().optional(),
        description: z.string().optional()
      })
    ).optional()
  }).optional(),
  results: z.object({
    projections: z.array(
      z.object({
        year: z.number().positive("Year must be a positive number"),
        value: z.number().optional()
      })
    ).optional(),
    recommendations: z.array(z.string()).optional(),
    year1: z.number().optional(),
    year5: z.number().optional(),
    year10: z.number().optional()
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

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};