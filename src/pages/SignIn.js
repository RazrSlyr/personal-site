import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {ThemeProvider} from '@mui/material/styles';
import 'firebaseui/dist/firebaseui.css';
import theme from '../theme';
import {logInWithEmailAndPassword} from '../FirebaseConfig';

/**
 * Sign in page for the project vault
 * @return {object} React component for the Sign In page
 */
export default function SignIn() {
  const handleSubmit = async (submissionEvent) => {
    // Prevent reload of page
    submissionEvent.preventDefault();
    // Perform form logic
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const success = await logInWithEmailAndPassword(email, password);
    setAlertStatus(success ? 'success' : 'error');
  };

  const [alertStatus, setAlertStatus] = React.useState('');
  const alertMessage = React.useMemo(() => {
    if (alertStatus === 'success') {
      return 'Login Successful';
    } else if (alertStatus === 'error') {
      return 'Invalid Email and/or Password';
    }
    return '';
  }, [alertStatus]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] :
                                t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                            Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}
              sx={{mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                Sign In
              </Button>
            </Box>
            {alertStatus.length !== 0 && <Alert onClose={() => {
              setAlertStatus('');
            }} severity={alertStatus}>{alertMessage}</Alert>}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
