import React from 'react'
import Header from './header'
import Container from './container'

const Main: React.FC<Props> = ({children}:Props) => {
    return(
        <React.Fragment>
            <Header />
            <Container>
                {children}
            </Container>
        </React.Fragment>
    )
}

interface Props {
    children: React.ReactNode
}

export default Main