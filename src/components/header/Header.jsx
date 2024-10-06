import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';

const Header = () => {

    const [username, setUsername] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

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
        navigate('/');
        window.location.reload();
      };

      const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };

    return (
        <header>
            <p>CV.IO</p>
            
            <div className={styles.header_btn}>
              <div className={styles.icon}><FontAwesomeIcon icon={faUser} /></div>
              <div>
              {username ? (
                <>
                <span className={styles.username} onClick={toggleDropdown}>{username}</span>
                {dropdownOpen && (
                  <div className={styles.dropdown}>
                    <a onClick={handleLogout}>Log out</a>
                  </div>
                )}
                </> 
            ) : (
                <a className={styles.login_btn} onClick={() => navigate("/login")}>Log in</a>
            )}
              </div>
            </div>
        </header>
    );
};

export default Header;
