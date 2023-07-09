import { createContext, useState } from "react";

// User value to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Wrapper for accessing user context
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
