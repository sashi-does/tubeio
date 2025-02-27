import React, { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { motion, AnimatePresence } from 'framer-motion';

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#060A17] via-[#0A0F1F] to-[#121826] p-6">
      {/* Background animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#2D5EFF] rounded-full mix-blend-screen blur-[120px] opacity-70"
          animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} />
        <motion.div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#4A3AFF] rounded-full mix-blend-screen blur-[120px] opacity-70"
          animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[#6B42FF] rounded-full mix-blend-screen blur-[120px] opacity-70"
          animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} />
      </div>
      
      {/* Auth Card */}
      <motion.div className="relative w-full max-w-md p-8 bg-[#0A0F1F] rounded-2xl shadow-2xl border border-gray-700">
        <div className="flex justify-center mb-6">
        <img
              alt="website logo"
              className="h-8 w-auto"
              src='https://res.cloudinary.com/dvukdxs2m/image/upload/v1739785683/tubeio-dark_huj4uc.png'
            />
        </div>
        <AnimatePresence mode="wait">
          {isSignIn ? (
            <motion.div key="signin" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <SignIn onToggle={() => setIsSignIn(false)} buttonColor="#2D5EFF" inputFocusColor="#4A3AFF" />
            </motion.div>
          ) : (
            <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <SignUp onToggle={() => setIsSignIn(true)} buttonColor="#2D5EFF" inputFocusColor="#4A3AFF" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default AuthPage;
