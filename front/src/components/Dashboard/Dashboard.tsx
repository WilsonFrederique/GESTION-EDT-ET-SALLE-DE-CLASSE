import '../Dashboard/Dashboard.css'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DashboardBoxEnseignants from '../../pages/Dashboard/Componets/DashboardBoxEnseignants'
import DashboardBoxMatieres from '../../pages/Dashboard/Componets/DashboardBoxMatieres'
import DashboardBoxEtudiants from '../../pages/Dashboard/Componets/DashboardBoxEtudiants'
import DashboardBoxSalle from '../../pages/Dashboard/Componets/DashboardBoxSalle'

import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { GrBook } from "react-icons/gr";
import { HiDotsVertical } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { GoMoveToTop } from "react-icons/go";
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

import EdtContainerAcceuil from '../../pages/EdtContainerAcceuil/EdtContainerAcceuil';
import { Chart } from "react-google-charts";
import { getAllEnseignants, deleteEnseignant } from '../../services/enseignants_api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

// Chart 1
export const dataChart = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

// Chart 2
export const dataGeo = [
    ["Country", "ENI "],
    ["Madagascar", "Madagascar : Fianarantsoa"],
];
const chartOptions = {
    backgroundColor: 'transparent',
    colorAxis: { colors: ['#FFFF00', '#FFD700'] },
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

  // États pour les enseignants
  const [enseignants, setEnseignants] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [enseignantToDelete, setEnseignantToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Charger les enseignants
  useEffect(() => {
    const fetchEnseignants = async () => {
      try {
        const data = await getAllEnseignants();
        setEnseignants(data);
      } catch (error) {
        console.error("Erreur lors du chargement des enseignants:", error);
        toast.error("Erreur lors du chargement des enseignants");
      }
    };
    fetchEnseignants();
  }, []);

  // Gestion de la suppression
  const handleDeleteClick = (cinEns: string) => {
    setEnseignantToDelete(cinEns);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!enseignantToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteEnseignant(enseignantToDelete);
      toast.success("Enseignant supprimé avec succès");
      setEnseignants(enseignants.filter(e => e.cinEns !== enseignantToDelete));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
      setEnseignantToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setEnseignantToDelete(null);
  };

  // Pagination et recherche
  const filteredEnseignants = enseignants.filter(enseignant => {
    const searchLower = searchTerm.toLowerCase();
    return (
      enseignant.cinEns.toLowerCase().includes(searchLower) ||
      enseignant.Nom.toLowerCase().includes(searchLower) ||
      enseignant.Prenom.toLowerCase().includes(searchLower) ||
      enseignant.Grade.toLowerCase().includes(searchLower) ||
      enseignant.Email.toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnseignants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnseignants.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="right-content w-100">
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
                                <FaMapMarkerAlt /> Fianarantsoa
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <FaMapMarkerAlt /> Toliara
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
                                const region = dataGeo[selection[0].row + 1];
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

        {/* EDT */}
        <div className="card bg-edt-acceuil shadow border-0 p-3 mt-4 ">
            <EdtContainerAcceuil />
        </div>

        {/* Card Ou Tableaux*/}
        <div className="card shadow border-0 p-3 mt-4">
            {/* Ajouter  */}
            <div className='d-flex add-product'>
                <h3 className="hd">Liste des enseignants</h3>
                <Link to="/enseignantsFRM">
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
                                value={searchTerm}
                                onChange={(e) => {
                                  setSearchTerm(e.target.value);
                                  setCurrentPage(1); // Reset à la première page lors d'une nouvelle recherche
                                }}
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
                        {currentItems.map((enseignant) => (
                        <tr key={enseignant.cinEns}>
                            <td>{enseignant.cinEns}</td>
                            <td>{enseignant.Nom} {enseignant.Prenom}</td>
                            <td>{enseignant.Sexe}</td>
                            <td>{enseignant.Grade}</td>
                            <td>{enseignant.Adresse}</td>
                            <td>{enseignant.Telephone}</td>
                            <td>{enseignant.Email}</td>
                            <td className='td-moderne'>
                                <a 
                                    href={`/modifierEnseignantsFRM/${enseignant.cinEns}`}
                                    data-tooltip="Modifier"
                                    className='modif'
                                >
                                    <FaEdit className='modif-moderne' />
                                </a>
                                <button 
                                    className='supp-moderne supp-moderne-acc' 
                                    onClick={() => handleDeleteClick(enseignant.cinEns)}
                                    data-tooltip="Supprimer"
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                <div className="d-flex tableFooter">
                    <p>
                    Affichage de <b>{indexOfFirstItem + 1}</b> à <b>{Math.min(indexOfLastItem, filteredEnseignants.length)}</b> sur <b>{filteredEnseignants.length}</b> résultats
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

        {/* Dialog de confirmation de suppression */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCancelDelete}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            Êtes-vous sûr de vouloir supprimer cet enseignant ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCancelDelete} disabled={isDeleting}>
              Annuler
            </Button>
            <Button 
              onClick={handleConfirmDelete} 
              autoFocus
              disabled={isDeleting}
              color="error"
            >
              {isDeleting ? 'Suppression en cours...' : 'Confirmer'}
            </Button>
          </DialogActions>
        </Dialog>

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