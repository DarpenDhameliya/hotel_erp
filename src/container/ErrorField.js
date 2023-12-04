import { Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'; // or '@mui/system' for MUI v5

const useStyles = makeStyles({
  setErrorLabel: {
    color: '#b10505',
    textAlign:'left'
  },
});

const ErrorField = ({error}) => {
  const classes = useStyles();

  return (
    <Typography className={classes.setErrorLabel}>
      {error}
    </Typography>
  )
}

export default ErrorField

