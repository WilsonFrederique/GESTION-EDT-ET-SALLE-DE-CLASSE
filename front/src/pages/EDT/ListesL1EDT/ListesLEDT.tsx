import React, { useEffect, useState, useMemo } from 'react';
import './ListesLEDT.css';
import '../EDT.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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
import { IoAddCircleOutline } from "react-icons/io5";
import { ImPrinter } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { IoCalendarOutline, IoListOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";

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

const ListesL1EDT = () => {
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
    const [creneauxGroupes, setCreneauxGroupes] = useState<any[]>([]);
    
    // États pour les filtres (seulement parcours pour L1)
    const [selectedParcours, setSelectedParcours] = useState<string>("");
    const [selectedDateDebut, setSelectedDateDebut] = useState<string>("");
    
    // États pour la suppression
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [edtToDelete, setEdtToDelete] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // ID du niveau L1
    const niveauL1Id = "N001"; // Changé de "L1" à "N001" pour correspondre à votre base de données

    // Formater l'heure (supprime les secondes)
    const formatHeure = (heure: string) => {
        if (!heure) return '00:00';
        if (heure.includes(':') && heure.split(':').length === 3) {
            return heure.split(':').slice(0, 2).join(':');
        }
        return heure;
    };

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
                
                console.log("Données chargées:", {
                    edtsData, 
                    niveauxData, 
                    parcoursData, 
                    matieresData, 
                    enseignantsData, 
                    sallesData,
                    creneauxData
                });

                // Filtrer seulement les EDT pour L1
                const edtsL1 = edtsData.filter(edt => edt.IDNiveaux === niveauL1Id);
                console.log("EDT filtrés pour L1:", edtsL1);
                
                setEdts(edtsL1);
                setNiveaux(niveauxData);
                setParcours(parcoursData);
                setMatieres(matieresData);
                setEnseignants(enseignantsData);
                setSalles(sallesData);
                setCreneaux(creneauxData);

                const grouped = groupCreneauxByTime(edtsL1, creneauxData);
                console.log("Créneaux groupés:", grouped);
                setCreneauxGroupes(grouped);

                // Définir la dernière date de début comme sélection par défaut
                if (creneauxData.length > 0) {
                    const latestDate = creneauxData.reduce((latest, creneau) => {
                        const creneauDate = new Date(creneau.DateDebut);
                        return creneauDate > latest ? creneauDate : latest;
                    }, new Date(0));
                    
                    if (latestDate.getTime() !== 0) {
                        const formattedDate = formatDate(latestDate);
                        console.log("Dernière date de début:", formattedDate);
                        setSelectedDateDebut(formattedDate);
                    }
                }
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
                toast.error("Erreur lors du chargement des données");
            }
        };
        fetchData();
    }, []);

    // Grouper les créneaux par heureDebut et heureFin
    const groupCreneauxByTime = (edtsData: Edt[], creneauxData: Creneau[]) => {
        const groups: Record<string, { heureDebut: string; heureFin: string; jours: string[]; creneauxIds: number[] }> = {};
        
        edtsData.forEach(edt => {
            const creneau = creneauxData.find(c => c.IDCreneaux === edt.IDCreneaux);
            if (!creneau) return;
            
            const heureDebut = formatHeure(creneau.HeureDebut);
            const heureFin = formatHeure(creneau.HeureFin);
            
            const key = `${heureDebut}-${heureFin}`;
            
            if (!groups[key]) {
                groups[key] = {
                    heureDebut,
                    heureFin,
                    jours: [],
                    creneauxIds: []
                };
            }
            
            if (!groups[key].jours.includes(creneau.Jours)) {
                groups[key].jours.push(creneau.Jours);
            }
            
            if (!groups[key].creneauxIds.includes(creneau.IDCreneaux)) {
                groups[key].creneauxIds.push(creneau.IDCreneaux);
            }
        });
        
        return Object.values(groups).sort((a, b) => a.heureDebut.localeCompare(b.heureDebut));
    };

    // Gestion de la suppression
    const handleDeleteClick = (IDEdt: number) => {
        setEdtToDelete(IDEdt);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!edtToDelete) return;
        
        setIsDeleting(true);
        try {
            await deleteEdt(edtToDelete);
            toast.success("Emploi du temps supprimé avec succès");
            
            // Mettre à jour les données après suppression
            const [data, creneauxData] = await Promise.all([
                getAllEdts(),
                getAllCreneaux()
            ]);
            
            // Filtrer seulement les EDT pour L1
            const edtsL1 = data.filter(edt => edt.IDNiveaux === niveauL1Id);
            
            setEdts(edtsL1);
            setCreneaux(creneauxData);
            const grouped = groupCreneauxByTime(edtsL1, creneauxData);
            setCreneauxGroupes(grouped);

            // Mettre à jour la date sélectionnée si nécessaire
            if (creneauxData.length > 0 && !creneauxData.some(c => formatDate(c.DateDebut) === selectedDateDebut)) {
                const latestDate = creneauxData.reduce((latest, creneau) => {
                    const creneauDate = new Date(creneau.DateDebut);
                    return creneauDate > latest ? creneauDate : latest;
                }, new Date(0));
                
                if (latestDate.getTime() !== 0) {
                    setSelectedDateDebut(formatDate(latestDate));
                }
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'emploi du temps :", error);
            toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
        } finally {
            setIsDeleting(false);
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
        if (!creneau) return null;
        
        return {
            ...creneau,
            heureDebut: formatHeure(creneau.HeureDebut || '00:00'),
            heureFin: formatHeure(creneau.HeureFin || '00:00')
        };
    };

    // Fonction pour formater les dates
    const formatDate = (dateString: string | Date) => {
        if (!dateString) return "Date non définie";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Date invalide";
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Grouper les EDT par parcours et créneau (niveau fixé à L1)
    const groupedEdts = useMemo(() => {
        const groups: Record<string, Record<number, Edt[]>> = {};
        
        edts.forEach(edt => {
            // Filtrer par parcours sélectionné
            if (selectedParcours && edt.IDParcours !== selectedParcours) return;
            
            // Filtrer par date de début sélectionnée
            if (selectedDateDebut) {
                const creneau = creneaux.find(c => c.IDCreneaux === edt.IDCreneaux);
                if (!creneau) return;
                
                // Comparaison des dates formatées
                const creneauDateDebut = formatDate(creneau.DateDebut);
                if (creneauDateDebut !== selectedDateDebut) return;
            }
            
            if (!groups[edt.IDParcours]) {
                groups[edt.IDParcours] = {};
            }
            
            if (!groups[edt.IDParcours][edt.IDCreneaux]) {
                groups[edt.IDParcours][edt.IDCreneaux] = [];
            }
            
            groups[edt.IDParcours][edt.IDCreneaux].push(edt);
        });
        
        console.log("EDT groupés:", groups);
        return groups;
    }, [edts, selectedParcours, selectedDateDebut, creneaux]);

    const hasEdtsForParcours = (parcoursId: string) => {
        const hasEdts = groupedEdts[parcoursId] && Object.keys(groupedEdts[parcoursId]).length > 0;
        console.log(`Parcours ${parcoursId} a des EDT:`, hasEdts);
        return hasEdts;
    };

    // Fonction pour obtenir la période en fonction des filtres
    const getPeriodForParcours = (parcoursId: string) => {
        // Filtrer les EDT par parcours
        let edtsForParcours = edts.filter(edt => 
            edt.IDParcours === parcoursId
        );
        
        // Si une date est sélectionnée, filtrer également par date
        if (selectedDateDebut) {
            edtsForParcours = edtsForParcours.filter(edt => {
                const creneau = creneaux.find(c => c.IDCreneaux === edt.IDCreneaux);
                if (!creneau) return false;
                return formatDate(creneau.DateDebut) === selectedDateDebut;
            });
        }
        
        if (edtsForParcours.length === 0) return "Période non définie";
        
        // Obtenir les créneaux correspondants
        const creneauxForParcours = edtsForParcours
            .map(edt => getCreneauDetails(edt.IDCreneaux))
            .filter(Boolean) as Creneau[];
        
        // Si une date est sélectionnée, utiliser cette date
        if (selectedDateDebut) {
            const creneau = creneauxForParcours.find(c => formatDate(c.DateDebut) === selectedDateDebut);
            if (!creneau) return "Période non définie";
            return `Du ${formatDate(creneau.DateDebut)} au ${formatDate(creneau.DateFin)}`;
        }
        
        // Sinon, trouver la date la plus récente
        const latestDateDebut = new Date(Math.max(...creneauxForParcours.map(c => new Date(c.DateDebut).getTime())));
        const correspondingDateFin = creneauxForParcours.find(c => 
            new Date(c.DateDebut).getTime() === latestDateDebut.getTime()
        )?.DateFin;
        
        if (!correspondingDateFin) return "Période non définie";
        
        return `Du ${formatDate(latestDateDebut)} au ${formatDate(correspondingDateFin)}`;
    };

    const getEdtForCreneauAndDay = (parcoursId: string, creneauId: number, jour: string) => {
        const edt = groupedEdts[parcoursId]?.[creneauId]?.find(edt => {
            const creneau = getCreneauDetails(edt.IDCreneaux);
            return creneau?.Jours === jour;
        });
        
        console.log(`Recherche EDT pour parcours ${parcoursId}, créneau ${creneauId}, jour ${jour}:`, edt);
        return edt;
    };

    const renderEdtTable = (parcoursId: string) => {
        const niveauDetails = getNiveauDetails(niveauL1Id);
        const parcoursDetails = getParcoursDetails(parcoursId);

        return (
            <div className="card shadow border-0 p-3 mt-4" key={parcoursId}>
                <div className="fa-reg-plus-square-container ensbl">
                    <div>Emploi du temps - {niveauDetails}</div>
                    <div className='add'>
                        <a href={`/edtFrm?niveau=${niveauL1Id}&parcours=${parcoursId}`}><FaRegPlusSquare className='icn' /></a>
                    </div>
                </div>
        
                <hr className='hr-top' />
                
                <div>
                    <p className='title-edt'>{niveauDetails} &nbsp; Parcours: <b>{parcoursDetails}</b></p>
                    <h2>{getPeriodForParcours(parcoursId)}</h2>

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
                                    {creneauxGroupes.map(({ heureDebut, heureFin, creneauxIds }) => (
                                        <tr key={`${heureDebut}-${heureFin}`}>
                                            <td data-label="Heures">
                                                <div className='div-heur'>
                                                    <div>{heureDebut}</div> 
                                                    <div><b>-</b></div> 
                                                    <div>{heureFin}</div>
                                                </div>
                                            </td>
                                            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map(jour => {
                                                let edtForJour = null;
                                                for (const creneauId of creneauxIds) {
                                                    edtForJour = getEdtForCreneauAndDay(parcoursId, creneauId, jour);
                                                    if (edtForJour) break;
                                                }
                                                
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
                                                                <div className="edt-actions-icones">
                                                                    <a 
                                                                        href={`/modifierEdtFrm/${edtForJour.IDEdt}`}
                                                                        data-tooltip="Modifier"
                                                                    >
                                                                        <FaRegEdit className='modif-moderne' />
                                                                    </a>
                                                                    <button 
                                                                        className='supp-moderne' 
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            handleDeleteClick(edtForJour.IDEdt);
                                                                        }}
                                                                        data-tooltip="Supprimer"
                                                                        disabled={isDeleting}
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
                                    ))}
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

    // Obtenir les dates de début uniques pour le filtre
    const uniqueDateDebuts = useMemo(() => {
        const dates = new Set<string>();
        creneaux.forEach(creneau => {
            if (creneau.DateDebut) {
                dates.add(formatDate(creneau.DateDebut));
            }
        });
        return Array.from(dates).sort((a, b) => new Date(a.split('/').reverse().join('-')).getTime() - new Date(b.split('/').reverse().join('-')).getTime());
    }, [creneaux]);

    // Obtenir la dernière date de début
    const getLatestDateDebut = () => {
        if (creneaux.length === 0) return "";
        
        const latestDate = creneaux.reduce((latest, creneau) => {
            const creneauDate = new Date(creneau.DateDebut);
            return creneauDate > latest ? creneauDate : latest;
        }, new Date(0));
        
        return latestDate.getTime() !== 0 ? formatDate(latestDate) : "";
    };

    return (
        <div>
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
                    <Button className="cancel-btn" onClick={handleCancelDelete} disabled={isDeleting}>
                        Annuler
                    </Button>
                    <Button 
                        className="confirm-btn" 
                        onClick={handleConfirmDelete} 
                        autoFocus
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Suppression en cours...' : 'Confirmer'}
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="edt-container">
                <div className="right-content w-100">
                    <div className="card shadow border-0 w-100 flex-row p-4">
                        <h5 className="mb-0">Emploi du temps de L1</h5>
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

                    <div className="card shadow border-0 p-3 mt-4">
                    
                        <div className="btn-recherche">
                            <div className="esnbl-btns-imprimer-tout-et-ajout-pour-tout">
                                <div className="text-left">
                                    Action
                                </div>
                                <div className="tbns">
                                    <div className="impr">
                                        <ImPrinter />
                                    </div>
                                    <div className="impr">
                                        <Link 
                                            to="/edtFrm" 
                                            className="impr-link"
                                        >
                                            <div className="impr">
                                            <IoAddCircleOutline />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="filters-container ultra-modern-filters">
                            <div className="filter-group glassmorphism-card">
                                <div className="filter-header">
                                    <IoCalendarOutline className="filter-icon" />
                                    <h4 className="filter-title">Date de début</h4>
                                </div>
                                <div className="select-wrapper futuristic-select">
                                    <select
                                        className="neo-select"
                                        value={selectedDateDebut}
                                        onChange={(e) => setSelectedDateDebut(e.target.value)}
                                    >
                                        <option value={getLatestDateDebut()}>Dernière date de début</option>
                                        {uniqueDateDebuts
                                        .filter(date => date !== getLatestDateDebut())
                                        .map((date, index) => (
                                            <option key={index} value={date}>
                                            {date}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="select-arrow">
                                        <FiChevronDown />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="filter-group glassmorphism-card">
                                <div className="filter-header">
                                    <IoListOutline className="filter-icon" />
                                    <h4 className="filter-title">Filtrer par Parcours</h4>
                                </div>
                                <div className="select-combo futuristic-combo">
                                <div className="neo-select-wrapper">
                                    <select
                                        className="neo-select"
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
                                </div>
                                <button
                                    className="reset-button holographic-btn"
                                    onClick={() => {
                                    setSelectedDateDebut(getLatestDateDebut());
                                    setSelectedParcours("");
                                    }}
                                >
                                    <FiRefreshCcw className="spin-on-hover" />
                                    <span className="btn-tooltip">Réinitialiser</span>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedParcours ? (
                        hasEdtsForParcours(selectedParcours) ? (
                            renderEdtTable(selectedParcours)
                        ) : (
                            <div className="card shadow border-0 p-3 mt-4">
                                <div className="text-center py-4">
                                    <p>Aucun emploi du temps trouvé pour ce parcours.</p>
                                </div>
                            </div>
                        )
                    ) : (
                        parcours.map(parcour => (
                            hasEdtsForParcours(parcour.IDParcours) && renderEdtTable(parcour.IDParcours)
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

export default ListesL1EDT;