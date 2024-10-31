import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { JOURNEY_STAGES } from "../../constants/Common.constants";
import CvioContext from "../../hoc/provider/cvioProvider";

const Header = () => {
  const { setJourneyStage } = useContext(CvioContext);
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    setDropdownOpen(false);
    document.location.href = "/"
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <p>CV.iO</p>

      <div className='header_btn'>
        <div className='icon'><FontAwesomeIcon icon={faUser} /></div>
        <div>
          {username ? (
            <>
              <span className='username' onClick={toggleDropdown}>{username}</span>
              {dropdownOpen && (
                <div className='dropdown'>
                  <span onClick={handleLogout}>Log out</span>
                </div>
              )}
            </>
          ) : (
            <a href="/login" className='login_btn' onClick={() => setJourneyStage(JOURNEY_STAGES.PERSONAL_DETAILS)}>Log in</a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;