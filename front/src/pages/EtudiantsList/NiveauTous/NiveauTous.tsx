import './NiveauTous.css'
import { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { GoMoveToTop } from "react-icons/go";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

import { getAllEtudiants, deleteEtudiant } from '../../../services/etudiants_api';
import type { Etudiant } from '../../../services/etudiants_api';

const NiveauTous = () => {
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
        return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
        };
    });

    // États
    const [searchTerm, setSearchTerm] = useState("");
    const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [etudiantToDelete, setEtudiantToDelete] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Charger les étudiants
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllEtudiants();
                setEtudiants(data);
            } catch (error) {
                console.error("Erreur lors du chargement des étudiants :", error);
                toast.error("Erreur lors du chargement des étudiants");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filtrage des étudiants
    const filteredEtudiants = useMemo(() => {
        if (!searchTerm) return etudiants;
        
        const term = searchTerm.toLowerCase();
        return etudiants.filter(etudiant =>
            etudiant.Matricule.toLowerCase().includes(term) ||
            etudiant.Nom.toLowerCase().includes(term) ||
            etudiant.Prenom.toLowerCase().includes(term) ||
            etudiant.IDParcours.toLowerCase().includes(term) ||
            etudiant.Adresse?.toLowerCase().includes(term) ||
            etudiant.Telephone?.includes(term) ||
            etudiant.Email?.toLowerCase().includes(term)
        );
    }, [etudiants, searchTerm]);

    // Gestion de la suppression
    const handleDeleteClick = (Matricule: string) => {
        setEtudiantToDelete(Matricule);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!etudiantToDelete) return;
        
        try {
            await deleteEtudiant(etudiantToDelete);
            toast.success("Étudiant supprimé avec succès");
            setEtudiants(etudiants.filter(e => e.Matricule !== etudiantToDelete));
        } catch (error) {
            console.error("Erreur lors de la suppression de l'étudiant :", error);
            toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
        } finally {
            setOpenDeleteDialog(false);
            setEtudiantToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false);
        setEtudiantToDelete(null);
    };

    return (
        <div>
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

            {/* Dialog de confirmation de suppression */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                classes={{ paper: 'delete-confirmation-dialog' }}
            >
                <DialogTitle id="alert-dialog-title">
                    <div className="dialog-icon">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    Êtes-vous sûr de vouloir supprimer cet étudiant ?
                </DialogTitle>
                <DialogActions>
                    <Button className="cancel-btn" onClick={handleCancelDelete}>
                        Annuler
                    </Button>
                    <Button className="confirm-btn" onClick={handleConfirmDelete} autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Tous les étudiants inscrits</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumb_">
                        <a href="/">
                            <StyledBreadcrumb
                            className="StyledBreadcrumb"
                            component="a"
                            label="Accueil"
                            icon={<HomeIcon fontSize="small" />}
                            />
                        </a>
                        <StyledBreadcrumb
                        className="StyledBreadcrumb"
                        label="Listes"
                        icon={<ExpandMoreIcon fontSize="small" />}
                        />
                    </Breadcrumbs>
                </div>

                {/* Barre de recherche améliorée */}
                <div className="card shadow border-0 p-3 mt-4">
                    <div className="search-container">
                        <form 
                            className="search-form"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Rechercher par matricule, nom, prénom, parcours..."
                                aria-label="Rechercher des étudiants"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                className="search-button"
                                aria-label="Lancer la recherche"
                                disabled={isLoading}
                            >
                                <IoSearchOutline className="search-icon" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <div className="fa-reg-plus-square-container ensbl">
                        <div>Liste de tous les étudiants inscrits</div>
                        <a href="/etudiantsFrm"><FaRegPlusSquare /></a>
                    </div>
                    
                    <table className="tableNiveau">
                        <thead className="thead-Niveau">
                            <tr className='tr-Niveau'>
                                <th className='th-Niveau'>Matricule</th>
                                <th className='th-Niveau'>Parcour</th>
                                <th className='th-Niveau'>Nom</th>
                                <th className='th-Niveau'>Prénom</th>
                                <th className='th-Niveau'>Âge</th>
                                <th className='th-Niveau'>Adresse</th>
                                <th className='th-Niveau'>Téléphone</th>
                                <th className='th-Niveau'>Email</th>
                                <th className='th-Niveau'>Actions</th>
                            </tr>
                        </thead>

                        <tbody className='tbody-Niveau'>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={9} className="text-center">Chargement en cours...</td>
                                </tr>
                            ) : filteredEtudiants.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center">
                                        {searchTerm ? "Aucun résultat trouvé" : "Aucun étudiant disponible"}
                                    </td>
                                </tr>
                            ) : (
                                filteredEtudiants.map((etudiant) => (
                                    <tr className='tr-Niveau' key={etudiant.Matricule}>
                                        <td className='td-Niveau'>{etudiant.Matricule}</td>
                                        <td className='td-Niveau'>{etudiant.IDParcours}</td>
                                        <td className='td-Niveau'>{etudiant.Nom}</td>
                                        <td className='td-Niveau'>{etudiant.Prenom}</td>
                                        <td className='td-Niveau'>{etudiant.Age}</td>
                                        <td className='td-Niveau'>{etudiant.Adresse}</td>
                                        <td className='td-Niveau'>{etudiant.Telephone}</td>
                                        <td className='td-Niveau'>{etudiant.Email}</td>
                                        <td className='td-moderne'>
                                            <a 
                                                href={`/modifierEtudiantsFrm/${etudiant.Matricule}`}
                                                data-tooltip="Modifier"
                                            >
                                                <FaEdit className='modif-moderne' />
                                            </a>
                                            <button 
                                                className='supp-moderne' 
                                                onClick={() => handleDeleteClick(etudiant.Matricule)}
                                                data-tooltip="Supprimer"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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
        </div>
    )
}

export default NiveauTous