
import React, { useState } from "react";
import {
    CForm,
    CLabel,
    CInput,
    CButton,
} from "@coreui/react";
import './forgotPass.css';
import { Link, useHistory } from "react-router-dom";

const ForgotPass = () => {
    return (
        <>
            <div className="forgot-pass-page align-items-center">
                <div className="container">
                   
                    <div className="row">
                        {/**form section */}
                        <div className="col-lg-5 col-sm-12">
                        <h3 className="forgot-header">Forgot Password</h3>
                            <div className="forgot-form-holder">
                                <CForm>
                                    <div className="mb-3 text-center">
                                        {/* <CLabel
                                            htmlFor="exampleInputEmail1"
                                            className="custom-label-forgot"
                                        >
                                            Email
                                        </CLabel> */}
                                        {/* <CInput
                                            type="email"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            className="custom-formgroup-forgot"
                                        /> */}
                                        <h4 className="contact-admin-text">Hey There !</h4>
Kindly contact with the admin to reset your password

                                        {/* <CFormText id="emailHelp">
      We'll never share your email with anyone else.
    </CFormText> */}
                                    </div>

                                    {/**submit button */}
                                    {/* <div className="submit-holder-pass">
                                        <CButton type="submit" className="submit-button-forgot">
                                            Send
                                        </CButton>
                                    </div> */}
                                    {/**redirect to other pages */}
                                    <h5 className="dum-text mt-3">Here by mistake?</h5>
                                    <div className="redirect-to-pages mt-2">

                                    <h5 className="final-footer"><Link className="registration-link" to="/">Sign in</Link></h5>
                                    <h5 className="final-footer sign-up-forgot"><Link className="registration-link" to="/register">Register</Link></h5> 
                                    </div>
                                </CForm>
                            </div>
                        </div>


                        {/**only image */}
                        <div className="col-lg-6 offset-lg-1 col-sm-12 image-holder no-mob-display-forgot">
                            <img
                                src={"assets/bgs/forgot-pass-2.svg"}
                                alt="Image"
                                className="img-fluid img-bg-forgot"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ForgotPass;