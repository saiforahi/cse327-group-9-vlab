import * as React from 'react';
import { CContainer,CInput,CButton,CForm,CRow,CCol } from '@coreui/react';
import "../subscription-box/subscription.css";

const SassSubscription = () =>{
    return(
        <>

<div className='custom-color-com-2'>
                <CContainer>
                    <CRow>
                        <CCol md="12">
                            <div className='com-subscription-holder'>
                                <h4 className='subs-tiny-header-1'>For Latest News & Update</h4>
                                <h3 className='subs-header-1'>Want Receive the Best SAAS Insights? Subscribe Now!</h3>
                                <h5 className='subs-tiny-desc-1'>We can help you to create your dream website for better business </h5>

                                <CForm className="subs-com-form">
                                    <div className='com-subscribe-form'>
                                        <CInput type="email" id="floatingInput" floatingLabel="Email" placeholder="Enter your email" className="search-input search-box" />
                                        <CButton className="search-button">Subscribe</CButton>
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

export default SassSubscription;