import React from 'react'
import Box from '../box'

const Summary:React.FC<Props> = ({ count, label, variant }:Props) => {
  return(
    <Box className="h-100 d-flex flex-column">
      <div className={"fs-32 fw-bold text-" + variant}>{count}</div>
      <div className="mb-4">{label}</div>
      <div data-height={5} className={ "mt-auto rounded-5 d-flex bg-" + variant }></div>
    </Box>
  )
}

interface Props {
  count: number
  label: string
  variant: string
}

export default Summary