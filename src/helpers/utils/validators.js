export const validators = [
  'MINLENGTH',
  'MAXLENGTH',
  'MIN',
  'MAX',
  'EMAIL',
  'PASSWORD',
  'REQUIRED',
];

export const VALIDATE_MINLENGTH = (val) => ({ type: 'MINLENGTH', val: val });
export const VALIDATE_MAXLENGTH = (val) => ({ type: 'MAXLENGTH', val: val });
export const VALIDATE_MIN = (val) => ({ type: 'MIN', val: val });
export const VALIDATE_MAX = (val) => ({ type: 'MAX', val: val });
export const VALIDATE_EMAIL = () => ({ type: 'EMAIL' });
export const VALIDATE_PASSWORD = () => ({ type: 'PASSWORD' });
export const VALIDATE_IDENTICAL = (val) => ({ type: 'IDENTICAL', val: val });
export const VALIDATE_REQUIRED = () => ({ type: 'REQUIRED' });

export const validate = (value, validators) => {
  let isValid = true;

  for (const validator of validators) {
    if (validator.type == 'MINLENGTH') {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type == 'MAXLENGTH') {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type == 'MIN') {
      isValid = isValid && value >= validator.val;
    }
    if (validator.type == 'MAX') {
      isValid = isValid && value <= validator.val;
    }
    if (validator.type == 'REQUIRED') {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type == 'EMAIL') {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type == 'PASSWORD') {
      isValid =
        isValid && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/.test(value);
    }
    if (validator.type == 'IDENTICAL') {
      isValid = isValid && value === validator.val;
    }
  }
  return isValid;
};
