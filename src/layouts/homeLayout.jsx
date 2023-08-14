import { Nav, Footer } from '../components/'
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
  return (
    <>
        <Nav/>
        <Outlet />
        <Footer/>
    </>
  )
}

export default HomeLayout