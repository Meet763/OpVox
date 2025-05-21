const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');


// Create an HTTPS server
const server = http.createServer();

// WebSocket server setup **without origin restrictions
const wss = new WebSocket.Server({ server });

const rooms = {};
const roomUsers = new Map();
const userSockets = new Map();

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(data);

        if (data.type === 'join-user') {
            const { roomId, senderId } = data;

            if (!rooms[roomId]) {
                rooms[roomId] = new Set();
                roomUsers.set(roomId, new Map());
            }

            roomUsers.get(roomId).set(senderId, ws);
            userSockets.set(senderId, ws);
            console.log(`User ${senderId} joined room ${roomId}`);

            const messageToSend = JSON.stringify({
                type: 'new-user',
                senderId: senderId,
                roomId: roomId
            });

            roomUsers.get(roomId).forEach((clientWs, clientId) => {
                if (clientId !== senderId && clientWs.readyState === WebSocket.OPEN) {
                    clientWs.send(messageToSend);
                }
            });
        }

        if (data.type === 'offer' || data.type === 'answer' || data.type === 'ice-candidate') {
            if (userSockets.has(data.targetId)) {
                const targetWs = userSockets.get(data.targetId);
                if (targetWs.readyState === WebSocket.OPEN) {
                    targetWs.send(JSON.stringify(data));
                }
            }
        }

        ws.on("close", () => {
            console.log("WebSocket disconnected");

            // Remove user from tracking
            userSockets.forEach((socket, userId) => {
                if (socket === ws) {
                    userSockets.delete(userId);
                }
            });

            // Remove user from room
            roomUsers.forEach((users, roomId) => {
                users.forEach((socket, userId) => {
                    if (socket === ws) {
                        users.delete(userId);
                        const messageToSend = JSON.stringify({
                            type: "user-left",
                            senderId: userId,
                            roomId: roomId,
                        });

                        users.forEach((clientWs) => {
                            if (clientWs.readyState === WebSocket.OPEN) {
                                clientWs.send(messageToSend);
                            }
                        });
                    }
                });
            });
        });



    });

    ws.on('close', () => {
        let disconnectedUserId = null;
        let userRoomId = null;

        for (const roomId in rooms) {
            roomUsers.get(roomId)?.forEach((clientWs, userId) => {
                if (clientWs === ws) {
                    disconnectedUserId = userId;
                    userRoomId = roomId;
                    roomUsers.get(roomId).delete(userId);
                }
            });

            if (roomUsers.get(roomId)?.size === 0) {
                roomUsers.delete(roomId);
                delete rooms[roomId];
            }
        }

        if (disconnectedUserId && userRoomId) {
            userSockets.delete(disconnectedUserId);

            const messageToSend = JSON.stringify({
                type: 'user-left',
                senderId: disconnectedUserId,
                roomId: userRoomId
            });

            // Notify other users in the same room
            roomUsers.get(userRoomId)?.forEach((clientWs, clientId) => {
                if (clientWs.readyState === WebSocket.OPEN) {
                    clientWs.send(messageToSend);
                }
            });
        }

        console.log(`User ${disconnectedUserId} disconnected`);
    });

});


server.listen(8080, () => {
    console.log('WebSocket server running on ws://localhost:8080');
});
