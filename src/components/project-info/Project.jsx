import React, { useContext, useState, useEffect } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import "./Project.css";

const Project = () => {
  const { Project, setProject } = useContext(ResumeContext);
  const [localProject, setLocalProject] = useState(Project);
  const [errors, setErrors] = useState([]); 
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProject = [...localProject];
    updatedProject[index][name] = value;
    setLocalProject(updatedProject);

    // Clear error for the specific field being updated
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = { ...newErrors[index], [name]: "" };
      return newErrors;
    });
  };

  const addMore = () => {
    setLocalProject([
      ...localProject,
      {
        projectTitle: "",
        projectUrl: "",
        projectDescription: "",
      },
    ]);
    setErrors([...errors, {}]); // Add an empty error object for the new entry
  };

  const remove = (index) => {
    const updatedList = [...localProject];
    updatedList.splice(index, 1);
    setLocalProject(updatedList);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  // Validate form fields
  const validateForm = () => {
    const formErrors = localProject.map((proj) => {
      let errors = {};
      if (!proj.projectTitle) errors.projectTitle = "*Enter project title";
      if (!proj.projectUrl) errors.projectUrl = "*Enter project URL";
      if (!proj.projectDescription) errors.projectDescription = "*Enter project description";
      return errors;
    });

    return formErrors;
  };

  // Check if the form is valid
  const checkFormValidity = () => {
    const validationErrors = validateForm();
    const isValid = validationErrors.every((errorObj) => Object.keys(errorObj).length === 0);
    setIsFormValid(isValid);
  };

  // Trigger form validation whenever the project details change
  useEffect(() => {
    checkFormValidity();
  }, [localProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors); // Show errors if any field is invalid

    if (isFormValid) {
      setProject(localProject); // Update context with localProject data
      navigate("/skills");
    }
  };

  return (
    <>
      <Header />
      <div className="project_heading">Project Info</div>
      <div className="project_container">
        <form onSubmit={handleSubmit}>
          {localProject.map((detail, i) => (
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
                />
                {errors[i]?.projectUrl && <small className="error-message">{errors[i].projectUrl}</small>}
              </div>

              {/* Project Description */}
              <div className="project_textarea">
                <textarea
                  id="project_textarea"
                  name="projectDescription"
                  cols="95"
                  rows="5"
                  placeholder="Enter the project description"
                  value={detail.projectDescription}
                  onChange={(e) => handleChange(i, e)}
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
                  <button type="button" id="project_addMore" onClick={addMore}>
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
              onClick={() => navigate("/experience")}
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
    </>
  );
};

export default Project;
