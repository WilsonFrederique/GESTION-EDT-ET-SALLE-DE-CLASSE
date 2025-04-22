import '../NiveauL1/NiveauL1.css'
import '../Niveau.css'

import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";


import { GoMoveToTop } from "react-icons/go";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

const NiveauL1 = () => {
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
                    <h5 className="mb-0">Étudiants inscrits en L1</h5>
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
                    <div className="fa-reg-plus-square-container ensbl">
                        <div>Liste des étudiants inscrits en Licence 1</div>
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
                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>2555</td>
                                <td className='td-Niveau'>GB</td>
                                <td className='td-Niveau'>Toky</td>
                                <td className='td-Niveau'>Jonah</td>
                                <td className='td-Niveau'>14</td>
                                <td className='td-Niveau'>Tanambao</td>
                                <td className='td-Niveau'>034 44 444 44</td>
                                <td className='td-Niveau'>tokyjonah@gmail.com</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1001</td>
                                <td className='td-Niveau'>GB</td>
                                <td className='td-Niveau'>Rakoto</td>
                                <td className='td-Niveau'>Jean</td>
                                <td className='td-Niveau'>25</td>
                                <td className='td-Niveau'>Antananarivo</td>
                                <td className='td-Niveau'>034 11 111 11</td>
                                <td className='td-Niveau'>rakoto.jean@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1002</td>
                                <td className='td-Niveau'>GB</td>
                                <td className='td-Niveau'>Rasoa</td>
                                <td className='td-Niveau'>Marie</td>
                                <td className='td-Niveau'>22</td>
                                <td className='td-Niveau'>Fianarantsoa</td>
                                <td className='td-Niveau'>034 22 222 22</td>
                                <td className='td-Niveau'>rasoa.marie@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1003</td>
                                <td className='td-Niveau'>IG</td>
                                <td className='td-Niveau'>Randria</td>
                                <td className='td-Niveau'>Paul</td>
                                <td className='td-Niveau'>19</td>
                                <td className='td-Niveau'>Toamasina</td>
                                <td className='td-Niveau'>034 33 333 33</td>
                                <td className='td-Niveau'>randria.paul@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1004</td>
                                <td className='td-Niveau'>IG</td>
                                <td className='td-Niveau'>Andria</td>
                                <td className='td-Niveau'>Sarah</td>
                                <td className='td-Niveau'>17</td>
                                <td className='td-Niveau'>Mahajanga</td>
                                <td className='td-Niveau'>034 44 555 66</td>
                                <td className='td-Niveau'>andria.sarah@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1005</td>
                                <td className='td-Niveau'>IG</td>
                                <td className='td-Niveau'>Rabe</td>
                                <td className='td-Niveau'>Jacques</td>
                                <td className='td-Niveau'>28</td>
                                <td className='td-Niveau'>Antsirabe</td>
                                <td className='td-Niveau'>034 55 555 55</td>
                                <td className='td-Niveau'>rabe.jacques@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1006</td>
                                <td className='td-Niveau'>IG</td>
                                <td className='td-Niveau'>Ralay</td>
                                <td className='td-Niveau'>Sophie</td>
                                <td className='td-Niveau'>21</td>
                                <td className='td-Niveau'>Toliara</td>
                                <td className='td-Niveau'>034 66 666 66</td>
                                <td className='td-Niveau'>ralay.sophie@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                            </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1007</td>
                                <td className='td-Niveau'>GB</td>
                                <td className='td-Niveau'>Rajaona</td>
                                <td className='td-Niveau'>Pierre</td>
                                <td className='td-Niveau'>16</td>
                                <td className='td-Niveau'>Antsiranana</td>
                                <td className='td-Niveau'>034 77 777 77</td>
                                <td className='td-Niveau'>rajaona.pierre@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1008</td>
                                <td className='td-Niveau'>GB</td>
                                <td className='td-Niveau'>Razafy</td>
                                <td className='td-Niveau'>Claire</td>
                                <td className='td-Niveau'>24</td>
                                <td className='td-Niveau'>Morondava</td>
                                <td className='td-Niveau'>034 88 888 88</td>
                                <td className='td-Niveau'>razafy.claire@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1009</td>
                                <td className='td-Niveau'>IG</td>
                                <td className='td-Niveau'>Andriana</td>
                                <td className='td-Niveau'>Thomas</td>
                                <td className='td-Niveau'>20</td>
                                <td className='td-Niveau'>Ambanja</td>
                                <td className='td-Niveau'>034 99 999 99</td>
                                <td className='td-Niveau'>andriana.thomas@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1010</td>
                                <td className='td-Niveau'>GB</td>
                                <td className='td-Niveau'>Rasolofoniaina</td>
                                <td className='td-Niveau'>Elise</td>
                                <td className='td-Niveau'>18</td>
                                <td className='td-Niveau'>Manakara</td>
                                <td className='td-Niveau'>034 10 101 01</td>
                                <td className='td-Niveau'>rasolo.elise@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1011</td>
                                <td className='td-Niveau'>IG</td>
                                <td className='td-Niveau'>Randrianarisoa</td>
                                <td className='td-Niveau'>Marc</td>
                                <td className='td-Niveau'>23</td>
                                <td className='td-Niveau'>Ambatolampy</td>
                                <td className='td-Niveau'>034 11 010 10</td>
                                <td className='td-Niveau'>randria.marc@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1012</td>
                                <td className='td-Niveau'>IG</td>
                                <td className='td-Niveau'>Rakotomalala</td>
                                <td className='td-Niveau'>Julie</td>
                                <td className='td-Niveau'>19</td>
                                <td className='td-Niveau'>Antalaha</td>
                                <td className='td-Niveau'>034 12 121 21</td>
                                <td className='td-Niveau'>rakoto.julie@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1013</td>
                                <td className='td-Niveau'>IG</td>
                                <td className='td-Niveau'>Ramanantsoa</td>
                                <td className='td-Niveau'>Luc</td>
                                <td className='td-Niveau'>26</td>
                                <td className='td-Niveau'>Ambositra</td>
                                <td className='td-Niveau'>034 13 131 31</td>
                                <td className='td-Niveau'>rama.luc@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1014</td>
                                <td className='td-Niveau'>GB</td>
                                <td className='td-Niveau'>Randriamanjaka</td>
                                <td className='td-Niveau'>Anna</td>
                                <td className='td-Niveau'>17</td>
                                <td className='td-Niveau'>Sambava</td>
                                <td className='td-Niveau'>034 14 141 41</td>
                                <td className='td-Niveau'>randria.anna@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
                                    <FaEdit className='edit' />
                                    <FaTrash className='delet' />
                                </td>
                            </tr>

                            <tr className='tr-Niveau'>
                                <td className='td-Niveau'>1015</td>
                                <td className='td-Niveau'>IG</td>
                                <td className='td-Niveau'>Razafindrakoto</td>
                                <td className='td-Niveau'>David</td>
                                <td className='td-Niveau'>22</td>
                                <td className='td-Niveau'>Nosy Be</td>
                                <td className='td-Niveau'>034 15 151 51</td>
                                <td className='td-Niveau'>razafy.david@mail.mg</td>
                                <td className='td-Niveau grp-btns'>
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

export default NiveauL1