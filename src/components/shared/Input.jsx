import React, { useReducer, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { inputReducer } from '../../helpers/reducers/inputReducer';

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isValid: props.valid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  return (
    <TextField
      variant={props.variant}
      required={props.required}
      fullWidth={props.fullWidth}
      type={props.type}
      id={props.id}
      label={props.label}
      name={props.name}
      autoComplete={props.autoComplete}
      error={!inputState.isValid && inputState.isTouched}
      helperText={
        !inputState.isValid && inputState.isTouched ? props.helperText : ''
      }
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    />
  );
};

export default Input;
