import './EnseignantsLists.css';

import { Link } from 'react-router-dom';

import Profil from '../../../../assets/images/Profil.png';

import { CiMenuKebab } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { MdMode } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { PiChalkboardTeacherBold } from "react-icons/pi";


const EnseignantsLists = () => {

  return (
    <div className='ls'>
        <div className="ls-top">
            <div className="ls-nav">
            <PiChalkboardTeacherBold className='icon-client' />
            <div className="menu">
                <CiMenuKebab />
                <div className="sub-menu">
                <a href="/enseignantsFRM"><p>Ajouter</p></a>
                {/* <a href="#"><p>Ajouter</p></a> */}
                <hr />
                <a href="/enseignants/details/tous"><p>Liste en détail</p></a>
                </div>
            </div>
            </div>

            <div className="ls-search">
            <IoIosSearch />
            <input type="text" placeholder='Rechercher par nom, prénom ou grade...' />
            </div>        
        </div>

        <div className="ls-list">
            {Array(12).fill("").map((_, index) => (
            <div key={index} className="friends2" >
                <div className='lign-clien'>
                    <div className='profil-clients'>
                        <img src={Profil} alt="profil1" className='profil1' />
                        <div className="text-profil-clients">
                            <p className='p-message'>Wall Fred</p>
                            <span>Grade</span>
                        </div>
                    </div>
                    <div className="btn-action-clients">
                        <Link to="/enseignants/details">
                            <IoEyeSharp className='icon-action-clien1' />
                        </Link>
                        <MdMode className='icon-action-clien2' />
                        <MdDelete className='icon-action-clien3' />
                    </div>
                </div>
                
            </div>
            ))}
        </div>
    </div>
  );
}

export default EnseignantsLists;
