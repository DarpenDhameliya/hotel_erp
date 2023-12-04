import React from 'react'
import { TextField } from "@mui/material";

const Textfield = ({value , onchange , placeholder}) => {
  return (
    <TextField
      id="outlined-basic"
      size="small"
      type="text"
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={onchange}
    />
  )
}

export default Textfield