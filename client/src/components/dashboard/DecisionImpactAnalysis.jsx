/* eslint-disable no-unused-vars */
import React from "react";
import { Activity, TrendingUp, AlertTriangle, CheckCircle, XCircle, ArrowUpCircle, TrendingDown, DollarSign, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const DecisionImpactAnalysis = ({ pastDecisionsImpact, analysisResults }) => {  
  return (
    <motion.div
      className="mt-6 bg-black/30 h-full backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden p-6 shadow-lg hover:border-indigo-500/30 transition-all duration-300 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{ boxShadow: "0 15px 30px -10px rgba(99, 102, 241, 0.15)" }}
    >
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>

      <div className="flex flex-wrap items-center justify-between mb-6 relative z-10">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-600/20 backdrop-blur-md rounded-lg mr-3">
            <Activity className="h-5 w-5 text-indigo-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Financial Decision Impact Analysis</h2>
        </div>
        
        {analysisResults && (
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <div className={`px-3 py-1.5 ${analysisResults.score > 70 ? 'bg-green-900/30 text-green-400' : 
              analysisResults.score > 50 ? 'bg-yellow-900/30 text-yellow-400' : 
              'bg-red-900/30 text-red-400'} rounded-full text-xs font-medium`}>
              Score: {analysisResults.score}/100
            </div>
          </div>
        )}
      </div>
      
      {/* Analysis Overview */}
      {analysisResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/20 rounded-lg p-4 border border-gray-800/30">
            <h3 className="text-green-400 font-medium mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> Strengths
            </h3>
            <ul className="text-sm text-gray-300 space-y-1 pl-6 list-disc">
              {analysisResults.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div className="bg-black/20 rounded-lg p-4 border border-gray-800/30">
            <h3 className="text-red-400 font-medium mb-2 flex items-center">
              <XCircle className="h-4 w-4 mr-2" /> Areas for Improvement
            </h3>
            <ul className="text-sm text-gray-300 space-y-1 pl-6 list-disc">
              {analysisResults.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Positive Impacts */}
        <div className="relative">
          <h3 className="flex items-center text-green-400 font-medium mb-3">
            <TrendingUp className="h-4 w-4 mr-2" /> Positive Financial Decisions
          </h3>
          
          {pastDecisionsImpact?.positiveImpacts && pastDecisionsImpact.positiveImpacts.length > 0 ? (
            <div className="space-y-3 max-h-[350px] overflow-y-auto px-1 custom-scrollbar">
              {pastDecisionsImpact.positiveImpacts.map((impact, index) => (
                <div 
                  key={impact._id || index} 
                  className="p-4 rounded-lg bg-gradient-to-br from-black/40 to-green-900/5 border border-green-900/30 hover:border-green-500/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-green-900/30 p-2 rounded-lg mt-1">
                      <DollarSign className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">{impact.decision}</h4>
                      <p className="text-xs text-green-400 font-medium mb-2">{impact.impact}</p>
                      <p className="text-xs text-gray-400 italic">{impact.financialEffect ? impact.financialEffect.replace('$', '₹') : ""}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-black/20 border border-gray-800/30 text-center">
              <p className="text-sm text-gray-400">No positive impacts recorded</p>
            </div>
          )}
        </div>

        {/* Negative Impacts */}
        <div className="relative">
          <h3 className="flex items-center text-red-400 font-medium mb-3">
            <ShieldAlert className="h-4 w-4 mr-2" /> Financial Attention Areas
          </h3>
          
          {pastDecisionsImpact?.negativeImpacts && pastDecisionsImpact.negativeImpacts.length > 0 ? (
            <div className="space-y-3 max-h-[350px] overflow-y-auto px-1 custom-scrollbar">
              {pastDecisionsImpact.negativeImpacts.map((impact, index) => (
                <div 
                  key={impact._id || index} 
                  className="p-4 rounded-lg bg-gradient-to-br from-black/40 to-red-900/5 border border-red-900/30 hover:border-red-500/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-red-900/30 p-2 rounded-lg mt-1">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">{impact.decision}</h4>
                      <p className="text-xs text-red-400 font-medium mb-2">{impact.impact}</p>
                      <p className="text-xs text-gray-400 italic">{impact.financialEffect ? impact.financialEffect.replace('$', '₹') : ""}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-black/20 border border-gray-800/30 text-center">
              <p className="text-sm text-gray-400">No areas of concern identified</p>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions Section */}
      {pastDecisionsImpact?.suggestions && pastDecisionsImpact.suggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="flex items-center text-blue-400 font-medium mb-3">
            <ArrowUpCircle className="h-4 w-4 mr-2" /> Recommendations for Improvement
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pastDecisionsImpact.suggestions.map((suggestion, index) => (
              <div 
                key={suggestion._id || index} 
                className="p-4 rounded-lg bg-gradient-to-br from-black/40 to-blue-900/5 border border-blue-900/30 hover:border-blue-500/30 transition-all duration-200"
              >
                <h4 className="text-sm font-medium text-white mb-1">{suggestion.area}</h4>
                <p className="text-xs text-gray-300 mb-2">{suggestion.suggestion}</p>
                <p className="text-xs font-medium text-blue-400">{suggestion.potentialBenefit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Debug info - will only show in development */}
      {process.env.NODE_ENV === 'development' && !pastDecisionsImpact?.positiveImpacts?.length && !pastDecisionsImpact?.negativeImpacts?.length && (
        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded text-xs text-yellow-200">
          <p>Debug: No impact data available.</p>
        </div>
      )}
    </motion.div>
  );
};

export default DecisionImpactAnalysis;
