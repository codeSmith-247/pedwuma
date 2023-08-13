import { Routes, Route } from 'react-router-dom';

import  { Footer }  from "../components/";

import { 
    Home, 
    Jobs,
    Job,
    Skills, 
    About, 
    SkilledPeople, 
    SkilledPerson,
    Portfolio,
    Reviews
} from "../pages/users/";


const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/"       element={ <Home /> }/>
                <Route path="/jobs"   element={ <Jobs /> }/>
                <Route path="/job"   element={ <Job /> }/>
                <Route path="/about"  element={ <About /> }/>
                <Route path="/skills" element={ <Skills /> }/>
                <Route path="/people" element={ <SkilledPeople /> }/>
                <Route path="/person" element={ <SkilledPerson /> }>
                    <Route index element={ <Portfolio />} />
                    <Route path="portfolio" element={ <Portfolio />} />
                    <Route path="reviews"   element={ <Reviews />} />
                </Route>
            </Routes>

            <Footer />

        </>
    );
}

export default MainRoutes;