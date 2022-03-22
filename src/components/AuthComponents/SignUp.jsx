import React, { useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Card,
  Button,
  Grid,
  Link,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Input from '../shared/Input';
import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
  VALIDATE_REQUIRED,
  VALIDATE_IDENTICAL,
} from '../../helpers/utils/validators';
import { useForm } from '../../helpers/hooks/form-hook';
// import * as authActions from "../../actions/authActions";
import { useToasts } from 'react-toast-notifications';
// import { useHistory } from "react-router-dom";
import { AppProviderContext } from '../../integration/context/appProviderContext';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(5),
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  //   const history = useHistory();
  const { actions } = useContext(AppProviderContext);

  const [formState, inputHandler] = useForm(
    {
      firstName: {
        value: '',
        isValid: false,
      },
      lastName: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      confirmPassword: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const fields = [
    {
      grid: {
        xs: 12,
        sm: 6,
      },
      textField: {
        autoComplete: 'fname',
        name: 'firstName',
        required: true,
        fullWidth: true,
        type: 'text',
        id: 'firstName',
        label: 'First Name',
        autoFocus: true,
        error: false,
        errorText: 'Please enter your First Name',
        validators: [VALIDATE_REQUIRED()],
      },
    },
    {
      grid: {
        xs: 12,
        sm: 6,
      },
      textField: {
        autoComplete: 'lname',
        name: 'lastName',
        required: true,
        fullWidth: true,
        type: 'text',
        id: 'lastName',
        label: 'Last Name',
        autoFocus: true,
        error: false,
        errorText: 'Please enter your Last Name',
        validators: [VALIDATE_REQUIRED()],
      },
    },
    {
      grid: {
        xs: 12,
        sm: 12,
      },
      textField: {
        id: 'email',
        label: 'Email Address',
        name: 'email',
        type: 'email',
        autoComplete: 'email',
        required: true,
        fullWidth: true,
        autoFocus: false,
        error: false,
        errorText: 'Please enter a valid email.',
        validators: [VALIDATE_REQUIRED(), VALIDATE_EMAIL()],
      },
    },
    {
      grid: {
        xs: 12,
        sm: 12,
      },
      textField: {
        name: 'password',
        label: 'Password',
        type: 'password',
        id: 'password',
        autoComplete: 'current-password',
        required: true,
        fullWidth: true,
        autoFocus: false,
        error: false,
        errorText:
          'Your password should be at least 8 characters, contain 1 uppercase and 1 lowercase.',
        validators: [VALIDATE_REQUIRED(), VALIDATE_PASSWORD()],
      },
    },
    {
      grid: {
        xs: 12,
        sm: 12,
      },
      textField: {
        name: 'password',
        label: 'Confirm Password',
        type: 'password',
        id: 'confirmPassword',
        autoComplete: 'confirm-password',
        required: true,
        fullWidth: true,
        autoFocus: false,
        error: false,
        errorText: 'Passwords do not match.',
        validators: [
          VALIDATE_REQUIRED(),
          VALIDATE_IDENTICAL(formState.inputs.password.value),
        ],
      },
    },
  ];

  const isLoading = false;
  const error = false;
  const { addToast } = useToasts();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const signInStatus = await actions.signUp({
        firstName: formState.inputs.firstName.value,
        lastName: formState.inputs.lastName.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });

      const { message, success } = signInStatus;

      addToast(message, {
        appearance: success ? 'success' : 'error',
        autoDismiss: true,
      });
    } catch (err) {
      addToast(err, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <Container component='main' maxWidth='xs' data-test='sign-up-container'>
      <Card variant='outlined' className={classes.card}>
        <CardContent>
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={submitHandler}>
              <Grid container spacing={2}>
                {fields.map((field) => {
                  return (
                    <Grid
                      item
                      key={field.textField.id}
                      xs={field.grid.xs}
                      sm={field.grid.sm}
                    >
                      <Input
                        data-test='input'
                        variant='outlined'
                        required={field.textField.required}
                        fullWidth={field.textField.fullWidth}
                        id={field.textField.id}
                        label={field.textField.label}
                        name={field.textField.name}
                        type={field.textField.type}
                        autoComplete={field.textField.autoComplete}
                        error={field.textField.error}
                        helperText={field.textField.errorText}
                        validators={field.textField.validators}
                        onInput={inputHandler}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Button
                data-test='submit-button'
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={!formState.isValid}
              >
                {!isLoading ? (
                  'Sign Up'
                ) : (
                  <CircularProgress color='inherit' size='1.5rem' />
                )}
              </Button>
              <Grid container justify='center'>
                <Grid item>
                  <Link href={isLoading ? '#' : '/signin'} variant='body2'>
                    Already have an account?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUp;
