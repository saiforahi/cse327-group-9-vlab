import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { API, PERMISSIONS, PUBLIC_API, TOKEN, USER_GUARD, USER_ID } from "../../Config";
import { useLocation } from "react-router";
import { useSnackbar } from "notistack";
import { LinearProgress } from "@mui/material";
import { Redirect, useHistory } from "react-router-dom";

import swal from "sweetalert";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        LabSymbiotic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  let history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [intended_route, setIntendedRoute] = React.useState('/dashboard')
  const [responseErrors,setResponseErrors]=React.useState()
  let location = useLocation()
  React.useEffect(() => {
    if (location.state?.registration) {
      enqueueSnackbar('Registration Succefull, please wait for admin approval.', { variant: 'info' })
    }

    if (String(window.location).split('?').length > 1) {
      let items = String(window.location).split('?')[1].split('=')
      if (items.length > 0 && items[0] == 'task_details') {
        setIntendedRoute('/dashboard/task/details/' + items[1])
      }
    }
  }, [])
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      formLogin.handleSubmit()
    }
  }
  const validate_login_form = (values) => {
    console.log(values);
    const errors = {};
    if (!values.email) errors.email = "Email is required!"
    if (!values.first_name) errors.first_name = "First Name is required!"
    if (!values.password) errors.password = "Password is required!"
    if (values.password != values.confirm_password) errors.confirm_password = "Password mismatched!"
    //if (!values.country_id) errors.country_id = "Country is required!"
    console.log(errors);
    return errors;
  }
  const handleSubmit = (values, { setSubmitting }) => {
    PUBLIC_API.post("users/registration/", values)
      .then((res) => {
        setSubmitting(false);
        console.log("reg response", res.data);
        if (res.status === 200) {
          history.push({ pathname: '/login', state: { registration: true } })
          
        }
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err.response);
        if (err?.response?.data?.errors) {
          setResponseErrors(err.response.data.errors)
          enqueueSnackbar(err.response.data.message, { variant: "warning" });
        }
        if (err.response.status === 403) {
          enqueueSnackbar("Your account is not active yet", {
            variant: "warning",
          });
        }
      });
  };
  const formLogin = useFormik({
    initialValues: {
      first_name:'',
      last_name:'',
      email: '',
      phone: '',
      password: '',
      confirm_password:''
    },
    validateOnChange: true,
    validateOnBlur: true,
    validate: validate_login_form,
    onSubmit: handleSubmit
  })
  return (
    <>
      {sessionStorage.getItem(TOKEN) ? (<Redirect to={{ pathname: "/dashboard", state: location.state }} />) : (<ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Virtual Lab
            </Typography>
            <Typography component="h1" variant="h6">
              Registration
            </Typography>
            <Box component="form" onSubmit={formLogin.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                size='sm'
                margin="normal"
                required
                fullWidth
                id="first_name"
                name="first_name"
                value={formLogin.values.first_name}
                onChange={formLogin.handleChange}
                label="First Name"
                autoComplete="first_name"
                type="text"
                autoFocus
                error={responseErrors?.first_name?true:false}
                helperText={responseErrors?.first_name?responseErrors.first_name[0]:''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="last_name"
                name="last_name"
                value={formLogin.values.last_name}
                onChange={formLogin.handleChange}
                label="Last Name"
                type="text"
                autoComplete="last_name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                value={formLogin.values.email}
                onChange={formLogin.handleChange}
                label="Email Address"
                autoComplete="email"
                type="email"
                error={responseErrors?.email?true:false}
                helperText={responseErrors?.email?responseErrors.email[0]:''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                name="phone"
                value={formLogin.values.phone}
                onChange={formLogin.handleChange}
                label="Phone"
                autoComplete="phone"
                type="text"
                error={responseErrors?.phone?true:false}
                helperText={responseErrors?.phone?responseErrors.phone[0]:''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                value={formLogin.values.password}
                onChange={formLogin.handleChange}
                onKeyPress={handleKeyPress}
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirm_password"
                name="confirm_password"
                value={formLogin.values.confirm_password}
                onChange={formLogin.handleChange}
                onKeyPress={handleKeyPress}
                label="Confirm Password"
                type="password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={formLogin.handleSubmit}
                disabled={!formLogin.isValid}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#/login" variant="body2">
                    Already have an account?
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="#/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>)}
    </>
  );
}