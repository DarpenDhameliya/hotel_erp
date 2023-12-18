import React from 'react'
import { TextField } from "@mui/material";

const Textfield = React.memo(({value , onchange , placeholder , type}) => {
  console.log("TextField")
  return (
    <TextField
      id="outlined-basic"
      size="small"
      type={type ? type : "text" }
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={onchange}
    />
  )
});

export default Textfield

// import React, { useMemo } from 'react';
// import { TextField } from "@mui/material";

// const Textfield = React.memo(({ value, onchange, placeholder, type }) => {
//   console.log("TextField");

//   // Memoize the result of the component
//   const memoizedComponent = useMemo(() => (
//     <TextField
//       id="outlined-basic"
//       size="small"
//       type={type ? type : "text"}
//       placeholder={placeholder}
//       variant="outlined"
//       value={value}
//       onChange={onchange}
//     />
//   ), [value, onchange, placeholder, type]);

//   return memoizedComponent;
// });

// export default Textfield;

