import React from 'react'
import Sidebar from './sidebar'
import Container from './container'
import Header from './header'
import { useMediaQuery } from 'react-responsive'

const Main: React.FC<Props> = ({children}:Props) => {

    const screenLG = useMediaQuery({
        query: '(min-width: 1200px)'
    })

    return(
    <div className="d-flex">
        { screenLG && <Sidebar /> }
        <div className="w-100 bg-dark-100 pb-5">
            <Header />
            <Container>
                {children}
            </Container>
        </div>
    </div>
    )
}

interface Props {
    children: React.ReactNode
}

export default Main