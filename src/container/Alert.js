import React from 'react'
import makeStyles from "@mui/styles/makeStyles"; // or '@mui/system' for MUI v5
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles({
  setErrorLabellogin: {
    width: '80%',
    position: 'absolute',
    top: '30px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  setErrorLabel: {
    width: '100%',
  },
});

export const SuccessAlertLogin = React.memo(({ message }) => {
  const classes = useStyles()
  return (
    <Stack className={classes.setErrorLabellogin}>
      <Alert severity="success" style={{ background: '#c7e7c9', color: "#1f6923" }}>
        {message}
      </Alert>
    </Stack>
  )
})

export const SuccessAlert = React.memo(({ message }) => {
  const classes = useStyles()
  return (
    <Stack className={classes.setErrorLabel}>
      <Alert severity="success" style={{ background: '#c7e7c9', color: "#1f6923" }}>
        {message}
      </Alert>
    </Stack>
  )
})


export const ErrorAlert = React.memo(({ message }) => {
  const classes = useStyles()
  return (
    <Stack className={classes.setErrorLabel}>
      <Alert severity="error">
        {message}
      </Alert>
    </Stack>
  )
})

