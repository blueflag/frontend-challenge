import React from 'react'
import Image from './image'
import Link from 'next/link'

const Header = () => {
    return(
        <header className="bg-dark p-3">
            <Link href="/">
                <Image src="https://blueflag.com.au/assets/logos/blueflag-logo.svg" height={31} width={155} alt="Blueflag" />
            </Link>
        </header>
    )
}

export default Header