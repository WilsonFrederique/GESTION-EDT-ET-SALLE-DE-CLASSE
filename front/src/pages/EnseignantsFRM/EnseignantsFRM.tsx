import React, { useState, useEffect } from 'react';
import './EnseignantsFRM.css';
import "react-lazy-load-image-component/src/effects/blur.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoMoveToTop } from "react-icons/go";
import { FaUpload } from 'react-icons/fa';

import { createEnseignant, updateEnseignant, getEnseignant, getAllEnseignants } from '../../services/enseignants_api';
import { useParams, useNavigate } from 'react-router-dom';

const EnseignantsFRM = () => {
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


    // Frm Contact
    const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Récupérer la valeur et ne garder que les chiffres
        const inputValue = e.target.value.replace(/\D/g, ''); // \D = tout sauf chiffres
        
        // Limiter à 10 chiffres (0340000000)
        const digits = inputValue.slice(0, 10);
        
        // Formater avec des espaces
        let formatted = '';
        if (digits.length > 0) {
          formatted += digits.slice(0, 3);
          if (digits.length > 3) {
            formatted += ' ' + digits.slice(3, 5);
            if (digits.length > 5) {
              formatted += ' ' + digits.slice(5, 8);
              if (digits.length > 8) {
                formatted += ' ' + digits.slice(8, 10);
              }
            }
          }
        }
        
        setEnseignantData({
          ...enseignantData,
          Telephone: formatted
        });
      };

    // ================================================== CRUD ===============================================
    const navigate = useNavigate();
    const { cinEns } = useParams();
    const isEditMode = Boolean(cinEns);
    
    // État pour les champs du formulaire
    const [enseignantData, setEnseignantData] = useState({
        cinEns: '',
        Nom: '',
        Prenom: '',
        Sexe: '',
        Grade: '',
        Adresse: '',
        Telephone: '',
        Email: '',
        Specialite: '',
        Descriptions: '',
        Img: ''
    });

    // Liste des CIN existants
    const [existingCINs, setExistingCINs] = useState<string[]>([]);

    // Charger les données initiales
    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger tous les enseignants pour vérifier les CIN existants
                const enseignants = await getAllEnseignants();
                setExistingCINs(enseignants.map(e => e.cinEns));

                // Si en mode édition, charger les données de l'enseignant
                if (cinEns) {
                    const data = await getEnseignant(cinEns);
                    setEnseignantData(data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                toast.error('Erreur lors du chargement des données');
                navigate('/enseignants', { replace: true });
            }
        };
        
        loadData();
    }, [cinEns, navigate]);

    // Gérer le changement dans les champs du formulaire
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEnseignantData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Gérer le changement dans les sélecteurs
    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setEnseignantData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Gérer le changement de fichier image
    const handleFileChange = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEnseignantData(prevData => ({
                    ...prevData,
                    Img: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Vérifier si le CIN existe déjà
    const checkIfCINExists = (cin: string) => {
        return existingCINs.includes(cin);
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // En mode création, vérifier si le CIN existe déjà
        if (!isEditMode && checkIfCINExists(enseignantData.cinEns)) {
            toast.error(`Le CIN ${enseignantData.cinEns} existe déjà`);
            return;
        }

        try {
            if (isEditMode) {
                await updateEnseignant(enseignantData);
                toast.success('Enseignant modifié avec succès');
            } else {
                await createEnseignant(enseignantData);
                toast.success('Enseignant créé avec succès');
            }
            
            // Redirection après un délai pour voir le message de succès
            setTimeout(() => navigate('/enseignants'), 2000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'enseignant:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    const handleCancel = () => {
        navigate('/enseignants');
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
                <h5 className="mb-0">{isEditMode ? 'Modification' : 'Ajout'} d'un enseignant</h5>
                <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                    <a href="/">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            component="a"
                            label="Accueil"
                            icon={<HomeIcon fontSize='small' />}
                        />
                    </a>
                    <a href="/enseignants">
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
                            <h5 className='mb-4'>Données principales de l'enseignant</h5>

                            {/* CIN */}
                            <div className="form-group">
                                <label htmlFor="cinEns">
                                    <h6>CIN</h6>
                                </label>
                                <input
                                    id="cinEns"
                                    type="text"
                                    name="cinEns"
                                    value={enseignantData.cinEns.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')}
                                    onChange={(e) => {
                                        // Supprime tout sauf les chiffres et limite à 12 caractères
                                        let value = e.target.value.replace(/\D/g, '').substring(0, 12);
                                        
                                        // Ajoute des espaces tous les 4 chiffres
                                        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                                        
                                        setEnseignantData(prev => ({
                                            ...prev,
                                            cinEns: value
                                        }));
                                    }}
                                    required
                                    className="form-control"
                                    disabled={isEditMode}
                                    maxLength={14} // 12 chiffres + 2 espaces
                                    placeholder="1234 5678 9012"
                                />
                            </div>  

                            {/* Nom et Prénom */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Nom">
                                            <h6>Nom</h6>
                                        </label>
                                        <input
                                            id="Nom"
                                            type="text"
                                            name="Nom"
                                            value={enseignantData.Nom}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            maxLength={50}
                                        />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Prenom">
                                            <h6>Prénom</h6>
                                        </label>
                                        <input
                                            id="Prenom"
                                            type="text"
                                            name="Prenom"
                                            value={enseignantData.Prenom}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
                                            maxLength={50}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sexe et Grade */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Sexe">
                                            <h6>Sexe</h6>
                                        </label>
                                        <Select
                                            id="Sexe"
                                            name="Sexe"
                                            value={enseignantData.Sexe}
                                            onChange={handleSelectChange}
                                            required
                                            className="w-100"
                                        >
                                            <MenuItem value="Masculin">Masculin</MenuItem>
                                            <MenuItem value="Féminin">Féminin</MenuItem>
                                        </Select>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Grade">
                                            <h6>Grade</h6>
                                        </label>
                                        <input
                                            id="Grade"
                                            type="text"
                                            name="Grade"
                                            value={enseignantData.Grade}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            maxLength={100}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Téléphone et Email */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Telephone">
                                            <h6>Téléphone</h6>
                                        </label>
                                        <input
                                            id="Telephone"
                                            type="tel"
                                            name="Telephone"
                                            value={enseignantData.Telephone}
                                            onChange={handleTelephoneChange}
                                            required
                                            className="form-control"
                                            placeholder="Ex : 034 00 000 00"
                                            maxLength={13} // 10 chiffres + 3 espaces
                                            pattern="\d{3} \d{2} \d{3} \d{2}" // Validation du format
                                            inputMode="numeric" // Afficher le clavier numérique sur mobile
                                        />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Email">
                                            <h6>Email</h6>
                                        </label>
                                        <input
                                            id="Email"
                                            type="email"
                                            name="Email"
                                            value={enseignantData.Email}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
                                            maxLength={50}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Adresse */}
                            <div className="form-group">
                                <label htmlFor="Adresse">
                                    <h6>Adresse</h6>
                                </label>
                                <input
                                    id="Adresse"
                                    type="text"
                                    name="Adresse"
                                    value={enseignantData.Adresse}
                                    onChange={handleInputChange}                                    
                                    className="form-control"
                                    maxLength={50}
                                />
                            </div>

                            {/* Spécialité */}
                            <div className="form-group">
                                <label htmlFor="Specialite">
                                    <h6>Spécialité</h6>
                                </label>
                                <input
                                    id="Specialite"
                                    type="text"
                                    name="Specialite"
                                    value={enseignantData.Specialite}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    maxLength={50}
                                />
                            </div>

                            {/* Photo */}
                            <div className="form-group invisible-car-optionnel">
                                <label htmlFor="Img">
                                    <h6>Photo</h6>
                                </label>
                                <div 
                                    className={`file-upload-container ${enseignantData.Img ? 'has-image' : ''}`}
                                    onClick={() => document.getElementById('Img')?.click()}
                                >
                                    <input 
                                        id="Img"
                                        type="file" 
                                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                        className="file-input"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    <div className="file-upload-content">
                                        {enseignantData.Img ? (
                                            <div className="image-preview-container">
                                                <img 
                                                    src={enseignantData.Img} 
                                                    alt="Preview" 
                                                    className="image-preview"
                                                />
                                                <div className="image-overlay">
                                                    <FaUpload className="upload-icon" />
                                                    <span>Changer la photo</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <FaUpload className="upload-icon" />
                                                <span>Cliquez pour uploader une photo</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label htmlFor="Descriptions">
                                    <h6>Description</h6>
                                </label>
                                <textarea
                                    id="Descriptions"
                                    name="Descriptions"
                                    value={enseignantData.Descriptions}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    rows={5}
                                />
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
                    <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <GoMoveToTop />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default EnseignantsFRM;