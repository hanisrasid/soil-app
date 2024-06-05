import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import USER_API from '../../api/services/User';
import PathConstants from "../../routes/pathConstants";

import { useLogStatus, useLogStatusUpdate } from "../../shared/components/LogStatusContext"

import '../../shared/components/Forms/forms.css';

function Profile() {
    const navigate = useNavigate();

    const logStatus = useLogStatus();
    const setLogStatus = useLogStatusUpdate();
    const [account, setAccount] = useState(undefined);

    useEffect(() => {
        const getAccount = async () => {

            try {
                const accountData = await USER_API.getUserDetails(logStatus);
                if(accountData.data === null) {
                    setLogStatus(null);
                    navigate("/sign-up");
                }
                else {
                    setAccount(accountData);
                }
            } catch(e) {
                console.log(e);
            }
        
        }

        if(!account) {
            getAccount();
        }
    }, [account, logStatus])

    useEffect(() => {
        if(logStatus === null) {
            navigate("/sign-up");
        }
    }, [navigate, logStatus]);

    return (
        <>
            <h2 className="center">Account Details:</h2>
            {account ?
            <div className='center box my-btn'>
                <div>
                    <label>Full Name: <b>{account?.data.fullName}</b></label>
                </div>
                <div>
                    <label>Email: <b>{account?.data.email}</b></label>
                </div>
                <div>
                    {/* <label>Password: <b>{showPass ? account.data.password : "*".repeat(account.data.password)}</b>
                        <button className="small-btn btn-danger" onClick={() => setShowPass(!showPass)}>{showPass ? "Hide Password" : "Show Password"}</button>
                    </label> */}
                </div>
                <div>
                    <label>Date Joined: <b>{account?.data.dateCreated.substring(0, 10)}</b></label>
                </div>
            </div>
            :
            null
            }
            <div className="center flex-container">
                <NavLink to={PathConstants.EDITPROFILE} className="almost-halfway my-btn btn-success text-decoration-none text-center">
                <span>Edit Profile</span>
                </NavLink>
                <NavLink to={PathConstants.DELETEPROFILE} className="almost-halfway my-btn btn-danger text-decoration-none text-center">
                <span>Delete Profile</span>
                </NavLink>
            </div>
            <div className="center flex-container">
                <NavLink to={PathConstants.HOME} className="almost-halfway my-btn btn-primary text-decoration-none text-center" onClick={()=>{setLogStatus(null)}}>
                <span>Log Out</span>
                </NavLink>
            </div>
        </>
    )
}

export default Profile