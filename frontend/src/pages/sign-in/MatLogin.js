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
import { PUBLIC_API, TOKEN, USER_GUARD, USER_ID } from "../../Config";
import { useLocation } from "react-router";
import { useSnackbar } from "notistack";
import { Redirect, useHistory } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  let history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [intended_route, setIntendedRoute] = React.useState('/dashboard')
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
    if (!values.password) errors.password = "Password is required!"
    //if (!values.country_id) errors.country_id = "Country is required!"
    console.log(errors);
    return errors;
  }
  const handleSubmit = (values, { setSubmitting }) => {
    PUBLIC_API.post("users/login/", values)
      .then((res) => {
        setSubmitting(false);
        console.log("login response", res.data);
        if (res.status === 200) {
          sessionStorage.setItem(TOKEN, res.data.data.access);
          sessionStorage.setItem(USER_ID, res.data.data.user.id);
          sessionStorage.setItem(USER_GUARD, res.data.data.user.guard);
          sessionStorage.setItem("user_data", JSON.stringify(res.data.data.user));
          history.push({
            pathname: intended_route,
            state: { from: "login" },
          });
        }
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err);
        if (err?.response?.data?.message) {
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
      email: '',
      password: ''
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={formLogin.handleSubmit} noValidate sx={{ mt: 1 }}>
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
                autoFocus
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>)}
    </>
  );
}