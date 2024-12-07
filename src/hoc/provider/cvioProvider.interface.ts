import { Dispatch, SetStateAction } from "react"

export interface IPersonalDetails {
    [key: string]: string;
    fullName: string,
    email: string,
    phone: string,
    linkdinProfileUrl: string,
    city: string,
    state: string,
    description: string
};

export interface IWorkExperience {
    [key: string]: string;
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    city: string,
    description: string
}

export interface IProjectDetails {
    [key: string]: string;
    projectTitle: string;
    projectUrl: string;
    projectDescription: string;
    projectTechnologies?: any;
}

export interface IEducationDetails {
    [key: string]: string,
    school: string,
    degree: string,
    startDate: string,
    endDate: string,
    city: string,
    description: string
}

export interface ICvioContextProps {
    personalDetails: IPersonalDetails,
    setPersonalDetails: Dispatch<SetStateAction<IPersonalDetails>>,
    workExperience: Array<IWorkExperience>,
    setWorkExperience: Dispatch<SetStateAction<Array<IWorkExperience>>>,
    project: Array<IProjectDetails>,
    setProject: Dispatch<SetStateAction<Array<IProjectDetails>>>,
    skills: Array<string>,
    setSkills: Dispatch<SetStateAction<Array<string>>>,
    education: Array<IEducationDetails>,
    setEducation: Dispatch<SetStateAction<Array<IEducationDetails>>>,
    journeyStage: number,
    setJourneyStage: (stage: number) => number | void 
}