import React, { useState, useEffect } from 'react';
import './EdtFrm.css';
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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoMoveToTop } from "react-icons/go";

import { createEdt, updateEdt, getEdt } from '../../services/edts_api';
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

    // Charger les données initiales
    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger toutes les données nécessaires en parallèle
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

                // Si en mode édition, charger les données de l'EDT
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

    // Gérer le changement dans les champs du formulaire
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEdtData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Gérer le changement dans les sélecteurs
    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setEdtData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (isEditMode) {
                await updateEdt(edtData);
                toast.success('Emploi du temps modifié avec succès');
            } else {
                await createEdt(edtData);
                toast.success('Emploi du temps créé avec succès');
            }
            
            // Redirection après un délai pour voir le message de succès
            setTimeout(() => navigate('/listesTousEDT'), 2000);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'emploi du temps:', error);
            toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
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

                            {/* Salle, Niveau et Parcours */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="IDSalle">
                                            <h6>Salle</h6>
                                        </label>
                                        <Select
                                            id="IDSalle"
                                            name="IDSalle"
                                            value={edtData.IDSalle}
                                            onChange={handleSelectChange}
                                            required
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                <em>Sélectionnez une salle</em>
                                            </MenuItem>
                                            {salles.map((salle) => (
                                                <MenuItem key={salle.IDSalle} value={salle.IDSalle}>
                                                    {salle.IDSalle} - {salle.Salle}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="IDNiveaux">
                                            <h6>Niveau</h6>
                                        </label>
                                        <Select
                                            id="IDNiveaux"
                                            name="IDNiveaux"
                                            value={edtData.IDNiveaux}
                                            onChange={handleSelectChange}
                                            required
                                            className="w-100"
                                            disabled={!!niveauIdFromUrl} // Désactiver si le niveau est passé dans l'URL
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
                                            value={edtData.IDParcours}
                                            onChange={handleSelectChange}
                                            required
                                            className="w-100"
                                            disabled={!!parcoursIdFromUrl} // Désactiver si le parcours est passé dans l'URL
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
                            </div>

                            {/* Créneau, Matière et Enseignant */}
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="IDCreneaux">
                                            <h6>Créneau</h6>
                                        </label>
                                        <Autocomplete
                                            id="IDCreneaux"
                                            options={creneaux}
                                            getOptionLabel={(option) => 
                                                `${option.Jours} : ${option.HeureDebut}-${option.HeureFin} (du ${formatDate(option.DateDebut)} au ${formatDate(option.DateFin)})`
                                            }
                                            value={creneaux.find(c => c.IDCreneaux === edtData.IDCreneaux) || null}
                                            onChange={(event, newValue) => {
                                                setEdtData({...edtData, IDCreneaux: newValue?.IDCreneaux || 0});
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Rechercher un créneau"
                                                    variant="outlined"
                                                    required
                                                />
                                            )}
                                            renderOption={(props, option) => (
                                                <li {...props}>
                                                    <div>
                                                        <strong>{option.Jours}</strong> : {option.HeureDebut}-{option.HeureFin}
                                                        <div className="text-muted small">
                                                            du {formatDate(option.DateDebut)} au {formatDate(option.DateFin)}
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="IDMatiere">
                                            <h6>Matière</h6>
                                        </label>
                                        <Select
                                            id="IDMatiere"
                                            name="IDMatiere"
                                            value={edtData.IDMatiere}
                                            onChange={handleSelectChange}
                                            required
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                <em>Sélectionnez une matière</em>
                                            </MenuItem>
                                            {matieres.map((matiere) => (
                                                <MenuItem key={matiere.IDMatiere} value={matiere.IDMatiere}>
                                                    {matiere.IDMatiere} - {matiere.Matiere}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="cinEns">
                                            <h6>Enseignant</h6>
                                        </label>
                                        <Select
                                            id="cinEns"
                                            name="cinEns"
                                            value={edtData.cinEns}
                                            onChange={handleSelectChange}
                                            required
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                                <em>Sélectionnez un enseignant</em>
                                            </MenuItem>
                                            {enseignants.map((enseignant) => (
                                                <MenuItem key={enseignant.cinEns} value={enseignant.cinEns}>
                                                    {enseignant.cinEns} - {enseignant.Nom} {enseignant.Prenom}
                                                </MenuItem>
                                            ))}
                                        </Select>
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

export default EdtFrm;