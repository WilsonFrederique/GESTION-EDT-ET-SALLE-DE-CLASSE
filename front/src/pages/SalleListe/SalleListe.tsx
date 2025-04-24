import React from 'react'
import './SalleListe.css'
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { GoMoveToTop } from "react-icons/go";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { ImPrinter } from "react-icons/im";
import { FaInfoCircle } from "react-icons/fa";

const SalleListe = () => {

    // Autre JS
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

    return (
        <div className="edt-container">

            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Salle de classe</h5>
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

                {/* Recherche */}
                <div className="card shadow border-0 p-3 mt-4">
                    <div className="search-container">
                        <form className="search-form">
                            <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Rechercher..."
                            aria-label="Rechercher"
                            />
                            <button type="submit" className="search-button">
                            <IoSearchOutline className="search-icon" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* EDT */}
                <div className="card shadow border-0 p-3 mt-4">

                    <div className="fa-reg-plus-square-container ensbl">
                        <div>Liste des salles de classe</div>
                        <div>
                            <a href="#"><ImPrinter className='impression' /></a> &nbsp;&nbsp;
                            <a href="/salleFRM"><FaRegPlusSquare /></a>
                            {/* <a href="#"><FaRegPlusSquare /></a> */}
                        </div>
                    </div>
            
                    <hr className='hr-top' />
                    
                    <div className="salles-table-container">
                        <table className="matieres-table">
                            <thead className="matieres-thead">
                            <tr>
                                <th>ID Salle</th>
                                <th>Salles</th>
                                <th>Disponible</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className="matieres-tbody">
                                <tr>
                                    <td>S001</td>
                                    <td>Salle 001</td>
                                    <td>
                                    <span className="badge available">Oui (Réservée)</span>
                                    </td>
                                    <td className="actions-cell">
                                    <button className="action-btn edit-btn" title="Modifier">
                                        <FaEdit />
                                    </button>
                                    <button className="action-btn info-btn" title="Détails">
                                        <FaInfoCircle />
                                    </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>S002</td>
                                    <td>Salle 002</td>
                                    <td>
                                    <span className="badge not-available">Non (Réservée)</span>
                                    </td>
                                    <td className="actions-cell">
                                    <button className="action-btn edit-btn" title="Modifier">
                                        <FaEdit />
                                    </button>
                                    <button className="action-btn info-btn" title="Détails">
                                        <FaInfoCircle />
                                    </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>S003</td>
                                    <td>Salle 003</td>
                                    <td>
                                    <span className="badge available">Oui (Réservée)</span>
                                    </td>
                                    <td className="actions-cell">
                                    <button className="action-btn edit-btn" title="Modifier">
                                        <FaEdit />
                                    </button>
                                    <button className="action-btn info-btn" title="Détails">
                                        <FaInfoCircle />
                                    </button>
                                    </td>
                                </tr>
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

export default SalleListe