import { createContext, useContext, useEffect, useState } from 'react';

const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [selectedSkills, setSelectedSkills] = useState(() => {
    // Initialize with skills from localStorage or an empty array
    const storedSkills = localStorage.getItem('selectedSkills');
    return storedSkills ? JSON.parse(storedSkills) : [];
  });

  const setSkills = (skills) => {
    setSelectedSkills(skills);
    localStorage.setItem('selectedSkills', JSON.stringify(skills));
  };

  // Clear localStorage when the component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem('selectedSkills');
    };
  }, []);

  return (
    <SkillsContext.Provider value={{ selectedSkills, setSkills }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = () => {
  return useContext(SkillsContext);
};
