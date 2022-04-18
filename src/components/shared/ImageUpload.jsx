import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import Input from './Input';

import './ImageUpload.css';

const useStyles = (props) =>
  makeStyles((theme) => ({
    imageUpload: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    root: {
      width: props.width,
      height: props.height,
      marginTop: theme.spacing(3),
    },
    pickImageText: {
      marginTop: '25%',
    },
    photoIcon: {
      marginTop: '25%',
    },
  }));

const ImageUpload = (props) => {
  const classes = useStyles(props)();

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={classes.imageUpload}>
      <Grid container>
        <Grid item xs={6}>
          <Card
            className={classes.root}
            justifyContent='center'
            alignItems='center'
          >
            <input
              id={props.id}
              ref={filePickerRef}
              style={{ display: 'none' }}
              type='file'
              accept='.jpg,.png,.jpeg'
              onChange={pickedHandler}
            />
            <CardContent>
              {!previewUrl ? (
                <Grid container justifyContent='center' alignItems='center'>
                  <div className={classes.pickImageText}>Pick an image</div>
                </Grid>
              ) : (
                <div className='image-upload__preview'>
                  <img src={previewUrl} alt='Preview' />
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Grid
            className={classes.photoIcon}
            container
            justifyContent='center'
            alignItems='center'
          >
            <label htmlFor='icon-button-file'>
              <IconButton
                color='error'
                onClick={pickImageHandler}
                aria-label='upload picture'
                component='span'
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ImageUpload;
