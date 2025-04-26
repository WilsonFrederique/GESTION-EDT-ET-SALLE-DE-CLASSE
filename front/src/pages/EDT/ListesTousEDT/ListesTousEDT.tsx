import React, { useEffect, useState } from 'react';
import './ListesTousEDT.css';
import '../EDT.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { GoMoveToTop } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { ImPrinter } from "react-icons/im";

import { getAllEdts, deleteEdt } from '../../../services/edts_api';
import { getAllNiveaux } from '../../../services/niveaux_api';
import { getAllParcours } from '../../../services/parcours_api';
import { getAllMatieres } from '../../../services/matiers_api';
import { getAllEnseignants } from '../../../services/enseignants_api';
import { getAllSalles } from '../../../services/salles_api';
import { getAllCreneaux } from '../../../services/creneaux_api';
import type { Edt } from '../../../services/edts_api';
import type { Niveaux } from '../../../services/niveaux_api';
import type { Parcour } from '../../../services/parcours_api';
import { Matiere } from '../../../services/matiers_api';
import type { Enseignant } from '../../../services/enseignants_api';
import type { Salle } from '../../../services/salles_api';
import type { Creneau } from '../../../services/creneaux_api';

const ListesTousEDT = () => {
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor =
            theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[800];
        return {
            backgroundColor,
            height: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            "&:hover, &:focus": {
                backgroundColor: emphasize(backgroundColor, 0.06),
            },
            "&:active": {
                boxShadow: theme.shadows[1],
                backgroundColor: emphasize(backgroundColor, 0.12),
            },
        };
    });

    // États pour les données
    const [edts, setEdts] = useState<Edt[]>([]);
    const [niveaux, setNiveaux] = useState<Niveaux[]>([]);
    const [parcours, setParcours] = useState<Parcour[]>([]);
    const [matieres, setMatieres] = useState<Matiere[]>([]);
    const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
    const [salles, setSalles] = useState<Salle[]>([]);
    const [creneaux, setCreneaux] = useState<Creneau[]>([]);
    
    // États pour les filtres
    const [selectedNiveau, setSelectedNiveau] = useState<string>("");
    const [selectedParcours, setSelectedParcours] = useState<string>("");
    
    // États pour la suppression
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [edtToDelete, setEdtToDelete] = useState<number | null>(null);

    // Charger toutes les données
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    edtsData, 
                    niveauxData, 
                    parcoursData, 
                    matieresData, 
                    enseignantsData, 
                    sallesData,
                    creneauxData
                ] = await Promise.all([
                    getAllEdts(),
                    getAllNiveaux(),
                    getAllParcours(),
                    getAllMatieres(),
                    getAllEnseignants(),
                    getAllSalles(),
                    getAllCreneaux()
                ]);
                
                setEdts(edtsData);
                setNiveaux(niveauxData);
                setParcours(parcoursData);
                setMatieres(matieresData);
                setEnseignants(enseignantsData);
                setSalles(sallesData);
                setCreneaux(creneauxData);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
                toast.error("Erreur lors du chargement des données");
            }
        };
        fetchData();
    }, []);

    // Gestion de la suppression
    const handleDeleteClick = (IDEdt: number) => {
        setEdtToDelete(IDEdt);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!edtToDelete) return;
        
        try {
            await deleteEdt(edtToDelete);
            toast.success("Emploi du temps supprimé avec succès");
            // Recharger la liste après suppression
            const data = await getAllEdts();
            setEdts(data);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'emploi du temps :", error);
            toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
        } finally {
            setOpenDeleteDialog(false);
            setEdtToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false);
        setEdtToDelete(null);
    };

    // Fonction pour trouver les détails associés
    const getNiveauDetails = (id: string) => niveaux.find(n => n.IDNiveaux === id)?.Niveaux || id;
    const getParcoursDetails = (id: string) => parcours.find(p => p.IDParcours === id)?.Parcours || id;
    const getMatiereDetails = (id: string) => matieres.find(m => m.IDMatiere === id)?.Matiere || id;
    const getEnseignantDetails = (id: string) => {
        const enseignant = enseignants.find(e => e.cinEns === id);
        return enseignant ? `${enseignant.Nom} ${enseignant.Prenom}` : id;
    };
    const getSalleDetails = (id: string) => salles.find(s => s.IDSalle === id)?.Salle || id;
    const getCreneauDetails = (id: number) => {
        const creneau = creneaux.find(c => c.IDCreneaux === id);
        if (!creneau) return id.toString();
        
        return {
            jour: creneau.Jours || 'Inconnu',
            heureDebut: creneau.HeureDebut || '00:00',
            heureFin: creneau.HeureFin || '00:00',
            dateDebut: creneau.DateDebut || new Date(),
            dateFin: creneau.DateFin || new Date()
        };
    };

    // Fonction pour formater les dates
    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Trouver la période pour un niveau spécifique
    const getPeriodForNiveau = (niveauId: string) => {
        // Trouver le premier EDT pour ce niveau
        const firstEdtForNiveau = edts.find(edt => edt.IDNiveaux === niveauId);
        if (!firstEdtForNiveau) return "Période non définie";
        
        // Trouver le créneau associé à cet EDT
        const creneau = creneaux.find(c => c.IDCreneaux === firstEdtForNiveau.IDCreneaux);
        if (!creneau) return "Période non définie";
        
        // Retourner les dates du créneau
        return `Du ${formatDate(creneau.DateDebut)} au ${formatDate(creneau.DateFin)}`;
    };

    // Grouper les EDT par niveau et créneau
    const groupedEdtsByNiveau = () => {
        const groups: Record<string, Record<number, Edt[]>> = {};
        
        // Initialiser les groupes pour tous les niveaux
        niveaux.forEach(niveau => {
            groups[niveau.IDNiveaux] = {};
        });

        edts.forEach(edt => {
            // Appliquer les filtres
            if (selectedParcours && edt.IDParcours !== selectedParcours) return;
            
            if (!groups[edt.IDNiveaux]) {
                groups[edt.IDNiveaux] = {};
            }
            
            if (!groups[edt.IDNiveaux][edt.IDCreneaux]) {
                groups[edt.IDNiveaux][edt.IDCreneaux] = [];
            }
            
            groups[edt.IDNiveaux][edt.IDCreneaux].push(edt);
        });
        
        return groups;
    };

    // Vérifier si un niveau a des EDT
    const hasEdtsForNiveau = (niveauId: string) => {
        const niveauEdts = groupedEdtsByNiveau()[niveauId];
        return niveauEdts && Object.values(niveauEdts).some(edts => edts.length > 0);
    };

    // Afficher un tableau d'emploi du temps pour un niveau donné
    const renderEdtTable = (niveauId: string) => {
        const niveauEdts = groupedEdtsByNiveau()[niveauId] || {};
        const niveauDetails = getNiveauDetails(niveauId);

        return (
            <div className="card shadow border-0 p-3 mt-4" key={niveauId}>
                <div className="fa-reg-plus-square-container ensbl">
                    <div>Emploi du temps - {niveauDetails}</div>
                    <div>
                        <a href="#"><ImPrinter className='impression' /></a> &nbsp;&nbsp;
                        <a href={`/edtFrm?niveau=${niveauId}`}><FaRegPlusSquare /></a>
                    </div>
                </div>
        
                <hr className='hr-top' />
                
                <div>
                    <h1>ENI - {niveauDetails}</h1>
                    <h2>{getPeriodForNiveau(niveauId)}</h2>

                    <form>
                        <div className="edt-table-container">
                            <table className="edt-table">
                                <thead>
                                    <tr>
                                        <th>Heures</th>
                                        <th>Lundi</th>
                                        <th>Mardi</th>
                                        <th>Mercredi</th>
                                        <th>Jeudi</th>
                                        <th>Vendredi</th>
                                        <th>Samedi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(niveauEdts).map(([creneauId, edtsForCreneau]) => {
                                        const creneauDetails = getCreneauDetails(parseInt(creneauId));
                                        const heureDebut = typeof creneauDetails === 'object' ? 
                                            creneauDetails.heureDebut : '00:00';
                                        const heureFin = typeof creneauDetails === 'object' ? 
                                            creneauDetails.heureFin : '00:00';
                                        
                                        return (
                                            <tr key={creneauId}>
                                                <td data-label="Heures">{heureDebut} - {heureFin}</td>
                                                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map(jour => {
                                                    const edtForJour = edtsForCreneau.find(edt => {
                                                        const details = getCreneauDetails(edt.IDCreneaux);
                                                        return typeof details === 'object' && details.jour === jour;
                                                    });
                                                    
                                                    return (
                                                        <td key={jour} data-label={jour}>
                                                            {edtForJour ? (
                                                                <div className="edt-cours-container">
                                                                    <div className="edt-cours">
                                                                        {getMatiereDetails(edtForJour.IDMatiere)}
                                                                    </div>
                                                                    <div className="edt-prof">
                                                                        {getEnseignantDetails(edtForJour.cinEns)}
                                                                    </div>
                                                                    <div className="edt-salle">
                                                                        Salle : {getSalleDetails(edtForJour.IDSalle)}
                                                                    </div>
                                                                    <div className="edt-actions">
                                                                        <a 
                                                                            href={`/modifierEdtFrm/${edtForJour.IDEdt}`}
                                                                            data-tooltip="Modifier"
                                                                        >
                                                                            <FaRegEdit className='modif-moderne' />
                                                                        </a>
                                                                        <button 
                                                                            className='supp-moderne' 
                                                                            onClick={() => handleDeleteClick(edtForJour.IDEdt)}
                                                                            data-tooltip="Supprimer"
                                                                        >
                                                                            <MdDeleteOutline className='icon-supp-moderne' />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="edt-buttons">
                            <Button type='button' className='btn-imprimer btn-lg'>
                                <ImPrinter /> &nbsp; IMPRIMER
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div>
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
                    Êtes-vous sûr de vouloir supprimer cet emploi du temps ?
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

            <div className="edt-container">
                <div className="right-content w-100">
                    <div className="card shadow border-0 w-100 flex-row p-4">
                        <h5 className="mb-0">Emplois du temps</h5>
                        <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumb_">
                            <a href="/">
                                <StyledBreadcrumb
                                    className="StyledBreadcrumb"
                                    component="a"
                                    label="Accueil"
                                    icon={<HomeIcon fontSize="small" />}
                                />
                            </a>
                            <StyledBreadcrumb
                                className="StyledBreadcrumb"
                                label="Listes"
                                icon={<ExpandMoreIcon fontSize="small" />}
                            />
                        </Breadcrumbs>
                    </div>

                    {/* Filtres */}
                    <div className="card shadow border-0 p-3 mt-4">
                        <div className="filters-container">
                            <div className="filter-group">
                                <h4 className="filter-title">Afficher par Niveau</h4>
                                <div className="select-wrapper">
                                    <select 
                                        className="modern-select"
                                        value={selectedNiveau}
                                        onChange={(e) => setSelectedNiveau(e.target.value)}
                                    >
                                        <option value="">Tous les niveaux</option>
                                        {niveaux.map(niveau => (
                                            <option key={niveau.IDNiveaux} value={niveau.IDNiveaux}>
                                                {niveau.Niveaux}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="select-arrow"></div>
                                </div>
                            </div>

                            <div className="filter-group">
                                <h4 className="filter-title">Afficher par Parcours</h4>
                                <div className="select-wrapper">
                                    <select 
                                        className="modern-select"
                                        value={selectedParcours}
                                        onChange={(e) => setSelectedParcours(e.target.value)}
                                    >
                                        <option value="">Tous les parcours</option>
                                        {parcours.map(parcour => (
                                            <option key={parcour.IDParcours} value={parcour.IDParcours}>
                                                {parcour.Parcours}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="select-arrow"></div>
                                </div>
                            </div>
                        </div>

                        <div className="btn-recherche">
                            <Button 
                                className='btn-blue btn-lg btn-big w-100'
                                onClick={() => {
                                    // La recherche est gérée automatiquement par les filtres
                                    toast.info("Filtres appliqués");
                                }}
                            >
                                <IoSearchOutline /> &nbsp;&nbsp; Rechercher
                            </Button>
                        </div>
                    </div>

                    {/* Affichage des emplois du temps par niveau */}
                    {selectedNiveau ? (
                        // Si un niveau est sélectionné, afficher seulement ce niveau
                        hasEdtsForNiveau(selectedNiveau) ? (
                            renderEdtTable(selectedNiveau)
                        ) : (
                            <div className="card shadow border-0 p-3 mt-4">
                                <div className="text-center py-4">
                                    <p>Aucun emploi du temps trouvé pour ce niveau.</p>
                                </div>
                            </div>
                        )
                    ) : (
                        // Sinon, afficher tous les niveaux qui ont des EDT
                        niveaux.map(niveau => (
                            hasEdtsForNiveau(niveau.IDNiveaux) && renderEdtTable(niveau.IDNiveaux)
                        ))
                    )}

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
            </div>
        </div>
    );
};

export default ListesTousEDT;