import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/Logo2.png'
import Patern from '../../assets/images/pattern.webp' 
import GoogleIcon from '../../assets/images/Google.png' 

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaHome } from "react-icons/fa";


import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import { MyContext } from '../../App';

const SignUp = () => {
    const [inputIndex, setInputIndex] = useState(null)

    const [isShowPassword, setIsShowPassword] = useState(false)

    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

    const context = useContext(MyContext);

    useEffect(()=>{
        context.setIsHideSidebarAndHeader(true);
        window.scrollTo(0,0);
    },[]);

    const focusInput = (index) => {
        setInputIndex(index);
    }

    return (
        <>
            <img src={Patern} alt="LoginPatern" className='LoginPatern' />
            <section className='loginSection signUpSection'>
                <div className="row">
                    <div className="col-md-8 d-flex align-items-center flex-column justify-content-center part1">
                        <h1>BEST UX/UI FASHION <span className='text-primary'>ECOMMECE DASHBOARD</span> & ADMIN PANEL</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Iste expedita autem voluptate quaerat, id totam placeat 
                            consequatur consequuntur dolor rerum incidunt.id totam placeat 
                            consequatur consequuntur dolor rerum incidunt. Autem impedit 
                            reprehenderit soluta ipsum dolorum, illo nesciunt facere!
                        </p>

                        <div className='w-100 mt-4 mb-3'>
                            <Link to={'/'}><Button className='btn-primary btn-lg btn-big mb-3'><FaHome /> Go to Home</Button></Link>
                        </div>
                    </div>

                    <div className="col-md-4 pe-0">
                        <div className="loginBox">
                            <div className="logo text-center d-flex flex-column align-items-center gap-0">
                                <img src={Logo} alt="Logo" width="90px" />
                                <h5 className='fw-bold'>Register a new account to WiFre</h5>
                            </div>

                            <div className="wrapper mt-3 card border">
                                <form>
                                    <div className={`form-group position-relative ${inputIndex===0 && 'focus'}`}>
                                        <span className="icon"><FaUser /></span>
                                        <input autoFocus type="text" className='form-control' placeholder='Enter your name' onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} />
                                    </div>

                                    <div className={`form-group position-relative ${inputIndex===1 && 'focus'}`}>
                                        <span className="icon"><MdEmail /></span>
                                        <input type="text" className='form-control' placeholder='Enter your email' onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)} />
                                    </div>                                    

                                    <div className={`form-group position-relative ${inputIndex===2 && 'focus'}`}>
                                        <span className="icon"><RiLockPasswordFill /></span>
                                        <input type={`${isShowPassword === true ? 'text' : 'password'}`} className='form-control' placeholder='Enter your password' onFocus={()=>focusInput(2)} onBlur={()=>setInputIndex(null)} />

                                        <span className="toggleShowPassordw" onClick={()=>setIsShowPassword(!isShowPassword)}>
                                            {
                                                isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                            }
                                        </span>

                                    </div>

                                    <div className={`form-group position-relative ${inputIndex===3 && 'focus'}`}>
                                        <span className="icon"><IoShieldCheckmark /></span>
                                        <input type={`${isShowConfirmPassword === true ? 'text' : 'password'}`} className='form-control' placeholder='Confirm your password' onFocus={()=>focusInput(3)} onBlur={()=>setInputIndex(null)} />

                                        <span className="toggleShowPassordw" onClick={()=>setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                            {
                                                isShowConfirmPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                            }
                                        </span>

                                    </div>

                                    <FormControlLabel className='mb-2' control={<Checkbox />} label="I agree to the all Terms & Conditions" />

                                    <div className="form-group">
                                        <Button className="btn btn-primary btn-lg w-100 btn-big">Sign up</Button>
                                    </div>

                                    <div className="form-group text-center mb-0">

                                        <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                                            <span className="line"></span>
                                            <span className="text">Or</span>
                                            <span className="line"></span>
                                        </div>

                                        <Button variant="outlined" className='w-100 btn-lg btn-big loginWithGoogle'>
                                        <img src={GoogleIcon} alt="GoogleIcon" width="24px" /> &nbsp; Sign up with google
                                        </Button>
                                    </div>
                                </form>

                                <span className="text-center mt-3 d-block">
                                    Don't have an account? 
                                    <Link to={'/login'} className='link color ms-2'>Sign in</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp