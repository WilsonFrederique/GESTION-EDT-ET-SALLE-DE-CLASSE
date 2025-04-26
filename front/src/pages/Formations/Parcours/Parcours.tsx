import './Parcours.css'
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
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

import { getAllParcours, deleteParcour } from '../../../services/parcours_api';
import type { Parcour } from '../../../services/parcours_api';

const Parcours = () => {
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
    const [parcours, setParcours] = useState<Parcour[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [parcourToDelete, setParcourToDelete] = useState<string | null>(null);

    // Charger les parcours
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllParcours();
                setParcours(data);
            } catch (error) {
                console.error("Erreur lors du chargement des parcours :", error);
                toast.error("Erreur lors du chargement des parcours");
            }
        };
        fetchData();
    }, []);

    // Gestion de la suppression
    const handleDeleteClick = (IDParcours: string) => {
        setParcourToDelete(IDParcours);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!parcourToDelete) return;
        
        try {
            await deleteParcour(parcourToDelete);
            toast.success("Parcours supprimé avec succès");
            // Recharger la liste après suppression
            const data = await getAllParcours();
            setParcours(data);
        } catch (error) {
            console.error("Erreur lors de la suppression du parcours :", error);
            toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
        } finally {
            setOpenDeleteDialog(false);
            setParcourToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false);
        setParcourToDelete(null);
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
                    Êtes-vous sûr de vouloir supprimer ce parcours ?
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
                    <h5 className="mb-0">Parcours disponibles</h5>
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

                <div className="card shadow border-0 p-3 mt-4">
                    <div className="fa-reg-plus-square-container">
                        <a href="/parcoursFrm"><FaRegPlusSquare /></a>
                    </div>
                    <table className="tableFormation table-hover table-bordered rounded shadow-sm overflow-hidden">
                        <thead className="table-light">
                            <tr className='tr-formation'>
                                <th className='th-formation'>ID Parcours</th>
                                <th className='th-formation'>Parcours</th>
                                <th className='th-formation'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='tbody-formation'>
                            {parcours.map((parcour) => (
                                <tr className='tr-formation' key={parcour.IDParcours}>
                                    <td className='td-formation'>{parcour.IDParcours}</td>
                                    <td className='td-formation'>
                                        {parcour.Parcours}
                                    </td>
                                    <td className='td-formation td-moderne'>
                                        <a 
                                            href={`/modifierParcoursFrm/${parcour.IDParcours}`}
                                            data-tooltip="Modifier"
                                        >
                                            <FaEdit className='modif-moderne' />
                                        </a>
                                        <button 
                                            className='supp-moderne' 
                                            onClick={() => handleDeleteClick(parcour.IDParcours)}
                                            data-tooltip="Supprimer"
                                        >
                                            <FaTrash className='icon-supp-moderne' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
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

export default Parcours;