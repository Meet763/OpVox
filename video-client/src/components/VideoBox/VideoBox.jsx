import React, { useEffect, useRef } from 'react';
import "./VideoBox.scss";

const VideoBox = ({
                      videoTrack = null,
                      audioTrack = null,
                      isLocal = true,
                      isMicOff = false,
                      isVideoOff = false,
                  }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const mediaStream = new MediaStream();

        if (videoTrack && !isVideoOff) {
            mediaStream.addTrack(videoTrack);
        }

        if (audioTrack && !isMicOff) {
            mediaStream.addTrack(audioTrack);
        }

        if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
        }

        return () => {
            mediaStream.getTracks().forEach((track) => track.stop());
        };
    }, [videoTrack, audioTrack, isMicOff, isVideoOff]);

    return (
        <div className="video-box-container">
            <video
                ref={videoRef}
                autoPlay
                muted={isLocal}
                playsInline
                style={{
                    // width: '100%',
                    // height: '100%',
                    // objectFit: 'cover', // or 'contain' if you want full view without crop
                    // backgroundColor: 'black',
                }}
            />
        </div>
    );
};

export default VideoBox;
