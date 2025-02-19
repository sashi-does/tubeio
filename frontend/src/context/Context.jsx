import React, { useState, createContext } from 'react';

const Context = createContext({
  theme: true, 
  onToggleTheme: () => {}, 
  savedVideos: [],
  addSavedVideos: () => {}, 
});

export const ContextProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);

  const onToggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // Function to add a video to saved videos
  const addSavedVideos = (videoItem) => {
    setSavedVideos((prev) => [...prev, videoItem]);
  };

  return (
    <Context.Provider
      value={{
        theme: isDarkTheme,
        onToggleTheme,
        savedVideos,
        addSavedVideos,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;