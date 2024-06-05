import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import USER_API from '../../api/services/User';

import { useLogStatus, useLogStatusUpdate } from "../../shared/components/LogStatusContext"

import '../../shared/components/Forms/forms.css';

function SignUp() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [successLogIn, setSuccessLogin] = useState(false);

    const confirmPassRef = useRef(null);
    const passRef = useRef(null);
    const emailRef = useRef(null);

    const logStatus = useLogStatus();
    const setLogStatus = useLogStatusUpdate();

    //Redirect user if already logged in
    useEffect(() => {
        if(logStatus !== null && !successLogIn) {
            navigate("/profile");
        }
    }, [navigate, logStatus, successLogIn]);

    //Check if confirm password is same as password after render
    useEffect(() => {
            if(confirmPassRef.current.value !== passRef.current.value) {
                confirmPassRef.current.setCustomValidity("Passwords Don't Match");
            }
            else {
                confirmPassRef.current.setCustomValidity("");
                passRef.current.setCustomValidity("");
            }
     }, [confirmPass,password]);

    //Submit form logic
    function handleSubmit(e) {
        e.preventDefault();

        let loggedInUser = null;
        
        USER_API.userSignUp({fullName: fullName, email: email, password:password})
            .then((result)=>{
                loggedInUser = result.data.id
                if(loggedInUser !== null) {
                    setLogStatus(loggedInUser);
                    setSuccessLogin(true);
                }
            })
            .catch(
                error => {
                    //Duplicate Email Error
                    if(error.response.status === 807) {
                        emailRef.current.setCustomValidity("Email Already has Account");
                    }
                    else {
                        console.log("Error: ", error);
                    }
                }
            )
    }

    return (
        <>
            {successLogIn ?
            <div className="notification">
                <div className="popup-inner">
                    <h2>Successfully Created Account!</h2>
                    <button className="close-notif" onClick={() => navigate("/profile")}>&times;</button>
                    <div>
                        Close this window to view profile.
                    </div>
                </div>
            </div>
            : null
            }

            <div className='center'>
                <h2 className='center'>Sign Up</h2>
            </div>
            <form className="center box" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputFullName">Full Name:</label>
                    <input className="form-control" name="inputFullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email Address:</label>
                    <input type="email" className="form-control" name="inputEmail" ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password:</label>

                    <input type="password" className="form-control" ref={passRef} name="inputPassword" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must contain at least one number, and one uppercase, and one lowercase letter, and at least 8 or more characters" 
                    value={password} onChange={(e) => setPassword(e.target.value)} required/>

                </div>
                <div className="form-group">
                    <label htmlFor="inputConfirmPassword">Confirm Password:</label>
                    <input type="password" className="form-control" ref={confirmPassRef} name="inputConfirmPassword" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required/>
                </div>
                <button type="submit" className="my-btn btn-success" required>Create New Account</button>
                <a className="center" href="/sign-in" required>Already Have an Account?</a>
            </form>
        </>
    )
}

export default SignUp