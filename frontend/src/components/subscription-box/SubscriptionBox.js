import * as React from 'react';
import { CContainer,CInput,CButton,CForm,CRow,CCol } from '@coreui/react';
import "./subscription.css";
const SubscriptionBox = ()=>{
    return (
        <>
             <div className='custom-color-com-2'>
                <CContainer>
                    <CRow>
                        <CCol md="12">
                            <div className='com-subscription-holder'>
                                <h4 className='subs-tiny-header-1'>#1 Software Company In World</h4>
                                <h3 className='subs-header-1'>Start your 14-days Free Trial</h3>
                                <h5 className='subs-tiny-desc-1'>Proactively coordinate quality quality vectors vis-a-vis supply chains engage client-centric web services.</h5>

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
export default SubscriptionBox;