// import React, { useRef, useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './EnseignantsTousDetails.css';

// // MUI Components
// import Chip from '@mui/material/Chip';
// import HomeIcon from '@mui/icons-material/Home';
// import { emphasize, styled } from '@mui/material/styles';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import {
//   Dialog,
//   DialogTitle,
//   DialogActions,
//   Button
// } from '@mui/material';

// // Icons
// import { GoMoveToTop } from "react-icons/go";
// import { FaPlus } from "react-icons/fa6";
// import { MdDelete } from "react-icons/md";
// import { FaReply } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { FaTrophy } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdCall } from "react-icons/md";
// import { MdEmail } from "react-icons/md";
// import { FaChalkboardTeacher } from "react-icons/fa";
// import { FaTransgenderAlt } from "react-icons/fa";

// // Images
// import ProfileF from '../../assets/images/sf.jpg';
// import ProfileM from '../../assets/images/sm.png';

// // API
// import { getAllEnseignants, deleteEnseignant, Enseignant } from '../../services/enseignants_api';

// const EnseignantsTousDetails = () => {
//   const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
//   const [selectedEnseignant, setSelectedEnseignant] = useState<Enseignant | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//     const backgroundColor = 
//       theme.palette.mode === 'light' 
//       ? theme.palette.grey[100] 
//       : theme.palette.grey[800];
//     return {
//       backgroundColor, 
//       height: theme.spacing(3),
//       color: theme.palette.text.primary,
//       fontWeight: theme.typography.fontWeightRegular,
//       '&:hover, &:focus': {
//         backgroundColor: emphasize(backgroundColor, 0.06),
//       },
//       '&:active': {
//         boxShadow: theme.shadows[1],
//         backgroundColor: emphasize(backgroundColor, 0.12),
//       },
//     };
//   });

//   // Charger les enseignants
//   useEffect(() => {
//     const fetchEnseignants = async () => {
//       try {
//         const data = await getAllEnseignants();
//         setEnseignants(data);
//         if (data.length > 0) {
//           setSelectedEnseignant(data[0]);
//         }
//         setError(null);
//       } catch (error) {
//         console.error('Erreur:', error);
//         setError('Erreur lors du chargement des enseignants');
//         toast.error('Erreur lors du chargement des enseignants');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEnseignants();
//   }, []);

//   // Configuration du slider
//   const sliderSettings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false
//   };

//   const thumbnailSettings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: Math.min(4, enseignants.length),
//     slidesToScroll: 1,
//     arrows: false,
//     focusOnSelect: true
//   };

//   const mainSliderRef = useRef<Slider>(null);
//   const thumbnailSliderRef = useRef<Slider>(null);

//   const goToSlide = (index: number) => {
//     if (mainSliderRef.current && thumbnailSliderRef.current) {
//       mainSliderRef.current.slickGoTo(index);
//       thumbnailSliderRef.current.slickGoTo(index);
//       setSelectedEnseignant(enseignants[index]);
//     }
//   };

//   const handleDeleteClick = () => {
//     if (selectedEnseignant) {
//       setOpenDeleteDialog(true);
//     }
//   };

//   const handleCancelDelete = () => {
//     setOpenDeleteDialog(false);
//   };

//   const handleConfirmDelete = async () => {
//     if (!selectedEnseignant) return;
    
//     try {
//       await deleteEnseignant(selectedEnseignant.cinEns);
//       const updatedEnseignants = enseignants.filter(e => e.cinEns !== selectedEnseignant.cinEns);
//       setEnseignants(updatedEnseignants);
      
//       if (updatedEnseignants.length > 0) {
//         setSelectedEnseignant(updatedEnseignants[0]);
//         if (mainSliderRef.current) {
//           mainSliderRef.current.slickGoTo(0);
//         }
//       } else {
//         setSelectedEnseignant(null);
//       }
      
//       toast.success('Enseignant supprimé avec succès');
//     } catch (error) {
//       toast.error('Erreur lors de la suppression');
//       console.error(error);
//     }
//     setOpenDeleteDialog(false);
//   };

//   if (loading) return <div className="right-content w-100">Chargement...</div>;
//   if (error) return <div className="right-content w-100">{error}</div>;
//   if (enseignants.length === 0) return <div className="right-content w-100">Aucun enseignant trouvé</div>;

//   return (
//     <div className="right-content w-100">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />

//       <div className="card shadow border-0 w-100 flex-row p-4 res-col">
//         <h5 className="mb-0">Détails des enseignants</h5>
//         <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumb_">
//           <Link to="/">
//             <StyledBreadcrumb
//               className="StyledBreadcrumb"
//               component="a"
//               label="Accueil"
//               icon={<HomeIcon fontSize="small" />}
//             />
//           </Link>
//           <Link to="/enseignants">
//             <StyledBreadcrumb
//               className="StyledBreadcrumb"
//               label="Enseignants"
//               icon={<ExpandMoreIcon fontSize="small" />}
//             />
//           </Link>
//           <StyledBreadcrumb
//             className="StyledBreadcrumb"
//             label="Liste en détail"
//             icon={<ExpandMoreIcon fontSize="small" />}
//           />
//         </Breadcrumbs>
//       </div>

