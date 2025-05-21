// import React, {useEffect, useRef, useState} from 'react';
// import {useParams} from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar.jsx";
// import VideoBox from "../components/VideoBox/VideoBox.jsx";
// import FloatingBottomBar from "../components/FloatingBottomBar/FloatingBottomBar.jsx";
// import SideModal from "../components/SideModal/SideModal.jsx";
// import {Users} from "lucide-react";
// import {MESSAGE_TYPES} from "../constants.js";
//
// import useMediaStream from "../hooks/useMediaStream.js";
//
//
// const VideoCallPage = () => {
//     //UI Variable
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [meetingStartTime] = useState(Date.now());
//     const [isRecording, setIsRecording] = useState(false);
//     //UI: Video and Audio Status
//     const [isVideoOff, setIsVideoOff] = useState(false);
//     const [isMicOff, setIsMicOff] = useState(false);
//
//
//     //Functional Variable
//     const {meetingCode, userId} = useParams();
//
//     //Stream
//     const localStream = useMediaStream();
//
//     //PeerUserData
//     const peerConnection = useRef(null);
//
//     //Stream Management Variable
//     const [stream, setStream] = useState({});
//
//     //Socket Variable
//     const [socket, setSocket] = useState(null);
//     const [isSocketConnected, setIsSocketConnected] = useState(false); //Socket Connection Status
//
//     //Message Sending Function: Convert a JavaScript object into a string
//     const sendMessage = (message) => {
//         if (socket && socket.readyState === WebSocket.OPEN) {
//             socket.send(JSON.stringify(message));
//         }
//     }
//
//     //Socket Connections and Send Join Message
//     useEffect(() => {
//         const tempSocket = new WebSocket("ws://localhost:3001");
//         setSocket(tempSocket);
//         setIsSocketConnected(true);
//
//         tempSocket.onopen = () => {
//             console.log("Socket Connected");
//             sendMessage({
//                 type: MESSAGE_TYPES.JOIN_USER,
//                 meetingCode: meetingCode,
//                 userId: userId,
//             })
//         }
//
//         tempSocket.onclose = () => {
//             console.log("Socket Disconnected");
//         }
//         tempSocket.onerror = (error) => {
//             console.error("Socket Error:", error);
//         }
//     },[meetingCode, userId])
//
//     useEffect(() => {
//         if(isSocketConnected && localStream.current) {
//             setStream(prev => ({
//                 ...prev,
//                 [userId]: {
//                     videoTrack: localStream.current.getVideoTracks()[0],
//                     audioTrack: localStream.current.getAudioTracks()[0],
//                     isVideoOff: false,
//                     isMicOff: false,
//                 }
//             }))
//         }
//     },[isSocketConnected, localStream, userId])
//
//
//
//     //Create PeerConnection and Send Offer
//     const createPeerConnection = async (peerUserId) => {
//         if (stream) {
//             const pc = new RTCPeerConnection({
//                 iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//             });
//
//             localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
//
//             pc.onicecandidate = (event) => {
//                 if (event.candidate) {
//                     sendMessage({
//                         type: "ice-candidate",
//                         candidate: event.candidate,
//                         senderId: userId,
//                         targetId: peerUserId,
//                     });
//                 }
//             };
//
//             pc.ontrack = (event) => handleTrack(event, peerUserId);
//
//             try {
//                 const offer = await pc.createOffer();
//                 await pc.setLocalDescription(offer);
//
//                 sendMessage({
//                     type: "offer",
//                     senderId: userId,
//                     targetId: peerUserId,
//                     content: offer,
//                 });
//                 peerConnection.current[peerUserId] = pc;
//             } catch (error) {
//                 console.error("Error Creating offer:", error);
//             }
//         }
//     };
//
//     //Handle Offer
//     const handleOffer = async (message) => {
//         if (stream) {
//             const pc = new RTCPeerConnection({
//                 iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//             });
//
//             stream.getTracks().forEach((track) => pc.addTrack(track, stream));
//
//             pc.onicecandidate = (event) => {
//                 if (event.candidate) {
//                     sendMessage({
//                         type: "ice-candidate",
//                         candidate: event.candidate,
//                         senderId: userId,
//                         targetId: message.senderId,
//                     });
//                 }
//             };
//
//             pc.ontrack = (event) => handleTrack(event, message.senderId);
//
//             try {
//                 await pc.setRemoteDescription(new RTCSessionDescription(message.content));
//
//                 const answer = await pc.createAnswer();
//                 await pc.setLocalDescription(answer);
//
//                 sendMessage({
//                     type: "answer",
//                     senderId: userId,
//                     targetId: message.senderId,
//                     content: answer,
//                 });
//
//                 peerConnection.current[message.senderId] = pc;
//             } catch (error) {
//                 console.error("Error Handling offer:", error);
//             }
//         }
//     };
//
//     //Handle Answer
//     const handleAnswer = async (message) => {
//         const pc = peerConnection.current[message.senderId];
//         if (pc) {
//             try {
//                 await pc.setRemoteDescription(new RTCSessionDescription(message.content));
//             } catch (error) {
//                 console.error("Error Handling answer:", error);
//             }
//         }
//     };
//
//     //Handle Ice Candidate
//     const handleIceCandidate = (message) => {
//         const pc = peerConnection.current[message.senderId];
//         if (pc && message.candidate) {
//             pc.addIceCandidate(new RTCIceCandidate(message.candidate)).catch((error) =>
//                 console.error("Error adding ICE candidate:", error)
//             );
//             console.log(pc);
//             console.log(peerConnection);
//         }
//     };
//
//     const handleNewUserJoinMessage = (message) => {
//         console.log("Join Message Received:", message);
//         if(!peerConnection.current[message.userId]) {
//             const peerUserId = message.userId;
//             createPeerConnection(peerUserId);
//         }
//     }
//
//     function socketMessageHandler(parsedMessage) {
//         switch (parsedMessage.type) {
//             case MESSAGE_TYPES.NEW_USER_JOINED:
//                 handleNewUserJoinMessage(parsedMessage);
//                 break;
//             case "offer":
//                 handleOffer(parsedMessage);
//                 break;
//             case "answer":
//                 handleAnswer(parsedMessage);
//                 break;
//             case "ice-candidate":
//                 handleIceCandidate(parsedMessage);
//                 break;
//             case "user-left":
//                 handleLeaveUser(parsedMessage);
//                 break;
//             default:
//                 console.log("Unknown message type:", parsedMessage.type);
//         }
//     }
//
//     useEffect(() => {
//         socket.onmessage = (message) => {
//             const parsedMessage = JSON.parse(message.data);
//             socketMessageHandler(parsedMessage);
//         }
//     })
//
//
//
//
//     return(
//         <div className={`app-container ${isModalOpen ? 'modal-open' : ''}`}>
//             <div className="main-container">
//                 <Navbar
//                     meetingCode="Meeting Code"
//                     meetingStartTime={meetingStartTime}
//                     onOpenParticipants={handleOpenParticipants}
//                     onOpenSettings={handleOpenSettings}
//                     isRecording={isRecording}
//                 />
//                 <div className="video-box-container">
//                     <VideoBox
//                         videoTrack={videoTrack}
//                         audioTrack={audioTrack}
//                         isLocal={false}
//                         isMicOff={isMicOff}
//                         isVideoOff={isVideoOff}
//                     />
//
//
//                 </div>
//
//                 <FloatingBottomBar
//                     onToggleTranscription={onToggleTranscription}
//                     onVideoToggle={onVideoToggle}
//                     onMicToggle={onMicToggle}
//                     onScreenShare={onScreenShare}
//                     onEndCall={onEndCall}
//                     isCaptionsOn={isCaptionsOn}
//                 />
//             </div>
//             <div className={`side-container ${isModalOpen ? 'open' : ''}`}>
//                 <SideModal
//                     isOpen={isModalOpen}
//                     title={modalContent}
//                     titleIcon={<Users />}
//                     showCloseIcon={true}
//                     onClose={handleModalClose}
//                 >
//                     {renderModalContent()}
//                 </SideModal>
//             </div>
//         </div>
//     )
// }
//
// export default VideoCallPage;
