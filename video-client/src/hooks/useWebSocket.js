import { useState, useEffect, useCallback } from "react";

const useWebSocket = (url, onMessageCallback) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket(url);

        websocket.onopen = () => console.log("WebSocket connected");
        websocket.onclose = () => console.log("WebSocket closed");
        websocket.onerror = (error) => console.error("WebSocket Error:", error);

        setSocket(websocket);

        return () => websocket.close();
    }, [url]);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (message) => {
                const parsedMessage = JSON.parse(message.data);
                onMessageCallback(parsedMessage);
            };
        }
        return () => {
            if (socket) socket.onmessage = null;
        };
    }, [socket, onMessageCallback]);

    const sendMessage = useCallback(
        (message) => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(message));
            }
        },
        [socket]
    );

    return { socket, sendMessage };
};

export default useWebSocket;
