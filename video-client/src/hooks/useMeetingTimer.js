import { useEffect, useState } from "react";

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const useMeetingTimer = (startTime) => {
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - startTime) / 1000);
            setDuration(elapsedSeconds);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return formatDuration(duration);
};

export default useMeetingTimer;
