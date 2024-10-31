import React, { useContext, useRef } from "react";
import CvioContext from "../../hoc/provider/cvioProvider";
import "./PreviewPage.css";
import jsPDF from "jspdf";
import * as htmlToImage from 'html-to-image';
import { toast } from "react-toastify";
import { IEducationDetails, IProjectDetails, IWorkExperience } from "../../hoc/provider/cvioProvider.interface";

const PreviewPage = () => {
  const { personalDetails, workExperience, project, skills, education } =
    useContext(CvioContext);
  const resumeRef = React.useRef<HTMLInputElement>(null);

  //downloading the resume logic
  const downloadResume = async () => {
    const element = resumeRef.current;
    
    if(!element) {
      toast.info("Unable to capture the content at a moment");
      return;
    }

    htmlToImage.toPng(element, { quality : 0.2})
    .then((dataUrl) => {
      const pdf = new jsPDF();
      const img = new Image();

      img.src = dataUrl;

      img.onload = () => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (img.height * imgWidth) / img.width;

        let yOffset = 0;

        if (imgHeight <= pageHeight) {
        pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        while (yOffset < imgHeight) {
          pdf.addImage(dataUrl, "PNG", 0, -yOffset, imgWidth, imgHeight);
          yOffset += pageHeight;

          if (yOffset < imgHeight) {
            pdf.addPage();
          }
        }
      }
      pdf.save("download.pdf");
      };
    })
    .catch((error) => {
      console.error("Error generating image", error);
    });

  };

  return (
    <>
      <div className='container'>
        <div id='Cv_container'>
          <div className='Cv_container' ref={resumeRef}>
            <div className='name'>
              <span>{personalDetails.fullname}</span>
            </div>

            <div className='basicInfo'>
              <div className='contact'>
                <span id="phone">+91 {personalDetails.phone}</span>
                <p className='gmail'>
                  <a
                    href={`mailto:${personalDetails.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {personalDetails.email}
                  </a>
                </p>
                <div className='location'>
                  <span id='city'>
                    {personalDetails.city},{" "}
                    <span id='state'>{personalDetails.state}</span>
                  </span>
                </div>
              </div>

              {personalDetails.linkdinprofileurl && (
                <div className='social'>
                  <a
                    href={personalDetails.linkdinprofileurl}
                    className='linkedinProfile'
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {personalDetails.linkdinprofileurl}
                  </a>
                </div>
              )}
            </div>

            {personalDetails.description && (
              <div className='summary'>
                {personalDetails.description}
              </div>
            )}

            {skills && skills.length > 0 && (
              <>
                <p className='headers'>SKILLS</p>
                <div className='skills'>
                  {skills.map((skill: string, index: number) => (
                    <span style={{ fontSize: "20px" }} key={index}>
                      {skill} &nbsp;{" "}
                    </span>
                  ))}
                </div>
               
              </>
            )}
             <hr />

            {/* Work Experience */}
            {workExperience.length > 0 && (
              <>
                <p className='headers'>WORK EXPERIENCE</p>
                <div className='companyInfo'>
                  {workExperience.map((detail: IWorkExperience, index: number) => (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>
                          <span className='details'>
                            <strong>Company:</strong> {detail.company}
                          </span>
                        </p>
                        <span>
                          {detail.startDate} - {detail.endDate}
                        </span>
                      </div>
                      <p style={{ marginTop: "7px" }}>
                        <strong>Position:</strong> {detail.position}
                      </p>
                      <p style={{ marginTop: "7px" }}>
                        <strong>Location:</strong> {detail.city}
                      </p>
                      <p style={{ marginTop: "7px" }}>
                        <strong>Description:</strong> {detail.description}
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
                
              </>
            )}
            <hr />

            {/* Project */}
            {project.length > 0 && (
              <>
                <p className='headers'>PROJECT</p>
                <div className='projectInfo'>
                  {project.map((project: IProjectDetails, index: number) => (
                    <div key={index}>
                      <p>
                        <span className='details'>
                          <strong>Title:</strong> {project.projectTitle}
                        </span>
                      </p>
                      <p style={{ marginTop: "7px" }}>
                        <strong>ProjectUrl:</strong>{" "}
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.projectUrl}
                        </a>
                      </p>
                      <p style={{ marginTop: "7px" }}>
                        <strong>Description:</strong>{" "}
                        {project.projectDescription}
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
              </>
            )}
            
            <hr />
            

            {/* Education */}
            {education.length > 0 && (
              <>
                <p className='headers'>EDUCATION</p>
                <div className='collegeInfo'>
                  {education.map((education: IEducationDetails, index: number) => (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className='details'>
                          <strong>Degree:</strong> {education.degree}
                        </span>
                        <span>
                          {education.startDate} - {education.endDate}
                        </span>
                      </div>
                      <p className='details'>
                        <strong>School:</strong> {education.school}
                      </p>
                      <p style={{ marginTop: "8px" }}>
                        <strong>Location:</strong> {education.city}
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
                <hr />

                <p className='headers'>Personal Details</p>
                <div className='personalInfo'>
                  <div className='email'>
                    <strong>Email-Id: </strong>
                    <span>
                      <a
                        href={`mailto:${personalDetails.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {personalDetails.email}
                      </a>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className='downloadBtn'>
          <button className='download' onClick={downloadResume}>
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default PreviewPage;