import React, { useEffect, useState } from 'react';
import './MatiersListe.css';
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
import { ImPrinter } from "react-icons/im";

import { getAllMatieres, deleteMatiere } from '../../services/matiers_api';
import type { Matiere } from '../../services/matiers_api';

const MatiersListe = () => {
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

    // État pour les données et la suppression
    const [matieres, setMatieres] = useState<Matiere[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [matiereToDelete, setMatiereToDelete] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Charger les matières
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllMatieres();
                setMatieres(data);
            } catch (error) {
                console.error("Erreur lors du chargement des matières :", error);
                toast.error("Erreur lors du chargement des matières");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Gestion de la suppression
    const handleDeleteClick = (IDMatiere: string) => {
        setMatiereToDelete(IDMatiere);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!matiereToDelete) return;
        
        try {
            await deleteMatiere(matiereToDelete);
            toast.success("Matière supprimée avec succès");
            setMatieres(matieres.filter(m => m.IDMatiere !== matiereToDelete));
        } catch (error) {
            console.error("Erreur lors de la suppression de la matière :", error);
            toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
        } finally {
            setOpenDeleteDialog(false);
            setMatiereToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false);
        setMatiereToDelete(null);
    };

    // Filtrage des matières selon la recherche
    const filteredMatieres = matieres.filter(matiere =>
        matiere.IDMatiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matiere.Matiere.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="edt-container">
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
                    Êtes-vous sûr de vouloir supprimer cette matière ?
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
                    <h5 className="mb-0">Matières disponibles</h5>
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
                            label="Liste"
                            icon={<ExpandMoreIcon fontSize="small" />}
                        />
                    </Breadcrumbs>
                </div>

                {/* Recherche */}
                <div className="card shadow border-0 p-3 mt-4">
                    <div className="search-container">
                        <form 
                            className="search-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                // La recherche se fait automatiquement via le state searchTerm
                                // Pas besoin de logique supplémentaire ici
                            }}
                        >
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Rechercher par ID ou nom..."
                                aria-label="Rechercher des matières"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                className="search-button"
                                aria-label="Lancer la recherche"
                            >
                                <IoSearchOutline className="search-icon" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Tableau des matières */}
                <div className="card shadow border-0 p-3 mt-4">
                    <div className="fa-reg-plus-square-container ensbl">
                        <div>Liste des matières</div>
                        <div>
                            <a href="">
                                <ImPrinter className='impression' />
                            </a>
                            &nbsp;&nbsp;
                            <a href="/matiereFrm" className="add-button">
                                <FaRegPlusSquare />
                            </a>
                        </div>
                    </div>
            
                    <hr className='hr-top' />
                    
                    <div className="matieres-table-container">
                        <table className="matieres-table">
                            <thead className="matieres-thead">
                                <tr>
                                    <th>ID Matière</th>
                                    <th>Matière</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="matieres-tbody">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={3} className="text-center">Chargement en cours...</td>
                                    </tr>
                                ) : filteredMatieres.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="text-center">Aucune matière trouvée</td>
                                    </tr>
                                ) : (
                                    filteredMatieres.map((matiere) => (
                                        <tr key={matiere.IDMatiere}>
                                            <td>{matiere.IDMatiere}</td>
                                            <td>{matiere.Matiere}</td>
                                            <td className='td-moderne'>
                                                <a 
                                                    href={`/modifierMatiereFrm/${matiere.IDMatiere}`}
                                                    data-tooltip="Modifier"
                                                >
                                                    <FaEdit className='modif-moderne' />
                                                </a>
                                                <button 
                                                    className='supp-moderne' 
                                                    onClick={() => handleDeleteClick(matiere.IDMatiere)}
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
    );
};

export default MatiersListe;