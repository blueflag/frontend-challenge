import React from 'react'
import {
    Image as RbImage
} from 'react-bootstrap'
import packageJson from '../../../package.json'

const Image:React.FC<Props> = ({ src, height, width, alt }) => {
    return(
        <RbImage src={src} width={width} height={height} alt={packageJson.name} />
    )
}

interface Props {
    src?: string
    alt: string
    height: number
    width: number
}

Image.defaultProps = {
    src: 'https://blueflag.com.au/assets/logos/blueflag-logo.svg'
}

export default Image