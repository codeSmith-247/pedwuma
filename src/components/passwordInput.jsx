import {useState} from 'react'

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ ...props}) => {
    const[passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="password-input flex items-center relative" >
        <input type={passwordVisible ? "text" : "password"}  {...props}/>
        <i className={`flex items-center justify-center absolute right-1 h-[35px] w-[40px] rounded-md bg-gray-200 bi ${passwordVisible ? "bi-eye-slash" : "bi-eye"}`} onClick={() => setPasswordVisible(!passwordVisible)}></i>
    </div>
  )
}

export default PasswordInput