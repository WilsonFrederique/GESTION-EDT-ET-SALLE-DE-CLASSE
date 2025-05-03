import React, { useState, useEffect } from 'react';
import './MatiersFrm.css';
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
import { FaTimes } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

import { createMatiere, updateMatiere, getMatiere, getAllMatieres } from '../../services/matiers_api';
import { useParams, useNavigate } from 'react-router-dom';

const MatiersFrm = () => {
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
    const { IDMatiere } = useParams();
    const isEditMode = Boolean(IDMatiere);
    
    // État pour les champs du formulaire
    const [matiereData, setMatiereData] = useState({
        IDMatiere: '',
        Matiere: ''
    });

    // Liste des IDs existants
    const [existingIds, setExistingIds] = useState<string[]>([]);

    // Charger les IDs existants et les données si en mode édition
    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger toutes les matières pour vérifier les IDs existants
                const matieres = await getAllMatieres();
                setExistingIds(matieres.map(m => m.IDMatiere));

                // Si en mode édition, charger les données de la matière
                if (IDMatiere) {
                    const data = await getMatiere(IDMatiere);
                    setMatiereData(data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                toast.error('Erreur lors du chargement des données');
                navigate('/matiersListe', { replace: true });
            }
        };
        
        loadData();
    }, [IDMatiere, navigate]);

    // Gérer le changement dans les champs du formulaire
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMatiereData(prevData => ({
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
        if (!isEditMode && checkIfIdExists(matiereData.IDMatiere)) {
            toast.error(`L'ID Matière ${matiereData.IDMatiere} existe déjà`);
            return;
        }

        try {
            if (isEditMode) {
                await updateMatiere(matiereData);
                toast.success('Matière modifiée avec succès');
            } else {
                await createMatiere(matiereData);
                toast.success('Matière créée avec succès');
            }
            
            // Redirection après un délai pour voir le message de succès
            setTimeout(() => navigate('/matiersListe'), 2000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la matière:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    const handleCancel = () => {
        navigate('/matiersListe');
    };

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
                <h5 className="mb-0">{isEditMode ? 'Modification' : 'Ajout'} d'une matière</h5>
                <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                    <a href="/">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            component="a"
                            label="Accueil"
                            icon={<HomeIcon fontSize='small' />}
                        />
                    </a>
                    <a href="/matiersListe">
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
                            <h5 className='mb-4'>Données principales de la matière</h5>

                            <div className="form-group">
                                <label htmlFor="IDMatiere">
                                    <h6>ID Matière</h6>
                                </label>
                                <input
                                    id="IDMatiere"
                                    type="text"
                                    name="IDMatiere"
                                    value={matiereData.IDMatiere}
                                    onChange={handleInputChange}
                                    required
                                    className="form-control"
                                    disabled={isEditMode}
                                    maxLength={10}
                                />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Matiere">
                                            <h6>Matière</h6>
                                        </label>
                                        <input
                                            id="Matiere"
                                            type="text"
                                            name="Matiere"
                                            value={matiereData.Matiere}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
                                            maxLength={50}
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

export default MatiersFrm;