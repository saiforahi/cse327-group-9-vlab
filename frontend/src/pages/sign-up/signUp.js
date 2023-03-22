import React, { useState } from "react";
import "./signUp.css";
import hidePwdImg from '../../assets/icons/Showpass-show.svg';
import showPwdImg from '../../assets/icons/Hide.svg';
import {
  CForm,
  CLabel,
  CButton,
  CInput,
} from "@coreui/react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { PUBLIC_FORM_API } from "../../Config";
import { useSnackbar } from "notistack";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { LinearProgress } from "@mui/material";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Register = () => {
  let history = useHistory()
  const [value, setValue] = useState()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [submitted,setSubmitted]=useState(false)
  const [avatar, setAvatar] = useState()
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealConfPwd, setIsRevealConfPwd] = useState(false);
  const [image, setImage] = useState()
  const [responseErrors,setResponseErrors]=useState({})
  const validateSignUpForm = (values) => {
    const errors = {};
    if (!values.first_name) errors.first_name = "Name is required!"
    if (!values.email) errors.email = "Email is required!"
    if (!values.phone) errors.phone = "Phone number is required!"
    if (values.phone && !new RegExp('^[0-9]+$').test(values.phone)) errors.phone="Invalid Phone Number"
    if (String(values.password).length<8) errors.password = "Password is too short"
    if (!values.password) {errors.password = "Password is required!"}
    //else if(values.password != values.confirm_pass) {errors.confirm_pass = "Password did not match"; errors.password = "Confirm your password"}
    if (values.password != values.confirm_pass) errors.confirm_pass = "Password did not match"
    return errors;
  }
  const sign_up = (values) => {
    console.log(values)
    setSubmitted(true)
    let formData = new FormData();
    for (const [key, value] of Object.entries(formSignUp.values)) {
      if (key != 'confirm_pass') {
        formData.append(key, value)
      }
    }
    if(image!=null && image!=undefined){
      formData.append('profile_pic',image)
    }
    PUBLIC_FORM_API.post('auth/register/', formData).then((res) => {
      setSubmitted(false)
      if (res.data.success == 'True' && res.status == 201) {
        history.push({ pathname: '/login', state: { registration: true } })
      }
      else if(res.data.success == 'False' && res.status == 201 && res.data.errors){
        console.log(res.data.errors)
        // setResponseErrors(res.data.errors)
        setResponseErrors(res.data.errors)
        for (const [key, value] of Object.entries(res.data.errors)) {
          console.log(`${key}: ${value}`);
          // enqueueSnackbar(err.response.data.message,{variant:"warning"})
          for (let index=0;index<value.length;index++) {
            enqueueSnackbar(value[index],{variant:"warning"})
          }
        }
        
      }
    }).catch(err=>{
      setSubmitted(false)
      console.log(err)
    })
    
  }
  const reset_form = () => {
    formSignUp.resetForm()
  }
  const onImageChange = (file) => {
    setAvatar(URL.createObjectURL(file))
    setImage(file)
  }
  const formSignUp = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      confirm_pass: ''
    },
    //validationSchema:{SignupSchema},
    // validationSchema: {SignupSchema},
    validateOnChange: true,
    validateOnBlur: true,
    validate: validateSignUpForm,
    onSubmit: sign_up
  })
  
  const handleKeyPress=(event)=>{
    if(event.key == 'Enter'){
      formSignUp.handleSubmit()
    }
  }
  return (
    <>
      <div className="register-page">
        <div className="container">
          <h3 className="page-header">Register</h3>
          {/**img uplaod div */}

          <div className="seller-pro-pic-holder">
            <div className="seller-profile-pic-div">
              <img src={avatar ? avatar : "avatars/user-avatar-default.png"} className="avatar-img" />
            </div>
            <label htmlFor="propic" className={image ? "pro-img-up-btn mb-0 remove-img" : "pro-img-up-btn mb-0"}>
              {/* <!-- propic --> */}
              <input
                id="propic"
                className="form-control form-control-md"
                type="file"
                onChange={(event) => onImageChange(event.target.files[0])}
              />
            </label>
          </div>
          
          {/**submit form */}
          <div className="custom-form-holder">
            <div className="row">
              <div className="col-md-10 offset-md-1 col-sm-12 offset-sm-0">
              {Array.from(responseErrors).map((error,idx)=>{
                <p key={idx}>{error}</p>
              })}
                <CForm className="custom-form-sign">
                  <div className="row">
                    {/**first name */}
                    <div className="col-md-6 col-sm-12 col-12 mb-3">
                      <CLabel htmlFor="firstName" className="custom-label-2">
                        First Name *
                      </CLabel>
                      <CInput
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formSignUp.values.first_name}
                        onChange={formSignUp.handleChange}
                        aria-describedby="fnHelp"
                        className="custom-formgroup-2"
                      />
                      {formSignUp.touched.first_name && formSignUp.errors.first_name && <small style={{ color: 'red' }}>{formSignUp.errors.first_name}</small>}
                    </div>
                    {/**last name */}
                    <div className="col-md-6 col-sm-12 col-12 mb-3">
                      <CLabel htmlFor="lastName" className="custom-label-2">
                        Last Name
                      </CLabel>
                      <CInput
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formSignUp.values.last_name}
                        onChange={formSignUp.handleChange}
                        aria-describedby="lnHelp"
                        className="custom-formgroup-2"
                      />
                    </div>
                    {/**Email */}
                    <div className="col-md-6 col-sm-12 col-12 mb-3">
                      <CLabel htmlFor="email" className="custom-label-2">
                        Email *
                      </CLabel>
                      <CInput
                        type="email"
                        id="email"
                        name="email"
                        value={formSignUp.values.email}
                         onChange={formSignUp.handleChange}
                        aria-describedby="emailHelp"
                        className="custom-formgroup-2"
                      />
                      {responseErrors.email!=undefined && <small style={{ color: 'red' }}>{responseErrors.email}</small>}
                      {formSignUp.touched.email && formSignUp.errors.email && <small style={{ color: 'red' }}>{formSignUp.errors.email}</small>}
                    </div>
                    {/**Phone */}
                    <div className="col-md-6 col-sm-12 col-12 mb-3">
                      <CLabel htmlFor="phone" className="custom-label-2">
                        Phone
                      </CLabel>
                      {/* <CInput
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="01XXX XXX XXX"
                        value={formSignUp.values.phone}
                        onChange={(event)=>{formSignUp.handleChange(event)}}
                        aria-describedby="phoneHelp"
                        className="custom-formgroup-2"
                      /> */}
                      {/* <PhoneInput flags={flags} value={value} onChange={setValue}/> */}
                      <PhoneInput
                        // isValid={(value, country) => {
                        //   console.log('value',value.length)
                        //   let error_text=''
                        //   switch(country.iso2){
                        //     case 'bd':
                        //       if(value.length<11 || value.length>13){
                        //         // console.log('value',value)
                        //         error_text= 'Invalid value: '+value+', '+country.name;
                        //       }
                        //       break
                        //   }
                        //   return error_text
                        // }}
                        isValid={(value, country) => {
                          if (country.iso2=='bd' && value.length!=13) {
                            return 'Invalid value: '+value+', '+country.name;
                          }
                          else if (country.iso2=='us' && value.length!=11) {
                            return 'Invalid value: '+value+', '+country.name;
                          } else {
                            return true;
                          }
                        }}
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: false
                        }}
                        onlyCountries={['bd', 'us']}
                        inputClass="w-100 custom-formgroup-2"
                        countryCodeEditable={false}
                        // inputStyle="width:100% !important;"
                        country={'bd'}
                        value={formSignUp.values.phone}
                        onChange={phone => {formSignUp.setFieldValue('phone',phone)}}
                      />
                      {responseErrors.phone!=undefined && !formSignUp.errors.phone && formSignUp.values.phone.length>0 && <small style={{ color: 'red' }}>{responseErrors.phone}</small>}
                      {formSignUp.touched.phone && formSignUp.errors.phone && <small style={{ color: 'red' }}>{formSignUp.errors.phone}</small>}
                    </div>
                    {/**password */}
                    <div className="col-md-6 col-sm-12 mb-3">
                      <CLabel
                        htmlFor="exampleInputPassword1"
                        className="custom-label-2"
                      >
                        Password * (<small style={{ color: 'black' }}>Minimum 8 characters</small>)
                      </CLabel>
                      <div className="password-container">
                        <CInput
                          type={isRevealPwd ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formSignUp.values.password}
                          onChange={formSignUp.handleChange}
                          className="custom-formgroup-2"
                        />
                        {formSignUp.touched.password && formSignUp.errors.password && <small style={{ color: 'red' }}>{formSignUp.errors.password}</small>}
                        <img className="pwd-container-img"
                          title={isRevealPwd ? "Hide Confirm password" : "Show Confirm password"}
                          src={isRevealPwd ? hidePwdImg : showPwdImg}
                          onClick={() => setIsRevealPwd(prevState => !prevState)}
                        />
                      </div>
                    </div>
                    {/*confirm password */}
                    <div className="col-md-6 col-sm-12 mb-3">
                      <CLabel
                        htmlFor="confirmPass"
                        className="custom-label-2"
                      >
                        Confirm Password
                      </CLabel>
                      <div className="password-container">
                        <CInput
                          type={isRevealConfPwd ? "text" : "password"}
                          id="confirm_pass"
                          name="confirm_pass"
                          value={formSignUp.values.confirm_pass}
                          onChange={formSignUp.handleChange}
                          className="custom-formgroup-2"
                          onKeyPress={handleKeyPress}
                        />
                        {formSignUp.touched.confirm_pass && formSignUp.errors.confirm_pass && <small style={{ color: 'red' }}>{formSignUp.errors.confirm_pass}</small>}
                        <img className="pwd-container-img"
                          title={isRevealConfPwd ? "Hide password" : "Show password"}
                          src={isRevealConfPwd ? hidePwdImg : showPwdImg}
                          onClick={() => setIsRevealConfPwd(prevState => !prevState)}
                        />
                      </div>
                    </div>
                    {/*submit button */}
                    <div className="sign-holder">
                      {submitted?<LinearProgress/>:<CButton type="button" onClick={formSignUp.handleSubmit} className="submit-button-s">
                        Sign up
                      </CButton>}
                    </div>
                    {/**Go to sign in */}
                    <div className="mb-4 mt-3">
                      <h5 className="final-footer"><span className="dum-text">Already have an account?</span><Link className="registration-link" to="/">Sign in</Link></h5>
                    </div>
                  </div>
                </CForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
