import React, { useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import './RemoteVideo.scss';

const RemoteVideo = ({ senderId, stream, isAudioMuted, isVideoOff }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="remote-video-container">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={senderId === window.location.pathname.split('/')[2]} // Mute local video
            />
            <div className="user-id-label">{senderId}</div>
            <div className="mic-indicator">
                {isAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </div>
            {isVideoOff && <div className="video-off-overlay" />}
        </div>
    );
};

export default RemoteVideo;
