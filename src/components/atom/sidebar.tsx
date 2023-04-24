import Link from "next/link"
import Image from "components/molecule/image"
import Navigation from "./navigation"

const Sidebar = () => {
  return(
    <aside>
      <div data-width={250} className="position-relative">
        <div data-width={250} className="bg-dark position-fixed h-100 p-3 d-flex flex-column">
            <div className="mt-3 mb-8">
              <Link href="/">
                <Image src="https://blueflag.com.au/assets/logos/blueflag-logo.svg" height={31} width={155} alt="Blueflag" className="mx-auto d-block" />
              </Link>
            </div>
            <Navigation />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar