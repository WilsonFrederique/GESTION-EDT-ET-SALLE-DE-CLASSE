import React, {useContext, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllEnseignants } from '../../services/enseignants_api';
import { Enseignant } from '../../services/enseignants_api';
import SearachBox from '../SearachBox/SearachBox';
import UserAvatarImg from '../userAvatarImg/UserAvatarImg';
import Button from '@mui/material/Button';
import { MdMenuOpen, MdOutlineMenu, MdOutlineLightMode, MdOutlineMailOutline } from "react-icons/md";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FaUser } from "react-icons/fa6";
import { IoShieldHalfSharp } from "react-icons/io5";
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { MyContext } from '../../App'
import Logo from '../../assets/images/Logo1.png'
import Profil from '../../assets/images/Profil.png'
import ProfileF from '../../assets/images/sf.jpg'
import ProfileM from '../../assets/images/sm.png'

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
    const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
    const openMyAcc = Boolean(anchorEl);
    const openNotifications = Boolean(notificationAnchorEl);
    const context = useContext(MyContext);
    const navigate = useNavigate();

    // Charger les enseignants
    useEffect(() => {
        const fetchEnseignants = async () => {
            try {
                const data = await getAllEnseignants();
                setEnseignants(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEnseignants();
    }, []);

    const handleOpenMyAccDrop = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMyAccDrop = () => {
        setAnchorEl(null);
    };

    const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };
    const handleCloseNotifications = () => {
        setNotificationAnchorEl(null);
    };

    const handleViewAllTeachers = () => {
        handleCloseNotifications();
        navigate('/enseignants');
        window.location.reload(); // Recharge la page pour actualiser
    };

    const handleTeacherClick = (cinEns: string) => {
        handleCloseNotifications();
        navigate(`/enseignants/details/${cinEns}`);
    };

    return (
        <>
            <header className='d-flex align-items-center'>
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100 ">
                        <div className="col-sm-2 part1">
                            <Link to="/" className='d-flex align-items-center logo'>
                                <img src={Logo} alt="Logo" />
                                <span className="ms-0 text-logo">Planification Scolaire</span>
                            </Link>
                        </div>

                        {/* Responsive */}
                        {
                            context.windowWidth> 992 && 
                                <div className="col-sm-3 d-flex align-items-center part2 padding res-hide">
                                    <Button className='rounded-circle me-3' onClick={() => context.setIsToggleSidebar(!context.isToggleSidebar)}>
                                        {context.isToggleSidebar ? <MdMenuOpen /> : <MdOutlineMenu />}
                                    </Button>
                                    <SearachBox />
                                </div>      
                        }

                        <div className="col-sm-7 d-flex align-items-center justify-content-end part3 ps-1">
                            <Button className="rounded-circle me-3" onClick={()=>context.setThemeMode(!context.themeMode)}> 
                                <MdOutlineLightMode /> 
                            </Button>
                            
                            <a href="/notifications">
                                <Button className="rounded-circle me-3"> <MdOutlineMailOutline /> </Button>
                            </a>

                            {/* Notification Bell with Dropdown */}
                            <div className="position-relative">
                                <Button 
                                    className="rounded-circle me-3" 
                                    onClick={handleOpenNotifications}
                                    aria-controls="notifications-menu"
                                    aria-haspopup="true"
                                > 
                                    <PiChalkboardTeacherBold /> 
                                </Button>

                                {/* Notification Dropdown Menu */}
                                <Menu
                                    anchorEl={notificationAnchorEl}
                                    open={openNotifications}
                                    onClose={handleCloseNotifications}
                                    className='notifications dropdown_list'
                                    id="notifications-menu"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <div className="head ps-3 pb-0">
                                        <h4>Enseignants ({enseignants.length})</h4>
                                    </div>

                                    <Divider className='mb-1' />

                                    <div 
                                        className="overflow-auto" 
                                        style={{ maxHeight: '300px', overflowY: 'auto' }}
                                    >
                                        {enseignants.slice(0, 5).map((enseignant) => (
                                            <MenuItem 
                                                key={enseignant.cinEns} 
                                                onClick={() => handleTeacherClick(enseignant.cinEns)}
                                            >
                                                <div className='d-flex align-items-center w-100'>
                                                    <div className="me-3">
                                                        <div className="userImg">
                                                            <span className="rounded-circle">
                                                                <img 
                                                                    src={enseignant.Sexe === 'Masculin' ? ProfileM : ProfileF} 
                                                                    alt={`${enseignant.Nom} ${enseignant.Prenom}`}
                                                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="dropdownInfo">
                                                        <h4 className='mb-1'>
                                                            <span>
                                                                <b>{enseignant.Nom} {enseignant.Prenom}</b>
                                                            </span>
                                                        </h4>
                                                        <p className="text-sky mb-0">
                                                            <span className='me-2'>{enseignant.Grade}</span>
                                                            {enseignant.Specialite && (
                                                                <span className='text-muted'>| {enseignant.Specialite}</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </div>

                                    <div className="ps-2 py-2 p-2 pt-3 mb-0 w-100">
                                        <Button 
                                            className='btn btn-primary w-100'
                                            onClick={handleViewAllTeachers}
                                        >
                                            Voir tous les enseignants
                                        </Button>
                                    </div>
                                </Menu>
                            </div>

                            <Button 
                                className="rounded-circle me-3 menu-2" 
                                onClick={context.toggleNav}
                            >
                                <IoMenu />
                            </Button>

                            {
                                context.isLogin !== true ? 
                                <Link to={'/login'}>
                                    <Button className="btn-blue btn-lg btn-round">Sign In</Button>
                                </Link> 
                                : 
                                <div className="myAccWrapper">
                                    <Button className="myAcc d-flex align-items-center" onClick={handleOpenMyAccDrop}>
                                        <UserAvatarImg img={Profil} />
                                        <div className="userInfo res-hide">
                                            <h4>Walle Fred</h4>
                                            <p className='mb-0'>Administrateur</p>
                                        </div>
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={openMyAcc}
                                        onClose={handleCloseMyAccDrop}
                                        onClick={handleCloseMyAccDrop}
                                        slotProps={{
                                            paper: {
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1.5,
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <ListItemIcon>
                                                <FaUser />
                                            </ListItemIcon>
                                            Mon compte
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <ListItemIcon>
                                                <IoShieldHalfSharp />
                                            </ListItemIcon>
                                            Réinitialiser le mot de passe
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Se déconnecter
                                        </MenuItem>
                                    </Menu>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header