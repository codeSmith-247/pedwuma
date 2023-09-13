import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        location.href = "/";
    }, [navigate])

  return (
    <div>Loging out...</div>
  )
}

export default Logout