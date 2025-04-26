import './SalleListe.css'
import { useEffect, useState } from "react";
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
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { ImPrinter } from "react-icons/im";

import { getAllSalles, deleteSalle } from '../../services/salles_api';
import type { Salle } from '../../services/salles_api';

const SalleListe = () => {
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
    const [salles, setSalles] = useState<Salle[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [salleToDelete, setSalleToDelete] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Charger les salles
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllSalles();
                setSalles(data);
            } catch (error) {
                console.error("Erreur lors du chargement des salles :", error);
                toast.error("Erreur lors du chargement des salles");
            }
        };
        fetchData();
    }, []);

    // Gestion de la suppression
    const handleDeleteClick = (IDSalle: string) => {
        setSalleToDelete(IDSalle);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!salleToDelete) return;
        
        try {
            await deleteSalle(salleToDelete);
            toast.success("Salle supprimée avec succès");
            // Recharger la liste après suppression
            const data = await getAllSalles();
            setSalles(data);
        } catch (error) {
            console.error("Erreur lors de la suppression de la salle :", error);
            toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
        } finally {
            setOpenDeleteDialog(false);
            setSalleToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false);
        setSalleToDelete(null);
    };

    // Filtrage des salles
    const filteredSalles = salles.filter(salle =>
        salle.Salle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salle.IDSalle.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    Êtes-vous sûr de vouloir supprimer cette salle ?
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
                    <h5 className="mb-0">Salles de classe</h5>
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
                        <form className="search-form">
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Rechercher..."
                                aria-label="Rechercher"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="button" className="search-button">
                                <IoSearchOutline className="search-icon" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Liste des salles */}
                <div className="card shadow border-0 p-3 mt-4">
                    <div className="fa-reg-plus-square-container ensbl">
                        <div>Liste des salles de classe</div>
                        <div>
                            <a href="#"><ImPrinter className='impression' /></a> &nbsp;&nbsp;
                            <a href="/salleFRM"><FaRegPlusSquare /></a>
                        </div>
                    </div>
            
                    <hr className='hr-top' />
                    
                    <div className="salles-table-container">
                        <table className="matieres-table">
                            <thead className="matieres-thead">
                                <tr>
                                    <th>ID Salle</th>
                                    <th>Salle</th>
                                    <th>Disponibilité</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="matieres-tbody">
                                {filteredSalles.map((salle) => (
                                    <tr key={salle.IDSalle}>
                                        <td>{salle.IDSalle}</td>
                                        <td>{salle.Salle}</td>
                                        <td>
                                            <span className={`badge ${salle.Disponibilite === 'Oui' ? 'available' : 'not-available'}`}>
                                                {salle.Disponibilite === 'Oui' 
                                                ? `${salle.Disponibilite}`
                                                : `${salle.Disponibilite}`
                                                }
                                            </span> &nbsp;
                                            {salle.Disponibilite === 'Oui' 
                                                ? `(Cette salle est disponible)`
                                                : `(Cette salle n'est pas disponible)`
                                            }
                                        </td>
                                        <td className="actions-cell-moderne">
                                            <a href={`/salleListe/details/${salle.IDSalle}`}>
                                                <FaInfoCircle className="detail-moderne" title="Détails" />
                                            </a>
                                            <a href={`/modifierSalleFRM/${salle.IDSalle}`}>
                                                <FaEdit className='edit-moderne' />
                                            </a>
                                            {/* <FaTrash 
                                                className='delet-moderne' 
                                                onClick={() => handleDeleteClick(salle.IDSalle)}
                                                style={{ cursor: 'pointer' }}
                                            /> */}
                                        </td>
                                    </tr>
                                ))}
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
    )
}

export default SalleListe;