import React, { useState, useEffect } from 'react'
import './ParcoursFrm.css'
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
import { IoMdDownload } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

import { createParcour, updateParcour, getParcour, getAllParcours } from '../../../services/parcours_api';
import { useParams, useNavigate } from 'react-router-dom';

const ParcoursFrm = () => {
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
    const { IDParcours } = useParams();
    const isEditMode = Boolean(IDParcours);
    
    // État pour les champs du formulaire
    const [parcoursData, setParcoursData] = useState({
        IDParcours: '',
        Parcours: ''
    });

    // Liste des IDs existants
    const [existingIds, setExistingIds] = useState<string[]>([]);

    // Charger les IDs existants et les données si en mode édition
    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger tous les parcours pour vérifier les IDs existants
                const parcours = await getAllParcours();
                setExistingIds(parcours.map(p => p.IDParcours));

                // Si en mode édition, charger les données du parcours
                if (IDParcours) {
                    const data = await getParcour(IDParcours);
                    setParcoursData(data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                toast.error('Erreur lors du chargement des données');
                navigate('/parcours', { replace: true });
            }
        };
        
        loadData();
    }, [IDParcours, navigate]);

    // Gérer le changement dans les champs du formulaire
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setParcoursData(prevData => ({
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
        if (!isEditMode && checkIfIdExists(parcoursData.IDParcours)) {
            toast.error(`L'ID Parcours ${parcoursData.IDParcours} existe déjà`);
            return;
        }

        try {
            if (isEditMode) {
                await updateParcour(parcoursData);
                toast.success('Parcours modifié avec succès');
            } else {
                await createParcour(parcoursData);
                toast.success('Parcours créé avec succès');
            }
            
            // Redirection après un délai pour voir le message de succès
            setTimeout(() => navigate('/parcours'), 2000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du parcours:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    const handleCancel = () => {
        navigate('/parcours');
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
                <h5 className="mb-0">{isEditMode ? 'Modification' : 'Ajout'} d'un parcours</h5>
                <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                    <a href="/">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            component="a"
                            label="Accueil"
                            icon={<HomeIcon fontSize='small' />}
                        />
                    </a>
                    <a href="/parcours">
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
                            <h5 className='mb-4'>Données principales du parcours</h5>

                            <div className="form-group">
                                <label htmlFor="IDParcours">
                                    <h6>ID Parcours</h6>
                                </label>
                                <input
                                    id="IDParcours"
                                    type="text"
                                    name="IDParcours"
                                    value={parcoursData.IDParcours}
                                    onChange={handleInputChange}
                                    required
                                    className="form-control"
                                    disabled={isEditMode}
                                />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Parcours">
                                            <h6>Parcours</h6>
                                        </label>
                                        <input
                                            id="Parcours"
                                            type="text"
                                            name="Parcours"
                                            value={parcoursData.Parcours}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
                                        />
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
                                    startIcon={<IoMdDownload />}
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

export default ParcoursFrm;