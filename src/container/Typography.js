import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'

const useStyles = makeStyles(theme => ({
  setheading: {
    marginBottom: '0 !important',
    fontFamily: "Poppins, sans-serif !important"
  },
  setheading_h5: {
    marginBottom: '0 !important',
    marginTop: '10px !important',
    fontFamily: "Poppins, sans-serif !important",
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px !important',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '19px !important',
    },
  },
  setheading_h6: {
    marginBottom: '0 !important',
    marginTop: '10px !important',
    fontFamily: "Poppins, sans-serif !important",
    fontWeight:"600 !important",
    marginLeft: '2px !important',
    [theme.breakpoints.down('sm')]: {
      fontSize: '17px !important',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '19px !important',
    },
  },
  setheading_h5_bold: {
    marginBottom: '0 !important',
    fontSize: '45px !important',
    color: '#367fa9  !important',
    fontFamily: "Poppins, sans-serif !important",
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px !important',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '35px !important',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '40px !important',
    },
  },
}));


export const Typography_h1 = React.memo(({ data }) => {
  const classes = useStyles();
  return (
    <Typography variant="h1" gutterBottom className={classes.setheading}>
      {data}
    </Typography>
  )
})
export const Typography_h2 = React.memo(({ data }) => {
  const classes = useStyles();
  return (
    <Typography variant="h2" gutterBottom className={classes.setheading}>
      {data}
    </Typography>
  )
})
export const Typography_h3 = React.memo(({ data }) => {
  const classes = useStyles();
  return (
    <Typography variant="h3" gutterBottom className={classes.setheading}>
      {data}
    </Typography>
  )
})
export const Typography_h4 = React.memo(({ data }) => {
  console.log(data)
  const classes = useStyles();
  return (
    <Typography variant="h4" gutterBottom className={classes.setheading}>
      {data}
    </Typography>
  )
})
export const Typography_h4_withoutbould = React.memo(({ data }) => {
  console.log(data)
  const classes = useStyles();
  return (
    <Typography variant="h4" gutterBottom className={classes.setheading}>
      {data}
    </Typography>
  )
})
export const Typography_h5 = React.memo(({ data }) => {
  const classes = useStyles();
  return (
    <Typography variant="h5" gutterBottom className={classes.setheading_h5}>
      {data}
    </Typography>
  )
})
export const Typography_h5_bold = React.memo(({ data }) => {
  const classes = useStyles();
  return (
    <Typography variant="h5" gutterBottom className={classes.setheading_h5_bold} style={{ fontWeight: 600 }}>
      {data}
    </Typography>
  )
})

export const Typography_h6 = React.memo(({ data }) => {
  const classes = useStyles();
  return (
    <Typography variant="subtitle1" gutterBottom className={classes.setheading_h6}>
      {data}
    </Typography>
  )
})

// export default Typography