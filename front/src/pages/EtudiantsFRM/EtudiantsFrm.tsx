import React, { useState, useEffect, useRef } from 'react';
import './EtudiantsFrm.css';
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

import { createEtudiant, updateEtudiant, getEtudiant, getAllEtudiants } from '../../services/etudiants_api';
import { getAllNiveaux } from '../../services/niveaux_api';
import { getAllParcours } from '../../services/parcours_api';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";

const EtudiantsFrm = () => {
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
    const { Matricule } = useParams();
    const isEditMode = Boolean(Matricule);
    const telephoneRef = useRef<HTMLInputElement>(null);
    
    // État pour les champs du formulaire
    const [etudiantData, setEtudiantData] = useState({
        Matricule: '',
        IDNiveaux: '',
        IDParcours: '',
        Nom: '',
        Prenom: '',
        Sexe: '',
        Age: 0,
        Adresse: '',
        Telephone: '',
        Email: '',
        Img: ''
    });

    // Listes pour les sélecteurs
    const [niveaux, setNiveaux] = useState<{IDNiveaux: string, Niveaux: string}[]>([]);
    const [parcours, setParcours] = useState<{IDParcours: string, Parcours: string}[]>([]);

    // Liste des matricules existants
    const [existingMatricules, setExistingMatricules] = useState<string[]>([]);

    // Charger les données initiales
    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger les listes des niveaux et parcours
                const niveauxData = await getAllNiveaux();
                setNiveaux(niveauxData);
                
                const parcoursData = await getAllParcours();
                setParcours(parcoursData);

                // Charger tous les étudiants pour vérifier les matricules existants
                const etudiants = await getAllEtudiants();
                setExistingMatricules(etudiants.map(e => e.Matricule));

                // Si en mode édition, charger les données de l'étudiant
                if (Matricule) {
                    const data = await getEtudiant(Matricule);
                    setEtudiantData({
                        ...data,
                        Telephone: data.Telephone ? formatPhoneNumber(data.Telephone) : ''
                    });
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                toast.error('Erreur lors du chargement des données');
                navigate('/niveauTous', { replace: true });
            }
        };
        
        loadData();
    }, [Matricule, navigate]);

    // Fonction pour formater le numéro de téléphone
    const formatPhoneNumber = (value: string) => {
        // Récupérer la valeur et ne garder que les chiffres
        const inputValue = value.replace(/\D/g, ''); // \D = tout sauf chiffres
        
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
        
        return formatted;
    };

    // Gestionnaire de changement pour le téléphone
    const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Formater le numéro
        const formatted = formatPhoneNumber(value);
        
        setEtudiantData(prev => ({
            ...prev,
            [name]: formatted
        }));
    };

    // Gérer le changement dans les champs du formulaire (sauf téléphone)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name !== 'Telephone') {
            setEtudiantData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Gérer le changement dans les sélecteurs
    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setEtudiantData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Gérer le changement de fichier image
    const handleFileChange = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEtudiantData(prevData => ({
                    ...prevData,
                    Img: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Vérifier si le matricule existe déjà
    const checkIfMatriculeExists = (matricule: string) => {
        return existingMatricules.includes(matricule);
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // En mode création, vérifier si le matricule existe déjà
        if (!isEditMode && checkIfMatriculeExists(etudiantData.Matricule)) {
            toast.error(`Le matricule ${etudiantData.Matricule} existe déjà`);
            return;
        }

        // Vérifier que le numéro de téléphone est complet
        if (etudiantData.Telephone.replace(/\D/g, '').length !== 10) {
            toast.error('Veuillez entrer un numéro de téléphone complet (10 chiffres)');
            return;
        }

        try {
            if (isEditMode) {
                await updateEtudiant(etudiantData);
                toast.success('Étudiant modifié avec succès');
            } else {
                await createEtudiant(etudiantData);
                toast.success('Étudiant créé avec succès');
            }
            
            // Redirection après un délai pour voir le message de succès
            setTimeout(() => navigate('/niveauTous'), 2000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'étudiant:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    const handleCancel = () => {
        navigate('/niveauTous');
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
                <h5 className="mb-0">{isEditMode ? 'Modification' : 'Ajout'} d'un étudiant</h5>
                <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                    <a href="/">
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            component="a"
                            label="Accueil"
                            icon={<HomeIcon fontSize='small' />}
                        />
                    </a>
                    <a href="/niveauTous">
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
                            <h5 className='mb-4'>Données principales de l'étudiant</h5>

                            {/* Matricule */}
                            <div className="form-group">
                                <label htmlFor="Matricule">
                                    <h6>Matricule</h6>
                                </label>
                                <input
                                    id="Matricule"
                                    type="text"
                                    name="Matricule"
                                    value={etudiantData.Matricule}
                                    onChange={handleInputChange}
                                    required
                                    className="form-control"
                                    disabled={isEditMode}
                                />
                            </div>

                            {/* Niveau, Parcours et Sexe */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="IDNiveaux">
                                            <h6>Niveau</h6>
                                        </label>
                                        <Select
                                            id="IDNiveaux"
                                            name="IDNiveaux"
                                            value={etudiantData.IDNiveaux}
                                            onChange={handleSelectChange}
                                            required
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                <em>Sélectionnez un niveau</em>
                                            </MenuItem>
                                            {niveaux.map((niveau) => (
                                                <MenuItem key={niveau.IDNiveaux} value={niveau.IDNiveaux}>
                                                    {niveau.IDNiveaux} - {niveau.Niveaux}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="IDParcours">
                                            <h6>Parcours</h6>
                                        </label>
                                        <Select
                                            id="IDParcours"
                                            name="IDParcours"
                                            value={etudiantData.IDParcours}
                                            onChange={handleSelectChange}
                                            required
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                <em>Sélectionnez un parcours</em>
                                            </MenuItem>
                                            {parcours.map((parcour) => (
                                                <MenuItem key={parcour.IDParcours} value={parcour.IDParcours}>
                                                    {parcour.IDParcours} - {parcour.Parcours}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Sexe">
                                            <h6>Sexe</h6>
                                        </label>
                                        <Select
                                            id="Sexe"
                                            name="Sexe"
                                            value={etudiantData.Sexe}
                                            onChange={handleSelectChange}
                                            required
                                            className="w-100"
                                        >
                                            <MenuItem value="Masculin">Masculin</MenuItem>
                                            <MenuItem value="Féminin">Féminin</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Nom, Prénom et Âge */}
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
                                            value={etudiantData.Nom}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
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
                                            value={etudiantData.Prenom}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Age">
                                            <h6>Âge</h6>
                                        </label>
                                        <input
                                            id="Age"
                                            type="number"
                                            name="Age"
                                            value={etudiantData.Age}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
                                            min="5"
                                            max="50"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Téléphone, Email et Adresse */}
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
                                            value={etudiantData.Telephone}
                                            onChange={handleTelephoneChange}
                                            required
                                            className="form-control"
                                            placeholder="034 00 000 00"
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
                                            value={etudiantData.Email}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Adresse">
                                            <h6>Adresse</h6>
                                        </label>
                                        <input
                                            id="Adresse"
                                            type="text"
                                            name="Adresse"
                                            value={etudiantData.Adresse}
                                            onChange={handleInputChange}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Photo */}
                            <div className="row invisible-car-optionnel">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="Img">
                                            <h6>Photo</h6>
                                        </label>
                                        <div 
                                            className={`file-upload-container ${etudiantData.Img ? 'has-image' : ''}`}
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
                                                {etudiantData.Img ? (
                                                    <div className="image-preview-container">
                                                        <img 
                                                            src={etudiantData.Img} 
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
                                <Button 
                                    type='submit' 
                                    variant="contained" 
                                    color="primary"
                                    startIcon={isEditMode ? <FaRegEdit /> : <FaPlus />}
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

export default EtudiantsFrm;