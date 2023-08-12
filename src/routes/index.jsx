import { Routes, Route } from 'react-router-dom';

import Home from "../pages/users/home";
import Jobs from "../pages/users/jobs";


const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="/jobs" element={ <Jobs /> }/>
            </Routes>
        </>
    );
}

export default MainRoutes;