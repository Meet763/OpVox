import { useState, useEffect, useRef } from 'react';

const useMediaStream = () => {
    const [stream, setStream] = useState(null);
    const isStreamSet = useRef(false);

    useEffect(() => {
        if (isStreamSet.current) return;
        isStreamSet.current = true;

        (async function initStream() {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                console.log("Setting your stream...");


                setStream(mediaStream);
            } catch (error) {
                console.error("Error in media navigator:", error);
            }
        })();
    }, []);

    return stream;
};

export default useMediaStream;
