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

    // Clear specific error when a field is updated
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = { ...newErrors[index], [name]: "" };
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
    setErrors([...errors, {}]); // Add a new blank error object for the new experience entry
  };

  const remove = (index) => {
    const updatedList = [...localWorkExperience];
    updatedList.splice(index, 1);
    setLocalWorkExperience(updatedList);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const validateForm = () => {
    const errors = localWorkExperience.map((exp) => {
      const errorObj = {};
      if (!exp.company) errorObj.company = "*Enter company name";
      if (!exp.position) errorObj.position = "*Enter position";
      if (!exp.city) errorObj.city = "*Enter city";
      if (!exp.description) errorObj.description = "*Enter job description";
      return errorObj;
    });

    setErrors(errors);
    return errors.every((error) => Object.keys(error).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setWorkExperience(localWorkExperience);
      navigate("/project");
    }
  };

  return (
    <>
      <Header />
      <div className="work_container">
        <div className="work_heading">Experience</div>
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
    </>
  );
};

export default Experience;
