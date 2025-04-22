import '../Niveaux/Niveaux.css'

import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";


import { GoMoveToTop } from "react-icons/go";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

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

    return (
        <div>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Niveaux disponibles</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumb_">
                        <StyledBreadcrumb
                        className="StyledBreadcrumb"
                        component="a"
                        href="#"
                        label="Accueil"
                        icon={<HomeIcon fontSize="small" />}
                        />
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
                            <tr className='tr-formation'>
                                <td className='td-formation'>1</td>
                                <td className='td-formation'>Licence 1 &nbsp;&nbsp;&nbsp; <b>( L1 )</b></td>
                                <td className='td-formation grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>
                            <tr className='tr-formation'>
                                <td className='td-formation'>2</td>
                                <td className='td-formation'>Licence 2 &nbsp;&nbsp;&nbsp; <b>( L2 )</b></td>
                                <td className='td-formation grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>
                            <tr className='tr-formation'>
                                <td className='td-formation'>3</td>
                                <td className='td-formation'>Licence 3 &nbsp;&nbsp;&nbsp; <b>( L3 )</b></td>
                                <td className='td-formation grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>
                            <tr className='tr-formation'>
                                <td className='td-formation'>4</td>
                                <td className='td-formation'>Master 1 &nbsp;&nbsp;&nbsp; <b>( M1 )</b></td>
                                <td className='td-formation grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>
                            <tr className='tr-formation'>
                                <td className='td-formation'>5</td>
                                <td className='td-formation'>Master 2 &nbsp;&nbsp;&nbsp; <b>( M2 )</b></td>
                                <td className='td-formation grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>
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

export default Niveaux