import './Niveaux.css'
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

import { getAllNiveaux, deleteNiveau } from '../../../services/niveaux_api';
import type { Niveaux as NiveauType } from '../../../services/niveaux_api';

const Niveaux = () => {
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

    // ======================================== AFFICHAGE ========================================
    // État pour les données et la suppression
    const [niveaux, setNiveaux] = useState<NiveauType[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [niveauToDelete, setNiveauToDelete] = useState<string | null>(null);

    // Charger les niveaux
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllNiveaux();
                setNiveaux(data);
            } catch (error) {
                console.error("Erreur lors du chargement des niveaux :", error);
                toast.error("Erreur lors du chargement des niveaux");
            }
        };
        fetchData();
    }, []);

    // Gestion de la suppression
    const handleDeleteClick = (IDNiveaux: string) => {
        setNiveauToDelete(IDNiveaux);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!niveauToDelete) return;
        
        try {
            await deleteNiveau(niveauToDelete);
            toast.success("Niveau supprimé avec succès");
            // Recharger la liste après suppression
            const data = await getAllNiveaux();
            setNiveaux(data);
        } catch (error) {
            console.error("Erreur lors de la suppression du niveau :", error);
            toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
        } finally {
            setOpenDeleteDialog(false);
            setNiveauToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false);
        setNiveauToDelete(null);
    };
    // ====================================================================================================

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
            >
                <DialogTitle id="alert-dialog-title">
                    {"Êtes-vous sûr de vouloir supprimer ce niveau ?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Non</Button>
                    <Button onClick={handleConfirmDelete} autoFocus color="error">
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Niveaux disponibles</h5>
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
                        <a href="/niveauxFrm"><FaRegPlusSquare /></a>
                    </div>
                    <table className="tableFormation table-hover table-bordered rounded shadow-sm overflow-hidden">
                        <thead className="table-light">
                            <tr className='tr-formation'>
                                <th className='th-formation'>ID Niveau</th>
                                <th className='th-formation'>Niveaux</th>
                                <th className='th-formation'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='tbody-formation'>
                            {niveaux.map((niveau) => (
                                <tr className='tr-formation' key={niveau.IDNiveaux}>
                                    <td className='td-formation'>{niveau.IDNiveaux}</td>
                                    <td className='td-formation'>
                                        {niveau.Niveaux}
                                    </td>
                                    <td className='td-formation td-moderne'>
                                        <a 
                                            href={`/modifierNiveauxFrm/${niveau.IDNiveaux}`}
                                            data-tooltip="Modifier"
                                        >
                                            <FaEdit className='modif-moderne' />
                                        </a>
                                        <button 
                                            className='supp-moderne' 
                                            onClick={() => handleDeleteClick(niveau.IDNiveaux)}
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

export default Niveaux;