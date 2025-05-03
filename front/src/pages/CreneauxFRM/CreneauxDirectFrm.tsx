import React, { useState, useEffect } from 'react';
import './CreneauxDirectFrm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import { GoMoveToTop } from "react-icons/go";
import { createMultipleCreneaux, getCreneau, checkExistingCreneaux } from '../../services/creneaux_api';
import { useParams, useNavigate } from 'react-router-dom';

const CreneauxDirectFrm = () => {
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
    const { IDCreneaux } = useParams();
    const isEditMode = Boolean(IDCreneaux);
    
    const defaultCreneaux = {
        Lundi: { matin1: { debut: '08:00', fin: '10:00' }, matin2: { debut: '10:00', fin: '12:00' }, 
                apresMidi1: { debut: '14:00', fin: '16:00' }, apresMidi2: { debut: '16:00', fin: '18:00' }, isActive: true },
        Mardi: { matin1: { debut: '08:00', fin: '10:00' }, matin2: { debut: '10:00', fin: '12:00' }, 
                 apresMidi1: { debut: '14:00', fin: '16:00' }, apresMidi2: { debut: '16:00', fin: '18:00' }, isActive: true },
        Mercredi: { matin1: { debut: '08:00', fin: '10:00' }, matin2: { debut: '10:00', fin: '12:00' }, 
                    apresMidi1: { debut: '14:00', fin: '16:00' }, apresMidi2: { debut: '16:00', fin: '18:00' }, isActive: true },
        Jeudi: { matin1: { debut: '08:00', fin: '10:00' }, matin2: { debut: '10:00', fin: '12:00' }, 
                 apresMidi1: { debut: '14:00', fin: '16:00' }, apresMidi2: { debut: '16:00', fin: '18:00' }, isActive: true },
        Vendredi: { matin1: { debut: '08:00', fin: '10:00' }, matin2: { debut: '10:00', fin: '12:00' }, 
                    apresMidi1: { debut: '14:00', fin: '16:00' }, apresMidi2: { debut: '16:00', fin: '18:00' }, isActive: true },
        Samedi: { matin1: { debut: '08:00', fin: '10:00' }, matin2: { debut: '10:00', fin: '12:00' }, 
                  apresMidi1: { debut: '14:00', fin: '16:00' }, apresMidi2: { debut: '16:00', fin: '18:00' }, isActive: false },
        Dimanche: { matin1: { debut: '08:00', fin: '10:00' }, matin2: { debut: '10:00', fin: '12:00' }, 
                    apresMidi1: { debut: '14:00', fin: '16:00' }, apresMidi2: { debut: '16:00', fin: '18:00' }, isActive: false }
    };

    const [dates, setDates] = useState({
        dateDebut: '',
        dateFin: ''
    });

    const [creneaux, setCreneaux] = useState<Record<string, {
        matin1: { debut: string, fin: string, error?: string },
        matin2: { debut: string, fin: string, error?: string },
        apresMidi1: { debut: string, fin: string, error?: string },
        apresMidi2: { debut: string, fin: string, error?: string },
        isActive: boolean
    }>>(defaultCreneaux);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (isEditMode && IDCreneaux) {
                    const data = await getCreneau(Number(IDCreneaux));
                    // Adaptez cette partie selon votre structure de données
                    // Exemple de chargement des données existantes
                    setDates({
                        dateDebut: data.DateDebut,
                        dateFin: data.DateFin
                    });
                    
                    // Mise à jour des créneaux pour le jour spécifique
                    const updatedCreneaux = { ...defaultCreneaux };
                    updatedCreneaux[data.Jours] = {
                        matin1: { debut: data.HeureDebut, fin: data.HeureFin },
                        matin2: { debut: data.HeureDebut, fin: data.HeureFin },
                        apresMidi1: { debut: data.HeureDebut, fin: data.HeureFin },
                        apresMidi2: { debut: data.HeureDebut, fin: data.HeureFin },
                        isActive: true
                    };
                    setCreneaux(updatedCreneaux);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                toast.error('Erreur lors du chargement des données');
                navigate('/creneauxListe', { replace: true });
            }
        };
        
        loadData();
    }, [IDCreneaux, isEditMode, navigate]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDates(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateTimeRange = (heureDebut: string, heureFin: string): string | null => {
        if (!heureDebut || !heureFin) return null;
        
        const [debutHours, debutMinutes] = heureDebut.split(':').map(Number);
        const [finHours, finMinutes] = heureFin.split(':').map(Number);
        
        const totalDebut = debutHours * 60 + debutMinutes;
        const totalFin = finHours * 60 + finMinutes;
        
        if (totalFin <= totalDebut) {
            return "L'heure de fin doit être après l'heure de début";
        }
        return null;
    };

    const handleTimeChange = (jour: string, periode: string, field: string, value: string) => {
        setCreneaux(prev => {
            const updatedCreneau = {
                ...prev[jour],
                [periode]: {
                    ...prev[jour][periode],
                    [field]: value
                }
            };

            if (field === 'fin' || (field === 'debut' && prev[jour][periode].fin)) {
                const error = validateTimeRange(
                    field === 'debut' ? value : updatedCreneau[periode].debut,
                    field === 'fin' ? value : updatedCreneau[periode].fin
                );
                
                updatedCreneau[periode].error = error || undefined;
            }

            return {
                ...prev,
                [jour]: updatedCreneau
            };
        });
    };

    const handleToggleDay = (jour: string, isActive: boolean) => {
        setCreneaux(prev => ({
            ...prev,
            [jour]: {
                ...prev[jour],
                isActive
            }
        }));
    };

    const validateDates = (dateDebut: string, dateFin: string): boolean => {
        if (!dateDebut || !dateFin) return false;
        return new Date(dateFin) >= new Date(dateDebut);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateDates(dates.dateDebut, dates.dateFin)) {
            toast.error('La date de fin doit être postérieure ou égale à la date de début');
            return;
        }
        
        let hasErrors = false;
        
        Object.entries(creneaux).forEach(([jour, data]) => {
            if (data.isActive) {
                const periods = ['matin1', 'matin2', 'apresMidi1', 'apresMidi2'];
                periods.forEach(period => {
                    if (data[period].error) {
                        toast.error(`Erreur de validation pour ${jour} - ${period}: ${data[period].error}`);
                        hasErrors = true;
                    }
                });
            }
        });
        
        if (hasErrors) return;
        
        const creneauxToSend: Omit<Creneau, "IDCreneaux">[] = [];
        const existingCreneaux: {creneau: Omit<Creneau, "IDCreneaux">, message: string}[] = [];
        
        try {
            // Vérification des créneaux un par un
            for (const [jour, data] of Object.entries(creneaux)) {
                if (data.isActive) {
                    const periods = [
                        { name: 'matin1', creneau: data.matin1 },
                        { name: 'matin2', creneau: data.matin2 },
                        { name: 'apresMidi1', creneau: data.apresMidi1 },
                        { name: 'apresMidi2', creneau: data.apresMidi2 }
                    ];
        
                    for (const period of periods) {
                        if (period.creneau.error) continue;
                        
                        const creneau = {
                            Jours: jour,
                            HeureDebut: period.creneau.debut,
                            HeureFin: period.creneau.fin,
                            DateDebut: dates.dateDebut,
                            DateFin: dates.dateFin
                        };
            
                        try {
                            const exists = await checkExistingCreneaux(creneau);
                            if (exists) {
                                existingCreneaux.push({
                                    creneau,
                                    message: `Créneau existant: ${jour} ${period.creneau.debut}-${period.creneau.fin} (${dates.dateDebut} au ${dates.dateFin})`
                                });
                            } else {
                                creneauxToSend.push(creneau);
                            }
                        } catch (error) {
                            console.error('Erreur vérification créneau:', error);
                            existingCreneaux.push({
                                creneau,
                                message: `Erreur vérification créneau: ${jour} ${period.creneau.debut}-${period.creneau.fin}`
                            });
                        }
                    }
                }
            }
        
            // Gestion des créneaux existants
            if (existingCreneaux.length > 0) {
                existingCreneaux.forEach(({message}) => {
                    toast.error(message, { autoClose: 5000 });
                });
        
                if (creneauxToSend.length === 0) {
                    toast.info('Aucun nouveau créneau à ajouter - tous existent déjà');
                    return;
                }
        
                const shouldContinue = window.confirm(
                    `${existingCreneaux.length} créneau(x) existe(nt) déjà ou ont des erreurs. ` +
                    `Voulez-vous ajouter les ${creneauxToSend.length} autre(s) créneau(x) valides ?`
                );
        
                if (!shouldContinue) {
                    return;
                }
            }
        
            // Envoi des créneaux valides et non existants
            if (creneauxToSend.length > 0) {
                await createMultipleCreneaux(creneauxToSend);
                toast.success(`${creneauxToSend.length} créneau(x) ajouté(s) avec succès`, { autoClose: 3000 });
                
                if (existingCreneaux.length > 0) {
                    setTimeout(() => {
                        toast.info(`${existingCreneaux.length} créneau(x) n'ont pas été ajoutés car ils existent déjà`, { 
                            autoClose: 5000 
                        });
                    }, 1000);
                }
                
                setTimeout(() => navigate('/creneauxListe'), 2000);
            } else {
                toast.info('Aucun nouveau créneau valide à ajouter');
            }
        } catch (error) {
            console.error('Erreur sauvegarde créneaux:', error);
            toast.error(error instanceof Error ? error.message : 'Erreur lors de la sauvegarde');
        }
    };

    const handleCancel = () => {
        navigate('/creneauxListe');
    };

    const resetToDefault = () => {
        setCreneaux(defaultCreneaux);
        toast.info('Les créneaux ont été réinitialisés aux valeurs par défaut');
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
                    <div className="container-frm">
                        <form onSubmit={handleSubmit} className="form-pour-tout-les-jours">
                            <div className="container-ajout-direct">
                                <div className="ens-dates">
                                    <div className="date-debut">
                                        <label>Date de début</label>
                                        <input 
                                            type="date" 
                                            className="modern-date-input" 
                                            name="dateDebut"
                                            value={dates.dateDebut}
                                            onChange={handleDateChange}
                                            required
                                        />
                                    </div>
                                    <div className="date-fin">
                                        <label>Date de fin</label>
                                        <input 
                                            type="date" 
                                            className="modern-date-input" 
                                            name="dateFin"
                                            value={dates.dateFin}
                                            onChange={handleDateChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="ens-jours">
                                    {Object.entries(creneaux).map(([jour, data]) => (
                                        <div key={jour} className={`jour-card jour-${jour.toLowerCase()}`}>
                                            <div className="day-header">
                                                <input 
                                                    className="day-name-input"
                                                    type="text" 
                                                    value={jour}
                                                    readOnly
                                                />
                                            </div>
                                            
                                            <div className="time-sections">
                                                <div className="time-section">
                                                    <h4 className="time-label">Matin</h4>
                                                    <div className="time-slots">
                                                        <div className="time-slot">
                                                            <label>Première heure</label>
                                                            <div className="time-inputs">
                                                                <div className="time-input-group">
                                                                    <label>Début</label>
                                                                    <input 
                                                                        type="time" 
                                                                        className="modern-time-input" 
                                                                        value={data.matin1.debut}
                                                                        onChange={(e) => handleTimeChange(jour, 'matin1', 'debut', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="time-input-group">
                                                                    <label>Fin</label>
                                                                    <input 
                                                                        type="time" 
                                                                        className={`modern-time-input ${data.matin1.error ? 'input-error' : ''}`}
                                                                        value={data.matin1.fin}
                                                                        onChange={(e) => handleTimeChange(jour, 'matin1', 'fin', e.target.value)}
                                                                    />
                                                                    {data.matin1.error && (
                                                                        <span className="error-message">{data.matin1.error}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="time-slot">
                                                            <label>Deuxième heure</label>
                                                            <div className="time-inputs">
                                                                <div className="time-input-group">
                                                                    <label>Début</label>
                                                                    <input 
                                                                        type="time" 
                                                                        className="modern-time-input" 
                                                                        value={data.matin2.debut}
                                                                        onChange={(e) => handleTimeChange(jour, 'matin2', 'debut', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="time-input-group">
                                                                    <label>Fin</label>
                                                                    <input 
                                                                        type="time" 
                                                                        className={`modern-time-input ${data.matin2.error ? 'input-error' : ''}`}
                                                                        value={data.matin2.fin}
                                                                        onChange={(e) => handleTimeChange(jour, 'matin2', 'fin', e.target.value)}
                                                                    />
                                                                    {data.matin2.error && (
                                                                        <span className="error-message">{data.matin2.error}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="time-section">
                                                    <h4 className="time-label">Après-midi</h4>
                                                    <div className="time-slots">
                                                        <div className="time-slot">
                                                            <label>Première heure</label>
                                                            <div className="time-inputs">
                                                                <div className="time-input-group">
                                                                    <label>Début</label>
                                                                    <input 
                                                                        type="time" 
                                                                        className="modern-time-input" 
                                                                        value={data.apresMidi1.debut}
                                                                        onChange={(e) => handleTimeChange(jour, 'apresMidi1', 'debut', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="time-input-group">
                                                                    <label>Fin</label>
                                                                    <input 
                                                                        type="time" 
                                                                        className={`modern-time-input ${data.apresMidi1.error ? 'input-error' : ''}`}
                                                                        value={data.apresMidi1.fin}
                                                                        onChange={(e) => handleTimeChange(jour, 'apresMidi1', 'fin', e.target.value)}
                                                                    />
                                                                    {data.apresMidi1.error && (
                                                                        <span className="error-message">{data.apresMidi1.error}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="time-slot">
                                                            <label>Deuxième heure</label>
                                                            <div className="time-inputs">
                                                                <div className="time-input-group">
                                                                    <label>Début</label>
                                                                    <input 
                                                                        type="time" 
                                                                        className="modern-time-input" 
                                                                        value={data.apresMidi2.debut}
                                                                        onChange={(e) => handleTimeChange(jour, 'apresMidi2', 'debut', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="time-input-group">
                                                                    <label>Fin</label>
                                                                    <input 
                                                                        type="time" 
                                                                        className={`modern-time-input ${data.apresMidi2.error ? 'input-error' : ''}`}
                                                                        value={data.apresMidi2.fin}
                                                                        onChange={(e) => handleTimeChange(jour, 'apresMidi2', 'fin', e.target.value)}
                                                                    />
                                                                    {data.apresMidi2.error && (
                                                                        <span className="error-message">{data.apresMidi2.error}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="radio-toggle">
                                                <label className="radio-option">
                                                    <input 
                                                        type="radio" 
                                                        name={`status-${jour}`} 
                                                        value="active" 
                                                        checked={data.isActive}
                                                        onChange={() => handleToggleDay(jour, true)}
                                                    />
                                                    <span className="radio-custom"></span>
                                                    <span className="radio-label">Activer</span>
                                                </label>
                                                <label className="radio-option">
                                                    <input 
                                                        type="radio" 
                                                        name={`status-${jour}`} 
                                                        value="inactive" 
                                                        checked={!data.isActive}
                                                        onChange={() => handleToggleDay(jour, false)}
                                                    />
                                                    <span className="radio-custom"></span>
                                                    <span className="radio-label">Désactiver</span>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="modern-submit-btn">
                                    <span>Enregistrer toutes les données</span>
                                    <svg className="submit-icon" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                                <button type="button" className="modern-reset-btn" onClick={resetToDefault}>
                                    Réinitialiser les créneaux
                                </button>
                                <button type="button" className="modern-cancel-btn" onClick={handleCancel}>
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
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
    );
};

export default CreneauxDirectFrm;