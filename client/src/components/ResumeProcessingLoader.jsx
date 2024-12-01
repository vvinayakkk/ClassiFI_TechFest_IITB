import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Server, Brain, Database } from 'lucide-react';

const ResumeProcessingLoader = ({ isLoading, modelResults }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  const modelStages = [
    { 
      name: "Initial Parsing", 
      icon: <Cpu className="w-12 h-12 text-blue-500" />,
      color: "bg-blue-100",
      description: "Extracting document structure"
    },
    { 
      name: "Feature Extraction", 
      icon: <Server className="w-12 h-12 text-green-500" />,
      color: "bg-green-100",
      description: "Identifying key information"
    },
    { 
      name: "AI Classification", 
      icon: <Brain className="w-12 h-12 text-purple-500" />,
      color: "bg-purple-100",
      description: "Deep learning analysis"
    },
    { 
      name: "Final Validation", 
      icon: <Database className="w-12 h-12 text-red-500" />,
      color: "bg-red-100",
      description: "Cross-referencing results"
    }
  ];

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setCurrentStage((prev) => 
          prev < modelStages.length - 1 ? prev + 1 : prev
        );
      }, 1500);

      return () => clearInterval(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (currentStage === modelStages.length - 1) {
      const completeTimer = setTimeout(() => {
        setAnimationComplete(true);
      }, 2000);

      return () => clearTimeout(completeTimer);
    }
  }, [currentStage]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Processing Your Resume
          </h2>
          <p className="text-gray-500 mt-2">Advanced AI-powered classification in progress</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {modelStages.map((stage, index) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: index <= currentStage ? 1 : 0.3, 
                  x: index <= currentStage ? 0 : -50,
                  scale: index === currentStage ? 1.05 : 1
                }}
                transition={{ duration: 0.5 }}
                className={`flex items-center space-x-4 p-4 rounded-lg ${stage.color} ${
                  index === currentStage ? 'ring-4 ring-blue-300' : ''
                }`}
              >
                <div className={`p-3 rounded-full ${stage.color}`}>
                  {stage.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{stage.name}</h3>
                  <p className="text-gray-600">{stage.description}</p>
                </div>
                {index <= currentStage && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-600"
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Results Preview */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Preliminary Results</h3>
            {modelResults && (
              <AnimatePresence>
                {Object.entries(modelResults).filter(([key]) => key.startsWith('model')).map(([modelKey, result], index) => (
                  <motion.div
                    key={modelKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Model {index + 1}</span>
                      <span className="text-sm text-blue-600 font-bold">
                        {result.confidence.toFixed(1)}% Confidence
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-600">Classification: {result.classification}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {result.skills.map(skill => (
                          <span 
                            key={skill} 
                            className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {modelResults.finalClassification && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-100 rounded-lg p-4 mt-4"
                  >
                    <h4 className="text-lg font-bold text-blue-800">Final Classification</h4>
                    <p className="text-blue-600 text-xl">
                      {modelResults.finalClassification}
                    </p>
                    <p className="text-sm text-blue-700 mt-2">
                      Overall Confidence: {modelResults.overallConfidence.toFixed(1)}%
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 100 100" 
              className="w-16 h-16 mx-auto text-blue-600"
              fill="currentColor"
            >
              <path d="M50 10 L70 40 L30 40 Z" />
              <path d="M50 90 L70 60 L30 60 Z" />
              <path d="M10 50 L40 70 L40 30 Z" />
              <path d="M90 50 L60 70 L60 30 Z" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeProcessingLoader;