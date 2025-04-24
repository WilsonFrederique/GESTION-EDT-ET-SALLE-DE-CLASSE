import React from 'react'
import './CreneauxListe.css'
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

const CreneauxListe = () => {

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
                            <a href="/creneauxFrm"><FaRegPlusSquare /></a>
                            {/* <a href="#"><FaRegPlusSquare /></a> */}
                        </div>
                    </div>
            
                    <hr className='hr-top' />
                    
                    <div className="creneaux-table-container">
                        <table className="creneaux-table">
                            <thead className="creneaux-thead">
                            <tr>
                                <th>ID Créneau</th>
                                <th>Jour</th>
                                <th>Heure Début</th>
                                <th>Heure Fin</th>
                                <th>Date Début</th>
                                <th>Date Fin</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className="creneaux-tbody">
                            {/* Exemple 1 - Créneau standard */}
                            <tr>
                                <td>1</td>
                                <td>Lundi</td>
                                <td>08:30</td>
                                <td>10:30</td>
                                <td>15/04/2025</td>
                                <td>15/06/2025</td>
                                <td className="actions-cell">
                                <button className="action-btn edit-btn" title="Modifier">
                                    <FaEdit />
                                </button>
                                <button className="action-btn delete-btn" title="Supprimer">
                                    <FaTrash />
                                </button>
                                </td>
                            </tr>

                            {/* Exemple 2 - Créneau du matin */}
                            <tr>
                                <td>2</td>
                                <td>Mardi</td>
                                <td>09:00</td>
                                <td>12:00</td>
                                <td>16/04/2025</td>
                                <td>16/07/2025</td>
                                <td className="actions-cell">
                                <button className="action-btn edit-btn" title="Modifier">
                                    <FaEdit />
                                </button>
                                <button className="action-btn delete-btn" title="Supprimer">
                                    <FaTrash />
                                </button>
                                </td>
                            </tr>

                            {/* Exemple 3 - Créneau de l'après-midi */}
                            <tr>
                                <td>3</td>
                                <td>Mercredi</td>
                                <td>14:00</td>
                                <td>17:00</td>
                                <td>17/04/2025</td>
                                <td>17/09/2025</td>
                                <td className="actions-cell">
                                <button className="action-btn edit-btn" title="Modifier">
                                    <FaEdit />
                                </button>
                                <button className="action-btn delete-btn" title="Supprimer">
                                    <FaTrash />
                                </button>
                                </td>
                            </tr>

                            {/* Exemple 4 - Créneau du soir */}
                            <tr>
                                <td>4</td>
                                <td>Jeudi</td>
                                <td>18:00</td>
                                <td>20:00</td>
                                <td>18/04/2025</td>
                                <td>18/12/2025</td>
                                <td className="actions-cell">
                                <button className="action-btn edit-btn" title="Modifier">
                                    <FaEdit />
                                </button>
                                <button className="action-btn delete-btn" title="Supprimer">
                                    <FaTrash />
                                </button>
                                </td>
                            </tr>

                            {/* Exemple 5 - Créneau du weekend */}
                            <tr>
                                <td>5</td>
                                <td>Samedi</td>
                                <td>10:00</td>
                                <td>13:00</td>
                                <td>20/04/2025</td>
                                <td>20/12/2025</td>
                                <td className="actions-cell">
                                <button className="action-btn edit-btn" title="Modifier">
                                    <FaEdit />
                                </button>
                                <button className="action-btn delete-btn" title="Supprimer">
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

export default CreneauxListe