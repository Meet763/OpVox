import React, { useState } from "react";
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    PhoneOff,
    Captions,
    CaptionsOff,
    ScreenShare,
} from "lucide-react";
import "./FloatingBottomBar.scss";
import Button from "../Button/Button.jsx";

const FloatingBottomBar = (
    {
        onToggleTranscription,
        onVideoToggle,
        onMicToggle,
        onScreenShare,
        onEndCall,
        isCaptionsOn,
    }

) => {
    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);

    const handleClick = (action) => {
        switch (action) {
            case 'toggleVideo':
                setIsVideoOn((prev) => !prev);
                if (onVideoToggle) onVideoToggle();
                break;
            case 'toggleMic':
                setIsMicOn((prev) => !prev);
                if (onMicToggle) onMicToggle();
                break;
            case 'endCall':
                if (onEndCall) onEndCall();
                break;
            case 'screenShare':
                if (onScreenShare) onScreenShare();
                break;
            case 'toggleCaptions':
                if (onToggleTranscription) onToggleTranscription();
                break;
            default:
                break;
        }
    };

    return (
        <div className="buttons-container">
            <Button
                variant={`${isVideoOn ? 'primary' : 'danger'}`}
                icon={isVideoOn
                    ? <Video size={26} />
                    : <VideoOff size={26} />}
                size="lg"
                isIconOnly={true}
                className={`control-button ${isVideoOn ? 'active-bg' : 'inactive-bg'}`}
                onClick={() => handleClick('toggleVideo')}
            />

            <Button
                variant={`${isMicOn ? 'primary' : 'danger'}`}
                icon={isMicOn
                    ? <Mic size={26} />
                    : <MicOff size={26} />}
                size="lg"
                isIconOnly={true}
                className="control-button"
                onClick={() => handleClick('toggleMic')}
            />
            <Button
                variant="danger"
                icon={<PhoneOff size={26} />}
                size="lg"
                isIconOnly={true}
                className="control-button"
                onClick={() => handleClick('endCall')}
            />
            <Button
                variant="primary"
                icon={<ScreenShare size={26} />}
                size="lg"
                isIconOnly={true}
                className="control-button"
                onClick={() => handleClick('screenShare')}
            />
            <Button
                variant="primary"
                icon={<Captions size={26} />}
                size="lg"
                isIconOnly={true}
                className="control-button"
                onClick={() => handleClick('toggleCaptions')}
            />
        </div>
    );
};

export default FloatingBottomBar;
