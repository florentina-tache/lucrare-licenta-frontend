import React, { useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";

import { makeStyles } from "@material-ui/core/styles";
import Input from "../shared/Input";
import { VALIDATE_REQUIRED } from "../../helpers/utils/validators";
import {
  Container,
  Typography,
  Card,
  Button,
  Grid,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import { useForm } from "../../helpers/hooks/form-hook";
import { useToasts } from "react-toast-notifications";
import { AppProviderContext } from "../../integration/context/appProviderContext";
import ImageUpload from "../shared/ImageUpload";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(5),
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewPlace = () => {
  const classes = useStyles();
  const { actions, state } = useContext(AppProviderContext);
  const { addToast } = useToasts();
  let token = state.token;
  let decodedToken, userId;
  if (token) {
    decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }

  const isLoading = false;

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const fields = [
    {
      grid: {
        xs: 12,
        sm: 12,
      },
      textField: {
        autoComplete: "title",
        name: "title",
        required: true,
        fullWidth: true,
        type: "text",
        id: "title",
        label: "Title",
        autoFocus: true,
        error: false,
        errorText: "Please enter a title",
        validators: [VALIDATE_REQUIRED()],
      },
    },
    {
      grid: {
        xs: 12,
        sm: 12,
      },
      textField: {
        autoComplete: "description",
        name: "description",
        required: true,
        fullWidth: true,
        type: "text",
        id: "description",
        label: "Description",
        autoFocus: true,
        error: false,
        errorText: "Please enter a description",
        validators: [VALIDATE_REQUIRED()],
      },
    },
    {
      grid: {
        xs: 12,
        sm: 12,
      },
      textField: {
        id: "address",
        label: "Address",
        name: "address",
        type: "text",
        autoComplete: "address",
        required: true,
        fullWidth: true,
        autoFocus: false,
        error: false,
        errorText: "Please enter an address.",
        validators: [VALIDATE_REQUIRED()],
      },
    },
  ];

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const createdPlaceStatus = await actions.addNewPlace(
        {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          image: formState.inputs.image.value,
        },
        userId,
        "added"
      );

      if (createdPlaceStatus) {
        const { message, success } = createdPlaceStatus;

        addToast(message, {
          appearance: success ? "success" : "error",
          autoDismiss: true,
        });
      }
    } catch (err) {
      addToast(err, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  return (
    <Container component="main" maxWidth="sm" data-test="sign-up-container">
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Add a new place
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
                        data-test="input"
                        variant="outlined"
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
              <ImageUpload
                id="image"
                onInput={inputHandler}
                errorText="Please provide an image."
                width={250}
                height={200}
                isEdit={false}
              />
              <Button
                data-test="submit-button"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!formState.isValid}
              >
                {!isLoading ? (
                  "Add new location"
                ) : (
                  <CircularProgress color="inherit" size="1.5rem" />
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewPlace;
