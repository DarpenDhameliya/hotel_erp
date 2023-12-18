import React from 'react'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from '@mui/material/CircularProgress';

const ComponentLoader = React.memo(({ active }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        backgroundColor: "#000000a1",
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
      open={active}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
})

export default ComponentLoader