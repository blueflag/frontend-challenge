import React from 'react'

const Avatar:React.FC<Props> = ({ src, className, height, width }:Props) => {
  return (
    <div data-height={height} data-width={width} className={ "bg-gray-300 rounded-circle bg-center bg-cover " + className} style={{backgroundImage: `url(${src})`}}></div>
  )
}

interface Props {
  src: string
  className?: string
  height?: number
  width?: number
}

Avatar.defaultProps = {
  height: 30,
  width: 30
}

export default Avatar