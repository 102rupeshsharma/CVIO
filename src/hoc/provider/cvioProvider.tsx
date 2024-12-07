import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { JOURNEY_STAGES } from '../../constants/Common.constants';
import { IEducationDetails, IPersonalDetails, IProjectDetails, ICvioContextProps, IWorkExperience, } from './cvioProvider.interface';

const defaultJourneyStage = JOURNEY_STAGES.Home_PAGE;

const initialState = {
  personalDetails: { fullName: '', email: '', phone: '', linkdinProfileUrl: '', city: '', state: '', description: '' },
  setPersonalDetails: () => {},
  workExperience: [],
  setWorkExperience: () => {},
  project: [],
  setProject: () => {},
  skills: [] as string[],
  setSkills: () => {},
  education: [],
  setEducation: () => {},
  journeyStage: defaultJourneyStage,
  setJourneyStage: (stage: number) => stage
}

const CvioContext = createContext<ICvioContextProps>(initialState);


export const CvioProvider = ({ children }: { children: ReactNode }) => {
  const [journeyStage, setJourneyStage] = useState<number>(defaultJourneyStage);

  const [personalDetails, setPersonalDetails] = useState<IPersonalDetails>({
    fullName: '',
    email: '',
    phone: '',
    linkdinProfileUrl: '',
    city: '',
    state: '',
    description: '',
  });

  const [workExperience, setWorkExperience] = useState<Array<IWorkExperience>>([
    { company: '', position: '', startDate: '', endDate: '', city: '', description: '' }
  ]);

  const [project, setProject] = useState<Array<IProjectDetails>>([
    { projectTitle: '', projectUrl: '', projectDescription: '' }
  ]);

  const [education, setEducation] = useState<Array<IEducationDetails>>([
    { school: '', degree: '', startDate: '', endDate: '', city: '', description: '' }
  ]);

  const [skills, setSkills] = useState<string[] | never[]>([]);
  debugger;
  
  const contextProvider = useMemo(() => ({
    personalDetails,
    setPersonalDetails,
    workExperience,
    setWorkExperience,
    project,
    setProject,
    skills,
    setSkills,
    education,
    setEducation,
    journeyStage,
    setJourneyStage
  }), [personalDetails, setJourneyStage, workExperience, project, skills, education, journeyStage]);

  return (
    <CvioContext.Provider value={contextProvider}>
      {children}
    </CvioContext.Provider>
  );
};

export default CvioContext;