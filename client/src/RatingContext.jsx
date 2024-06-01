import React, { createContext, useContext, useState } from "react";

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [averageRatings, setAverageRatings] = useState({});

  return (
    <RatingContext.Provider value={{ averageRatings, setAverageRatings }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => useContext(RatingContext);
