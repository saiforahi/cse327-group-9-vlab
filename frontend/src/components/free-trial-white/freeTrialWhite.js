
import React from "react";
import { CContainer, CRow, CCol, CForm, CInput, CButton } from "@coreui/react";
import "./freetrialWhite.css";

const FreeTrialWhite = () => {
    return (
        <>
            <div className="white-back-subscription">
                <CContainer>
                    <CRow>
                        <CCol md="12">
                            <div className='com-subscription-holder-white'>
                                <h4 className='subs-tiny-header-1'>#1 Software Company In World</h4>
                                <h3 className='subs-header-1-white'>Start your 14-days Free Trial</h3>
                                <h5 className='subs-tiny-desc-1-white'>Proactively coordinate quality quality vectors vis-a-vis supply chains engage client-centric web services.</h5>

                                <CForm className="subs-com-form-white">
                                    <div className='com-subscribe-form'>
                                        <CInput type="email" id="floatingInput" floatingLabel="Email" placeholder="Enter your email" className="search-input search-box" />
                                        <CButton className="search-button-white">Subscribe</CButton>
                                    </div>
                                </CForm>
                            </div>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>

        </>
    )

}

export default FreeTrialWhite;