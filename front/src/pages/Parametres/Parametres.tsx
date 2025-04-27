import { useEffect } from 'react';
import "./Parametres.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import chatDiscussion from '../../assets/images/Setting.png'
import { GoMoveToTop } from "react-icons/go";

const Parametres = () => {
    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
        return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
        };
    });

    const showWelcomeNotification = () => {
        toast.info('Les paramètres ne sont pas disponibles pour le moment', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    useEffect(() => {
        // Affiche la notification au chargement du composant
        showWelcomeNotification();
        
        // Optionnel: Ajouter un écouteur pour le rafraîchissement de la page
        const handleBeforeUnload = () => {
            // On peut stocker un flag pour savoir que c'est un rafraîchissement
            sessionStorage.setItem('isRefreshing', 'true');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div>
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
            
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Paramètres</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumb_">
                        <a href="/">
                            <StyledBreadcrumb
                            className="StyledBreadcrumb"
                            component="a"
                            label="Accueil"
                            icon={<HomeIcon fontSize="small" />}
                            />
                        </a>
                        <StyledBreadcrumb
                        className="StyledBreadcrumb"
                        label="Paramètres"
                        icon={<ExpandMoreIcon fontSize="small" />}
                        />
                    </Breadcrumbs>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <div className="d-flex chat-btn-haut">
                    </div>
                    <div className="chat">
                    <div className="chat-container">
                        <div className="style-place-chat">
                            <div>
                                <img src={chatDiscussion} alt="Paramètres" />
                            </div>
                        </div>
                    </div>
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
        </div>
    );
};

export default Parametres;