import React from 'react'

const Box:React.FC<Props> = ({children, height, clearSpacer, className}: Props) => {
  return(
    <div className={className + " box-shadow-1 rounded-3 bg-white " + (clearSpacer ? '': 'p-3') } data-height={height}>
      {children}
    </div>
  )
}

interface Props {
  children?: React.ReactNode
  height?: number
  clearSpacer?: boolean
  className?: string
}

export default Box