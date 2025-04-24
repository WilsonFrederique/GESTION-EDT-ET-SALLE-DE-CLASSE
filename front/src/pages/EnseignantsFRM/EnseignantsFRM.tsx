import './EnseignantsFRM.css'

import React, { useState } from 'react'

import "react-lazy-load-image-component/src/effects/blur.css";


import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';


import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoMoveToTop } from "react-icons/go";
import { FaUpload } from 'react-icons/fa';




const EnseignantsFRM = () => {
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

    const [categoryVal, setcategoryVal] = React.useState('');
    const [brandVal, setbrandVal] = React.useState('');

    const handleChangeCategory = (event: SelectChangeEvent) => {
        setcategoryVal(event.target.value);
    };
    const handleChangeBrand = (event: SelectChangeEvent) => {
        setbrandVal(event.target.value);
    };


    const [rotingsValue, setRotingsValue] = useState(1);





    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (file) => {
        if (file) {
            setSelectedFile(file);
            // Ici vous pouvez aussi prévisualiser l'image si c'est une photo
        }
    };



    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Ajout d’un enseignant</h5>
                    <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
                        <StyledBreadcrumb 
                            className='StyledBreadcrumb' 
                            component="a"
                            href="#"
                            label="Accueil"
                            icon={<HomeIcon fontSize='small' />}
                        />
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
                                <h5 className='mb-4'>Données principales de l’enseignant</h5>



                                <div className="form-group">
                                    <h6>CIN</h6>
                                    <input type="text" />
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Nom</h6>
                                            <input type="text" />
                                        </div>
                                    </div>


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Prénom</h6>
                                            <input type="text" />
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Sexe</h6>
                                            <Select
                                                value={categoryVal}
                                                onChange={handleChangeCategory  }
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                            >
                                                <MenuItem value="">
                                                    <em>Aucun</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Masculin</MenuItem>
                                                <MenuItem value={20}>Féminin</MenuItem>
                                            </Select>
                                        </div>
                                    </div>  


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Grade</h6>
                                            <input type="text" />
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Téléphone</h6>
                                            <input type="text" />
                                        </div>
                                    </div>


                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Email</h6>
                                            <input type="email" />
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <h6>Description</h6>
                                    <textarea rows={5} cols={10}></textarea>
                                </div>





                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Photo</h6>
                                            <label 
                                                className={`file-upload-container ${isDragOver ? 'drag-over' : ''}`}
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    setIsDragOver(true);
                                                }}
                                                onDragLeave={() => setIsDragOver(false)}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    setIsDragOver(false);
                                                    if (e.dataTransfer.files.length) {
                                                        handleFileChange(e.dataTransfer.files[0]);
                                                    }
                                                }}
                                            >
                                                <input 
                                                    type="file" 
                                                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                                                    className="file-input"
                                                    accept="image/*"
                                                />
                                                <div className="file-upload-label">
                                                    <span className="file-upload-icon">
                                                        <FaUpload />
                                                    </span>
                                                    <span className="file-upload-text">
                                                        <span>Glissez-déposez</span> ou cliquez pour uploader
                                                    </span>
                                                    <span className={`file-name ${selectedFile ? 'has-file' : ''}`}>
                                                        {selectedFile ? selectedFile.name : 'Aucun fichier sélectionné'}
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <h6>Évaluations</h6>
                                            <Rating
                                                name="simple-controlled"
                                                value={rotingsValue}
                                                onChange={(event, newValue) => {
                                                setRotingsValue(newValue);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <br />


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
                                        <a href="/enseignantsFRM"><Button type='submit' className='btn-dang btn-lg btn-big w-100'><FaTimes /> &nbsp; ANNULER</Button></a>
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

export default EnseignantsFRM