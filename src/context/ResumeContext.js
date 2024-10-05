import React, { createContext, useState } from 'react';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [PersonalDetails, setPersonalDetails] = useState({
    fullname: '',
    email: '',
    phone: '',
    linkdinprofileurl: '',
    city: '',
    state: '',
    description: '',
  });

  const [workExperience, setWorkExperience] = useState([
    { company: '', position: '', startDate: '', endDate: '', city: '', description: '' }
  ]);

  const [Project, setProject] = useState([
    { projectTitle: '', projectUrl: '', projectDescription: '' }
  ]);

  const [ Education, setEducation ] = useState([
    { school:'', degree:'', startDate:'', endDate:'', city:'', description:''}
  ]);

  const [skills, setSkills] = useState([]);
  
  return (
    <ResumeContext.Provider
      value={{
        PersonalDetails, setPersonalDetails,
        workExperience, setWorkExperience,
        Project, setProject,
        skills, setSkills,
        Education, setEducation,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};