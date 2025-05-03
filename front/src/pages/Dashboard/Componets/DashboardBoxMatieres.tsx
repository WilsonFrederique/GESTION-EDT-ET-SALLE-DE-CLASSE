import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HiDotsVertical } from "react-icons/hi";
import { MdCalendarMonth } from "react-icons/md";
import { GrBook } from "react-icons/gr";
import { getAllMatieres } from '../../../services/matiers_api';

const DashboardBox = (props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [totalMatieres, setTotalMatieres] = useState<number>(0);
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

    // Charger les données des matières
    useEffect(() => {
        const fetchMatieres = async () => {
            try {
                const matieres = await getAllMatieres();
                setTotalMatieres(matieres.length);
                setLoading(false);
            } catch (err) {
                setError("Erreur lors du chargement des matières");
                setLoading(false);
                console.error(err);
            }
        };

        fetchMatieres();
    }, []);

    return (
        <div className="dashboardBox" style={{
            backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
        }}>
            {
                props.grow === true ? 
                <span className="chart"><TrendingUpIcon /></span> 
                : 
                <span className="chart"><GrBook /></span>
            }

            <div className="d-flex w-100">
                <div className="col1 mb-0">
                    <h4 className='text-white'>Total des Matières</h4>
                    {loading ? (
                        <span className='text-white'>Chargement...</span>
                    ) : error ? (
                        <span className='text-white'>Erreur</span>
                    ) : (
                        <span className='text-white'>{totalMatieres}</span>
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