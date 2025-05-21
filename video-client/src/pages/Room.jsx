import React, { useEffect, useState, useRef } from "react";
import useMediaStream from "../hooks/useMediaStream.js";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import FloatingBottomBar from "../components/FloatingBottomBar/FloatingBottomBar.jsx";
import SideModal from "../components/SideModal/SideModal.jsx";
import { Users } from "lucide-react";
import "../App.scss";
import RemoteVideo from "../components/RemoteVideo.jsx";
import ParticipantList from "../components/ParticipantsSection/ParticipantsSection.jsx";



const Room = () => {
    const [socket, setSocket] = useState(null);
    const stream = useMediaStream();
    const { roomId, userId } = useParams();
    const videoRef = useRef(null);

    const peerConnections = useRef({});
    const [remoteVideoStreams, setRemoteVideoStreams] = useState(new Map());
    const [participants, setParticipants] = useState([]); // New state for participant list

    const [audioTrack, setAudioTrack] = useState(null);
    const [videoTrack, setVideoTrack] = useState(null);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const navigate = useNavigate();

    const [meetingStartTime] = useState(Date.now());
    const [remotePeerStates, setRemotePeerStates] = useState(new Map());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCaptionsOn, setIsCaptionsOn] = useState(false);
    const [modalContent, setModalContent] = useState('Transcribe');

    useEffect(() => {
        const websocket = new WebSocket("wss://192.168.29.136:8080");

        websocket.onopen = () => console.log("WebSocket connected");
        websocket.onclose = () => console.log("WebSocket closed");
        websocket.onerror = (error) => console.error("WebSocket Error:", error);

        setSocket(websocket);
        return () => websocket.close();
    }, []);

    useEffect(() => {
        if (!socket || !stream) return;

        JoinMessage();

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }

        const video = stream.getVideoTracks()[0];
        const audio = stream.getAudioTracks()[0];
        setVideoTrack(video);
        setAudioTrack(audio);

        socket.onmessage = handleSocketMessage;
        return () => {
            socket.onmessage = null;
        };
    }, [socket, stream]);

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    };

    const JoinMessage = () => {
        sendMessage({
            type: "join-user",
            senderId: userId,
            roomId: roomId,
        });
    };

    const EndCallMessage = () => {
        sendMessage({
            type: "leave-user",
            senderId: userId,
            roomId: roomId,
        });
    };

    const handleSocketMessage = (message) => {
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message.data);
        } catch (error) {
            console.error("Invalid WebSocket message:", error);
            return;
        }
        switch (parsedMessage.type) {
            case "new-user":
                handleJoinMessage(parsedMessage);
                break;
            case "offer":
                handleOffer(parsedMessage);
                break;
            case "answer":
                handleAnswer(parsedMessage);
                break;
            case "ice-candidate":
                handleIceCandidate(parsedMessage);
                break;
            case "user-left":
                handleLeaveUser(parsedMessage);
                break;
            case "audio-state":
                setRemotePeerStates((prevStates) => {
                    const newStates = new Map(prevStates);
                    newStates.set(parsedMessage.senderId, {
                        ...newStates.get(parsedMessage.senderId),
                        isAudioMuted: parsedMessage.isAudioMuted,
                    });
                    return newStates;
                });
                break;
            case "video-state":
                setRemotePeerStates((prevStates) => {
                    const newStates = new Map(prevStates);
                    newStates.set(parsedMessage.senderId, {
                        ...newStates.get(parsedMessage.senderId),
                        isVideoOff: parsedMessage.isVideoOff,
                    });
                    return newStates;
                });
                break;
            case "participant-list":
                setParticipants(parsedMessage.participants);
                break;
            default:
                console.log("Unknown message type:", parsedMessage.type);
        }
    };

    const handleJoinMessage = (message) => {
        if (!peerConnections.current[message.senderId]) {
            createPeerConnection(message.senderId);
            setRemotePeerStates((prevStates) => {
                const newStates = new Map(prevStates);
                newStates.set(message.senderId, {
                    isAudioMuted: false,
                    isVideoOff: false,
                });
                return newStates;
            });
        }
    };

    const handleLeaveUser = (message) => {
        const senderId = message.senderId;
        if (peerConnections.current[senderId]) {
            peerConnections.current[senderId].close();
            delete peerConnections.current[senderId];
            navigate('/')
        }


        setRemoteVideoStreams((prevStreams) => {
            const newStreams = new Map(prevStreams);
            newStreams.delete(senderId);
            return newStreams;
        });

        setRemotePeerStates((prevStates) => {
            const newStates = new Map(prevStates);
            newStates.delete(senderId);
            return newStates;
        });
    };

    const handleTrack = (event, senderId) => {
        const remoteStream = event.streams[0];
        setRemoteVideoStreams((prevStreams) => {
            const newStreams = new Map(prevStreams);
            newStreams.set(senderId, remoteStream);
            return newStreams;
        });
    };

    const createPeerConnection = async (peerUserId) => {
        if (stream) {
            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            });

            stream.getTracks().forEach((track) => pc.addTrack(track, stream));

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    sendMessage({
                        type: "ice-candidate",
                        candidate: event.candidate,
                        senderId: userId,
                        targetId: peerUserId,
                    });
                }
            };

            pc.ontrack = (event) => handleTrack(event, peerUserId);

            try {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);

                sendMessage({
                    type: "offer",
                    senderId: userId,
                    targetId: peerUserId,
                    content: offer,
                });

                peerConnections.current[peerUserId] = pc;
            } catch (error) {
                console.error("Error creating offer:", error);
            }
        }
    };

    const handleOffer = async (message) => {
        if (stream) {
            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            });

            stream.getTracks().forEach((track) => pc.addTrack(track, stream));

            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    sendMessage({
                        type: "ice-candidate",
                        candidate: event.candidate,
                        senderId: userId,
                        targetId: message.senderId,
                    });
                }
            };

            pc.ontrack = (event) => handleTrack(event, message.senderId);

            try {
                await pc.setRemoteDescription(new RTCSessionDescription(message.content));

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                sendMessage({
                    type: "answer",
                    senderId: userId,
                    targetId: message.senderId,
                    content: answer,
                });

                peerConnections.current[message.senderId] = pc;
            } catch (error) {
                console.error("Error handling offer:", error);
            }
        }
    };

    const handleAnswer = async (message) => {
        const pc = peerConnections.current[message.senderId];
        if (pc) {
            try {
                await pc.setRemoteDescription(new RTCSessionDescription(message.content));
            } catch (error) {
                console.error("Error handling answer:", error);
            }
        }
    };

    const handleIceCandidate = (message) => {
        const pc = peerConnections.current[message.senderId];
        if (pc && message.candidate) {
            pc.addIceCandidate(new RTCIceCandidate(message.candidate)).catch((error) =>
                console.error("Error adding ICE candidate:", error)
            );
        }
    };

    const replaceTrackInPeers = (newTrack, kind) => {
        Object.values(peerConnections.current).forEach((pc) => {
            const sender = pc.getSenders().find((s) => s.track?.kind === kind);
            if (sender) {
                sender.replaceTrack(newTrack);
            }
        });
    };

    const toggleAudio = async () => {
        try {
            if (audioTrack) {
                stream.removeTrack(audioTrack);
                audioTrack.stop();
                setAudioTrack(null);
                setIsAudioMuted(true);
                sendMessage({
                    type: "audio-state",
                    senderId: userId,
                    roomId: roomId,
                    isAudioMuted: true,
                });
            } else {
                const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const newAudioTrack = newStream.getAudioTracks()[0];
                stream.addTrack(newAudioTrack);
                setAudioTrack(newAudioTrack);
                replaceTrackInPeers(newAudioTrack, "audio");
                setIsAudioMuted(false);
                sendMessage({
                    type: "audio-state",
                    senderId: userId,
                    roomId: roomId,
                    isAudioMuted: false,
                });
            }
        } catch (error) {
            console.error("Error toggling audio:", error);
        }
    };

    const toggleVideo = async () => {
        try {
            if (videoTrack) {
                stream.removeTrack(videoTrack);
                videoTrack.stop();
                setVideoTrack(null);
                setIsVideoOff(true);
                sendMessage({
                    type: "video-state",
                    senderId: userId,
                    roomId: roomId,
                    isVideoOff: true,
                });
            } else {
                const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
                const newVideoTrack = newStream.getVideoTracks()[0];
                stream.addTrack(newVideoTrack);
                setVideoTrack(newVideoTrack);
                replaceTrackInPeers(newVideoTrack, "video");
                setIsVideoOff(false);
                sendMessage({
                    type: "video-state",
                    senderId: userId,
                    roomId: roomId,
                    isVideoOff: false,
                });
            }
        } catch (error) {
            console.error("Error toggling video:", error);
        }
    };

    const onToggleTranscription = () => {
        console.log('Transcription toggled');
        if (isModalOpen && modalContent === 'Transcribe') {
            setIsModalOpen(false);
            setIsCaptionsOn(false);
        } else {
            setModalContent('Transcribe');
            setIsModalOpen(true);
            setIsCaptionsOn(true);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsCaptionsOn(false);
    };

    const handleOpenParticipants = () => {
        if (isModalOpen && modalContent === 'Participants') {
            setIsModalOpen(false);
        } else {
            setModalContent('Participants');
            setIsModalOpen(true);
        }
    };

    const renderModalContent = () => {
        if (modalContent === 'Participants') {
            return <ParticipantList participants={participants} userId={userId} />;
        }
        if (modalContent === 'Transcribe') {
            return <div>Transcription Content</div>;
        }
        return null;
    };

    const handleOpenSettings = () => {};

    const totalVideos = remoteVideoStreams.size + 1; // +1 for local stream

    useEffect(() => {
        return () => {
            Object.values(peerConnections.current).forEach((pc) => pc.close());
        };
    }, []);

    return (
        <div className={`app-container ${isModalOpen ? 'modal-open' : ''}`}>
            <div className="main-container">
                <Navbar
                    meetingCode="Meeting Code"
                    meetingStartTime={meetingStartTime}
                    onOpenParticipants={handleOpenParticipants}
                    onOpenSettings={handleOpenSettings}
                    isRecording={true}
                />
                <div className="video-box-container">
                    <div className={`RemoteVideoContainer video-count-${totalVideos}`}>
                        {[...remoteVideoStreams.entries()].map(([senderId, stream]) => (
                            <RemoteVideo
                                key={senderId}
                                senderId={senderId}
                                stream={stream}
                                isAudioMuted={remotePeerStates.get(senderId)?.isAudioMuted || false}
                                isVideoOff={remotePeerStates.get(senderId)?.isVideoOff || false}
                            />
                        ))}
                        <RemoteVideo
                            key={userId}
                            senderId={userId}
                            stream={stream}
                            isAudioMuted={isAudioMuted}
                            isVideoOff={isVideoOff}
                        />
                    </div>
                </div>
                <FloatingBottomBar
                    onToggleTranscription={onToggleTranscription}
                    onVideoToggle={toggleVideo}
                    onMicToggle={toggleAudio}
                    onEndCall={EndCallMessage}
                    isCaptionsOn={isCaptionsOn}
                />
            </div>
            <div className={`side-container ${isModalOpen ? 'open' : ''}`}>
                <SideModal
                    isOpen={isModalOpen}
                    title={modalContent}
                    titleIcon={<Users />}
                    showCloseIcon={true}
                    onClose={handleModalClose}
                >
                    {renderModalContent()}
                </SideModal>
            </div>
        </div>
    );
};

export default Room;
