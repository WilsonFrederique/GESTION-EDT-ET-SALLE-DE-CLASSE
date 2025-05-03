import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material';
import { usePDF } from 'react-to-pdf';
import './EnseignantsLists.css';
import { getAllEnseignants, deleteEnseignant } from '../../../../services/enseignants_api';
import { CiMenuKebab } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { MdMode } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { IoAddSharp } from "react-icons/io5";
import { ImPrinter } from "react-icons/im";

import ProfileF from '../../../../assets/images/sf.jpg'
import ProfileM from '../../../../assets/images/sm.png'

const EnseignantsLists = () => {
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCin, setSelectedCin] = useState('');
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({ filename: 'liste-enseignants.pdf' });

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

  // Générer le PDF
  const generatePDF = () => {
    toPDF();
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
              <Link to="/enseignantsFRM"><p><IoAddSharp /> &nbsp; Ajouter</p></Link>
              <hr />
              <p onClick={generatePDF} style={{ cursor: 'pointer' }}>
                <ImPrinter /> &nbsp; PDF
              </p>
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

      {/* Contenu à exporter en PDF (positionné hors écran mais visible pour le PDF) */}
      <div ref={targetRef} style={{
        position: 'absolute',
        left: '-9999px',
        top: 0,
        width: '794px', // Largeur A4 en pixels (21cm)
        padding: '20px',
        backgroundColor: 'white'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '20px', 
          color: 'black',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Liste des Enseignants
        </h2>
        <table style={{ 
          width: '100%', borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>Avatar</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>Nom</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>Prénom</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>Grade</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>Spécialité</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: 'black' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnseignants.map((enseignant) => (
              <tr key={enseignant.cinEns} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', textAlign: 'center', color: 'black' }}>
                  <img 
                    src={enseignant.Sexe === 'Masculin' ? ProfileM : ProfileF} 
                    alt={`${enseignant.Nom} ${enseignant.Prenom}`}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </td>
                <td style={{ padding: '10px', color: 'black' }}>{enseignant.Nom}</td>
                <td style={{ padding: '10px', color: 'black' }}>{enseignant.Prenom}</td>
                <td style={{ padding: '10px', color: 'black' }}>{enseignant.Grade}</td>
                <td style={{ padding: '10px', color: 'black' }}>{enseignant.Specialite}</td>
                <td style={{ padding: '10px', color: 'black' }}>{enseignant.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affichage normal dans l'application */}
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