import React from 'react';
import Button from "../Button/Button.jsx";
import useMeetingTimer from "../../hooks/useMeetingTimer";

import { Users, Settings2, Video } from "lucide-react";

import "./Navbar.scss";

import Logo from "../../assets/OptimozLogoSmall.png";


const Navbar = ({
    meetingCode = 'Meeting Code',
    meetingStartTime,
    onOpenParticipants,
    onOpenSettings,
    isRecording,
                }) => {
    const meetingDuration = useMeetingTimer(meetingStartTime);

    return (
        <div className="navbar-container">
            <div className="navbar-left-content">
                <div className="meeting-icon">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="meeting-details">
                    <div className="meeting-code-container">
                        <p className="meeting-code">{meetingCode}</p>
                    </div>
                    <div className="meeting-duration-container">
                        <p className="meeting-duration">{meetingDuration}</p>
                        {isRecording &&
                            <div className="meeting-recording-status">
                                <span className="recording-status-dot"></span>
                                <span className="recording-status-text">Recording....</span>
                            </div>
                        }
                    </div>

                </div>
            </div>

            <div className="navbar-right-content">
                <Button text="Participants"
                        variant="primary"
                        icon={<Users />}
                        isIconOnly={true}
                        size="md"
                        onClick={onOpenParticipants}
                />

                <Button variant="primary"
                        icon={<Settings2 />}
                        size="md"
                        onClick={onOpenSettings}
                        isIconOnly={true}
                />
            </div>
        </div>

    );
};

export default Navbar;

