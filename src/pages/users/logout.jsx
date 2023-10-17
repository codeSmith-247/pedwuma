import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        location.href = "/";
    }, [navigate])

  return (
    <div className="h-[100vh] w-full flex items-center justify-center flex-col">
        <img src="/images/logout.gif" className="w-[300px] h-[300px] rounded-full object-cover" />
        <h1 className="font-bold text-center text-g mt-6">LOGING OUT...</h1>
    </div>
  )
}

export default Logout