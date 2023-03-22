import CIcon from "@coreui/icons-react";
import {
    CLabel,
    CContainer,
    CNav,
    CNavItem,
    CNavLink,
    CTabPane,
    CTabContent,
    CRow,
    CTabs,
    CCard,
    CButton,
    CImg,
    CCardBody,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CInput,
    CAlert,
} from "@coreui/react";
import Select from 'react-select'
import React, { useEffect, useRef, useState } from "react";
import "./profileView.css";
import PassWordChangeForm from "../../components/changeUserPasswordForm/changePassword";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { API, BASE_URL, FILE_API, USER_ID } from "../../Config";
import { fetchPersonalDetails } from "../../store/slices/ProfileSlice";
import swal from "sweetalert";
import hidePwdImg from '../../assets/icons/Showpass-show.svg';
import showPwdImg from '../../assets/icons/Hide.svg';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import LinearWithValueLabel from '../../components/linear-progress-bar/linear-progress-bar';
import { has_permission } from "../../helper.js";

const UserProfile = () => {
    let history = useHistory();
    const onButtonClick = () => {
        // `current` points to the mounted file input element
    };
    const blood_groups = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
    ]
    const { id } = useParams()
    const [revealOldPwd, setRevealOldPwd] = useState(false);
    const [revealNewPwd, setRevealNewPwd] = useState(false);
    const [revealConfPwd, setRevealConfPwd] = useState(false);
    // const profile_details = useSelector(state => state.profile.data)
    const [profile_details, setProfileDetails] = useState()

    const [initialBloodGroup, setInitialBloodGroup] = useState("")
    const inputFile = useRef(null)
    const [image, setImage] = useState()
    
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()
    const onImageChange = (image) => {
        // setImage(image)
        // setAvatar(URL.createObjectURL(image))
        // update_profile_image(image)
    }
    const changeImageClick = () => {
        inputFile.current.click()
    }
    
    useEffect(() => {
        console.log('id from route', id)
    }, [])

    function capitalize(string) {
        if (string != undefined) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        return ''
    }

    const [activeKey, setActiveKey] = useState(1)

    return (
        <>
            <CContainer>
                <CModal closeOnBackdrop={false} alignment="center" show={visible} >
                    <CModalHeader closeButton>
                        <CModalTitle className="modal-title-profile">
                            <span className="edit-profile-form-header">
                                Edit Profile Info
                            </span>
                        </CModalTitle>
                    </CModalHeader>

                    <CModalBody>
                        <CContainer>
                            <CForm>
                                <CRow>
                                    {/**First Name */}
                                    <div className="col-md-6 mb-3">
                                        <CLabel className="custom-label-5" htmlFor="userFName">
                                            First Name *
                                        </CLabel>
                                        <CInput
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            className="custom-forminput-6"
                                            
                                        />
                                    </div>
                                    {/**Last Name */}
                                    <div className="col-md-6 mb-3">
                                        <CLabel className="custom-label-5" htmlFor="userLName">
                                            Last Name *
                                        </CLabel>
                                        <CInput
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            className="custom-forminput-6"
                                            
                                        />
                                    </div>
                                    {/**Job title */}
                                    <div className="col-md-12 mb-3">
                                        <CLabel className="custom-label-5" htmlFor="uEmail">
                                            Email *
                                        </CLabel>
                                        <CInput
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="custom-forminput-6"
                                        ></CInput>
                                    </div>
                                    {/**Phone */}
                                    <div className="col-md-12 mb-3">
                                        <CLabel className="custom-label-5" htmlFor="uPhoneNo">
                                            Phone *
                                        </CLabel>
                                        <CInput
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            className="custom-forminput-6"
                                        ></CInput>
                                    </div>
                                    {/**address */}
                                    <div className="col-md-12 mb-3">
                                        <CLabel className="custom-label-5" htmlFor="Address">
                                            Address *
                                        </CLabel>
                                        <CInput
                                            type="text"
                                            name="address"
                                            id="address"
                                            className="custom-forminput-6"
                                        ></CInput>
                                        
                                    </div>
                                    {/**blood_group */}
                                    <div className="col-md-12 mb-3">
                                        <CLabel className="custom-label-5" htmlFor="blood_group">
                                            Blood Group *
                                        </CLabel>
                                        <Select
                                            id="blood_group"
                                            className="custom-forminput-6"
                                            options={blood_groups}
                                        ></Select>
                                    </div>

                                    {/**Button groups */}
                                    <div className="col-md-12 ">
                                        <div className="project-form-button-holders mt-3">
                                            <CButton className="profile-form-btn update-profile" type="button">
                                                Update Info
                                            </CButton>
                                            <CButton className="profile-form-btn cancel-update" type="reset" onClick={() => setVisible(!visible)}>
                                                Cancel
                                            </CButton>
                                        </div>
                                    </div>
                                </CRow>
                            </CForm>
                        </CContainer>
                    </CModalBody>
                </CModal>

                {/**Main Content */}

                <CTabs activeTab="viewProfile">
                    <CNav variant="tabs" className="tab-style">
                        {/**View Profile */}
                        <CNavItem>
                            <CNavLink data-tab="viewProfile" className="special">
                                <CIcon name="cil-user" /> View Profile
                            </CNavLink>
                        </CNavItem>
                        {/**change password */}
                        <CNavItem>
                            <CNavLink disabled={profile_details?.id != sessionStorage.getItem(USER_ID) ? true : false} data-tab="changePassword" className="special">
                                <CIcon name="cil-pen-alt" className="mr-1" />
                                Change Password
                            </CNavLink>
                        </CNavItem>
                    </CNav>
                    {/**___________nav tab details______ */}
                    <CTabContent>
                        {/**_____VIEW PROFILE____ */}
                        <CTabPane data-tab="viewProfile">
                            {profile_details != undefined && <CContainer>
                                <h3 className="profile-page-header">Profile Details</h3>
                                <CRow>
                                    <div className="col-lg-8 offset-lg-2">
                                        <CCard className="card-view-profile mt-3">
                                            <div className="user-profile-pic-div text-center">
                                                <CImg
                                                    alt="click to upload image"
                                                    className="mx-auto rounded-circle update-img"
                                                    src={'avatar'}
                                                />

                                                {/**__PRO PIC UP BUTTON__ */}
                                                <input style={{ display: 'none' }} ref={inputFile} type="file" onChange={(event) => { onImageChange(event.target.files[0]) }} />
                                                
                                            </div>
                                            <CCardBody>
                                                <hr />
                                                {profile_details.id == sessionStorage.getItem(USER_ID) && <CButton
                                                    className="edit-profile mb-3"
                                                    
                                                >
                                                    <CIcon name="cil-pen" className="mr-1" />
                                                    Edit Info
                                                </CButton>}

                                                {/**info show */}
                                                <div className="row justify-content-center">
                                                    <div className="col-md-6 col-lg-4">
                                                        <h5 className="info-header-1">Full Name</h5>
                                                        <h5 className="profile-details-points child">
                                                            {capitalize(profile_details.first_name) + ' ' + capitalize(profile_details.last_name)}{" "}
                                                        </h5>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4">
                                                        <h5 className="info-header-1"> Email</h5>
                                                        <h5 className="profile-details-points-email">
                                                            {profile_details.email}
                                                        </h5>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4">
                                                        <h5 className="info-header-1">Job title</h5>
                                                        <h5 className="profile-details-points-email">{profile_details?.slc_details?.slc?.name}</h5>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4">
                                                        <h5 className="info-header-1"> Phone</h5>
                                                        <h5 className="profile-details-points child">
                                                            +{profile_details.phone}
                                                        </h5>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4">
                                                        <h5 className="info-header-1"> Address</h5>
                                                        <h5 className="profile-details-points child">
                                                            {profile_details.address}
                                                        </h5>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4">
                                                        <h5 className="info-header-1"> Blood Group</h5>
                                                        <h5 className="profile-details-points child">
                                                            {profile_details.blood_group}
                                                        </h5>
                                                    </div>

                                                    <CRow className="mt-5">
                                                    <CTabs activeTab="workingon">
                                                        <CNav variant="tabs"  >
                                                            {/**View Profile */}
                                                            <CNavItem>
                                                                <CNavLink data-tab="workingon"  >
                                                                
                                                                     Working On
                                                                </CNavLink>
                                                            </CNavItem>
                                                            {/* working on */}
                                                            {has_permission("projects.add_projects") && 
                                                            <CNavItem>
                                                                <CNavLink  data-tab="managing"  >
                                                                    
                                                                    Managing
                                                                </CNavLink>
                                                            </CNavItem>}
                                                        </CNav>
                                                        {/**___________working on tab details______ */}
                                                
                                                   </CTabs>
                                                   </CRow>

                                                </div>


                                                {/* <div className="all-da-buttons-1">
                                                <CLabel>Assigned Projects</CLabel>
                                                    {Array.from([{title:'ABC',work_package_index:'1001'}]).length > 0 && Array.from([{title:'ABC',work_package_index:'1001'}]).map((task, idx) => (
                                                        <CButton key={idx} type="button" className="package-button rounded-pill" onClick={() => {  }}>
                                                            {task.task_title}
                                                            <span className="tooltiptext">{task.work_package_index}</span>
                                                        </CButton>
                                                    ))}
                                                </div> */}
                                            </CCardBody>
                                        </CCard>
                                    </div>
                                </CRow>
                            </CContainer>}

                        </CTabPane>
                        {/**_____Change Password___ */}
                        <CTabPane data-tab="changePassword">
                            <CContainer>
                                <h3 className="profile-page-header">Change Password</h3>
                                <CRow>
                                    <div className="col-lg-8 offset-lg-2 col-md-12">
                                        <CCard className="mt-4 card-change-password">
                                            <CCardBody>
                                                <CForm>
                                                    <div className="mb-2">
                                                        <CLabel className="custom-label-5" htmlFor="userOldPass">
                                                            Old Password
                                                        </CLabel>
                                                        <div className="password-container">
                                                            <CInput name="old_password" id="old_password" className="custom-forminput-6" />
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
                                                            <CInput name="new_password" id="new_password" className="custom-forminput-6" />
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
                                                            <CInput name="new_password_confirm" id="new_password_confirm" className="custom-forminput-6" />
                                                            <img className="pwd-container-img"
                                                                title={revealConfPwd ? "Hide Confirm password" : "Show Confirm password"}
                                                                src={revealConfPwd ? hidePwdImg : showPwdImg}
                                                                onClick={() => setRevealConfPwd(prevState => !prevState)} />
                                                        </div>
                                                    </div>
                                                    {/**BUtton groups */}
                                                    <div className="project-form-button-holders mt-3">
                                                        <CButton className="profile-form-btn update-profile" type="button">Update Password</CButton>
                                                        <CButton className="profile-form-btn cancel-update" type="button">Cancel</CButton>
                                                    </div>
                                                </CForm>
                                            </CCardBody>

                                        </CCard>
                                    </div>
                                </CRow>
                            </CContainer>
                        </CTabPane>
                    </CTabContent>
                </CTabs>
            </CContainer>
        </>
    );
};
export default UserProfile;
