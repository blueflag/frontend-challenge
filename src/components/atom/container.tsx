import React from 'react'
import {
    Container as RbContainer
} from 'react-bootstrap'

const Container:React.FC<Props> = ({children}:Props) => {
    return(
        <RbContainer className="mt-5">
            <div className="px-md-4">{children}</div>
        </RbContainer>
    )
}

interface Props {
    children?: React.ReactNode
}

export default Container
