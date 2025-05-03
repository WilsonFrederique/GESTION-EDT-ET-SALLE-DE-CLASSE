
import React, { useState, useEffect } from 'react';
import './EdtFrm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importations MUI
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

// Importations icônes
import { FaTimes } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { GoMoveToTop } from "react-icons/go";

// Importations API
import { createEdt, updateEdt, getEdt, checkEdtAvailability } from '../../services/edts_api';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllSalles, Salle } from '../../services/salles_api';
import { getAllNiveaux, Niveaux } from '../../services/niveaux_api';
import { getAllParcours, Parcour } from '../../services/parcours_api';
import { getAllCreneaux, Creneau } from '../../services/creneaux_api';
import { getAllMatieres, Matiere } from '../../services/matiers_api';
import { getAllEnseignants, Enseignant } from '../../services/enseignants_api';

const EdtFrm = () => {
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor = 
            theme.palette.mode === 'light' 
            ? theme.palette.grey[100] 
            : theme.palette.grey[800];
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
                backgroundColor: emphasize(backgroundColor, 0.12)
            }
        };
    });

    const navigate = useNavigate();
    const { IDEdt } = useParams();
    const [searchParams] = useSearchParams();
    const isEditMode = Boolean(IDEdt);
    
    // Récupérer les paramètres d'URL
    const niveauIdFromUrl = searchParams.get('niveau');
    const parcoursIdFromUrl = searchParams.get('parcours');
    
    const [edtData, setEdtData] = useState({
        IDEdt: 0,
        IDSalle: '',
        IDNiveaux: niveauIdFromUrl || '',
        IDParcours: parcoursIdFromUrl || '',
        IDCreneaux: 0,
        IDMatiere: '',
        cinEns: ''
    });

    const [salles, setSalles] = useState<Salle[]>([]);
    const [niveaux, setNiveaux] = useState<Niveaux[]>([]);
    const [parcours, setParcours] = useState<Parcour[]>([]);
    const [creneaux, setCreneaux] = useState<Creneau[]>([]);
    const [matieres, setMatieres] = useState<Matiere[]>([]);
    const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
    const [loading, setLoading] = useState(true);
    const [salleAvailability, setSalleAvailability] = useState<Record<string, {available: boolean, conflictDetails?: any}>>({});
    const [teacherAvailability, setTeacherAvailability] = useState<Record<string, {available: boolean, conflictDetails?: any}>>({});
    const [formValid, setFormValid] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [niveauParcoursConflict, setNiveauParcoursConflict] = useState<any>(null);

    // Vérifier la validité du formulaire
    useEffect(() => {
        const errors: Record<string, string> = {};
        let isValid = true;

        if (!edtData.IDSalle) {
            isValid = false;
        } else if (salleAvailability[edtData.IDSalle]?.available === false) {
            errors.IDSalle = 'Cette salle n\'est pas disponible pour ce créneau';
            isValid = false;
        }

        if (!edtData.IDNiveaux) {
            isValid = false;
        }

        if (!edtData.IDParcours) {
            isValid = false;
        }

        if (!edtData.IDCreneaux) {
            isValid = false;
        }

        if (!edtData.IDMatiere) {
            isValid = false;
        }

        if (!edtData.cinEns) {
            isValid = false;
        } else if (teacherAvailability[edtData.cinEns]?.available === false) {
            errors.cinEns = 'Cet enseignant n\'est pas disponible pour ce créneau';
            isValid = false;
        }

        setFormErrors(errors);
        setFormValid(isValid);
    }, [edtData, salleAvailability, teacherAvailability]);

    // Charger les données initiales
    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    sallesData, 
                    niveauxData, 
                    parcoursData, 
                    creneauxData, 
                    matieresData, 
                    enseignantsData
                ] = await Promise.all([
                    getAllSalles(),
                    getAllNiveaux(),
                    getAllParcours(),
                    getAllCreneaux(),
                    getAllMatieres(),
                    getAllEnseignants()
                ]);

                setSalles(sallesData);
                setNiveaux(niveauxData);
                setParcours(parcoursData);
                setCreneaux(creneauxData);
                setMatieres(matieresData);
                setEnseignants(enseignantsData);

                // Initialiser la disponibilité des salles et enseignants
                const initialSalleAvailability: Record<string, {available: boolean}> = {};
                sallesData.forEach(salle => {
                    initialSalleAvailability[salle.IDSalle] = { available: true };
                });
                setSalleAvailability(initialSalleAvailability);

                const initialTeacherAvailability: Record<string, {available: boolean}> = {};
                enseignantsData.forEach(teacher => {
                    initialTeacherAvailability[teacher.cinEns] = { available: true };
                });
                setTeacherAvailability(initialTeacherAvailability);

                if (IDEdt) {
                    const data = await getEdt(Number(IDEdt));
                    setEdtData(data);
                }

                setLoading(false);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                toast.error('Erreur lors du chargement des données');
                navigate('/listesTousEDT', { replace: true });
            }
        };
        
        loadData();
    }, [IDEdt, navigate]);

    // Vérifier la disponibilité des salles et enseignants
    useEffect(() => {
        const checkAvailability = async () => {
            if (edtData.IDCreneaux && edtData.IDNiveaux && edtData.IDParcours) {
                try {
                    // Vérifier d'abord la disponibilité du niveau/parcours
                    const availabilityCheck = await checkEdtAvailability({
                        IDSalle: edtData.IDSalle || '',
                        IDCreneaux: edtData.IDCreneaux,
                        cinEns: edtData.cinEns || '',
                        excludeEdtId: isEditMode ? edtData.IDEdt : undefined
                    });

                    if (!availabilityCheck.isNiveauParcoursAvailable && availabilityCheck.niveauParcoursConflictDetails) {
                        setNiveauParcoursConflict(availabilityCheck.niveauParcoursConflictDetails);
                        toast.error(
                            <div style={{ whiteSpace: 'pre-line' }}>
                                <strong>🚫 Conflit de créneau</strong>
                                <div>Ce créneau est déjà occupé pour ce niveau et parcours (même jour, heure et date)</div>
                                <div>• Jour: {availabilityCheck.niveauParcoursConflictDetails.jour}</div>
                                <div>• Heure: {availabilityCheck.niveauParcoursConflictDetails.heure}</div>
                                <div>• Date: {availabilityCheck.niveauParcoursConflictDetails.date}</div>
                                <div>• Salle: {availabilityCheck.niveauParcoursConflictDetails.salle}</div>
                                <div>• Matière: {availabilityCheck.niveauParcoursConflictDetails.matiere}</div>
                                <div>• Enseignant: {availabilityCheck.niveauParcoursConflictDetails.enseignant}</div>
                            </div>, 
                            { autoClose: 15000 }
                        );
                    } else {
                        setNiveauParcoursConflict(null);
                    }

                    // Vérifier la disponibilité de tous les enseignants
                    const teacherAvailabilityResults = await Promise.all(
                        enseignants.map(async teacher => {
                            try {
                                const availability = await checkEdtAvailability({
                                    IDSalle: '',
                                    IDCreneaux: edtData.IDCreneaux,
                                    cinEns: teacher.cinEns,
                                    excludeEdtId: isEditMode ? edtData.IDEdt : undefined
                                });
                                return {
                                    cinEns: teacher.cinEns,
                                    available: availability.isTeacherAvailable,
                                    conflictDetails: availability.teacherConflictDetails
                                };
                            } catch (error) {
                                console.error(`Erreur vérification enseignant ${teacher.cinEns}:`, error);
                                return {
                                    cinEns: teacher.cinEns,
                                    available: true,
                                    conflictDetails: null
                                };
                            }
                        })
                    );

                    const newTeacherAvailability: Record<string, {available: boolean, conflictDetails?: any}> = {};
                    teacherAvailabilityResults.forEach(result => {
                        newTeacherAvailability[result.cinEns] = {
                            available: result.available,
                            conflictDetails: result.conflictDetails
                        };
                    });
                    setTeacherAvailability(newTeacherAvailability);

                    // Vérifier la disponibilité des salles
                    const salleAvailabilityResults = await Promise.all(
                        salles.map(async salle => {
                            try {
                                const availability = await checkEdtAvailability({
                                    IDSalle: salle.IDSalle,
                                    IDCreneaux: edtData.IDCreneaux,
                                    cinEns: edtData.cinEns || '',
                                    excludeEdtId: isEditMode ? edtData.IDEdt : undefined
                                });
                                return {
                                    IDSalle: salle.IDSalle,
                                    available: availability.isNiveauParcoursAvailable && availability.isTeacherAvailable,
                                    conflictDetails: availability.niveauParcoursConflictDetails || availability.teacherConflictDetails
                                };
                            } catch (error) {
                                console.error(`Erreur vérification salle ${salle.IDSalle}:`, error);
                                return {
                                    IDSalle: salle.IDSalle,
                                    available: true,
                                    conflictDetails: null
                                };
                            }
                        })
                    );

                    const newSalleAvailability: Record<string, {available: boolean, conflictDetails?: any}> = {};
                    salleAvailabilityResults.forEach(result => {
                        newSalleAvailability[result.IDSalle] = {
                            available: result.available,
                            conflictDetails: result.conflictDetails
                        };
                    });
                    setSalleAvailability(newSalleAvailability);

                } catch (error) {
                    console.error('Erreur lors de la vérification des disponibilités:', error);
                }
            }
        };

        const timer = setTimeout(checkAvailability, 500);
        return () => clearTimeout(timer);
    }, [edtData.IDCreneaux, edtData.cinEns, edtData.IDNiveaux, edtData.IDParcours, isEditMode, edtData.IDEdt, salles, enseignants]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEdtData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setEdtData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!formValid || niveauParcoursConflict) {
            toast.error('Veuillez corriger les erreurs dans le formulaire avant de soumettre');
            return;
        }

        try {
            if (isEditMode) {
                await updateEdt(edtData);
                toast.success('Emploi du temps modifié avec succès');
            } else {
                await createEdt(edtData);
                toast.success('Emploi du temps créé avec succès');
            }
            
            setTimeout(() => navigate('/listesTousEDT'), 2000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'emploi du temps:', error);
            
            if (error instanceof Error) {
                if (error.message.includes("Conflit de niveau/parcours")) {
                    toast.error(
                        <div style={{ whiteSpace: 'pre-line' }}>
                            <strong>🚫 Conflit de créneau</strong>
                            <div>{error.message}</div>
                            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                Veuillez choisir un autre créneau ou une autre salle
                            </div>
                        </div>, 
                        { autoClose: 15000 }
                    );
                } else if (error.message.includes("Conflit d'enseignant")) {
                    toast.error(
                        <div style={{ whiteSpace: 'pre-line' }}>
                            <strong>🚫 Conflit d'enseignant</strong>
                            <div>{error.message}</div>
                            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                Veuillez choisir un autre enseignant ou un autre créneau
                            </div>
                        </div>, 
                        { autoClose: 15000 }
                    );
                } else {
                    toast.error(
                        <div style={{ whiteSpace: 'pre-line' }}>{error.message}</div>
                    );
                }
            } else {
                toast.error('Une erreur inattendue est survenue');
            }
        }
    };

    const handleCancel = () => {
        navigate('/listesTousEDT');
    };

    if (loading) {
        return <div className="right-content w-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
            </div>
        </div>;
    }

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="right-content w-100">
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

            <div className="card shadow border-0 w-100 flex-row p-4">
                <h5 className="mb-0">{isEditMode ? 'Modification' : 'Ajout'} d'un emploi du temps</h5>
                <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                    <a href="/">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            component="a"
                            label="Accueil"
                            icon={<HomeIcon fontSize='small' />}
                        />
                    </a>
                    <a href="/listesTousEDT">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            label="Liste"
                            icon={<ExpandMoreIcon fontSize="small" />}
                        />
                    </a>
                    <StyledBreadcrumb 
                        className='StyledBreadcrumb' 
                        label={isEditMode ? "Modification" : "Ajout"}
                        icon={<ExpandMoreIcon fontSize="small" />}
                    />
                </Breadcrumbs>
            </div>

            <form className='form' onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card p-4">
                            <h5 className='mb-4'>Données principales de l'emploi du temps</h5>

                            {/* Niveau et Parcours */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group-modern">
                                        <label htmlFor="IDNiveaux" className="modern-label">
                                            <div className="label-content">
                                                <span className="label-text">Niveau</span>
                                                <span className="required-star">*</span>
                                            </div>
                                            <div className="label-decoration"></div>
                                        </label>
                                        <Select
                                            id="IDNiveaux"
                                            name="IDNiveaux"
                                            value={edtData.IDNiveaux}
                                            onChange={handleSelectChange}
                                            required
                                            className="modern-select modern-select-moderne"
                                            disabled={!!niveauIdFromUrl}
                                            MenuProps={{
                                                className: "modern-menu",
                                                PaperProps: {
                                                    className: "modern-menu-paper"
                                                },
                                                TransitionProps: { timeout: 200 }
                                            }}
                                            renderValue={(selected) => (
                                                selected ? (
                                                    <div className="selected-value-modern">
                                                        <div className="selected-chip">
                                                            {niveaux.find(n => n.IDNiveaux === selected)?.Niveaux || selected}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="placeholder-text">Sélectionnez un niveau</span>
                                                )
                                            )}
                                        >
                                            <MenuItem value="" disabled className="modern-menu-item placeholder">
                                                <div className="search-placeholder-modern">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
                                                            stroke="currentColor" strokeWidth="1.5"/>
                                                        <path d="M21 21L16.65 16.65" 
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                    <span>Rechercher un niveau...</span>
                                                </div>
                                            </MenuItem>
                                            {niveaux.map((niveau) => (
                                                <MenuItem 
                                                    key={niveau.IDNiveaux} 
                                                    value={niveau.IDNiveaux}
                                                    className="modern-menu-item"
                                                >
                                                    <div className="niveau-item">
                                                        <span className="niveau-code">{niveau.IDNiveaux}</span>
                                                        <span className="niveau-name">{niveau.Niveaux}</span>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formErrors.IDNiveaux && (
                                            <div className="modern-error-message">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                                                        stroke="currentColor" strokeWidth="2"/>
                                                    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                                {formErrors.IDNiveaux}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group-modern">
                                        <label htmlFor="IDParcours" className="modern-label">
                                            <div className="label-content">
                                                <span className="label-text">Parcours</span>
                                                <span className="required-star">*</span>
                                            </div>
                                            <div className="label-decoration"></div>
                                        </label>
                                        <Select
                                            id="IDParcours"
                                            name="IDParcours"
                                            value={edtData.IDParcours}
                                            onChange={handleSelectChange}
                                            required
                                            className="modern-select modern-select-moderne"
                                            disabled={!!parcoursIdFromUrl}
                                            MenuProps={{
                                                className: "modern-menu",
                                                PaperProps: {
                                                    className: "modern-menu-paper"
                                                },
                                                TransitionProps: { timeout: 200 }
                                            }}
                                            renderValue={(selected) => (
                                                selected ? (
                                                    <div className="selected-value-modern">
                                                        <div className="selected-chip">
                                                            {parcours.find(p => p.IDParcours === selected)?.Parcours || selected}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="placeholder-text">Sélectionnez un parcours</span>
                                                )
                                            )}
                                        >
                                            <MenuItem value="" disabled className="modern-menu-item placeholder">
                                                <div className="search-placeholder-modern">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
                                                            stroke="currentColor" strokeWidth="1.5"/>
                                                        <path d="M21 21L16.65 16.65" 
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                    <span>Rechercher un parcours...</span>
                                                </div>
                                            </MenuItem>
                                            {parcours.map((parcour) => (
                                                <MenuItem 
                                                    key={parcour.IDParcours} 
                                                    value={parcour.IDParcours}
                                                    className="modern-menu-item"
                                                >
                                                    <div className="parcours-item">
                                                        <span className="parcours-code">{parcour.IDParcours}</span>
                                                        <span className="parcours-name">{parcour.Parcours}</span>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formErrors.IDParcours && (
                                            <div className="modern-error-message">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                                                        stroke="currentColor" strokeWidth="2"/>
                                                    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                                {formErrors.IDParcours}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Créneau */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="IDNiveaux" className="modern-label">
                                            <div className="label-content">
                                                <span className="label-text">Créneau horaire</span>
                                                <span className="required-star">*</span>
                                            </div>
                                            <div className="label-decoration"></div>
                                        </label>
                                        <Autocomplete
                                        id="IDCreneaux"
                                        options={creneaux}
                                        getOptionLabel={(option) => `${option.Jours} : ${option.HeureDebut}-${option.HeureFin}`}
                                        value={creneaux.find(c => c.IDCreneaux === edtData.IDCreneaux) || null}
                                        onChange={(event, newValue) => {
                                            setEdtData({...edtData, IDCreneaux: newValue?.IDCreneaux || 0});
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            placeholder="Rechercher un créneau..."
                                            variant="outlined"
                                            required
                                            error={!!formErrors.IDCreneaux}
                                            helperText={formErrors.IDCreneaux}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                <div className="search-adornment">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className='svg'>
                                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
                                                            stroke="currentColor" strokeWidth="2"/>
                                                    <path d="M21 21L16.65 16.65" 
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                    {params.InputProps.startAdornment}
                                                </div>
                                                ),
                                                className: "search-input"
                                            }}
                                            />
                                        )}
                                        renderOption={(props, option) => (
                                            <li {...props} className="time-slot-card">
                                            <div className="time-indicator">
                                                <div className="time-badge">
                                                {option.Jours.substring(0, 3).toUpperCase()}
                                                </div>
                                                <div className="time-range">
                                                <span className="time-text">{option.HeureDebut}-{option.HeureFin}</span>
                                                <span className="time-type">{option.Type || 'Standard'}</span>
                                                </div>
                                            </div>
                                            <div className="time-period">
                                                <span className="date-range">
                                                {formatDate(option.DateDebut)} → {formatDate(option.DateFin)}
                                                </span>
                                            </div>
                                            <div className="time-selector">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                            </li>
                                        )}
                                        groupBy={(option) => option.Jours}
                                        renderGroup={(params) => (
                                            <li key={params.key} className="day-group">
                                                <div className="day-header">
                                                    <span className="day-name">{params.group}</span>
                                                    <span className="day-count">{params.children.length} créneaux</span>
                                                </div>
                                                <ul className="time-slots-list">
                                                    {params.children}
                                                </ul>
                                            </li>
                                        )}
                                        noOptionsText={
                                            <div className="no-results">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                                                    stroke="currentColor" strokeWidth="2"/>
                                                <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            <h4>Aucun créneau trouvé</h4>
                                            <p>Essayez un autre terme de recherche</p>
                                            </div>
                                        }
                                        className="modern-autocomplete"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Matière et Enseignant */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group-modern">
                                    <label htmlFor="IDMatiere" className="modern-label">
                                        <div className="label-content">
                                        <span className="label-text">Matière</span>
                                        <span className="required-star">*</span>
                                        </div>
                                        <div className="label-decoration"></div>
                                    </label>
                                    <Select
                                        id="IDMatiere"
                                        name="IDMatiere"
                                        value={edtData.IDMatiere}
                                        onChange={handleSelectChange}
                                        required
                                        className="modern-select modern-select-moderne"
                                        MenuProps={{
                                        className: "modern-menu",
                                        PaperProps: {
                                            className: "modern-menu-paper"
                                        },
                                        TransitionProps: { timeout: 200 }
                                        }}
                                        renderValue={(selected) => (
                                        selected ? (
                                            <div className="selected-value-modern">
                                            <div className="selected-chip">
                                                {matieres.find(m => m.IDMatiere === selected)?.Matiere || selected}
                                            </div>
                                            </div>
                                        ) : (
                                            <span className="placeholder-text">Sélectionnez une matière</span>
                                        )
                                        )}
                                    >
                                        <MenuItem value="" disabled className="modern-menu-item placeholder">
                                        <div className="search-placeholder-modern">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
                                                stroke="currentColor" strokeWidth="1.5"/>
                                            <path d="M21 21L16.65 16.65" 
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                            <span>Rechercher une matière...</span>
                                        </div>
                                        </MenuItem>
                                        {matieres.map((matiere) => (
                                        <MenuItem 
                                            key={matiere.IDMatiere} 
                                            value={matiere.IDMatiere}
                                            className="modern-menu-item"
                                        >
                                            <div className="matiere-item">
                                            <span className="matiere-code">{matiere.IDMatiere}</span>
                                            <span className="matiere-name">{matiere.Matiere}</span>
                                            </div>
                                        </MenuItem>
                                        ))}
                                    </Select>
                                    {formErrors.IDMatiere && (
                                        <div className="modern-error-message">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                                            stroke="currentColor" strokeWidth="2"/>
                                            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                        {formErrors.IDMatiere}
                                        </div>
                                    )}
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group-modern">
                                    <label htmlFor="cinEns" className="modern-label">
                                        <div className="label-content">
                                        <span className="label-text">Enseignant</span>
                                        <span className="required-star">*</span>
                                        </div>
                                        <div className="label-decoration"></div>
                                    </label>
                                    <Select
                                        id="cinEns"
                                        name="cinEns"
                                        value={edtData.cinEns}
                                        onChange={handleSelectChange}
                                        required
                                        className="modern-select modern-select-moderne"
                                        error={!!formErrors.cinEns}
                                        MenuProps={{
                                        className: "modern-menu",
                                        PaperProps: {
                                            className: "modern-menu-paper"
                                        },
                                        TransitionProps: { timeout: 200 }
                                        }}
                                        renderValue={(selected) => {
                                        if (!selected) {
                                            return <span className="placeholder-text">Sélectionnez un enseignant</span>;
                                        }
                                        
                                        const enseignant = enseignants.find(e => e.cinEns === selected);
                                        const isAvailable = teacherAvailability[selected]?.available ?? true;
                                        
                                        return (
                                            <div className="selected-value-modern">
                                            <div className={`selected-chip ${!isAvailable ? 'unavailable' : ''}`}>
                                                {enseignant?.Nom} {enseignant?.Prenom}
                                                <span className="availability-badge">
                                                {isAvailable ? (
                                                    <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" 
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                        <path d="M22 4L12 14.01l-3-3" 
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                    </>
                                                ) : (
                                                    <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                                                        stroke="currentColor" strokeWidth="2"/>
                                                        <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                        <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                    </>
                                                )}
                                                </span>
                                            </div>
                                            </div>
                                        );
                                        }}
                                    >
                                        <MenuItem value="" disabled className="modern-menu-item placeholder">
                                        <div className="search-placeholder-modern">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
                                                stroke="currentColor" strokeWidth="1.5"/>
                                            <path d="M21 21L16.65 16.65" 
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                            <span>Rechercher un enseignant...</span>
                                        </div>
                                        </MenuItem>
                                        {enseignants.map((enseignant) => {
                                        const isSelected = enseignant.cinEns === edtData.cinEns;
                                        const isAvailable = teacherAvailability[enseignant.cinEns]?.available ?? true;
                                        
                                        return (
                                            <MenuItem 
                                            key={enseignant.cinEns} 
                                            value={enseignant.cinEns}
                                            className={`modern-menu-item ${!isAvailable && !isSelected ? 'unavailable-item' : ''}`}
                                            disabled={!isAvailable && !isSelected}
                                            >
                                            <div className="teacher-card-modern">
                                                <div className="teacher-avatar-modern">
                                                {enseignant.Nom.charAt(0)}{enseignant.Prenom.charAt(0)}
                                                </div>
                                                <div className="teacher-details-modern">
                                                <div className="teacher-name-modern">
                                                    {enseignant.Nom} {enseignant.Prenom}
                                                    <span className={`teacher-status-modern ${isAvailable ? 'available' : 'unavailable'}`}>
                                                    {isAvailable ? 'Disponible' : 'Occupé'}
                                                    </span>
                                                </div>
                                                <div className="teacher-id-modern">{enseignant.cinEns}</div>
                                                {!isAvailable && teacherAvailability[enseignant.cinEns]?.conflictDetails && (
                                                    <div className="teacher-conflict-modern">
                                                    <div className="conflict-item">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                                                            stroke="currentColor" strokeWidth="2"/>
                                                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                        <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                        </svg>
                                                        <span>En conflit avec {teacherAvailability[enseignant.cinEns].conflictDetails.matiere}</span>
                                                    </div>
                                                    </div>
                                                )}
                                                </div>
                                            </div>
                                            </MenuItem>
                                        );
                                        })}
                                    </Select>
                                    {formErrors.cinEns && (
                                        <div className="modern-error-message">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                                            stroke="currentColor" strokeWidth="2"/>
                                            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                        {formErrors.cinEns}
                                        </div>
                                    )}
                                    {edtData.cinEns && !teacherAvailability[edtData.cinEns]?.available && (
                                        <div className="modern-conflict-details">
                                        <div className="conflict-header">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                                                stroke="currentColor" strokeWidth="2"/>
                                            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            <h4>Conflit d'emploi du temps</h4>
                                        </div>
                                        <div className="conflict-content">
                                            <div className="conflict-row">
                                            <span className="conflict-label">Matière:</span>
                                            <span className="conflict-value">{teacherAvailability[edtData.cinEns]?.conflictDetails?.matiere}</span>
                                            </div>
                                            <div className="conflict-row">
                                            <span className="conflict-label">Salle:</span>
                                            <span className="conflict-value">{teacherAvailability[edtData.cinEns]?.conflictDetails?.salle}</span>
                                            </div>
                                            <div className="conflict-row">
                                            <span className="conflict-label">Niveau:</span>
                                            <span className="conflict-value">{teacherAvailability[edtData.cinEns]?.conflictDetails?.niveau}</span>
                                            </div>
                                        </div>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>

                            {/* Salle de classe */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group-salle">
                                        <label htmlFor="IDSalle">
                                            <h6 className="section-label">
                                                <span className="label-icon">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                        <path d="M22 16V22H2V16C2 13.7909 3.79086 12 6 12H18C20.2091 12 22 13.7909 22 16Z" 
                                                            stroke="currentColor" strokeWidth="1.5"/>
                                                        <path d="M16 12V8C16 5.79086 14.2091 4 12 4V4C9.79086 4 8 5.79086 8 8V12" 
                                                            stroke="currentColor" strokeWidth="1.5"/>
                                                    </svg>
                                                </span>
                                                Salle de classe &nbsp; <span className='etoil'>*</span>
                                            </h6>
                                        </label>
                                        <Select
                                        id="IDSalle"
                                        name="IDSalle"
                                        value={edtData.IDSalle}
                                        onChange={handleSelectChange}
                                        required
                                        className="glass-select"
                                        MenuProps={{
                                            className: "glass-menu",
                                            PaperProps: {
                                            className: "glass-menu-paper"
                                            },
                                            TransitionProps: { timeout: 200 }
                                        }}
                                        displayEmpty
                                        renderValue={(selected) => {
                                            if (!selected) {
                                            return (
                                                <div className="selected-placeholder">
                                                <span>Sélectionnez une salle</span>
                                                </div>
                                            );
                                            }
                                            const salle = salles.find(s => s.IDSalle === selected);
                                            const availability = salleAvailability[selected] || { available: true };
                                            return (
                                            <div className="selected-value">
                                                <div className="salle-avatar-resulttat">
                                                <span>{salle?.IDSalle}</span>
                                                </div>
                                                <div className="salle-details">
                                                <span className="salle-id">{salle?.IDSalle}</span>
                                                <span className="salle-name">{salle?.Salle}</span>
                                                <span className={`salle-status ${availability.available ? 'available' : 'unavailable'}`}>
                                                    {availability.available ? 'Disponible' : 'Non disponible'}
                                                </span>
                                                </div>
                                            </div>
                                            );
                                        }}
                                        >
                                        <MenuItem value="" className="glass-menu-item placeholder" disabled>
                                            <div className="search-placeholder">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
                                                        stroke="currentColor" strokeWidth="1.5"/>
                                                    <path d="M21 21L16.65 16.65" 
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                                <span>Rechercher une salle...</span>
                                            </div>
                                        </MenuItem>
                                        {salles.map((salle) => {
                                            const availability = salleAvailability[salle.IDSalle] || { available: true };
                                            const isCurrentSelected = salle.IDSalle === edtData.IDSalle;
                                            return (
                                                <MenuItem 
                                                key={salle.IDSalle} 
                                                value={salle.IDSalle} 
                                                className={`glass-menu-item ${!availability.available && !isCurrentSelected ? 'unavailable-item' : ''}`}
                                                disabled={!availability.available && !isCurrentSelected}
                                                >
                                                <div className="salle-card">
                                                    <div className="salle-avatar">
                                                        <span>{salle.IDSalle}</span>
                                                    </div>
                                                    <div className="salle-content">
                                                    <div className="salle-header">
                                                        <span className="salle-id">{salle.IDSalle}</span>
                                                        <span className={`salle-status ${availability.available ? 'available' : 'unavailable'}`}>
                                                            {availability.available ? 'Disponible' : 'Non disponible'}
                                                        </span>
                                                    </div>
                                                    <span className="salle-name">{salle.Salle}</span>
                                                    {!availability.available && availability.conflictDetails && (
                                                        <div className="salle-conflict-info">
                                                            <div>Conflit avec: {availability.conflictDetails.matiere}</div>
                                                            <div>Enseignant: {availability.conflictDetails.enseignant}</div>
                                                        </div>
                                                    )}
                                                    </div>
                                                    {!availability.available && !isCurrentSelected && (
                                                        <div className="salle-unavailable-overlay">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                                                                    stroke="currentColor" strokeWidth="2"/>
                                                                <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                                <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                </MenuItem>
                                            );
                                        })}
                                        </Select>
                                        {formErrors.IDSalle && (
                                            <div className="error-message">{formErrors.IDSalle}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Boutons */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card p-4 mt-0">
                            <div className="d-flex gap-3">
                                <Tooltip 
                                    title={!formValid ? "Veuillez remplir tous les champs requis et corriger les erreurs" : ""}
                                    placement="top"
                                >
                                    <span style={{ width: '100%' }}>
                                        <Button 
                                            type='submit' 
                                            variant="contained" 
                                            color="primary"
                                            disabled={!formValid || niveauParcoursConflict !== null}
                                            startIcon={isEditMode ? <FaRegEdit /> : <IoAdd />}
                                            className={isEditMode ? 'btn-blue btn-lg w-100' : 'btn-edt btn-lg w-100' }
                                            sx={{
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                padding: '12px 24px',
                                                borderRadius: '8px',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                boxShadow: 'none',
                                                }
                                            }}
                                            >
                                            {isEditMode ? 'MODIFIER' : 'ENREGISTRER'}
                                        </Button>
                                    </span>
                                </Tooltip>
                                <Button 
                                    type='button'
                                    variant="contained" 
                                    color="error"
                                    startIcon={<FaTimes />}
                                    className='btn-dang btn-lg w-100'
                                    onClick={handleCancel}
                                >
                                    ANNULER
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <footer className="footer">
                <div className="footer-text">
                    <p>&copy; 2025 par Planification Scolaire | Tous Droits Réservés.</p>
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

export default EdtFrm;