import { useRef } from 'react';

import { Link } from 'react-router-dom';

import './EnseignantsDetail.css';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

import { FaUser } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GoMoveToTop } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaTransgenderAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
// import { FaGetPocket } from "react-icons/fa";

import Avatar from '../../../../assets/images/Avatar2.png';
// import Jupe from '../../../../assets/images/Jupe2.jfif';
// import Jupe1 from '../../../../assets/images/Jupe3.jfif';

const EnseignantsDetail = () => {
  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];

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
    slidesToShow: 0,
    slidesToScroll: 0,
    arrows: false,
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
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Détails de l’enseignant</h5>
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
              label="Voir"
              icon={<ExpandMoreIcon fontSize="small" />}
              />
          </Breadcrumbs>
      </div>

      <div className="card productDetailsSection">
        <div className="row">
          <div className="col-md-5">
            <div className="sliderWrapper pt-3 pb-3 ps-4 pe-4">
              <h6 className="mb-4">Galerie d’enseignants</h6>
              <div className="item">
                <img className='img-avatar' src={Avatar} alt="Profile" />
              </div>
              <div className='place-btn-back-suppr-clien-view'>
                <div></div>
                <div className="mt-2 btn-back-suppr-clien-view">
                  <a href="/enseignants">
                    <button className="btn-prm btn-lg me-2">
                      <IoMdArrowRoundBack /> &nbsp; Retour
                    </button>
                  </a>
                  <button className="btn-danger btn-lg me-2">
                    <MdDelete /> &nbsp; Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="pt-3 pb-3 ps-4 pe-4">
              <h6 className="mb-4">Détails de l’enseignant</h6>
              <h4>À propos de cet enseignant</h4>

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
      </div>

      <div className="card productDetailsSection">
        <div className="row">
          {/* <div className='pt-3 pb-3 ps-4'>
            <div className='container pt-20'>
              Produit(s) commandé(s) ...
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                
                <div className="border-2 p-4 rounded-md shadow-lg cursor-pointer">
                  <div className='d-flex group-cmd'>
                    <div>
                      <h1 className="font-semibold text-xl text-primary mt-2">jupe</h1>
                      <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis, aut.</p>
                      <div className="mt-3 flex justify-between group-btn-prix-produit">
                        <h3 className="d-flex text-xl font-semibold">
                          <div>
                              <span className='new'>$21.00</span> &nbsp;
                              <del className="text-decoration-line-through old text-danger">$25.00</del>
                          </div>
                        </h3>
                      </div>
                    </div>
                    <div className='place-img-produit-cmd-de-client'>
                      <img src={Jupe} className="w-full h-40 object-cover rounded-md" />
                      <div className='plave-quantite'>
                        <p className='p-quantite'>Quantité</p> <span className='span-cantite-chiffre'>03</span>
                      </div>
                    </div>
                  </div>
                  <div className='group-cmd-btn mt-3 flex justify-between gap-1.5'>
                      <div className='d-flex'>
                        <MdDelete className='icon-produit' /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div>
                          Payment &nbsp;&nbsp;<span className='spna-oui-non'>Oui</span>
                        </div>
                      </div>
                      <div className='btn-right-cmd'>
                        <FaGetPocket className='icon-produit-right rotate' />
                        <FaGetPocket className='icon-produit-right' />
                      </div>
                  </div>
                </div>

              </div>
            </div>
          </div> */}
        </div>
      </div>

      <footer className="footer">
          <div className="footer-text">
              <p>&copy; 2025 par Planning Scolaire | Tous Droits Réservés.</p>
          </div>

          <div className="footer-iconTop">
          <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <GoMoveToTop />
          </a>
          </div>
      </footer>
    </div>
  );
};

export default EnseignantsDetail;
