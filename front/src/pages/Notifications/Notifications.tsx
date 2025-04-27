import "./Notifications.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { HiMiniUserGroup } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";

import chatDiscussion from '../../assets/images/Notification.png'

import { GoMoveToTop } from "react-icons/go";

const Notifications = () => {
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

    const handleIconClick = () => {
        toast.warn('Cette fonctionnalité n\'est pas disponible pour le moment', {
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
                    <h5 className="mb-0">Notifications</h5>
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
                        label="Notifications"
                        icon={<ExpandMoreIcon fontSize="small" />}
                        />
                    </Breadcrumbs>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <div className="d-flex chat-btn-haut">
                        <p>Vous n'avez aucune notification</p>
                        <p className="deux-icin" onClick={handleIconClick}>
                            <HiMiniUserGroup className="icon-btn1"/>
                            <CgProfile className="icon-btn2"/>
                        </p>
                    </div>
                    <div className="chat">
                    <div className="chat-container">
                        <div className="style-place-chat">
                            <div>
                                <img src={chatDiscussion} alt="" />
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

export default Notifications;