import React from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';

export default function loader(props) {
  return (
    <>
        <CircularProgress value={props.progress} />          
    </>
  )
}
