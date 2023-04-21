import React from 'react'
import {
    Container as RbContainer,
    Row,
    Col
} from 'react-bootstrap'

const Container:React.FC<Props> = ({children}:Props) => {
    return(
        <RbContainer className="mt-5">
            <Row>
                <Col md={10} className="mx-auto">
                    {children}
                </Col>
            </Row>
        </RbContainer>
    )
}

interface Props {
    children?: React.ReactNode
}

export default Container
