import React from 'react'
import {
    Image as RbImage
} from 'react-bootstrap'
import packageJson from '../../../package.json'

const Image:React.FC<Props> = ({ src, height, width, alt, className }) => {
    return(
        <RbImage src={src} width={width} height={height} alt={packageJson.name+' | '+alt} className={className}/>
    )
}

interface Props {
    src?: string
    alt: string
    height: number
    width: number
    className?: string
}

Image.defaultProps = {
    src: 'https://blueflag.com.au/assets/logos/blueflag-logo.svg'
}

export default Image