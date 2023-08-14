import { Routes, Route } from 'react-router-dom';

// import  { Footer }  from "../components/";
import  HomeLayout  from "../layouts/homeLayout";
import  HomeLayout2 from "../layouts/homeLayout2";
import  AuthLayout  from "../layouts/authLayout";

import { 
    Home, 
    Jobs,
    Job,
    Skills, 
    About,
    Login,
    Signup,
    SelectPlan,
    SkilledPeople, 
    SkilledPerson,
    Portfolio,
    Reviews
} from "../pages/users/";


const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={ <HomeLayout2 /> }>
                    <Route path="/"    element={ <Home /> }/>
                </Route>
                <Route element={ <HomeLayout /> }>

                    <Route path="/jobs"   element={ <Jobs /> }/>
                    <Route path="/job"   element={ <Job /> }/>
                    <Route path="/about"  element={ <About /> }/>
                    <Route path="/skills" element={ <Skills /> }/>
                    <Route path="/people" element={ <SkilledPeople /> }/>

                    <Route path="/person" element={ <SkilledPerson /> }>
                        <Route index            element={ <Portfolio />} />
                        <Route path="portfolio" element={ <Portfolio />} />
                        <Route path="reviews"   element={ <Reviews />} />
                    </Route>
                </Route>

                <Route path="/login"   element={ <Login /> }/>
                <Route path="/signup"   element={ <Signup /> }/>
                <Route path="/plans"   element={ <SelectPlan /> }/>

                <Route path="/auth"   element={ <AuthLayout /> }/>
            </Routes>
        </>
    );
}

export default MainRoutes;