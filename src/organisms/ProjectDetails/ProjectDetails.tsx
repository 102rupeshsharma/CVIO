import React, { useContext, useState, useEffect, useCallback} from "react";
import CvioContext from "../../hoc/provider/cvioProvider";
import Header from "../Header/Header";
import "./ProjectDetails.css";
import { SyntheticEvent } from "../../interfaces/Cvio.inteface";
import { IProjectDetails } from "../../hoc/provider/cvioProvider.interface";
import { JOURNEY_STAGES } from "../../constants/Common.constants";

const ProjectDetails = () => {
  const { project, setProject, setJourneyStage } = useContext(CvioContext);
  const [localProject, setLocalProject] = useState(project);
  const [errors, setErrors] = useState<Array<IProjectDetails>>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (index: number, e: SyntheticEvent) => {
    const { name, value } = e.target;
    const updatedProject = [...localProject];
    updatedProject[index][name] = value;
    setLocalProject(updatedProject);

    // Clear error for the specific field being updated
    setErrors((prevErrors: any) => {
      const newErrors = [...prevErrors];
      newErrors[index] = { ...newErrors[index], [name]: "" };
      return newErrors;
    });
  };

  const handleBlur = (index: number, e: SyntheticEvent) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (!value) {
      if (name === "projectTitle") errorMessage = "*Enter project title";
      if (name === "projectUrl") errorMessage = "*Enter project URL";
      if (name === "projectDescription") errorMessage = "*Enter project description";
    }

    // Update the specific error for the field that was blurred
    setErrors((prevErrors: Array<any>) => {
      const newErrors = [...prevErrors];
      if (!newErrors[index]) {
        newErrors[index] = {};
      }
      newErrors[index][name] = errorMessage;
      return newErrors;
    });
  };

  const addMore = () => {
    const newProject = {
      projectTitle: "",
      projectUrl: "",
      projectDescription: ""
    };
    setLocalProject([...localProject, newProject]);
    setErrors([...errors]);
  };

  const remove = (index: number) => {
    const updatedList = [...localProject];
    updatedList.splice(index, 1);
    setLocalProject(updatedList);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  // Validate form fields
  const validateForm = useCallback(() => {
    const formErrors = localProject.map((proj: IProjectDetails) => {
      let errors = {
        projectTitle: "",
        projectUrl: "",
        projectDescription: ""
      };
      if (!proj.projectTitle) errors.projectTitle = "*Enter project title";
      if (!proj.projectUrl) errors.projectUrl = "*Enter project URL";
      if (!proj.projectDescription) errors.projectDescription = "*Enter project description";
      return errors;
    });

    return formErrors;
  }, [localProject]);

  // Check if the form is valid
  const checkFormValidity = useCallback(() => {
    const validationErrors = validateForm();
    const isValid = validationErrors.every((errorObj) => Object.keys(errorObj).length === 0);
    setIsFormValid(isValid);
  }, [validateForm]);

  // Trigger form validation whenever the project details change
  useEffect(() => {
    checkFormValidity();
  }, [localProject, checkFormValidity]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors); // Show errors if any field is invalid

    // if (isFormValid) {
    //   setProject(localProject);
      setJourneyStage(JOURNEY_STAGES.SKILLS);
    // }
  };

  return (
    <>
      <Header />
      <div className="main_container">
        <div className="project_heading">Project Info</div>
        <div className="project_container">
          <form onSubmit={handleSubmit}>
            {localProject.map((detail: IProjectDetails, i: number) => (
              <div key={i} className="project_sub_container">
                {/* Project Title */}
                <div>
                  <input
                    type="text"
                    name="projectTitle"
                    className="project_input"
                    placeholder="Project Title"
                    value={detail.projectTitle}
                    onChange={(e) => handleChange(i, e)}
                    onBlur={(e) => handleBlur(i, e)} // Call handleBlur on blur
                  />
                  {errors[i]?.projectTitle && <small className="error-message">{errors[i].projectTitle}</small>}
                </div>

                {/* Project URL */}
                <div>
                  <input
                    type="text"
                    name="projectUrl"
                    className="project_input"
                    placeholder="Project URL"
                    value={detail.projectUrl}
                    onChange={(e) => handleChange(i, e)}
                    onBlur={(e) => handleBlur(i, e)} // Call handleBlur on blur
                  />
                  {errors[i]?.projectUrl && <small className="error-message">{errors[i].projectUrl}</small>}
                </div>

                {/* Project Description */}
                <div className="project_textarea">
                  <textarea
                    id="project_textarea"
                    name="projectDescription"
                    cols={95}
                    rows={5}
                    placeholder="Enter the project description"
                    value={detail.projectDescription}
                    onChange={(e) => handleChange(i, e)}
                    onBlur={(e) => handleBlur(i, e)} // Call handleBlur on blur
                  />
                  {errors[i]?.projectDescription && <small className="error-message">{errors[i].projectDescription}</small>}
                </div>

                {/* Add/Remove Buttons */}
                <div className="button_container">
                  {localProject.length > 1 && (
                    <button
                      type="button"
                      className="add_remove"
                      onClick={() => remove(i)}
                      disabled={localProject.length <= 1}
                    >
                      Remove
                    </button>
                  )}
                  {i === localProject.length - 1 && (
                    <button type="button" className="add_remove" onClick={addMore}>
                      Add More
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Back and Next Buttons */}
            <div className="project_btn_container">
              <button
                type="button"
                onClick={() => setJourneyStage(JOURNEY_STAGES.WORK_EXPERIENCE)}
                className="project_btn"
              >
                Back
              </button>
              <button
                type="submit"
                className="project_btn"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
