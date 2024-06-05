import React, {useState, useEffect} from 'react';
import USER_API from '../../api/services/User'
import { NavLink, useNavigate } from "react-router-dom";

import { useLogStatus, useLogStatusUpdate } from "../../shared/components/LogStatusContext"

import '../../shared/components/Forms/forms.css';
import PathConstants from '../../routes/pathConstants';

function DeleteProfile() {
    const navigate = useNavigate();

    const logStatus = useLogStatus();
    const setLogStatus = useLogStatusUpdate();

    const [confirmDelete, setconfirmDelete] = useState('');
    const [successEdit, setsuccessEdit] = useState(false);
    const [account, setAccount] = useState(undefined);

    useEffect(() => {
        const getAccount = async () => {

            try {
                const account = 
                await USER_API.getUserDetails(logStatus);
                setAccount(account);
            } catch(e) {
                console.log(e);
            }
        
        }

        if(!account) {
            getAccount();
        }
    }, [])

    useEffect(() => {
        if(logStatus === null && !successEdit) {
            navigate("/sign-up");
        }
    }, [navigate, logStatus, successEdit]);

    //Submit form logic
    function handleSubmit(e) {
        e.preventDefault();

        if (confirmDelete.length > 0) {
            USER_API.deleteUser(logStatus)
            setLogStatus(null);

            setsuccessEdit(true);
        }
        else {
            navigate(PathConstants.HOME);
        }
    }

    return (
        <>
            {successEdit ?
            <div className="notification">
                <div className="popup-inner">
                    <h2>Successfully Deleted Account!</h2>
                    <NavLink className="close-notif" to={PathConstants.HOME}>
                        <button>&times;</button>
                    </NavLink>
                    <div>
                        Close this window to go to new home screen.
                    </div>
                </div>
            </div>
            : null
            }

            <div className='center'>
                <h2 className='center'>Delete Profile</h2>
            </div>
            <form className="center box" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="confirmDelete">Confirm deletion by typing in your account's email</label>
                    <input className="form-control" name="confirmDelete" 
                    pattern={account?.data.email} title="Ensure Email is Typed Correct!"
                    value={confirmDelete} placeholder={account?.data.email} onChange={(e) => setconfirmDelete(e.target.value)}></input>
                </div>
                <button type="submit" className="my-btn btn-danger">{(confirmDelete.length > 0) ? <span>Confirm <b>DELETION</b> of Account</span> : "Go Back"}</button>
            </form>
        </>
    )
}

export default DeleteProfile