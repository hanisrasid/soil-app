import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import '../../shared/components/Forms/forms.css';

function Contact() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [successContact, setSuccessContact] = useState(false);

    //Submit form logic
    function handleSubmit(e) {
        e.preventDefault();
        setSuccessContact(true);
    }

    return (
        <>
            {successContact ?
            <div className="notification">
                <div className="popup-inner">
                    <h2>Successfully Contacted Our Team!</h2>
                    <button className="close-notif" onClick={() => navigate("/")}>&times;</button>
                    <div>
                        Close this window to view Home Page.
                    </div>
                </div>
            </div>
            : null
            }

            <div className='center'>
                <h2 className='center'>Contact:</h2>
            </div>
            <form className="center box" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email Address:</label>
                    <input type="email" className="form-control" name="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number:</label>
                    <input type="number" className="form-control" name="inputMobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputName">Full Name:</label>
                    <input className="form-control" name="inputName" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <button type="submit" className="my-btn btn-success" required>Contact</button>
            </form>
        </>
    )
}

export default Contact