import React, { createContext, useContext, useState, ReactNode } from 'react';

type Restaurant = {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: string;
  location: string;
  categories: string;
};

type SavedContextType = {
  savedRestaurants: Restaurant[];
  toggleSave: (restaurant: Restaurant) => void;
};

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider = ({ children }: { children: ReactNode }) => {
  const [savedRestaurants, setSavedRestaurants] = useState<Restaurant[]>([]);

  const toggleSave = (restaurant: Restaurant) => {
    const isAlreadySaved = savedRestaurants.some(r => r.id === restaurant.id);
    if (isAlreadySaved) {
      setSavedRestaurants(prev => prev.filter(r => r.id !== restaurant.id));
    } else {
      setSavedRestaurants(prev => [...prev, restaurant]);
    }
  };

  return (
    <SavedContext.Provider value={{ savedRestaurants, toggleSave }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
};
