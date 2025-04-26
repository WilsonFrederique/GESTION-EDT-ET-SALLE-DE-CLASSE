import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material';
import './EnseignantsLists.css';
import { getAllEnseignants, deleteEnseignant } from '../../../../services/enseignants_api';
import { CiMenuKebab } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { MdMode } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { PiChalkboardTeacherBold } from "react-icons/pi";

import ProfileF from '../../../../assets/images/sf.jpg'
import ProfileM from '../../../../assets/images/sm.png'

const EnseignantsLists = () => {
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCin, setSelectedCin] = useState('');
  const navigate = useNavigate();

  // Charger les enseignants
  useEffect(() => {
    const fetchEnseignants = async () => {
      try {
        const data = await getAllEnseignants();
        setEnseignants(data);
      } catch (error) {
        toast.error('Erreur lors du chargement des enseignants');
        console.error(error);
      }
    };
    fetchEnseignants();
  }, []);

  // Filtrer les enseignants selon la recherche
  const filteredEnseignants = enseignants.filter(enseignant =>
    `${enseignant.Nom} ${enseignant.Prenom} ${enseignant.Grade}`.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Gestion de la suppression
  const handleDeleteClick = (cinEns: string) => {
    setSelectedCin(cinEns);
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEnseignant(selectedCin);
      setEnseignants(enseignants.filter(e => e.cinEns !== selectedCin));
      toast.success('Enseignant supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    }
    setOpenDeleteDialog(false);
  };

  return (
    <div className='ls'>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="ls-top">
        <div className="ls-nav">
          <PiChalkboardTeacherBold className='icon-client' />
          <div className="menu">
            <CiMenuKebab />
            <div className="sub-menu">
              <Link to="/enseignantsFRM"><p>Ajouter</p></Link>
              <hr />
              <Link to="/enseignants/details/tous"><p>Liste en détail</p></Link>
            </div>
          </div>
        </div>

        <div className="ls-search">
          <IoIosSearch />
          <input 
            type="text" 
            placeholder='Rechercher par nom, prénom ou grade...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>        
      </div>

      <div className="ls-list">
        {filteredEnseignants.map((enseignant) => (
          <div key={enseignant.cinEns} className="friends2">
            <div className='lign-clien'>
                <div className='profil-clients'>
                    {enseignant.Sexe === 'Masculin' ? (
                        <img 
                        src={ProfileM} 
                        alt={`${enseignant.Nom} ${enseignant.Prenom}`} 
                        className='profil1' 
                        />
                    ) : (
                        <img 
                        src={ProfileF} 
                        alt={`${enseignant.Nom} ${enseignant.Prenom}`} 
                        className='profil1' 
                        />
                    )}
                    <div className="text-profil-clients">
                        <p className='p-message'>{enseignant.Nom} {enseignant.Prenom}</p>
                        <span>{enseignant.Grade}</span>
                    </div>
                </div>

                <div className="btn-action-clients">
                    <Link to={`/enseignants/details/${enseignant.cinEns}`}>
                        <IoEyeSharp className='icon-action-clien1' />
                    </Link>
                    <Link to={`/modifierEnseignantsFRM/${enseignant.cinEns}`}>
                        <MdMode className='icon-action-clien2' />
                    </Link>
                    <Link to="">
                        <MdDelete 
                        className='icon-action-clien3' 
                        onClick={() => handleDeleteClick(enseignant.cinEns)}
                        />
                    </Link>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        classes={{ paper: 'delete-confirmation-dialog' }}
      >
        <DialogTitle id="alert-dialog-title">
          <div className="dialog-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          Êtes-vous sûr de vouloir supprimer cet enseignant ?
        </DialogTitle>
        <DialogActions>
          <Button className="cancel-btn" onClick={handleCancelDelete}>
            Annuler
          </Button>
          <Button className="confirm-btn" onClick={handleConfirmDelete} autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnseignantsLists;