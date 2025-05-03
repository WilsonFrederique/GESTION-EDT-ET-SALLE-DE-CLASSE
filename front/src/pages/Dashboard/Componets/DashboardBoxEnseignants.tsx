import { useState, useEffect } from 'react'

import Button from '@mui/material/Button';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import { HiDotsVertical } from "react-icons/hi";
import { MdCalendarMonth } from "react-icons/md";
import { PiChalkboardTeacherBold } from "react-icons/pi";

import { getAllEnseignants } from '../../../services/enseignants_api';


const DashboardBox = (props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [totalEnseignants, setTotalEnseignants] = useState<number>(0);
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

    useEffect(() => {
        const fetchEnseignants = async () => {
            try {
                const enseignants = await getAllEnseignants();
                setTotalEnseignants(enseignants.length);
                setLoading(false);
            } catch (err) {
                setError("Erreur lors du chargement des enseignants");
                setLoading(false);
                console.error(err);
            }
        };

        fetchEnseignants();
    }, []);

    return (
        <>
            <Button className="dashboardBox" style={{
                backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
            }}>
                {
                    props.grow === true ? <span className="chart"><PiChalkboardTeacherBold /></span> 
                    : 
                    <span className="chart"><TrendingDownIcon /></span>
                }


                <div className="d-flex w-100">
                    <div className="col1 mb-0">
                        <h4 className='text-white'>Total des enseignants</h4>
                        {loading ? (
                            <span className='text-white'>Chargement...</span>
                        ) : error ? (
                            <span className='text-white'>Erreur</span>
                        ) : (
                            <span className='text-white'>{totalEnseignants}</span>
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
                            <MenuItem onClick={() => handleTimeFilter('mois')}>
                                <MdCalendarMonth /> Mois dernier
                            </MenuItem>
                            <MenuItem onClick={() => handleTimeFilter('année')}>
                                <MdCalendarMonth /> Année dernière
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </Button>
        </>
    )
}

export default DashboardBox