import React, { useState } from 'react'
import '../ListesTousEDT/ListesTousEDT.css'
import '../EDT.css'
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Button from '@mui/material/Button';
import { GoMoveToTop } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { ImPrinter } from "react-icons/im";

const ListesTousEDT = () => {

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
                    <h5 className="mb-0">Emploi du temps de L1</h5>
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
                    <div className="filters-container">
                        <div className="filter-group">
                            <h4 className="filter-title">Afficher par Niveau</h4>
                            <div className="select-wrapper">
                            <select className="modern-select">
                                <option value="">Tous les niveaux</option>
                                <option value="L1">Licence 1 (L1)</option>
                                <option value="L2">Licence 2 (L2)</option>
                                <option value="L3">Licence 3 (L3)</option>
                                <option value="M1">Master 1 (M1)</option>
                                <option value="M2">Master 2 (M2)</option>
                            </select>
                            <div className="select-arrow"></div>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h4 className="filter-title">Afficher par Parcours</h4>
                            <div className="select-wrapper">
                            <select className="modern-select">
                                <option value="">Tous les parcours</option>
                                <option value="IG">Informatique Générale (IG)</option>
                                <option value="GB">Génie Logiciel et Base de Données (GB)</option>
                                <option value="ASR">Administration Systèmes et Réseaux (ASR)</option>
                            </select>
                            <div className="select-arrow"></div>
                            </div>
                        </div>

                    </div>

                    <div className="btn-recherche">
                        <Button className='btn-blue btn-lg btn-big w-100'><IoSearchOutline /> &nbsp;&nbsp; Rechercher</Button>
                    </div>
                </div>

                {/* EDT */}
                <div className="card shadow border-0 p-3 mt-4">

                    <div className="fa-reg-plus-square-container ensbl">
                        <div>Emploi du temps</div>
                        <div>
                            <a href="#"><ImPrinter className='impression' /></a> &nbsp;&nbsp;
                            <a href="/edtFrm"><FaRegPlusSquare /></a>
                        </div>
                    </div>
            
                    <hr className='hr-top' />
                    
                    {/* ENI - Première année ( 1ère ) */}
                    <div>
                        <h1>ENI - Première année ( 1ère )</h1>
                        <h2>Du 1er au 6 avril 2025</h2>

                        <form>
                            <div className="edt-table-container">
                                <table className="edt-table">
                                    <thead>
                                        <tr>
                                            <th>Heures</th>
                                            <th>Lundi</th>
                                            <th>Mardi</th>
                                            <th>Mercredi</th>
                                            <th>Jeudi</th>
                                            <th>Vendredi</th>
                                            <th>Samedi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-label="Heures">08h30 - 10h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Analyse (14)</div>
                                                    <div className="edt-prof">AKEF FATIHA</div>
                                                    <div className="edt-salle">Salle : small 7</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Anglais 1 (10)</div>
                                                    <div className="edt-prof">ZERHOUNY ABDOUH HANANE</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Recherche opérationnelle (18)</div>
                                                    <div className="edt-prof">MESTARI MOHAMMED</div>
                                                    <div className="edt-salle">Salle : big 4</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">10h30 - 12h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi"></td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">14h00 - 16h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Algorithmique (16)</div>
                                                    <div className="edt-prof">MANSOURI KHALIFA</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Probabilité (14)</div>
                                                    <div className="edt-prof">ILLOUSSAMEN EL HOSSEIN</div>
                                                    <div className="edt-salle">Salle : small 6</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">16h00 - 18h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Introduction aux BDD (18)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : miniAmphi 2</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Architecture des ordinateurs (18)</div>
                                                    <div className="edt-prof">RAIHANI ABDELHADI</div>
                                                    <div className="edt-salle">Salle : big 5</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Boutons */}
                            <div className="edt-buttons">
                                <Button type='button' className='btn-imprimer btn-lg'>
                                    <ImPrinter /> &nbsp; IMPRIMER
                                </Button>
                                <Button type='submit' className='btn-blue btn-lg'>
                                    <FaRegEdit /> &nbsp; MODIFIER
                                </Button>
                                <Button type='button' className='btn-dang btn-lg'>
                                    <MdDeleteOutline /> &nbsp; SUPPRIMER
                                </Button>
                            </div>
                        </form>
                    </div>

                    <hr className='hr' />
                    
                    {/* ENI - Deuxième année ( 2e ) */}
                    <div>
                        <h1>ENI - Deuxième année ( 2e )</h1>
                        <h2>Du 1er au 6 avril 2025</h2>

                        <form>
                            <div className="edt-table-container">
                                <table className="edt-table">
                                    <thead>
                                        <tr>
                                            <th>Heures</th>
                                            <th>Lundi</th>
                                            <th>Mardi</th>
                                            <th>Mercredi</th>
                                            <th>Jeudi</th>
                                            <th>Vendredi</th>
                                            <th>Samedi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-label="Heures">08h30 - 10h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Analyse (14)</div>
                                                    <div className="edt-prof">AKEF FATIHA</div>
                                                    <div className="edt-salle">Salle : small 7</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Anglais 1 (10)</div>
                                                    <div className="edt-prof">ZERHOUNY ABDOUH HANANE</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Recherche opérationnelle (18)</div>
                                                    <div className="edt-prof">MESTARI MOHAMMED</div>
                                                    <div className="edt-salle">Salle : big 4</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">10h30 - 12h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi"></td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">14h00 - 16h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Algorithmique (16)</div>
                                                    <div className="edt-prof">MANSOURI KHALIFA</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Probabilité (14)</div>
                                                    <div className="edt-prof">ILLOUSSAMEN EL HOSSEIN</div>
                                                    <div className="edt-salle">Salle : small 6</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">16h00 - 18h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Introduction aux BDD (18)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : miniAmphi 2</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Architecture des ordinateurs (18)</div>
                                                    <div className="edt-prof">RAIHANI ABDELHADI</div>
                                                    <div className="edt-salle">Salle : big 5</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Boutons */}
                            <div className="edt-buttons">
                                <Button type='button' className='btn-imprimer btn-lg'>
                                    <ImPrinter /> &nbsp; IMPRIMER
                                </Button>
                                <Button type='submit' className='btn-blue btn-lg'>
                                    <FaRegEdit /> &nbsp; MODIFIER
                                </Button>
                                <Button type='button' className='btn-dang btn-lg'>
                                    <MdDeleteOutline /> &nbsp; SUPPRIMER
                                </Button>
                            </div>
                        </form>
                    </div>                
                    
                    <hr className='hr' />
                    
                    {/* ENI - Troisième année ( 3e ) */}
                    <div>
                        <h1>ENI - Troisième année ( 3e )</h1>
                        <h2>Du 1er au 6 avril 2025</h2>

                        <form>
                            <div className="edt-table-container">
                                <table className="edt-table">
                                    <thead>
                                        <tr>
                                            <th>Heures</th>
                                            <th>Lundi</th>
                                            <th>Mardi</th>
                                            <th>Mercredi</th>
                                            <th>Jeudi</th>
                                            <th>Vendredi</th>
                                            <th>Samedi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-label="Heures">08h30 - 10h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Analyse (14)</div>
                                                    <div className="edt-prof">AKEF FATIHA</div>
                                                    <div className="edt-salle">Salle : small 7</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Anglais 1 (10)</div>
                                                    <div className="edt-prof">ZERHOUNY ABDOUH HANANE</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Recherche opérationnelle (18)</div>
                                                    <div className="edt-prof">MESTARI MOHAMMED</div>
                                                    <div className="edt-salle">Salle : big 4</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">10h30 - 12h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi"></td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">14h00 - 16h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Algorithmique (16)</div>
                                                    <div className="edt-prof">MANSOURI KHALIFA</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Probabilité (14)</div>
                                                    <div className="edt-prof">ILLOUSSAMEN EL HOSSEIN</div>
                                                    <div className="edt-salle">Salle : small 6</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">16h00 - 18h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Introduction aux BDD (18)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : miniAmphi 2</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Architecture des ordinateurs (18)</div>
                                                    <div className="edt-prof">RAIHANI ABDELHADI</div>
                                                    <div className="edt-salle">Salle : big 5</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Boutons */}
                            <div className="edt-buttons">
                                <Button type='button' className='btn-imprimer btn-lg'>
                                    <ImPrinter /> &nbsp; IMPRIMER
                                </Button>
                                <Button type='submit' className='btn-blue btn-lg'>
                                    <FaRegEdit /> &nbsp; MODIFIER
                                </Button>
                                <Button type='button' className='btn-dang btn-lg'>
                                    <MdDeleteOutline /> &nbsp; SUPPRIMER
                                </Button>
                            </div>
                        </form>
                    </div>
                    
                    <hr className='hr' />
                    
                    {/* ENI - Quatrième année ( 4e ) */}
                    <div>
                        <h1>ENI - Quatrième année ( 4e )</h1>
                        <h2>Du 1er au 6 avril 2025</h2>

                        <form>
                            <div className="edt-table-container">
                                <table className="edt-table">
                                    <thead>
                                        <tr>
                                            <th>Heures</th>
                                            <th>Lundi</th>
                                            <th>Mardi</th>
                                            <th>Mercredi</th>
                                            <th>Jeudi</th>
                                            <th>Vendredi</th>
                                            <th>Samedi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-label="Heures">08h30 - 10h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Analyse (14)</div>
                                                    <div className="edt-prof">AKEF FATIHA</div>
                                                    <div className="edt-salle">Salle : small 7</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Anglais 1 (10)</div>
                                                    <div className="edt-prof">ZERHOUNY ABDOUH HANANE</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Recherche opérationnelle (18)</div>
                                                    <div className="edt-prof">MESTARI MOHAMMED</div>
                                                    <div className="edt-salle">Salle : big 4</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">10h30 - 12h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi"></td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">14h00 - 16h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Algorithmique (16)</div>
                                                    <div className="edt-prof">MANSOURI KHALIFA</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Probabilité (14)</div>
                                                    <div className="edt-prof">ILLOUSSAMEN EL HOSSEIN</div>
                                                    <div className="edt-salle">Salle : small 6</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">16h00 - 18h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Introduction aux BDD (18)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : miniAmphi 2</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Architecture des ordinateurs (18)</div>
                                                    <div className="edt-prof">RAIHANI ABDELHADI</div>
                                                    <div className="edt-salle">Salle : big 5</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Boutons */}
                            <div className="edt-buttons">
                                <Button type='button' className='btn-imprimer btn-lg'>
                                    <ImPrinter /> &nbsp; IMPRIMER
                                </Button>
                                <Button type='submit' className='btn-blue btn-lg'>
                                    <FaRegEdit /> &nbsp; MODIFIER
                                </Button>
                                <Button type='button' className='btn-dang btn-lg'>
                                    <MdDeleteOutline /> &nbsp; SUPPRIMER
                                </Button>
                            </div>
                        </form>
                    </div>

                    
                    <hr className='hr' />
                    
                    {/* ENI - Cinquième année ( 5e ) */}
                    <div>
                        <h1>ENI - Cinquième année ( 5e )</h1>
                        <h2>Du 1er au 6 avril 2025</h2>

                        <form>
                            <div className="edt-table-container">
                                <table className="edt-table">
                                    <thead>
                                        <tr>
                                            <th>Heures</th>
                                            <th>Lundi</th>
                                            <th>Mardi</th>
                                            <th>Mercredi</th>
                                            <th>Jeudi</th>
                                            <th>Vendredi</th>
                                            <th>Samedi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-label="Heures">08h30 - 10h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Analyse (14)</div>
                                                    <div className="edt-prof">AKEF FATIHA</div>
                                                    <div className="edt-salle">Salle : small 7</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Anglais 1 (10)</div>
                                                    <div className="edt-prof">ZERHOUNY ABDOUH HANANE</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Recherche opérationnelle (18)</div>
                                                    <div className="edt-prof">MESTARI MOHAMMED</div>
                                                    <div className="edt-salle">Salle : big 4</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">10h30 - 12h30</td>
                                            <td data-label="Lundi"></td>
                                            <td data-label="Mardi"></td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">14h00 - 16h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Algorithmique (16)</div>
                                                    <div className="edt-prof">MANSOURI KHALIFA</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Probabilité (14)</div>
                                                    <div className="edt-prof">ILLOUSSAMEN EL HOSSEIN</div>
                                                    <div className="edt-salle">Salle : small 6</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">SQL et SGBD (6)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : small 15</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td data-label="Heures">16h00 - 18h00</td>
                                            <td data-label="Lundi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Introduction aux BDD (18)</div>
                                                    <div className="edt-prof">QBADOU MOHAMMED</div>
                                                    <div className="edt-salle">Salle : miniAmphi 2</div>
                                                </div>
                                            </td>
                                            <td data-label="Mardi">
                                                <div className="edt-cours-container">
                                                    <div className="edt-cours">Architecture des ordinateurs (18)</div>
                                                    <div className="edt-prof">RAIHANI ABDELHADI</div>
                                                    <div className="edt-salle">Salle : big 5</div>
                                                </div>
                                            </td>
                                            <td data-label="Mercredi"></td>
                                            <td data-label="Jeudi"></td>
                                            <td data-label="Vendredi"></td>
                                            <td data-label="Samedi"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Boutons */}
                            <div className="edt-buttons">
                                <Button type='button' className='btn-imprimer btn-lg'>
                                    <ImPrinter /> &nbsp; IMPRIMER
                                </Button>
                                <Button type='submit' className='btn-blue btn-lg'>
                                    <FaRegEdit /> &nbsp; MODIFIER
                                </Button>
                                <Button type='button' className='btn-dang btn-lg'>
                                    <MdDeleteOutline /> &nbsp; SUPPRIMER
                                </Button>
                            </div>
                        </form>
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

export default ListesTousEDT