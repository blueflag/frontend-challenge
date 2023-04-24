import {useState} from 'react'
import Avatar from "components/molecule/avatar"
import { Icon } from "@iconify/react"
import { useMediaQuery } from 'react-responsive'
import Link from "next/link"
import Image from "components/molecule/image"
import Navigation from './navigation'

const Header = () => {

  const screenLG = useMediaQuery({
    query: '(min-width: 1200px)'
  })

  const [showNav, setShowNav] = useState(false)

  return(
    <div>
      <div className="position-sticky top-0">
        <div className="bg-white box-shadow-1 p-3 d-flex align-items-center justify-content-between">
          { screenLG ? <Icon icon="mingcute:search-line" className="fs-20 text-gray-600 cursor-pointer" /> : 
            <Link href="/">
              <Image src="https://blueflag.com.au/assets/logos/blueflag-logo.svg" height={31} width={155} alt="Blueflag" className="mx-auto d-block" />
            </Link>
          }
          { screenLG ? <Avatar src="https://i.pravatar.cc/80/80" /> :
            <Icon icon="humbleicons:bars" className="fs-24 cursor-pointer" onClick={ ()=> setShowNav(true)}/>
          }
        </div>
      </div>
      {showNav &&
        <>
          { screenLG ? '' : 
            <div className="position-fixed top-0 start-0 d-flex h-100 w-100">
              <div className="bg-dark p-3">
                <div data-width={230}>
                  <Avatar className="mx-auto d-block mt-3 mb-5" src="https://i.pravatar.cc/200/200" height={80} width={80} />
                  <Navigation />
                </div>
              </div>
              <div onClick={ ()=> setShowNav(false)} className="w-100 cursor-pointer" style={{ backgroundColor: 'rgba(0,0,0,.4)' }}></div>
            </div>
          }
          
        </>
      }
    </div>
  )
}

export default Header