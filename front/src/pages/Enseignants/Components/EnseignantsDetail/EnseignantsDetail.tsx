import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEnseignant, deleteEnseignant } from '../../../../services/enseignants_api';
import './EnseignantsDetail.css';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { FaUser } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GoMoveToTop } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaTransgenderAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

import ProfileF from '../../../../assets/images/sf.jpg';
import ProfileM from '../../../../assets/images/sm.png';

const EnseignantsDetail = () => {
  const { cinEns } = useParams();
  const navigate = useNavigate();
  const [enseignant, setEnseignant] = useState<Enseignant | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];

    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  useEffect(() => {
    const fetchEnseignant = async () => {
      try {
        if (cinEns) {
          const data = await getEnseignant(cinEns);
          setEnseignant(data);
        }
      } catch (error) {
        toast.error('Erreur lors du chargement des données de l\'enseignant');
        console.error(error);
        navigate('/enseignants');
      } finally {
        setLoading(false);
      }
    };
    fetchEnseignant();
  }, [cinEns, navigate]);

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      if (enseignant) {
        await deleteEnseignant(enseignant.cinEns);
        toast.success('Enseignant supprimé avec succès');
        navigate('/enseignants');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  if (loading) return <div className="right-content w-100">Chargement...</div>;
  if (!enseignant) return <div className="right-content w-100">Enseignant non trouvé</div>;

  return (
    <div className="right-content w-100">
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

      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Détails de l'enseignant</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumb_">
          <Link to="/">
            <StyledBreadcrumb
              className="StyledBreadcrumb"
              component="a"
              label="Accueil"
              icon={<HomeIcon fontSize="small" />}
            />
          </Link>
          <Link to="/enseignants">
            <StyledBreadcrumb
              className="StyledBreadcrumb"
              label="Enseignants"
              icon={<ExpandMoreIcon fontSize="small" />}
            />
          </Link>
          <StyledBreadcrumb
            className="StyledBreadcrumb"
            label="Détails"
            icon={<ExpandMoreIcon fontSize="small" />}
          />
        </Breadcrumbs>
      </div>

      <div className="card productDetailsSection">
        <div className="row">
          <div className="col-md-5">
            <div className="sliderWrapper pt-3 pb-3 ps-4 pe-4">
              <h6 className="mb-4">Photo de profil</h6>
              <div className="item">
                <img 
                  className='img-avatar' 
                  src={enseignant.Sexe === 'Masculin' ? ProfileM : ProfileF} 
                  alt={`${enseignant.Nom} ${enseignant.Prenom}`} 
                />
              </div>
              <div className='place-btn-back-suppr-clien-view'>
                <div></div>
                <div className="mt-2 btn-back-suppr-clien-view">
                  <Link to="/enseignants">
                    <button className="btn-prm btn-lg me-2">
                      <IoMdArrowRoundBack />
                    </button>
                  </Link>
                  <Link to={`/modifierEnseignantsFRM/${enseignant.cinEns}`}>
                    <button className="btn-edt btn-lg me-2">
                      <FaEdit />
                    </button>
                  </Link>
                  <button 
                    className="btn-danger btn-lg me-2"
                    onClick={handleDeleteClick}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="pt-3 pb-3 ps-4 pe-4">
              <h6 className="mb-4">Détails de l'enseignant</h6>
              <h4>À propos de cet enseignant</h4>

              <div className="productInfo mt-3">
                {[
                  { icon: <FaUser />, label: 'Nom', value: enseignant.Nom },
                  { icon: <FaUser />, label: 'Prénom', value: enseignant.Prenom },
                  { icon: <FaTransgenderAlt />, label: 'Sexe', value: enseignant.Sexe },
                  { icon: <FaTrophy />, label: 'Grade', value: enseignant.Grade },
                  { icon: <FaLocationDot />, label: 'Adresse', value: enseignant.Adresse },
                  { icon: <MdCall />, label: 'Téléphone', value: enseignant.Telephone },
                  { icon: <MdEmail />, label: 'Email', value: enseignant.Email },
                  { icon: <FaChalkboardTeacher />, label: 'Spécialité', value: enseignant.Specialite },
                  { icon: <FaChalkboardTeacher />, label: 'Description', value: enseignant.Descriptions },
                ].map((item, index) => (
                  <div className="row mb-2" key={index}>
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">{item.icon}</span>
                      <span className="name">{item.label}</span>
                    </div>
                    <div className="col-sm-7">
                      :{' '}
                      {item.value ? (
                        <span>{item.value}</span>
                      ) : (
                        <span className="text-muted">Non spécifié</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-text">
          <p>&copy; 2025 par Planning Scolaire | Tous Droits Réservés.</p>
        </div>
        <div className="footer-iconTop">
          <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <GoMoveToTop />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default EnseignantsDetail;