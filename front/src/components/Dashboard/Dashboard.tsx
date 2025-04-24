import '../Dashboard/Dashboard.css'

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DashboardBoxEnseignants from '../../pages/Dashboard/Componets/DashboardBoxEnseignants'
import DashboardBoxMatieres from '../../pages/Dashboard/Componets/DashboardBoxMatieres'
import DashboardBoxEtudiants from '../../pages/Dashboard/Componets/DashboardBoxEtudiants'
import DashboardBoxSalle from '../../pages/Dashboard/Componets/DashboardBoxSalle'


import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { GrBook } from "react-icons/gr";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { GoMoveToTop } from "react-icons/go";
import { FaEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { ImPrinter } from "react-icons/im";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';



// Chart 1
import { Chart } from "react-google-charts";
export const dataChart = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];


// Chart 2
export const dataGeo = [
    ["Country", "Popularity"],
    ["Madagascar", 100],
];
const chartOptions = {
    backgroundColor: 'transparent',
    colorAxis: { colors: ['#FFFF00', '#FFD700'] }, // Couleurs des régions
};


export const options = {
  'backgroundColor': 'transparent',
  'chartArea': {'width': '100%', 'height': '100%'},
};


const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };




// ============================ Suivant Table ============================
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Données d'exemple
  const enseignants = [
    { cin: '101011022258', nom: 'Dupont Jean', sexe: 'Homme', grade: 'Maître de conférences', adresse: '123 rue Principale', tel: '0600000000', email: 'jean.dupont@example.com' },
    { cin: '101011022254', nom: 'Martin Claire', sexe: 'Femme', grade: 'Professeur', adresse: '45 avenue République', tel: '0700000000', email: 'claire.martin@example.com' },
    { cin: '101011022258', nom: 'Dupont Jean', sexe: 'Homme', grade: 'Maître de conférences', adresse: '123 rue Principale', tel: '0600000000', email: 'jean.dupont@example.com' },
    { cin: '101011022254', nom: 'Martin Claire', sexe: 'Femme', grade: 'Professeur', adresse: '45 avenue République', tel: '0700000000', email: 'claire.martin@example.com' },
    { cin: '101011022258', nom: 'Dupont Jean', sexe: 'Homme', grade: 'Maître de conférences', adresse: '123 rue Principale', tel: '0600000000', email: 'jean.dupont@example.com' },
    { cin: '101011022254', nom: 'Martin Claire', sexe: 'Femme', grade: 'Professeur', adresse: '45 avenue République', tel: '0700000000', email: 'claire.martin@example.com' },
    { cin: '101011022258', nom: 'Dupont Jean', sexe: 'Homme', grade: 'Maître de conférences', adresse: '123 rue Principale', tel: '0600000000', email: 'jean.dupont@example.com' },
    { cin: '101011022254', nom: 'Martin Claire', sexe: 'Femme', grade: 'Professeur', adresse: '45 avenue République', tel: '0700000000', email: 'claire.martin@example.com' },
    { cin: '101011022258', nom: 'Dupont Jean', sexe: 'Homme', grade: 'Maître de conférences', adresse: '123 rue Principale', tel: '0600000000', email: 'jean.dupont@example.com' },
    { cin: '101011022254', nom: 'Martin Claire', sexe: 'Femme', grade: 'Professeur', adresse: '45 avenue République', tel: '0700000000', email: 'claire.martin@example.com' },
    { cin: '101011022258', nom: 'Dupont Jean', sexe: 'Homme', grade: 'Maître de conférences', adresse: '123 rue Principale', tel: '0600000000', email: 'jean.dupont@example.com' },
    { cin: '101011022254', nom: 'Martin Claire', sexe: 'Femme', grade: 'Professeur', adresse: '45 avenue République', tel: '0700000000', email: 'claire.martin@example.com' },
  ];

  // Calcul des éléments à afficher
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = enseignants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(enseignants.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
// =========================================================================


  return (
    <>
      <div className="right-content w-100">
        {/* Box */}
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBoxEnseignants color={["#1da256","#48d483"]} icon={<FaChalkboardTeacher />} grow={true} />
              <DashboardBoxMatieres color={["#c012e2","#eb64fe"]} icon={<GrBook />} />
              <DashboardBoxEtudiants color={["#2c78e5","#60aff5"]} icon={<FaUsersBetweenLines />} />
              <DashboardBoxSalle color={["#e1950e","#f3cd29"]} icon={<HiOutlineBuildingLibrary />} />
            </div>
          </div>

          <div className="col-md-4 ps-0 topPart2">
            <div className="box graphBox">
                <div className="d-flex align-items-center w-100 bottomEle">
                    <h6 className="text-white mb-0 mt-0">Géolocalisation</h6>
                    <div className="ms-auto">
                        <Button className="ms-auto toggleIcon" onClick={handleClick}><HiDotsVertical /></Button>
                        <Menu
                            className='boxdown_menu'
                            MenuListProps={{
                            'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            slotProps={{
                            paper: {
                                style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                                },
                            },
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Dernier Jour
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Dernière Semn
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Dernier Mois
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Dernière Année
                            </MenuItem>
                        </Menu>
                    </div>
                </div>

                <div className="text-white fw-bold">
                    <Chart
                        chartEvents={[
                            {
                            eventName: "select",
                            callback: ({ chartWrapper }) => {
                                const chart = chartWrapper.getChart();
                                const selection = chart.getSelection();
                                if (selection.length === 0) return;
                                const region = data[selection[0].row + 1];
                                console.log("Selected : " + region);
                            },
                            },
                        ]}
                        chartType="GeoChart"
                        width="100%"
                        height="100%"
                        data={dataGeo}
                        options={chartOptions}
                    />
                </div>
            </div>
          </div>
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
                    {/* <a href="/edtFrm"><FaRegPlusSquare /></a> */}
                    <a href=""><FaRegPlusSquare /></a>
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


        {/* Card Ou Tableaux*/}
        <div className="card shadow border-0 p-3 mt-4">
            {/* Ajouter  */}
            <div className='d-flex add-product'>
                <h3 className="hd">Liste des enseignants</h3>
                <Link to="">
                    <Button className='btn-blue btn-lg'>Ajouter</Button>
                </Link>
            </div>

            {/* Rechercher */}
            <div className="search-container">
                <div className="search-group display-flex">
                    <div>
                        <div className="search-input-group">
                            <input 
                                type="text" 
                                className="search-input-nom"
                                placeholder="Rechercher ..."
                                aria-label="Recherche par nom"
                            />
                            <button className="search-button1" type="button" aria-label="Lancer la recherche">
                                <IoSearchOutline className="search-icon1" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="table-responsive mt-3">
                <div className="table-container">
                    <table className="enseignants-table">
                    <thead>
                        <tr>
                            <th>CIN Enseignant</th>
                            <th>Nom et Prénom</th>
                            <th>Sexe</th>
                            <th>Grade</th>
                            <th>Adresse</th>
                            <th>Téléphone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((enseignant, index) => (
                        <tr key={`${enseignant.cin}-${index}`}>
                            <td>{enseignant.cin}</td>
                            <td>{enseignant.nom}</td>
                            <td>{enseignant.sexe}</td>
                            <td>{enseignant.grade}</td>
                            <td>{enseignant.adresse}</td>
                            <td>{enseignant.tel}</td>
                            <td>{enseignant.email}</td>
                            <td>
                            <FaEdit />
                            <MdDeleteOutline />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                <div className="d-flex tableFooter">
                    <p>
                    Affichage de <b>{indexOfFirstItem + 1}</b> à <b>{Math.min(indexOfLastItem, enseignants.length)}</b> sur <b>{enseignants.length}</b> résultats
                    </p>
                    <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    className="pagination"
                    showFirstButton
                    showLastButton
                    />
                </div>
            </div>

        </div>


        <footer className="footer">
            <div className="footer-text">
                <p>&copy; 2025 par Planification Scolaire | Tous Droits Réservés.</p>
            </div>

            <div className="footer-iconTop">
                <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <GoMoveToTop />
                </a>
            </div>
        </footer>

      </div>
    </>
  )
}

export default Dashboard