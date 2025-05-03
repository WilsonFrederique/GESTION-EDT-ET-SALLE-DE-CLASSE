import { useEffect, useState } from 'react'
import './CreneauxListe.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Breadcrumbs from "@mui/material/Breadcrumbs"
import HomeIcon from "@mui/icons-material/Home"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { emphasize, styled } from "@mui/material/styles"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogTitle from "@mui/material/DialogTitle"

import { GoMoveToTop } from "react-icons/go"
import { FaEdit, FaTrash, FaRegPlusSquare } from "react-icons/fa"
import { IoSearchOutline } from "react-icons/io5"
import { ImPrinter } from "react-icons/im"

import { getAllCreneaux, deleteCreneau } from '../../services/creneaux_api'
import type { Creneau } from '../../services/creneaux_api'
import { useNavigate } from 'react-router-dom'

const CreneauxListe = () => {
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor =
            theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[800]
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
        }
    })

    // État pour les données et la suppression
    const [creneaux, setCreneaux] = useState<Creneau[]>([])
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [creneauToDelete, setCreneauToDelete] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    // Charger les créneaux
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCreneaux()
                setCreneaux(data)
            } catch (error) {
                console.error("Erreur lors du chargement des créneaux :", error)
                toast.error("Erreur lors du chargement des créneaux")
            }
        }
        fetchData()
    }, [])

    // Gestion de la suppression
    const handleDeleteClick = (IDCreneaux: number) => {
        setCreneauToDelete(IDCreneaux)
        setOpenDeleteDialog(true)
    }

    const handleConfirmDelete = async () => {
        if (!creneauToDelete) return
        
        try {
            await deleteCreneau(creneauToDelete)
            toast.success("Créneau supprimé avec succès")
            // Recharger la liste après suppression
            const data = await getAllCreneaux()
            setCreneaux(data)
        } catch (error) {
            console.error("Erreur lors de la suppression du créneau :", error)
            toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression")
        } finally {
            setOpenDeleteDialog(false)
            setCreneauToDelete(null)
        }
    }

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false)
        setCreneauToDelete(null)
    }

    // Filtrage des créneaux
    const filteredCreneaux = creneaux.filter(creneau =>
        creneau.Jours.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creneau.HeureDebut.includes(searchTerm) ||
        creneau.HeureFin.includes(searchTerm) ||
        creneau.DateDebut.includes(searchTerm) ||
        creneau.DateFin.includes(searchTerm)
    )

    // Formater la date pour l'affichage
    const formatDate = (dateString: string) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR')
    }

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
                    Êtes-vous sûr de vouloir supprimer ce créneau ?
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
                    <h5 className="mb-0">Créneaux disponibles</h5>
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

                {/* Tableau des créneaux */}
                <div className="card shadow border-0 p-3 mt-4">
                    <div className="fa-reg-plus-square-container ensbl">
                        <div>Liste des créneaux</div>
                        <div>
                            <div className="add-actions-glass">
                                <span className="add-label-glass">Ajouter un créneau :</span>
                                <div className="action-buttons-glass">
                                    <a href="/creneauxDirectFrm">
                                        <button className="action-btn-glass direct-glass">
                                            <span>Direct</span>
                                            <div className="icon-wrapper-glass">
                                                <svg viewBox="0 0 24 24" width="20" height="20">
                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                                                </svg>
                                            </div>
                                            <div className="hover-effect-glass"></div>
                                        </button>
                                    </a>
                                    <a href="/creneauxFrm">
                                        <button className="action-btn-glass custom-glass">
                                            <span>Personnalisé</span>
                                            <div className="icon-wrapper-glass">
                                                <svg viewBox="0 0 24 24" width="20" height="20">
                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                                                <path d="M7 7h1v1H7zM10 7h1v1h-1zM7 10h1v1H7z" fill="currentColor" opacity="0.8"/>
                                                </svg>
                                            </div>
                                            <div className="hover-effect-glass"></div>
                                        </button>
                                    </a>
                                </div>
                            </div>
                            {/* <ImPrinter className='impression' /> &nbsp;&nbsp;
                            <a href="/creneauxFrm"><FaRegPlusSquare /></a> */}
                        </div>
                    </div>
            
                    <hr className='hr-top' />
                    
                    <div className="creneaux-table-container">
                        <table className="creneaux-table">
                            <thead className="creneaux-thead">
                                <tr>
                                    <th>ID</th>
                                    <th>Jour</th>
                                    <th>Heure Début</th>
                                    <th>Heure Fin</th>
                                    <th>Date Début</th>
                                    <th>Date Fin</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="creneaux-tbody">
                                {filteredCreneaux.map((creneau) => (
                                    <tr key={creneau.IDCreneaux}>
                                        <td>{creneau.IDCreneaux}</td>
                                        <td>{creneau.Jours}</td>
                                        <td>{creneau.HeureDebut}</td>
                                        <td>{creneau.HeureFin}</td>
                                        <td>{formatDate(creneau.DateDebut)}</td>
                                        <td>{formatDate(creneau.DateFin)}</td>                                        
                                        <td className='td-formation td-moderne'>
                                            <a 
                                                href={`/modifierCreneauxFrm/${creneau.IDCreneaux}`}
                                                data-tooltip="Modifier"
                                            >
                                                <FaEdit className='modif-moderne' />
                                            </a>
                                            <button 
                                                className='supp-moderne' 
                                                onClick={() => handleDeleteClick(creneau.IDCreneaux!)}
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

export default CreneauxListe