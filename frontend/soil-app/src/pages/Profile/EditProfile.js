import React, {useState, useEffect, useRef} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import USER_API from '../../api/services/User'

import { useLogStatus } from "../../shared/components/LogStatusContext"

import '../../shared/components/Forms/forms.css';
import PathConstants from '../../routes/pathConstants';

function EditProfile() {
    const navigate = useNavigate();
    const logStatus = useLogStatus();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [newPass, setNewPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [successEdit, setsuccessEdit] = useState(false);
    const [account, setAccount] = useState(null);


    const confirmPassRef = useRef(null);
    const passRef = useRef(null);

    useEffect(() => {
        const getAccount = async () => {

            try {
                const accountData = await USER_API.getUserDetails(logStatus);
                setAccount(accountData);
                console.log(accountData)
            } catch(e) {
                console.log("This is the error: ",e);
            }
        
        }

        if(!account) {
            getAccount();
        }
    }, [])

    useEffect(() => {
        if(logStatus === null) {
            navigate("/sign-up");
        }
    }, [navigate, logStatus]);

    //Check if confirm password is same as new password after render
    useEffect(() => {
            if(confirmPassRef.current.value !== passRef.current.value) {
                confirmPassRef.current.setCustomValidity("Passwords Don't Match");
            }
            else {
                confirmPassRef.current.setCustomValidity("");
                passRef.current.setCustomValidity("");
            }
     }, [newPass,confirmPass]);

        //Submit form logic
    async function handleSubmit(e) {
        e.preventDefault();

        var newEmail = email;
        var newName = fullName;
        var newPassword = newPass;

        if(!email) {
            newEmail = account.data.email;
        }
        if(!fullName) {
            newName = account.data.fullName;
        }
        if(!newPass) {
            newPassword = account.data.password;
        }
  
        var details =
        {
            fullName : newName,
            email : newEmail,
            password : newPassword,
            id: logStatus
        }

        const response = await USER_API.updateUserDetails(details)
        
        if (response.status === 200) {
            setsuccessEdit(true)
        }
        else console.log("Error updating user");

    }

    return (
        <>
            {successEdit ?
            <div className="notification">
                <div className="popup-inner">
                    <h2>Successfully Edited Account!</h2>
                    <NavLink className="close-notif" to={PathConstants.PROFILE}>
                        <button>&times;</button>
                    </NavLink>
                    <div>
                        Close this window to view new profile.
                    </div>
                </div>
            </div>
            : null
            }

            <div className='center'>
                <h2 className='center'>Edit Profile</h2>
            </div>
            <form className="center box" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputFullName">Full Name:</label>
                    <input className="form-control" name="inputFullName" placeholder={account?.data.fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email Address:</label>
                    <input type="email" className="form-control" name="inputEmail" placeholder={account?.data.email} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputConfirmPassword">New Password:</label>
                    <input type="password" className="form-control" ref={passRef}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must contain at least one number, and one uppercase, and one lowercase letter, and at least 8 or more characters" 
                    name="inputConfirmPassword" placeholder="New password" value={newPass}  onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputConfirmPassword">Confirm New Password:</label>
                    <input type="password" placeholder="Confirm New Password" className="form-control" ref={confirmPassRef} name="inputConfirmPassword" 
                    value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
                </div>
                <button type="submit" className="my-btn btn-success">{(fullName.length > 0 || email.length > 0 || newPass.length > 0 || confirmPass.length > 0) ? "Confirm Edit" : "Go Back"}</button>
                <p className="center">(Leave Space Clear to Keep the Same Details)</p>
            </form>
        </>
    )
}

export default EditProfile