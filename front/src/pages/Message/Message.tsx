import { useState } from "react";
import "./Message.css";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import LeftSidebar from "./MessageComponents/LeftSidebar/LeftSidebar";
import ChartBox from "./MessageComponents/ChartBox/ChartBox";
import RightSidebar from "./MessageComponents/RightSidebar/RightSidebar";

import { HiMiniUserGroup } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { IoMdChatbubbles } from "react-icons/io";

import chatDiscussion from '../../assets/images/chatDiscussion.png'

const Message = () => {
    const [activeComponent, setActiveComponent] = useState("chatbox");

    const [leftSidebarKey, setLeftSidebarKey] = useState(0);

    const resetLeftSidebar = () => {
    setLeftSidebarKey(prevKey => prevKey + 1); // Change la clé pour forcer le re-render
    setActiveComponent("leftsidebar");
    };

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

    return (
        <div>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Message</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumb_">
                        <StyledBreadcrumb
                        className="StyledBreadcrumb"
                        component="a"
                        href="#"
                        label="Dash..."
                        icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                        className="StyledBreadcrumb"
                        label="Message Lis"
                        icon={<ExpandMoreIcon fontSize="small" />}
                        />
                    </Breadcrumbs>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <div className="d-flex chat-btn-haut">
                        <p>Discussion</p>
                        <p className="deux-icin">
                            <HiMiniUserGroup className="icon-btn" onClick={resetLeftSidebar} />
                            <CgProfile className="icon-btn" onClick={() => setActiveComponent("rightsidebar")} />
                        </p>
                    </div>
                    <div className="chat">
                    <div className="chat-container">
                        {activeComponent === "chatbox" && (
                            <div className="style-place-chat">
                                <div>
                                    <img src={chatDiscussion} alt="" />
                                </div>
                            </div>
                        )}
                        {activeComponent === "leftsidebar" && <LeftSidebar key={leftSidebarKey} />}
                        {activeComponent === "rightsidebar" && <RightSidebar />}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
