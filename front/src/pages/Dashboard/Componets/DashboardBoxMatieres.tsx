import { useState } from 'react'

import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Menu from '@mui/material/Menu';
import { GrBook } from "react-icons/gr";
import MenuItem from '@mui/material/MenuItem';


import { HiDotsVertical } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";


const DashboardBox = (props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button className="dashboardBox" style={{
                backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
            }}>
                {
                    props.grow === true ? <span className="chart"><TrendingUpIcon /></span> 
                    : 
                    <span className="chart"><GrBook /></span>
                }


                <div className="d-flex w-100">
                    <div className="col1 mb-0">
                        <h4 className='text-white'>Total des Matieres</h4>
                        <span className='text-white'>277</span>
                    </div>

                    <div className="ms-auto">
                        <div className="icon">
                            {props.icon}
                        </div>
                    </div>
                </div>


                <div className="d-flex align-items-center w-100 bottomEle">
                    <h6 className="text-white mb-0 mt-0">Last Month</h6>
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
                                <IoIosTimer /> Last Day
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Last Week
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Last Month
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Last Yers
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </Button>
        </>
    )
}

export default DashboardBox