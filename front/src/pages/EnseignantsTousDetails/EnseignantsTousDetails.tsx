import React, { useRef } from 'react'
import './EnseignantsTousDetails.css'


import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GoMoveToTop } from "react-icons/go";


import Slider from "react-slick";

import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaReply } from "react-icons/fa";

import { FaUser } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaTransgenderAlt } from "react-icons/fa";


import A1 from '../../assets/images/A1.jpg';
import A2 from '../../assets/images/A2.jfif';
import A4 from '../../assets/images/A3.png';
import A5 from '../../assets/images/A4.jpg';
import A6 from '../../assets/images/A5.jpg';
import A7 from '../../assets/images/A6.jpg';
import A8 from '../../assets/images/A7.jpg';



export const EnseignantsTousDetails = () => {
    
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor = 
            theme.palette.mode === 'light' 
            ? theme.palette.grey[100] 
            : theme.palette.grey[800];
        return {
            backgroundColor, 
            height: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            '&:hover, &:focus': {
                backgroundColor: emphasize(backgroundColor, 0.06),
            },
            '&:active': {
                boxShadow: theme.shadows[1],
                backgroundColor: emphasize(backgroundColor, 0.12),
            },
        };
    });


    const productSliderOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };


    const productSliderSmlOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false
    };


    const productSliderBig = useRef(null);
    const productSliderSml = useRef(null);

    const goToSlide = (index) => {
        if (productSliderBig.current && productSliderSml.current) {
            productSliderBig.current.slickGoTo(index);
            productSliderSml.current.slickGoTo(index);
        }
    };


    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Détails des enseignants</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumb_">
                        <StyledBreadcrumb
                        className="StyledBreadcrumb"
                        component="a"
                        href="#"
                        label="Accueil"
                        icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                        className="StyledBreadcrumb"
                        label="Enseignants"
                        icon={<ExpandMoreIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                        className="StyledBreadcrumb"
                        label="Liste en détail"
                        icon={<ExpandMoreIcon fontSize="small" />}
                        />
                    </Breadcrumbs>
                </div>


                {/* Card */}
                <div className="card productDetailsSection">

                    <div className="row">
                        <div className="col-md-5">
                            <div className="sliderWrapper pt-3 pb-3 ps-4 pe-4">
                                <h6 className='mb-4'>Galerie d’enseignants</h6>
                                <Slider {...productSliderOptions} ref={productSliderBig} className='sliderBig mb-2'>
                                    <div className="item">
                                        <img src={A1} alt="A" className='w-100' />
                                    </div>
                                    <div className="item">
                                        <img src={A6} alt="A" className='w-100' />
                                    </div>
                                    <div className="item">
                                        <img src={A4} alt="A" className='w-100' />
                                    </div>
                                    <div className="item">
                                        <img src={A5} alt="A" className='w-100' />
                                    </div>
                                    <div className="item">
                                        <img src={A2} alt="A" className='w-100' />
                                    </div>
                                    <div className="item">
                                        <img src={A7} alt="A" className='w-100' />
                                    </div>
                                    <div className="item">
                                        <img src={A8} alt="A" className='w-100' />
                                    </div>
                                </Slider>
                                <Slider {...productSliderSmlOptions} ref={productSliderSml} className='sliderSml'>
                                    <div className="item" onClick={()=>goToSlide(0)}>
                                        <img src={A1} alt="A" className='w-100 h-img-Slider' />
                                    </div>
                                    <div className="item" onClick={()=>goToSlide(1)}>
                                        <img src={A6} alt="A" className='w-100 h-img-Slider' />
                                    </div>
                                    <div className="item" onClick={()=>goToSlide(2)}>
                                        <img src={A4} alt="A" className='w-100 h-img-Slider' />
                                    </div>
                                    <div className="item" onClick={()=>goToSlide(3)}>
                                        <img src={A5} alt="A" className='w-100 h-img-Slider' />
                                    </div>
                                    <div className="item" onClick={()=>goToSlide(4)}>
                                        <img src={A2} alt="A" className='w-100 h-img-Slider' />
                                    </div>
                                    <div className="item" onClick={()=>goToSlide(5)}>
                                        <img src={A7} alt="A" className='w-100 h-img-Slider' />
                                    </div>
                                    <div className="item" onClick={()=>goToSlide(6)}>
                                        <img src={A8} alt="A" className='w-100 h-img-Slider' />
                                    </div>
                                </Slider>
                                <div className="mt-4">
                                    <a href="/enseignantsFRM">
                                        <button className="btn btn-primary me-2">
                                            <FaPlus /> Ajouter
                                        </button>
                                    </a>
                                    <button className="btn-dgr btn-lg me-2">
                                        <MdDelete /> &nbsp; Supprimer
                                    </button>
                                    <a href="/enseignants">
                                        <button className="btn-prim btn-lg me-2">
                                            <FaReply /> &nbsp; Retour
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div className='pt-3 pb-3 ps-4 pe-4'>
                                <h6 className='mb-4'>Détails de l’enseignant</h6>

                                <h4>Professeur certifié avec expertise en didactique et innovation éducative</h4>

                                <div className="productInfo mt-3">
                                    {[
                                        { icon: <FaUser />, label: 'Nom', value: 'Wilson' },
                                        { icon: <FaUser />, label: 'Prénom', value: "Frederique" },
                                        { icon: <FaTransgenderAlt />, label: 'Sexe', value: "Homme" },
                                        { icon: <FaTrophy />, label: 'Grade', value: "Grade" },
                                        { icon: <FaLocationDot />, label: 'Adresse', value: "Ampitakely" },
                                        { icon: <MdCall />, label: 'Téléphone', value: "000 00 000 00" },
                                        { icon: <MdEmail />, label: 'Email', value: "wilson@gmail.com" },
                                        { icon: <FaChalkboardTeacher />, label: 'Spécialiste', value: "Spécialiste" },
                                    ].map((item, index) => (
                                        <div className="row mb-2" key={index}>
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icon">{item.icon}</span>
                                            <span className="name">{item.label}</span>
                                        </div>
                                        <div className="col-sm-7">
                                            :{' '}
                                            {Array.isArray(item.value) ? (
                                            <ul className="list list-inline tags sml">
                                                {item.value.map((val, idx) => (
                                                <li className="list-inline-item" key={idx}>
                                                    <span>{val}</span>
                                                </li>
                                                ))}
                                            </ul>
                                            ) : (
                                            <span>{item.value}</span>
                                            )}
                                        </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="p-4">

                        <h6 className='mt-4 mb-3'>Description de l’enseignant</h6>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, 
                            repudiandae amet laborum deserunt voluptatum ab harum necessitatibus? 
                            repudiandae amet laborum deserunt voluptatum ab harum necessitatibus? 
                            repudiandae amet laborum deserunt voluptatum ab harum necessitatibus? 
                            Hic, laborum exercitationem omnis Hic, laborum exercitationem omnis iure, 
                            ipsam odit mollitia quo, repudiandae amet laborum deserunt voluptatum 
                            ab harum necessitatibus?iure, ipsam odit mollitia quo, repudiandae 
                            amet laborum deserunt voluptatum ab harum necessitatibus? Hic, laborum 
                            exercitationem omnisHic, laborum exercitationem omnis iure, ipsam odit 
                            mollitia quo, repudiandae amet laborum deserunt voluptatum ab harum 
                            necessitatibus? iure, ipsam odit mollitia quo, repudiandae amet laborum 
                            deserunt voluptatum ab harum necessitatibus? Hic, laborum exercitationem 
                            omnis iure, ipsam odit mollitia quo, distinctio fuga accusamus delectus?
                        </p>


                        <br />
                        
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
    );
}
