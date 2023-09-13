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
    Verify,
    SelectPlan,
    SkilledPeople, 
    SkilledPerson,
    Portfolio,
    Reviews,
    Logout,
    SendVerify
} from "../pages/users/";

import { 
    Dashboard,
    Jobs as SkilledJobs,
    Portfolio as SkilledPortfolio,
    Proposals,
    Settings,
    Chats,

} from "../pages/skilled/";

import { 
    Dashboard as EmpDash,
    Jobs as EmpJobs,
    Job as EmpJob,
    EditJob,
    Proposals as EmpPros,
    Settings as EmpStngs,

} from "../pages/employer/";


const links = [
    {
        name: "Dashboard",
        icon: "grid",
        link: "/employer"
    },
    {
        name: "My Jobs",
        icon: "wrench-adjustable-circle",
        link: "/employer/jobs"
    },
    {
        name: "My Proposals",
        icon: "envelope",
        link: "/employer/proposals"
    },
    {
        name: "Chats",
        icon: "chat",
        link: "/chats"
    },
    {
        name: "Settings",
        icon: "wrench",
        link: "/employer/settings"
    },
]


const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={ <HomeLayout2 /> }>
                    <Route path="/"    element={ <Home /> }/>
                </Route>
                <Route element={ <HomeLayout /> }>

                    <Route path="/jobs"   element={ <Jobs /> }/>
                    <Route path="/job/:id"   element={ <Job /> }/>
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
                <Route path="/logout"   element={ <Logout /> }/>
                <Route path="/signup"   element={ <Signup /> }/>
                <Route path="/verify"   element={ <SendVerify /> }/>
                <Route path="/verify/:id"   element={ <Verify /> }/>
                <Route path="/plans"   element={ <SelectPlan /> }/>

                <Route path="/skilled"   element={ <AuthLayout id={2} /> }>
                    <Route index element={<Dashboard />} />
                    <Route path="jobs" element={<SkilledJobs />} />
                    <Route path="proposals" element={<Proposals />} />
                    <Route path="portfolio" element={<SkilledPortfolio />} />
                    <Route path="settings" element={<Settings />} />
                </Route>

                <Route path="/employer"   element={ <AuthLayout id={1} authNavs={links} /> }>
                    <Route index element={<EmpDash />} />
                    <Route path="jobs" element={<EmpJobs />} />
                    <Route path="job/:id" element={<EditJob />} />
                    <Route path="job" element={<EmpJob />} />
                    <Route path="proposals" element={<EmpPros />} />
                    <Route path="settings" element={<EmpStngs />} />
                </Route>

                <Route path="/chats" element={<Chats authNavs={links} />} />
            </Routes>
        </>
    );
}

export default MainRoutes;