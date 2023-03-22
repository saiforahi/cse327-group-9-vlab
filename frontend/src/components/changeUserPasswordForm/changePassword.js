import React, { useState } from 'react';
import { CForm, CLabel, CInput, CCardBody, CCard, CButton } from '@coreui/react'
import './changePassoword.css';
import hidePwdImg from '../../assets/icons/Showpass-show.svg';
import showPwdImg from '../../assets/icons/Hide.svg';
const ChangePassword = () => {

    const [revealOldPwd, setRevealOldPwd] = useState(false);
    const [revealNewPwd, setRevealNewPwd] = useState(false);
    const [revealConfPwd, setRevealConfPwd] = useState(false); 
    const [userOldPass, setPwd] = useState('');
    const [userNewPass,setNPwd] =useState('');
    const [userConfPass,setCPwd]=useState('');

    return (
        <>
       
            <CCard className="mt-4 card-change-password">
                <CCardBody>
                    <CForm>
                        <div className="mb-2">
                            <CLabel className="custom-label-5" htmlFor="userOldPass">
                                Old Password
                            </CLabel>
                            <div className="password-container">
                                <CInput type={revealOldPwd ? "text" : "password"} name="userOldPass" className="custom-forminput-6" value={userOldPass} onChange={e => setPwd(e.target.value)} />
                                <img className="pwd-container-img"
                                    title={revealOldPwd ? "Hide Old password" : "Show Old password"}
                                    src={revealOldPwd ? hidePwdImg : showPwdImg}
                                    onClick={() => setRevealOldPwd(prevState => !prevState)}
                                />
                            </div>
                        </div>
                        {/**New Password */}
                        <div className="mb-2">
                            <CLabel className="custom-label-5" htmlFor="userNewPass">
                                New Password
                            </CLabel>
                            <div className="password-container">
                                <CInput type={revealNewPwd ? "text" : "password"} name="userNewPass" className="custom-forminput-6"  value={userNewPass}
          onChange={e => setNPwd(e.target.value)}/>
                                <img className="pwd-container-img"
                                    title={revealNewPwd ? "Hide New password" : "Show New password"}
                                    src={revealNewPwd ? hidePwdImg : showPwdImg}
                                    onClick={() => setRevealNewPwd(prevState => !prevState)}
                                />
                            </div>
                        </div>
                        {/**Confirm new password */}
                        <div className="mb-2">
                            <CLabel className="custom-label-5" htmlFor="userConfPass">
                                Confirm Password
                            </CLabel>
                            <div className="password-container">
                                <CInput type={revealConfPwd ? "text" : "password"} name="userConfPass" className="custom-forminput-6" value={userConfPass}  onChange={e => setCPwd(e.target.value)} />
                                <img className="pwd-container-img"
                                    title={revealConfPwd ? "Hide Confirm password" : "Show Confirm password"}
                                    src={revealConfPwd ? hidePwdImg : showPwdImg}
                                    onClick={() => setRevealConfPwd(prevState => !prevState)}/>
                            </div>
                        </div>
                        {/**BUtton groups */}
                        <div className="project-form-button-holders mt-3">
                            <CButton className="profile-form-btn update-profile">Update Password</CButton>
                            <CButton className="profile-form-btn cancel-update">Cancel</CButton>
                        </div>
                    </CForm>
                </CCardBody>

            </CCard>


        </>
    )
}

export default ChangePassword;