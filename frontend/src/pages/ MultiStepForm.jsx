import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tag, ChevronLeft, ChevronRight, Check, Plus, X } from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    interests: [],
    discoveryMethod: '', 
    customDiscoveryMethod: '', 
    mainGoal: '', 
    customGoal: '',
  });
  const [customInterest, setCustomInterest] = useState(''); 
  const [error, setError] = useState(''); 
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const interestsRef = useRef(null);
  const discoveryMethodRef = useRef(null);
  const mainGoalRef = useRef(null);

  const handleInterestClick = (interest) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((item) => item !== interest),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };

  const handleCustomInterest = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault(); 
      if (customInterest.trim() && !formData.interests.includes(customInterest)) {
        setFormData({
          ...formData,
          interests: [...formData.interests, customInterest.trim()],
        });
        setCustomInterest(''); 
      }
    }
  };

  const handleDiscoveryMethodClick = (method) => {
    setFormData({
      ...formData,
      discoveryMethod: method,
      customDiscoveryMethod: method === 'Other' ? formData.customDiscoveryMethod : '', 
    });
  };

  const handleCustomDiscoveryInput = (e) => {
    setFormData({
      ...formData,
      customDiscoveryMethod: e.target.value,
    });
  };

  const handleMainGoalChange = (goal) => {
    setFormData({
      ...formData,
      mainGoal: goal,
      customGoal: goal === 'Other' ? formData.customGoal : '',
    });
  };

  const handleCustomGoalInput = (e) => {
    setFormData({
      ...formData,
      customGoal: e.target.value,
    });
  };

  const nextStep = () => {
    setError(''); 

    if (step === 1 && formData.interests.length === 0) {
      setError('Please select at least one interest.');
      interestsRef.current?.focus(); 
      return;
    }
    if (step === 2 && !formData.discoveryMethod) {
      setError('Please select a discovery method.');
      discoveryMethodRef.current?.focus(); 
      return;
    }
    if (step === 2 && formData.discoveryMethod === 'Other' && !formData.customDiscoveryMethod.trim()) {
      setError('Please enter your custom discovery method.');
      discoveryMethodRef.current?.focus(); 
      return;
    }
    if (step === 3 && !formData.mainGoal) {
      setError('Please select your main goal.');
      mainGoalRef.current?.focus(); 
      return;
    }
    if (step === 3 && formData.mainGoal === 'Other' && !formData.customGoal.trim()) {
      setError('Please enter your custom goal.');
      mainGoalRef.current?.focus(); 
      return;
    }


    if (step === 2 && formData.discoveryMethod === 'Other' && formData.customDiscoveryMethod.trim()) {
      setFormData((prev) => ({
        ...prev,
        discoveryMethod: prev.customDiscoveryMethod.trim(),
        customDiscoveryMethod: '',
      }));
    }
    if (step === 3 && formData.mainGoal === 'Other' && formData.customGoal.trim()) {
      setFormData((prev) => ({
        ...prev,
        mainGoal: prev.customGoal.trim(),
        customGoal: '',
      }));
    }

    if (step < 3) {
      setStep((prev) => prev + 1); 
    } else {
      handleSubmit(); 
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitted(true); 
    console.log("Sashi");
    const url = "http://localhost:3000/form-update/add-niche";
    const response = await axios.post(url, formData.interests, {Headers: {authorization: `Bearer ${Cookies.get('jwtToken')}`}});
    console.log(response);
  };

  const discoveryMethods = [
    'Social Media',
    'Friend/Colleague',
    'Online Advertisement',
    'Search Engine',
    'Other',
  ];

  const mainGoals = [
    'Learn new skills',
    'Stay updated with trends',
    'Network with professionals',
    'Find inspiration',
    'Other',
  ];


  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="max-w-md w-full backdrop-blur-xl bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-2xl border border-gray-700 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex items-center justify-center"
          >
            <Check size={64} className="text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mt-4">Form Submitted Successfully!</h2>
          <p className="text-gray-400 mt-2">Thank you for your submission.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full backdrop-blur-xl bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-2xl border border-gray-700">

        <div className="flex justify-between items-center mb-8 relative">
          {[1, 2, 3].map((stepNumber, index) => (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? 'bg-indigo-600' : 'bg-gray-700'
                  } text-white mb-2 transition-colors duration-300`}
                >
                  <Tag size={24} />
                </div>
                <div className={`text-sm ${step >= stepNumber ? 'text-indigo-400' : 'text-gray-500'}`}>
                  Step {stepNumber}
                </div>
              </div>
              {index < 2 && (
                <motion.div
                  className="absolute h-1 bg-gray-700 top-6 left-1/2 transform -translate-y-1/2 w-1/4"
                  style={{ originX: 0, originY: 0.5 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step >= stepNumber + 1 ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

          {step === 1 && (
            <motion.div
              key={1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Select Your Interests</h2>
              <p className="text-sm text-gray-400 mb-4">Click on an interest to add or remove it.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleInterestClick(interest)}
                    className={`px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 flex items-center space-x-2 ${
                      formData.interests.includes(interest)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    <span>{interest}</span>
                    {formData.interests.includes(interest) && <X size={16} className="text-white" />}
                  </motion.div>
                ))}
              </div>
              <div className="relative" ref={interestsRef}>
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  onKeyDown={handleCustomInterest}
                  placeholder="Enter your interest and press Enter"
                  className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={handleCustomInterest}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition"
                >
                  <Plus size={20} />
                </button>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key={2}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">How Did You Get to Know About TubeIO?</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {discoveryMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleDiscoveryMethodClick(method)}
                    className={`px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 flex items-center space-x-2 ${
                      formData.discoveryMethod === method
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    <span>{method}</span>
                  </motion.div>
                ))}
              </div>
              {formData.discoveryMethod === 'Other' && (
                <div className="relative" ref={discoveryMethodRef}>
                  <input
                    type="text"
                    value={formData.customDiscoveryMethod}
                    onChange={handleCustomDiscoveryInput}
                    placeholder="Enter your custom discovery method"
                    className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              )}
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key={3}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-white">What’s Your Main Goal with TubeIO?</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {mainGoals.map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleMainGoalChange(goal)}
                    className={`px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 flex items-center space-x-2 ${
                      formData.mainGoal === goal
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    <span>{goal}</span>
                  </motion.div>
                ))}
              </div>
              {formData.mainGoal === 'Other' && (
                <div className="relative" ref={mainGoalRef}>
                  <input
                    type="text"
                    value={formData.customGoal}
                    onChange={handleCustomGoalInput}
                    placeholder="Enter your custom goal"
                    className="w-full p-3 pl-10 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              )}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="flex justify-between mt-6 space-x-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600 transition flex items-center justify-center space-x-2"
              >
                <ChevronLeft size={20} />
                <span>Back</span>
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
              >
                <span>Submit</span>
                <Check size={20} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;