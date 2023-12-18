import React, { lazy } from 'react'
import Paper from '@mui/material/Paper'
import useStyleService from './serviceStyle';
const CommonContainer = lazy(() => import("../container/ComponentContainer"));

const ServiceDeshbord = () => {
  const classes = useStyleService();
  return (
    <CommonContainer>
      <Paper className={classes.setProductpaper} elevation={5}>
        <div>hii Kitchan</div>
      </Paper>
    </CommonContainer>
  )
}

export default ServiceDeshbord