import React, { useContext, useState } from "react";
import CvioContext from "../../hoc/provider/cvioProvider";
import Header from "../Header/Header";
import "./PersonalDetails.css";
import { ICvioContextProps, IPersonalDetails } from "../../hoc/provider/cvioProvider.interface";
import { SyntheticEvent } from "../../interfaces/Cvio.inteface";
import { JOURNEY_STAGES } from "../../constants/Common.constants";

const PersonalDetails = () => {
  const { personalDetails, setPersonalDetails, setJourneyStage} = useContext(CvioContext) as ICvioContextProps;
  const [localPersonalDetails, setlocalPersonalDetails] =
    useState<IPersonalDetails>(personalDetails);
  //eslint-disable-next-line no-unused-vars
  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});


  const validateField = (name:string, value: string) => {
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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setPersonalDetails(localPersonalDetails);
      setJourneyStage(JOURNEY_STAGES.WORK_EXPERIENCE)
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target;
    setlocalPersonalDetails({
      ...localPersonalDetails,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleBlur = (e: SyntheticEvent) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };


  const validate = () => {
    let formErrors: { [key: string]: string }= {};
    Object.keys(localPersonalDetails).forEach((fieldName: string) => {
      const fieldError = validateField(
        fieldName,
        localPersonalDetails[fieldName]
      );
      if (fieldError) formErrors[fieldName] = fieldError;
    });
    return formErrors;
  };

  return (
    <>
      <Header />

      <div className="main_container">
        <p className="Per_heading">Personal Details</p>

        <div className="Per_container">
          <form onSubmit={handleSubmit}>
            <div className="Per_sub_container">
              <div>
                <input
                  type="text"
                  name="fullname"
                  className="Per_input"
                  placeholder="Full Name"
                  value={localPersonalDetails.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors && <small>{'errors.fullName'}</small>}
              </div>

              <div>
                <input
                  type="text"
                  name="linkdinprofileurl"
                  className="Per_input"
                  placeholder="LinkedIn Profile URL"
                  value={localPersonalDetails.linkdinProfileUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors && (
                  <small>{'errors.linkdinProfileUrl'}</small>
                )}
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
                {errors && <small>{'errors.email'}</small>}
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
                {errors && <small>{'errors.phone'}</small>}
              </div>

              <div className="Per_textarea">
                <textarea
                  id="Per_textarea"
                  name="description"
                  cols={98}
                  rows={5}
                  placeholder="Professional Summary"
                  value={localPersonalDetails.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors && <small>{'errors.description'}</small>}

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
                {errors && <small>{'errors.city'}</small>}
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
                {errors && <small>{'errors.state'}</small>}
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