//       <div className="card productDetailsSection">
//         <div className="row">
//           <div className="col-md-5">
//             <div className="sliderWrapper pt-3 pb-3 ps-4 pe-4">
//               <h6 className='mb-4'>Galerie d'enseignants</h6>
              
//               {/* Slider principal */}
//               <Slider {...sliderSettings} ref={mainSliderRef} className='sliderBig mb-2'>
//                 {enseignants.map((enseignant, index) => (
//                   <div className="item" key={index}>
//                     <img 
//                       src={enseignant.Sexe === 'Masculin' ? ProfileM : ProfileF} 
//                       alt={`${enseignant.Nom} ${enseignant.Prenom}`} 
//                       className='w-100'
//                       style={{ maxHeight: '400px', objectFit: 'contain' }}
//                     />
//                   </div>
//                 ))}
//               </Slider>

//               {/* Slider miniature */}
//               <Slider {...thumbnailSettings} ref={thumbnailSliderRef} className='sliderSml'>
//                 {enseignants.map((enseignant, index) => (
//                   <div 
//                     className="item" 
//                     key={index}
//                     onClick={() => goToSlide(index)}
//                   >
//                     <img 
//                       src={enseignant.Sexe === 'Masculin' ? ProfileM : ProfileF} 
//                       alt={`${enseignant.Nom} ${enseignant.Prenom}`} 
//                       className='w-100 h-img-Slider'
//                       style={{ height: '80px', objectFit: 'cover', cursor: 'pointer' }}
//                     />
//                   </div>
//                 ))}
//               </Slider>

//               <div className="mt-4 d-flex">
//                 <Link to="/enseignantsFRM" className="me-2">
//                   <button className="btn btn-primary">
//                     <FaPlus /> Ajouter
//                   </button>
//                 </Link>
//                 <button 
//                   className="btn btn-danger me-2"
//                   onClick={handleDeleteClick}
//                   disabled={!selectedEnseignant}
//                 >
//                   <MdDelete /> Supprimer
//                 </button>
//                 <Link to="/enseignants">
//                   <button className="btn btn-secondary">
//                     <FaReply /> Retour
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-7">
//             {selectedEnseignant && (
//               <div className='pt-3 pb-3 ps-4 pe-4'>
//                 <h6 className='mb-4'>Détails de l'enseignant</h6>
//                 <h4>{selectedEnseignant.Grade}</h4>

//                 <div className="productInfo mt-3">
//                   {[
//                     { icon: <FaUser />, label: 'Nom', value: selectedEnseignant.Nom },
//                     { icon: <FaUser />, label: 'Prénom', value: selectedEnseignant.Prenom },
//                     { icon: <FaTransgenderAlt />, label: 'Sexe', value: selectedEnseignant.Sexe },
//                     { icon: <FaTrophy />, label: 'Grade', value: selectedEnseignant.Grade },
//                     { icon: <FaLocationDot />, label: 'Adresse', value: selectedEnseignant.Adresse },
//                     { icon: <MdCall />, label: 'Téléphone', value: selectedEnseignant.Telephone },
//                     { icon: <MdEmail />, label: 'Email', value: selectedEnseignant.Email },
//                     { icon: <FaChalkboardTeacher />, label: 'Spécialité', value: selectedEnseignant.Specialite },
//                   ].map((item, index) => (
//                     <div className="row mb-2" key={index}>
//                       <div className="col-sm-3 d-flex align-items-center">
//                         <span className="icon">{item.icon}</span>
//                         <span className="name">{item.label}</span>
//                       </div>
//                       <div className="col-sm-7">
//                         :{' '}
//                         {item.value ? (
//                           <span>{item.value}</span>
//                         ) : (
//                           <span className="text-muted">Non spécifié</span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <h6 className='mt-4 mb-3'>Description</h6>
//                 <p className="text-justify">
//                   {selectedEnseignant.Descriptions || "Aucune description disponible"}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Dialog de confirmation de suppression */}
//       <Dialog
//         open={openDeleteDialog}
//         onClose={handleCancelDelete}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           Êtes-vous sûr de vouloir supprimer cet enseignant ?
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={handleCancelDelete}>Annuler</Button>
//           <Button onClick={handleConfirmDelete} color="error" autoFocus>
//             Supprimer
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <footer className="footer">
//         <div className="footer-text">
//           <p>&copy; 2025 par Planification Scolaire | Tous Droits Réservés.</p>
//         </div>
//         <div className="footer-iconTop">
//           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-link">
//             <GoMoveToTop />
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default EnseignantsTousDetails;