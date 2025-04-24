import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/Logo1.png'
import Patern from '../../assets/images/pattern.webp' 
import GoogleIcon from '../../assets/images/Google.png' 

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import Button from '@mui/material/Button';



import { MyContext } from '../../App';

const Login = () => {
    const [inputIndex, setInputIndex] = useState(null)

    const [isShowPassword, setIsShowPassword] = useState(false)

    const context = useContext(MyContext);

    useEffect(()=>{
        context.setIsHideSidebarAndHeader(true);
    },[]);

    const focusInput = (index) => {
        setInputIndex(index);
    }

    return (
        <>
            <img src={Patern} alt="LoginPatern" className='LoginPatern' />
            <section className='loginSection'>
                <div className="loginBox">
                    <div className="logo text-center d-flex flex-column align-items-center gap-0">
                        <img src={Logo} alt="Logo" width="90px" />
                        <h5 className='fw-bold'>Planification Scolaire</h5>
                    </div>

                    <div className="wrapper mt-3 card border">
                        <form>
                            <div className={`form-group position-relative ${inputIndex===0 && 'focus'}`}>
                                <span className="icon"><MdEmail /></span>
                                <input autoFocus type="text" className='form-control' placeholder='Entrez votre adresse e-mail' onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} />
                            </div>

                            <div className={`form-group position-relative ${inputIndex===1 && 'focus'}`}>
                                <span className="icon"><RiLockPasswordFill /></span>
                                <input type={`${isShowPassword === true ? 'text' : 'password'}`} className='form-control' placeholder='Entrez votre mot de passe' onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)} />

                                <span className="toggleShowPassordw" onClick={()=>setIsShowPassword(!isShowPassword)}>
                                    {
                                        isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />
                                    }
                                </span>

                            </div>

                            <div className="form-group">
                                <Button className="btn btn-primary btn-lg w-100 btn-big">Se connecter</Button>
                            </div>

                            <div className="form-group text-center mb-0">
                                <Link to={'/forgot-password'} className='link d-block mt-3'>Mot de passe oublié</Link>

                                <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                                    <span className="line"></span>
                                    <span className="text">Ou</span>
                                    <span className="line"></span>
                                </div>

                                <Button variant="outlined" className='w-100 btn-lg btn-big loginWithGoogle'>
                                <img src={GoogleIcon} alt="GoogleIcon" width="24px" /> &nbsp; Se connecter avec Google
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="wrapper mt-3 card border footer p-3">
                        <span className="text-center">
                            Vous n'avez pas de compte ? 
                            <Link to={'/signUp'} className='link color ms-2'>S'inscrire</Link>
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login