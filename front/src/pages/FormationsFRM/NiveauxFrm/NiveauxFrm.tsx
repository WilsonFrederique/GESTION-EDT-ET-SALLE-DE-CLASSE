import React, { useState, useEffect } from 'react'
import './NiveauxFrm.css'
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

import { createNiveau, updateNiveau, getNiveau, getAllNiveaux } from '../../../services/niveaux_api';
import { useParams, useNavigate } from 'react-router-dom';

const NiveauxFrm = () => {
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
    const { IDNiveaux } = useParams();
    const isEditMode = Boolean(IDNiveaux);
    
    // État pour les champs du formulaire
    const [niveauData, setNiveauData] = useState({
        IDNiveaux: '',
        Niveaux: ''
    });

    // Liste des IDs existants
    const [existingIds, setExistingIds] = useState<string[]>([]);

    // Charger les IDs existants et les données si en mode édition
    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger tous les niveaux pour vérifier les IDs existants
                const niveaux = await getAllNiveaux();
                setExistingIds(niveaux.map(n => n.IDNiveaux));

                // Si en mode édition, charger les données du niveau
                if (IDNiveaux) {
                    const data = await getNiveau(IDNiveaux);
                    setNiveauData(data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                toast.error('Erreur lors du chargement des données');
                navigate('/niveaux', { replace: true });
            }
        };
        
        loadData();
    }, [IDNiveaux, navigate]);

    // Gérer le changement dans les champs du formulaire
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNiveauData(prevData => ({
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
        if (!isEditMode && checkIfIdExists(niveauData.IDNiveaux)) {
            toast.error(`L'ID Niveau ${niveauData.IDNiveaux} existe déjà`);
            return;
        }

        try {
            if (isEditMode) {
                await updateNiveau(niveauData);
                toast.success('Niveau modifié avec succès');
            } else {
                await createNiveau(niveauData);
                toast.success('Niveau créé avec succès');
            }
            
            // Redirection après un délai pour voir le message de succès
            setTimeout(() => navigate('/niveaux'), 2000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du niveau:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    const handleCancel = () => {
        navigate('/niveaux');
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
                
                <h5 className="mb-0">{isEditMode ? 'Modification' : 'Ajout'} d'un niveau</h5>
                <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                    <a href="/">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            component="a"
                            href="#"
                            label="Accueil"
                            icon={<HomeIcon fontSize='small' />}
                        />
                    </a>
                    <a href="/niveaux">
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
                            <h5 className='mb-4'>Données principales du niveau</h5>

                            <div className="form-group">
                                <label htmlFor="IDNiveaux">
                                    <h6>ID Niveau</h6>
                                </label>
                                <input
                                    id="IDNiveaux"
                                    type="text"
                                    name="IDNiveaux"
                                    value={niveauData.IDNiveaux}
                                    onChange={handleInputChange}
                                    required
                                    className="form-control"
                                    disabled={isEditMode}
                                />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Niveaux">
                                            <h6>Niveau</h6>
                                        </label>
                                        <input
                                            id="Niveaux"
                                            type="text"
                                            name="Niveaux"
                                            value={niveauData.Niveaux}
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
                    <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <GoMoveToTop />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default NiveauxFrm;