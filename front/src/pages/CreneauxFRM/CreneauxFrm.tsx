import '../CreneauxFrm/CreneauxFrm.css'

import React from 'react'

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




const CreneauxFrm = () => {
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



    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Ajout d’un créneau</h5>
                    <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                        <a href="/">
                            <StyledBreadcrumb 
                                className='StyledBreadcrumb' 
                                component="a"
                                label="Accueil"
                                icon={<HomeIcon fontSize='small' />}
                            />
                        </a>
                        <a href="/creneauxListe">
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
                                <h5 className='mb-4'>Données principales pour le créneau</h5>

                                <div className="col">
                                    <div className="form-group">
                                        <h6>Jour</h6>
                                        <Select
                                            value={categoryVal1}
                                            onChange={handleChangeCategory1}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            className="w-100"
                                        >
                                            <MenuItem value="">
                                            <em>Aucun</em>
                                            </MenuItem>
                                            <MenuItem value="Lundi">Lundi</MenuItem>
                                            <MenuItem value="Mardi">Mardi</MenuItem>
                                            <MenuItem value="Mercredi">Mercredi</MenuItem>
                                            <MenuItem value="Jeudi">Jeudi</MenuItem>
                                            <MenuItem value="Vendredi">Vendredi</MenuItem>
                                            <MenuItem value="Samedi">Samedi</MenuItem>
                                            <MenuItem value="Dimanche">Dimanche</MenuItem>
                                        </Select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Heure Début</h6>
                                            <input type="time" />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Heure Fin</h6>
                                            <input type="time" />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Date Début</h6>
                                            <input type="date" />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Date Fin</h6>
                                            <input type="date" />
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
                                        <a href="/creneauxFrm"><Button type='submit' className='btn-dang btn-lg btn-big w-100'><FaTimes /> &nbsp; ANNULER</Button></a>
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

export default CreneauxFrm