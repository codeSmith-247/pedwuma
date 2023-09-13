import { Footer } from '../components'
import { Outlet } from "react-router-dom"

const HomeLayout2 = () => {
  return (
    <>
        <Outlet />
        <Footer/>
    </>
  )
}

export default HomeLayout2