import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import Header from "../header/Header";
import "./Experience.css";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const Experience = () => {
  const { workExperience, setWorkExperience } = useContext(ResumeContext);
  const [localWorkExperience, setLocalWorkExperience] = useState(workExperience);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperience = [...localWorkExperience];
    updatedExperience[index][name] = value;
    setLocalWorkExperience(updatedExperience);

    // Clear the error for the specific field when it changes
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      if (newErrors[index]) {
        newErrors[index][name] = "";
      }
      return newErrors;
    });
  };

  const handleBlur = (e, index) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (!value) {
      // Check for the specific field and set the corresponding error message
      if (name === "company") errorMessage = "*Enter company name";
      if (name === "position") errorMessage = "*Enter position";
      if (name === "city") errorMessage = "*Enter city";
      if (name === "description") errorMessage = "*Enter job description";
    }

    // Update only the error for the specific field that was blurred
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      if (!newErrors[index]) {
        newErrors[index] = {};
      }
      newErrors[index][name] = errorMessage;
      return newErrors;
    });
  };

  const addMore = () => {
    setLocalWorkExperience([
      ...localWorkExperience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ]);
    setErrors([...errors, {}]); // Add a blank error object for the new experience entry
  };

  const remove = (index) => {
    const updatedList = [...localWorkExperience];
    updatedList.splice(index, 1);
    setLocalWorkExperience(updatedList);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the entire form before submission
    const validationErrors = localWorkExperience.map((exp) => {
      const errorObj = {};
      if (!exp.company) errorObj.company = "*Enter company name";
      if (!exp.position) errorObj.position = "*Enter position";
      if (!exp.city) errorObj.city = "*Enter city";
      if (!exp.description) errorObj.description = "*Enter job description";
      return errorObj;
    });

    setErrors(validationErrors);

    // Check if there are any errors
    const isValid = validationErrors.every((error) => Object.keys(error).length === 0);
    if (isValid) {
      setWorkExperience(localWorkExperience);
      navigate("/project");
    }
  };

  return (
    <>
      <Header />
      <div className="main_container"> 
        <p className="work_heading">Experience</p>
        <div className="ed_container">
        <form onSubmit={handleSubmit}>
          {localWorkExperience.map((detail, i) => (
            <div className="work_sub_container" key={i}>
              {/* Company Name */}
              <div>
                <input
                  type="text"
                  name="company"
                  value={detail.company}
                  onChange={(e) => handleChange(e, i)}
                  onBlur={(e) => handleBlur(e, i)}  // Call handleBlur on blur
                  placeholder="Company Name"
                  className="work_inputtext"
                />
                {errors[i]?.company && <small className="error-message">{errors[i].company}</small>}
              </div>

              {/* Position */}
              <div>
                <input
                  type="text"
                  name="position"
                  value={detail.position}
                  onChange={(e) => handleChange(e, i)}
                  onBlur={(e) => handleBlur(e, i)}  // Call handleBlur on blur
                  placeholder="Position"
                  className="work_inputtext"
                />
                {errors[i]?.position && <small className="error-message">{errors[i].position}</small>}
              </div>

              {/* Start Date and End Date */}
              <div className="work_date_Container">
                <input
                  type="month"
                  name="startDate"
                  value={detail.startDate}
                  onChange={(e) => handleChange(e, i)}
                  className="work_inputtext"
                  placeholder="Start date"
                />
                <input
                  type="month"
                  name="endDate"
                  value={detail.endDate}
                  onChange={(e) => handleChange(e, i)}
                  className="work_inputtext"
                  placeholder="End date"
                />
              </div>

              {/* City */}
              <div className="work_city">
                <input
                  type="text"
                  name="city"
                  value={detail.city}
                  onChange={(e) => handleChange(e, i)}
                  onBlur={(e) => handleBlur(e, i)}  // Call handleBlur on blur
                  placeholder="City"
                  className="work_inputtext"
                />
                {errors[i]?.city && <small className="error-message">{errors[i].city}</small>}
              </div>

              {/* Job Description */}
              <div className="work_textarea">
                <textarea
                  name="description"
                  value={detail.description}
                  onChange={(e) => handleChange(e, i)}
                  onBlur={(e) => handleBlur(e, i)}  // Call handleBlur on blur
                  cols="98"
                  rows="5"
                  style={{ resize: "vertical" }}
                  placeholder="Summary"
                  id="work_textarea"
                ></textarea>
                {errors[i]?.description && <small className="error-message">{errors[i].description}</small>}
              </div>

              {/* Add/Remove Buttons */}
              <div>
                {localWorkExperience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    disabled={localWorkExperience.length <= 1}
                  >
                    Remove
                  </button>
                )}
                {i === localWorkExperience.length - 1 && (
                  <button type="button" id="work_addMore" onClick={addMore}>
                    Add More
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Back and Next Buttons */}
          <div className="work_btn_container">
            <button
              type="button"
              className="work_btn"
              onClick={() => navigate("/personal")}
            >
              Back
            </button>
            <button type="submit" className="work_btn">
              Next
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default Experience;
