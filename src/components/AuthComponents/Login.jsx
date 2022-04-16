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
import { VALIDATE_REQUIRED } from '../../helpers/utils/validators';
import { useForm } from '../../helpers/hooks/form-hook';
// import * as authActions from '../../actions/authActions';
import { useToasts } from 'react-toast-notifications';
// import { useHistory } from 'react-router-dom';
import { AppProviderContext } from '../../integration/context/appProviderContext';
import { useNavigate } from 'react-router-dom';

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

const Login = (props) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { actions } = useContext(AppProviderContext);

  const fields = [
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
        errorText: 'Please enter your email.',
        validators: [VALIDATE_REQUIRED()],
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
        errorText: 'Please enter your password.',
        validators: [VALIDATE_REQUIRED()],
      },
    },
  ];

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const { error, isLoading } = { error: false, isLoading: false };

  const { addToast } = useToasts();

  useEffect(() => {
    if (error) {
      const clearError = async () => {
        // await dispatch(authActions.clearError());
      };
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
      clearError();
    }
  }, [error]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const loginStatus = await actions.login({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });

      const { message, success } = loginStatus;

      addToast(message, {
        appearance: success ? 'success' : 'error',
        autoDismiss: true,
      });
      navigate('/');
    } catch (err) {
      addToast(err, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Card variant='outlined' className={classes.card}>
        <CardContent>
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Login
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
                        data-test={`${field.textField.id}-input`}
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
                  'Sign In'
                ) : (
                  <CircularProgress color='inherit' size='1.5rem' />
                )}
              </Button>
              <Grid container justify='center'>
                <Grid item>
                  <Link
                    data-test='redirect-link'
                    href={isLoading ? '#' : '/signup'}
                    variant='body2'
                  >
                    Don't have an account?
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

export default Login;
