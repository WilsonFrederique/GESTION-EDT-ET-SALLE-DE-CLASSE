import React from 'react'
import './MatiersListe.css'
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

const MatiersListe = () => {

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
                    <h5 className="mb-0">Matiers</h5>
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
                        <div>Liste des matières</div>
                        <div>
                            <a href="#"><ImPrinter className='impression' /></a> &nbsp;&nbsp;
                            <a href="/matiereFrm"><FaRegPlusSquare /></a>
                        </div>
                    </div>
            
                    <hr className='hr-top' />
                    
                    <div className="matieres-table-container">
                        <table className="matieres-table">
                            <thead className="matieres-thead">
                            <tr>
                                <th>ID Matière</th>
                                <th>Matières</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className="matieres-tbody">
                            <tr>
                                <td>M001</td>
                                <td>Mathématiques Appliquées</td>
                                <td className="actions-cell">
                                <button className="action-btn edit-btn">
                                    <FaEdit />
                                </button>
                                <button className="action-btn delete-btn">
                                    <FaTrash />
                                </button>
                                </td>
                            </tr>
                            <tr>
                                <td>M002</td>
                                <td>Algorithmique Avancée</td>
                                <td className="actions-cell">
                                <button className="action-btn edit-btn">
                                    <FaEdit />
                                </button>
                                <button className="action-btn delete-btn">
                                    <FaTrash />
                                </button>
                                </td>
                            </tr>
                            <tr>
                                <td>M003</td>
                                <td>Physique Quantique</td>
                                <td className="actions-cell">
                                <button className="action-btn edit-btn">
                                    <FaEdit />
                                </button>
                                <button className="action-btn delete-btn">
                                    <FaTrash />
                                </button>
                                </td>
                            </tr>
                            <tr>
                                <td>M004</td>
                                <td>Anglais Technique</td>
                                <td className="actions-cell">
                                <button className="action-btn edit-btn">
                                    <FaEdit />
                                </button>
                                <button className="action-btn delete-btn">
                                    <FaTrash />
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

export default MatiersListe