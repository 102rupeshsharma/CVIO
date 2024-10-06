import React, { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import "./PersonalDetails.css";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { PersonalDetails, setPersonalDetails } = useContext(ResumeContext);
  const [localPersonalDetails, setlocalPersonalDetails] = useState(PersonalDetails);
  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});

  // Function to validate individual fields
  const validateField = (name, value) => {
    let fieldError = "";

    if (name === "fullname" && !value.trim()) {
      fieldError = "*Enter your full name";
    } else if (name === "linkdinprofileurl" && !value.trim()) {
      fieldError = "*Enter your LinkedIn profile URL";
    } else if (name === "email" && !value.includes("@")) {
      fieldError = "*Enter a valid email";
    } else if (name === "phone" && value.length !== 10) {
      fieldError = "*Enter a valid 10-digit phone number";
    } else if (name === "description" && !value.trim()) {
      fieldError = "*Describe yourself";
    } else if (name === "city" && !value.trim()) {
      fieldError = "*Enter your city";
    } else if (name === "state" && !value.trim()) {
      fieldError = "*Enter your state";
    }

    return fieldError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();      
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setPersonalDetails(localPersonalDetails);
      navigate("/experience");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlocalPersonalDetails({
      ...localPersonalDetails,
      [name]: value
    });
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value)
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true
    }));

    // Validate the specific field when the user leaves it (onBlur event)
    const fieldError = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError
    }));
  };

  const validate = () => {
    let formErrors = {};
    Object.keys(localPersonalDetails).forEach((fieldName) => {
      const fieldError = validateField(fieldName, localPersonalDetails[fieldName]);
      if (fieldError) formErrors[fieldName] = fieldError;
    });
    return formErrors;
  };

  return (
    <>
      <Header />

      <div>
        <div className="Per_heading">Personal Details</div>

        <div className="Per_container">
          <form onSubmit={handleSubmit}>
            <div className="Per_sub_container">
              <div>
                <input
                  type="text"
                  name="fullname"
                  className="Per_input"
                  placeholder="Full Name"
                  value={localPersonalDetails.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.fullname && <small>{errors.fullname}</small>}
              </div>

              <div>
                <input
                  type="text"
                  name="linkdinprofileurl"
                  className="Per_input"
                  placeholder="LinkedIn Profile URL"
                  value={localPersonalDetails.linkdinprofileurl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.linkdinprofileurl && <small>{errors.linkdinprofileurl}</small>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="Per_input"
                  value={localPersonalDetails.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && <small>{errors.email}</small>}
              </div>

              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="Per_input"
                  value={localPersonalDetails.phone}
                  onChange={handleChange}
                  maxLength={10}
                  onBlur={handleBlur}
                />
                {errors.phone && <small>{errors.phone}</small>}
              </div>

              <div className="Per_textarea">
                <textarea
                  id="Per_textarea"
                  name="description"
                  cols="98"
                  rows="5"
                  placeholder="Professional Summary"
                  value={localPersonalDetails.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && <small>{errors.description}</small>}
              </div>

              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="Per_input"
                  value={localPersonalDetails.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.city && <small>{errors.city}</small>}
              </div>

              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="Per_input"
                  value={localPersonalDetails.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.state && <small>{errors.state}</small>}
              </div>
            </div>

            <div className="Per_btn_container">
              <button className="Per_nextBtn" type="submit">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;