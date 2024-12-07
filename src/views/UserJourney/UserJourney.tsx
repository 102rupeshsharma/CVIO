import React, { useContext } from "react";
import CvioContext from "../../hoc/provider/cvioProvider";
import PersonalDetails from "../../organisms/PersonalDetails/PersonalDetails";
import WorkExperience from "../../organisms/WorkExperience/WorkExperience";
import ProjectDetails from "../../organisms/ProjectDetails/ProjectDetails";
import Education from "../../organisms/Education/Education";
import Skills from "../../organisms/Skills/Skills";
import PreviewPage from "../PreviewPage/PreviewPage";
import HomePage from "../Homepage/Homepage";

const UserJourney = () => {
    const { journeyStage } = useContext(CvioContext);

    switch (journeyStage) {
        case 0:
            return <HomePage/>
        case 1:
            return <PersonalDetails />
        case 2:
            return <WorkExperience />
        case 3:
            return <ProjectDetails />
        case 4:
            return <Education />
        case 5:
            return <Skills />
        case 6:
            return <PreviewPage />
        default:
            return <HomePage/>
    }
}

export default UserJourney;