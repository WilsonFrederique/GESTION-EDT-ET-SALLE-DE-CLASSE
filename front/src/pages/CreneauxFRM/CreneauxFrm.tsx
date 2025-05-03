import React, { useState, useEffect } from 'react'
import './CreneauxFrm.css'
import "react-lazy-load-image-component/src/effects/blur.css"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import { emphasize, styled } from '@mui/material/styles'
import HomeIcon from '@mui/icons-material/Home'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

import { GoMoveToTop } from "react-icons/go"
import { FaTimes, FaCheckSquare } from "react-icons/fa"
import { IoAdd } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

import { createCreneau, updateCreneau, getCreneau, checkExistingCreneaux } from '../../services/creneaux_api'
import { useParams, useNavigate } from 'react-router-dom'

const CreneauxFrm = () => {
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor = 
            theme.palette.mode === 'light' 
            ? theme.palette.grey[100] 
            : theme.palette.grey[800]
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
        }
    })

    // ================================================== CRUD ===============================================
    const navigate = useNavigate()
    const { IDCreneaux } = useParams()
    const isEditMode = Boolean(IDCreneaux)
    
    // État pour les champs du formulaire
    const [creneauData, setCreneauData] = useState({
        Jours: '',
        HeureDebut: '',
        HeureFin: '',
        DateDebut: '',
        DateFin: ''
    })

    // Liste des jours disponibles
    const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

    // Charger les données si en mode édition
    useEffect(() => {
        const loadData = async () => {
            try {
                if (isEditMode && IDCreneaux) {
                    const data = await getCreneau(Number(IDCreneaux));
                    setCreneauData({
                        ...data,
                        DateDebut: formatDateForInput(data.DateDebut),
                        DateFin: formatDateForInput(data.DateFin)
                    });
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                toast.error('Erreur lors du chargement des données');
                navigate('/creneauxListe', { replace: true });
            }
        };
        
        loadData();
    }, [IDCreneaux, isEditMode, navigate]);

    // Fonction pour formater la date pour l'input de type date (YYYY-MM-DD)
    const formatDateForInput = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Fonction pour valider que DateFin >= DateDebut
    const validateDates = (dateDebut: string, dateFin: string): boolean => {
        if (!dateDebut || !dateFin) return true;
        return new Date(dateFin) >= new Date(dateDebut);
    };

    // Fonction pour valider que HeureFin > HeureDebut
    const validateHeures = (heureDebut: string, heureFin: string): boolean => {
        if (!heureDebut || !heureFin) return true;
        
        // Convertir les heures en minutes pour faciliter la comparaison
        const [debutHours, debutMinutes] = heureDebut.split(':').map(Number);
        const [finHours, finMinutes] = heureFin.split(':').map(Number);
        
        const totalDebut = debutHours * 60 + debutMinutes;
        const totalFin = finHours * 60 + finMinutes;
        
        return totalFin > totalDebut;
    };

    // Gérer le changement dans les champs du formulaire
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCreneauData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Vérifier si le créneau existe déjà
    const checkIfCreneauExists = async (): Promise<boolean> => {
        try {
            return await checkExistingCreneaux(creneauData);
        } catch (error) {
            console.error('Erreur lors de la vérification du créneau:', error);
            toast.error('Erreur lors de la vérification du créneau');
            return false;
        }
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateDates(creneauData.DateDebut, creneauData.DateFin)) {
            toast.error('La date de fin doit être postérieure ou égale à la date de début');
            return;
        }

        if (!validateHeures(creneauData.HeureDebut, creneauData.HeureFin)) {
            toast.error('L\'heure de fin doit être postérieure à l\'heure de début');
            return;
        }

        // Vérifier si le créneau existe déjà (sauf en mode édition)
        if (!isEditMode) {
            const creneauExists = await checkIfCreneauExists();
            if (creneauExists) {
                toast.error('Ce créneau existe déjà');
                return;
            }
        }

        try {
            if (isEditMode) {
                await updateCreneau({ 
                    ...creneauData, 
                    IDCreneaux: Number(IDCreneaux) 
                });
                toast.success('Créneau modifié avec succès');
            } else {
                await createCreneau(creneauData);
                toast.success('Créneau créé avec succès');
            }
            
            setTimeout(() => navigate('/creneauxListe'), 2000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du créneau:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    const handleCancel = () => {
        navigate('/creneauxListe');
    };

    return (
        <div className="right-content">
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
                <h5 className="mb-0">{isEditMode ? 'Modification' : 'Ajout'} d'un créneau</h5>
                <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                    <a href="/">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            component="a"
                            label="Accueil"
                            icon={<HomeIcon fontSize='small' />}
                        />
                    </a>
                    <a href="/creneauxListe">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            label="Listes"
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

            <div className="card shadow border-0 mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label"><h6>Jour</h6></label>
                                    <div className="radio-group-modern">
                                        {jours.map(jour => (
                                            <label 
                                                key={jour}
                                                className={`radio-option ${creneauData.Jours === jour ? 'selected' : ''}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="Jours"
                                                    value={jour}
                                                    checked={creneauData.Jours === jour}
                                                    onChange={() => setCreneauData({...creneauData, Jours: jour})}
                                                    required
                                                />
                                                <span className="radio-label">
                                                    <div className="choix">
                                                        <div>{jour}</div>
                                                        <div>
                                                            {creneauData.Jours === jour && <FaCheckSquare className="radio-icon" />}
                                                        </div>
                                                    </div>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="HeureDebut" className="form-label">
                                        <h6>Heure Début</h6>
                                    </label>
                                    <input
                                        id="HeureDebut"
                                        type="time"
                                        name="HeureDebut"
                                        value={creneauData.HeureDebut}
                                        onChange={handleInputChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="HeureFin" className="form-label">
                                        <h6>Heure Fin</h6>
                                    </label>
                                    <input
                                        id="HeureFin"
                                        type="time"
                                        name="HeureFin"
                                        value={creneauData.HeureFin}
                                        onChange={handleInputChange}
                                        required
                                        className="form-control"
                                    />
                                    {!validateHeures(creneauData.HeureDebut, creneauData.HeureFin) && (
                                        <div className="text-danger small mt-2">
                                            L'heure de fin doit être postérieure à l'heure de début
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="DateDebut" className="form-label">
                                        <h6>Date Début</h6>
                                    </label>
                                    <input
                                        id="DateDebut"
                                        type="date"
                                        name="DateDebut"
                                        value={creneauData.DateDebut}
                                        onChange={handleInputChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="DateFin" className="form-label">
                                        <h6>Date Fin</h6>
                                    </label>
                                    <input
                                        id="DateFin"
                                        type="date"
                                        name="DateFin"
                                        value={creneauData.DateFin}
                                        onChange={handleInputChange}
                                        required
                                        className="form-control"
                                    />
                                    {!validateDates(creneauData.DateDebut, creneauData.DateFin) && (
                                        <div className="text-danger small mt-2">
                                            La date de fin doit être postérieure ou égale à la date de début
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex gap-3">
                                    <Button 
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={!validateDates(creneauData.DateDebut, creneauData.DateFin) || 
                                                 !validateHeures(creneauData.HeureDebut, creneauData.HeureFin)}
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
                                    <Button 
                                        type="button"
                                        variant="contained"
                                        color="error"
                                        startIcon={<FaTimes />}
                                        className="btn-dang btn-lg w-100"
                                        onClick={handleCancel}
                                    >
                                        ANNULER
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
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
    )
}

export default CreneauxFrm