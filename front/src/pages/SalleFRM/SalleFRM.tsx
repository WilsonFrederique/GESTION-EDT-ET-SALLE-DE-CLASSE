import React, { useState, useEffect } from 'react'
import './SalleFRM.css'
import "react-lazy-load-image-component/src/effects/blur.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import { GoMoveToTop } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";

import { createSalle, updateSalle, getSalle, getAllSalles } from '../../services/salles_api';
import { useParams, useNavigate } from 'react-router-dom';

const SalleFRM = () => {
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

    // ================================================== CRUD ===============================================
    const navigate = useNavigate();
    const { IDSalle } = useParams();
    const isEditMode = Boolean(IDSalle);
    
    // État pour les champs du formulaire
    const [salleData, setSalleData] = useState({
        IDSalle: '',
        Salle: '',
        Disponibilite: ''
    });

    // Liste des IDs existants
    const [existingIds, setExistingIds] = useState<string[]>([]);

    // Charger les IDs existants et les données si en mode édition
    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger toutes les salles pour vérifier les IDs existants
                const salles = await getAllSalles();
                setExistingIds(salles.map(s => s.IDSalle));

                // Si en mode édition, charger les données de la salle
                if (IDSalle) {
                    const data = await getSalle(IDSalle);
                    setSalleData(data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                toast.error('Erreur lors du chargement des données');
                navigate('/salleListe', { replace: true });
            }
        };
        
        loadData();
    }, [IDSalle, navigate]);

    // Gérer le changement dans les champs du formulaire
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSalleData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Vérifier si l'ID existe déjà
    const checkIfIdExists = (id: string) => {
        return existingIds.includes(id);
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // En mode création, vérifier si l'ID existe déjà
        if (!isEditMode && checkIfIdExists(salleData.IDSalle)) {
            toast.error(`L'ID Salle ${salleData.IDSalle} existe déjà`);
            return;
        }

        try {
            if (isEditMode) {
                await updateSalle(salleData);
                toast.success('Salle modifiée avec succès');
            } else {
                await createSalle(salleData);
                toast.success('Salle créée avec succès');
            }
            
            // Redirection après un délai pour voir le message de succès
            setTimeout(() => navigate('/salleListe'), 2000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la salle:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    const handleCancel = () => {
        navigate('/salleListe');
    };

    // ==============================================================================================================

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

            <div className="card shadow border-0 w-100 flex-row p-4">
                <h5 className="mb-0">{isEditMode ? 'Modification' : 'Ajout'} d'une salle</h5>
                <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                    <a href="/">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            component="a"
                            label="Accueil"
                            icon={<HomeIcon fontSize='small' />}
                        />
                    </a>
                    <a href="/salleListe">
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
                {/* Input */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card p-4">
                            <h5 className='mb-4'>Données principales de la salle</h5>

                            <div className="form-group">
                                <label htmlFor="IDSalle">
                                    <h6>ID Salle</h6>
                                </label>
                                <input
                                    id="IDSalle"
                                    type="text"
                                    name="IDSalle"
                                    value={salleData.IDSalle}
                                    onChange={handleInputChange}
                                    required
                                    className="form-control"
                                    disabled={isEditMode}
                                />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Salle">
                                            <h6>Salle</h6>
                                        </label>
                                        <input
                                            id="Salle"
                                            type="text"
                                            name="Salle"
                                            value={salleData.Salle}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label><h6>Disponibilité</h6></label>
                                        <div className="radio-group-modern">
                                            <label className={`radio-option ${salleData.Disponibilite === 'Oui' ? 'selected' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="Disponibilite"
                                                    value="Oui"
                                                    checked={salleData.Disponibilite === 'Oui'}
                                                    onChange={() => setSalleData({...salleData, Disponibilite: 'Oui'})}
                                                    required
                                                />
                                                <span className="radio-label">
                                                    <div className="choix">
                                                        <div>
                                                            Oui (Disponible)
                                                        </div>
                                                        <div>
                                                            {salleData.Disponibilite === 'Oui' && <FaCheckSquare className="radio-icon" />}
                                                        </div>
                                                    </div>
                                                </span>
                                            </label>
                                            
                                            <label className={`radio-option ${salleData.Disponibilite === 'Non' ? 'selected' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="Disponibilite"
                                                    value="Non"
                                                    checked={salleData.Disponibilite === 'Non'}
                                                    onChange={() => setSalleData({...salleData, Disponibilite: 'Non'})}
                                                />
                                                <span className="radio-label">
                                                    <div className="choix">
                                                        <div>
                                                            Non (Non disponible)
                                                        </div>
                                                        <div>
                                                            {salleData.Disponibilite === 'Non' && <FaCheckSquare className="radio-icon" />}
                                                        </div>
                                                    </div>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card p-4 mt-0">
                            <div className="d-flex gap-3">
                                <Button 
                                    type='submit' 
                                    variant="contained" 
                                    color="primary"
                                    startIcon={<FaPlus />}
                                    className='btn-blue btn-lg w-100'
                                >
                                    {isEditMode ? 'MODIFIER' : 'ENREGISTRER'}
                                </Button>
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
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Remonter en haut de la page"
                    >
                        <GoMoveToTop />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default SalleFRM;