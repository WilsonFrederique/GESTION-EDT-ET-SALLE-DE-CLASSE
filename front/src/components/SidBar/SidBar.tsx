import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import { FaAngleRight } from "react-icons/fa6";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegClock } from 'react-icons/fa';
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { LuCalendarRange } from "react-icons/lu";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { GoBook } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { FaUsersBetweenLines } from "react-icons/fa6";


import { MyContext } from '../../App';



const SidBar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
    const [isToggleSubmenuClient, setIsToggleSubmenuClient] = useState(false);
    const [isToggleSubmenuEDT, setIsToggleSubmenuEDT] = useState(false);
    const [isToggleSubmenuEnseignants, setIsToggleSubmenuEnseignants] = useState(false);

    const context = useContext(MyContext);

    const isOpenSubmenu = (index: number) =>{
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
        setIsToggleSubmenuClient(!isToggleSubmenuClient);
        setIsToggleSubmenuEDT(!isToggleSubmenuEDT);
        setIsToggleSubmenuEnseignants(!isToggleSubmenuEnseignants);
    } 

    return (
        <>
            <div className="sidebar">
                <ul className="list-unstyled">
                    <li>
                        <Link to="">
                            <Button className={`w-100 ${activeTab===0 ? 'active' : ''}`} onClick={()=>isOpenSubmenu(0)}>
                                <span className='icon'><MdOutlineDashboard /></span>
                                Accueil 
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===6 && isToggleSubmenuEnseignants===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(6)}>
                            <span className='icon'><PiChalkboardTeacherBold /></span>
                            Les enseignants  
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapperEnseignants ${activeTab===6 && isToggleSubmenuEnseignants===true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/enseignantsFRM">Ajouter un enseignant</Link></li>
                                <li><Link to="/enseignants">Liste des enseignants</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===1 && isToggleSubmenu===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(1)}>
                            <span className='icon'><HiOutlineAcademicCap /></span>
                            Formations 
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===1 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                {/* <li><Link to="/niveauxFrm">Ajouter un niveau</Link></li>
                                <li><Link to="/parcoursFrm">Ajouter un Parcour</Link></li> */}
                                <li><Link to="/niveaux">Niveaux disponibles</Link></li>
                                <li><Link to="/parcours">Parcours proposés</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===8 && isToggleSubmenuClient===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(8)}>
                            <span className='icon'><FaUsersBetweenLines /></span>
                            Les étudiants
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapperClient ${activeTab===8 && isToggleSubmenuClient===true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/etudiantsFrm">Ajouter un étudiant</Link></li>
                                <li><Link to="/niveauTous">Tous les étudiants inscrits</Link></li>
                                {/* <li><Link to="/niveauL1">Niveau L1</Link></li>
                                <li><Link to="/niveauL2">Niveau L2</Link></li>
                                <li><Link to="/niveauL3">Niveau L3</Link></li>
                                <li><Link to="/niveauM1">Niveau M1</Link></li>
                                <li><Link to="/niveauM2">Niveau M2</Link></li> */}
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===14 && isToggleSubmenuEDT===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(14)}>
                            <span className='icon'><LuCalendarRange /></span>
                            Emploi du Temps 
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapperEDT ${activeTab===14 && isToggleSubmenuEDT===true ? 'colapse' : 'colapsed'}`}>
                            <ul className="submenu">
                                <li><Link to="/edtFrm">Ajouter un EDT</Link></li>
                                <li><Link to="/listesTousEDT">Tous les emplois du temps</Link></li>
                                <li><Link to="/listesL1EDT">Emploi du temps de L1</Link></li>
                                <li><Link to="/listesL2EDT">Emploi du temps de L2</Link></li>
                                <li><Link to="/listesL3EDT">Emploi du temps de L3</Link></li>
                                <li><Link to="/listesM1EDT">Emploi du temps de M1</Link></li>
                                <li><Link to="/listesM2EDT">Emploi du temps de M2</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to="/matiersListe">
                            <Button className={`w-100 ${activeTab===2 ? 'active' : ''}`} onClick={()=>isOpenSubmenu(2)}>
                                <span className='icon'><GoBook /></span>
                                Matieres
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/salleListe">
                            <Button className={`w-100 ${activeTab===12 ? 'active' : ''}`} onClick={()=>isOpenSubmenu(12)}>
                                <span className='icon'><HiOutlineBuildingLibrary /></span>
                                Salle de Classe 
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/creneauxListe">
                            <Button className={`w-100 ${activeTab===13 ? 'active' : ''}`} onClick={()=>isOpenSubmenu(13)}>
                                <span className='icon'><FaRegClock /></span>
                                Creneaux
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/message">
                            <Button className={`w-100 ${activeTab===3 ? 'active' : ''}`} onClick={()=>isOpenSubmenu(3)}>
                                <span className='icon'><MdOutlineMessage /></span>
                                Messages 
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Button className={`w-100 ${activeTab===4 ? 'active' : ''}`} onClick={()=>isOpenSubmenu(4)}>
                                <span className='icon'><IoMdNotificationsOutline /></span>
                                Notifictions 
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                            <Button className={`w-100 ${activeTab===9 ? 'active' : ''}`} onClick={()=>isOpenSubmenu(9)}>
                                <span className='icon'><FaRegUser /></span>
                                Connexion 
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/signUp">
                            <Button className={`w-100 ${activeTab===10 ? 'active' : ''}`} onClick={()=>isOpenSubmenu(10)}>
                                <span className='icon'><FiUserPlus /></span>
                                Inscription 
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <Button className={`w-100 ${activeTab===11 ? 'active' : ''}`} onClick={()=>isOpenSubmenu(11)}>
                                <span className='icon'><IoSettingsOutline /></span>
                                Paramètres 
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                </ul>

                <br />

                <div className="logoutWrapper">
                    <div className="logoutBox">
                        <Button variant="contained"><IoMdLogOut /> Déconnexion</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidBar