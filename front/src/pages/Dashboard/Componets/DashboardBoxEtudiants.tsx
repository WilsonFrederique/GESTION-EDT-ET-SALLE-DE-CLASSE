import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HiDotsVertical } from "react-icons/hi";
import { MdCalendarMonth } from "react-icons/md";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { getAllEtudiants } from '../../../services/etudiants_api';

const DashboardBox = (props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [totalEtudiants, setTotalEtudiants] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Fonction pour gérer le filtre temporel
    const handleTimeFilter = (filter: string) => {
        // Ici vous pourriez implémenter la logique de filtrage par période
        console.log(`Filtre sélectionné: ${filter}`);
        handleClose();
    };

    // Charger les données des étudiants
    useEffect(() => {
        const fetchEtudiants = async () => {
            try {
                const etudiants = await getAllEtudiants();
                setTotalEtudiants(etudiants.length);
                setLoading(false);
            } catch (err) {
                setError("Erreur lors du chargement des étudiants");
                setLoading(false);
                console.error(err);
            }
        };

        fetchEtudiants();
    }, []);

    return (
        <div className="dashboardBox" style={{
            backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
        }}>
            {
                props.grow === true ? 
                <span className="chart"><TrendingUpIcon /></span> 
                : 
                <span className="chart"><FaUsersBetweenLines /></span>
            }

            <div className="d-flex w-100">
                <div className="col1 mb-0">
                    <h4 className='text-white'>Total des étudiants</h4>
                    {loading ? (
                        <span className='text-white'>Chargement...</span>
                    ) : error ? (
                        <span className='text-white'>Erreur</span>
                    ) : (
                        <span className='text-white'>{totalEtudiants}</span>
                    )}
                </div>

                <div className="ms-auto">
                    <div className="icon">
                        {props.icon}
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center w-100 bottomEle">
                <h6 className="text-white mb-0 mt-0">Année actuell</h6>
                <div className="ms-auto">
                    <Button className="ms-auto toggleIcon" onClick={handleClick}>
                        <HiDotsVertical />
                    </Button>
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
                        <MenuItem onClick={() => handleTimeFilter('mois')}>
                            <MdCalendarMonth /> Mois dernier
                        </MenuItem>
                        <MenuItem onClick={() => handleTimeFilter('année')}>
                            <MdCalendarMonth /> Année dernière
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default DashboardBox