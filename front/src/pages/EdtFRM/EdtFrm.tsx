import '../EdtFrm/EdtFrm.css'

import React, { useState } from 'react'

import "react-lazy-load-image-component/src/effects/blur.css";


import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';


import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoMoveToTop } from "react-icons/go";




const EdtFrm = () => {
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor = 
            theme.palette.mode === 'light' 
            ? theme.palette.grey[100] 
            : theme.palette.grey[800];
        return{
            backgroundColor, 
            height: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            '&:hover, &:focus': {
                backgroundColor: emphasize(backgroundColor, 0.06),
            },
            '&:active':{
                boxShadow: theme.shadows[1],
                backgroundColor: emphasize(backgroundColor, 0.12)
            }
        }
    });




    const [categoryVal1, setcategoryVal1] = React.useState('');
    const handleChangeCategory1 = (event: SelectChangeEvent) => {
        setcategoryVal1(event.target.value);
    };

    const [categoryVal2, setcategoryVal2] = React.useState('');
    const handleChangeCategory2 = (event: SelectChangeEvent) => {
        setcategoryVal2(event.target.value);
    };

    const [categoryVal3, setcategoryVal3] = React.useState('');
    const handleChangeCategory3 = (event: SelectChangeEvent) => {
        setcategoryVal3(event.target.value);
    };

    const [brandVal1, setbrandVal1] = React.useState('');
    const handleChangeBrand1 = (event: SelectChangeEvent) => {
        setbrandVal1(event.target.value);
    };

    const [brandVal2, setbrandVal2] = React.useState('');
    const handleChangeBrand2 = (event: SelectChangeEvent) => {
        setbrandVal2(event.target.value);
    };

    const [brandVal3, setbrandVal3] = React.useState('');
    const handleChangeBrand3 = (event: SelectChangeEvent) => {
        setbrandVal3(event.target.value);
    };



    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Ajout d’un étudiant</h5>
                    <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                        <a href="/">
                            <StyledBreadcrumb 
                                className='StyledBreadcrumb' 
                                component="a"
                                label="Accueil"
                                icon={<HomeIcon fontSize='small' />}
                            />
                        </a>
                        <a href="/listesTousEDT">
                            <StyledBreadcrumb 
                                className='StyledBreadcrumb' 
                                label="Listes"
                            />
                        </a>
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            label="Ajout"
                            icon={<ExpandMoreIcon fontSize="small" />}
                        />
                    </Breadcrumbs>
                </div>



                <form className='form'>
                    {/* Input */}
                    <div className="row">
                        {/* <div className="col-sm-8"> */}
                        <div className="col-sm-12">
                            <div className="card p-4">
                                <h5 className='mb-4'>Données principales de l’étudiant</h5>

                                {/* <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>ID Emploi du temps</h6>
                                            <input type="number" />
                                        </div>
                                    </div>
                                </div> */}

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>ID Salle</h6>
                                            <Select
                                                value={categoryVal1}
                                                onChange={handleChangeCategory1  }
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em>Aucun</em>
                                                </MenuItem>
                                                <MenuItem value={10}>S001</MenuItem>
                                                <MenuItem value={20}>S002</MenuItem>
                                                <MenuItem value={30}>S003</MenuItem>
                                                <MenuItem value={40}>S004</MenuItem>
                                                <MenuItem value={50}>S005</MenuItem>
                                                <MenuItem value={60}>S006</MenuItem>
                                                <MenuItem value={70}>S006</MenuItem>
                                            </Select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>ID Niveau</h6>
                                            <Select
                                                value={categoryVal2}
                                                onChange={handleChangeCategory2  }
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em>Aucun</em>
                                                </MenuItem>
                                                <MenuItem value={10}>N001</MenuItem>
                                                <MenuItem value={20}>N002</MenuItem>
                                                <MenuItem value={30}>N003</MenuItem>
                                                <MenuItem value={40}>N004</MenuItem>
                                                <MenuItem value={50}>N005</MenuItem>
                                                <MenuItem value={60}>N006</MenuItem>
                                                <MenuItem value={70}>N006</MenuItem>
                                            </Select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>ID Parcour</h6>
                                            <Select
                                                value={categoryVal3}
                                                onChange={handleChangeCategory3  }
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em>Aucun</em>
                                                </MenuItem>
                                                <MenuItem value={10}>P001 - IG</MenuItem>
                                                <MenuItem value={20}>P002 - GB</MenuItem>
                                                <MenuItem value={30}>P003 - ASP</MenuItem>
                                                <MenuItem value={40}>P004 - PRO</MenuItem>
                                                <MenuItem value={50}>P005 - IA</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>ID Créneau</h6>
                                            <Select
                                                value={brandVal1}
                                                onChange={handleChangeBrand1  }
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em>Aucun</em>
                                                </MenuItem>
                                                <MenuItem value={10}>C001</MenuItem>
                                                <MenuItem value={20}>C002</MenuItem>
                                                <MenuItem value={30}>C003</MenuItem>
                                                <MenuItem value={40}>C004</MenuItem>
                                                <MenuItem value={50}>C005</MenuItem>
                                                <MenuItem value={60}>C006</MenuItem>
                                                <MenuItem value={70}>C006</MenuItem>
                                            </Select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>ID Matière</h6>
                                            <Select
                                                value={brandVal2}
                                                onChange={handleChangeBrand2  }
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em>Aucun</em>
                                                </MenuItem>
                                                <MenuItem value={10}>M001</MenuItem>
                                                <MenuItem value={20}>M002</MenuItem>
                                                <MenuItem value={30}>M003</MenuItem>
                                                <MenuItem value={40}>M004</MenuItem>
                                                <MenuItem value={50}>M005</MenuItem>
                                                <MenuItem value={60}>M006</MenuItem>
                                                <MenuItem value={70}>M006</MenuItem>
                                            </Select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>CIN de l’enseignant</h6>
                                            <Select
                                                value={brandVal3}
                                                onChange={handleChangeBrand3  }
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em>Aucun</em>
                                                </MenuItem>
                                                <MenuItem value={10}>EN01</MenuItem>
                                                <MenuItem value={20}>EN02</MenuItem>
                                                <MenuItem value={30}>EN03</MenuItem>
                                                <MenuItem value={40}>EN04</MenuItem>
                                                <MenuItem value={50}>EN05</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>


                    {/* Button */}
                    <div className="row">
                        <div className="col-sm-15">
                            <div className="card p-4 mt-0">
                                <div className="grp-btns-save-annul">
                                    <div className="imagesUploadSec">
                                        <Button type='submit' className='btn-blue btn-lg btn-big w-100'><FaPlus /> &nbsp; ENREGISTRER</Button>
                                    </div>
                                    <div className="imagesUploadSec">
                                        <a href="/edtFrm"><Button type='submit' className='btn-dang btn-lg btn-big w-100'><FaTimes /> &nbsp; ANNULER</Button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>



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

export default EdtFrm