import React from "react";
import './Footer.css';
import PathConstants from "../../../routes/pathConstants";
import Logo from "../../../images/soil-logo.png";
import ContactSupport from "../../../images/customer-service.png";
import SignUp from "../../../images/add-friend.png";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();

    return(
        <>
            <footer className="d-flex justify-content-between shadow align-items-center p-2">
                <div>
                    <a href={PathConstants.HOME} className="d-flex align-items-center text-dark text-decoration-none">
                        <img
                            alt="logo"
                            width="60px"
                            src={Logo}
                        />
                        <span className="ms-4 fs-1 mb-0 fw-semibold">Soil</span>
                    </a>
                    <small className="ms-2">&copy; Soil, 2024. All rights reserved.</small>
                </div>
                <div>
                    <button onClick={() => navigate(PathConstants.SIGNIN)} type="button" className="my-btn">
                        <img
                            alt="sign-up"
                            width="30px"
                            src={SignUp}
                        />
                        <figcaption>Sign Up</figcaption>
                    </button>
                    <button onClick={() => navigate(PathConstants.CONTACT)} type="button" className="my-btn">
                        <img
                            alt="contact-support"
                            width="30px"
                            src={ContactSupport}
                        />
                        <figcaption>Contact Support</figcaption>
                    </button>
                </div>
            </footer>
        </>
    )
}

export default Footer;