import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import USER_API from '../../api/services/User';

import { useLogStatus, useLogStatusUpdate } from "../../shared/components/LogStatusContext"

import '../../shared/components/Forms/forms.css';

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [LogInError, setLogInError] = useState(false);
    const [successLogIn, setSuccessLogin] = useState(false);

    const logStatus = useLogStatus();
    const setLogStatus = useLogStatusUpdate();

    //Redirect user if already logged in
    useEffect(() => {
        if(logStatus !== null && !successLogIn) {
            navigate("/profile");
        }
    }, [navigate, logStatus, successLogIn]);

    //Submit form logic
    function handleSubmit(e) {
        e.preventDefault();

        let loggedInUser = null;
        
        USER_API.userLogin({email: email, password:password})
            .then((result)=>{
                loggedInUser = result.data.id
                if(loggedInUser !== null) {
                    setLogStatus(loggedInUser);
                    setLogInError(false);
                    setSuccessLogin(true);
                }
                else {
                    setLogInError(true);
                }   
            })
            .catch(error => console.error("Error: ", error))

    }

    return (
        <>
            {successLogIn ?
            <div className="notification">
                <div className="popup-inner">
                    <h2>Successfully Signed In!</h2>
                    <button className="close-notif" onClick={() => navigate("/profile")}>&times;</button>
                    <div>
                        Close this window to view profile.
                    </div>
                </div>
            </div>
            : null
            }

            <div className='center'>
                <h2 className='center'>Sign In</h2>
            </div>
            <form className="center box" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email Address:</label>
                    <input type="email" className="form-control" name="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password:</label>
                    <input type="password" className="form-control" name="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit" className="my-btn btn-success" required>Log In</button>

                {LogInError 
                    ? <p className="incorrect center">Incorrect Log-In Details!</p>
                    : null
                }

                <a className="center" href="/sign-up" required>Don't Have an Account?</a>
            </form>
        </>
    )
}

export default SignUp