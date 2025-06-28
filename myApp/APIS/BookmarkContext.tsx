import React, { createContext, useContext, useState } from 'react';

type Restaurant = {
  name: string;
  location: string;
};

type BookmarkContextType = {
  bookmarks: Restaurant[];
  addBookmark: (restaurant: Restaurant) => void;
  removeBookmark: (name: string) => void;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Restaurant[]>([]);

  const addBookmark = (restaurant: Restaurant) => {
    setBookmarks(prev =>
      prev.some(r => r.name === restaurant.name) ? prev : [...prev, restaurant]
    );
  };

  const removeBookmark = (name: string) => {
    setBookmarks(prev => prev.filter(r => r.name !== name));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used within a BookmarkProvider');
  return ctx;
};