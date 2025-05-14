import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import FloatingBottomBar from './components/FloatingBottomBar/FloatingBottomBar.jsx';
import SideModal from './components/SideModal/SideModal.jsx';
import VideoBox from './components/VideoBox/VideoBox.jsx'; // Import VideoBox
import './App.scss';
import { Users } from 'lucide-react';

function App() {
    const [meetingStartTime] = useState(Date.now());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCaptionsOn, setIsCaptionsOn] = useState(false);
    const [modalContent, setModalContent] = useState('Transcribe');
    const [videoTrack, setVideoTrack] = useState(null); // Store video track
    const [audioTrack, setAudioTrack] = useState(null); // Store audio track
    const [isMicOff, setIsMicOff] = useState(false); // Track mic state
    const [isVideoOff, setIsVideoOff] = useState(false); // Track video state
    const streamRef = useRef(null); // Reference to the MediaStream

    // Initialize getUserMedia to capture video and audio
    useEffect(() => {
        const startMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                streamRef.current = stream;
                setVideoTrack(stream.getVideoTracks()[0]);
                setAudioTrack(stream.getAudioTracks()[0]);
            } catch (err) {
                console.error('Error accessing media devices:', err);
            }
        };

        startMedia();

        // Cleanup on unmount
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const handleOpenParticipants = () => {
        if (isModalOpen && modalContent === 'Participants') {
            setIsModalOpen(false);
        } else {
            setModalContent('Participants');
            setIsModalOpen(true);
        }
    };

    const handleOpenSettings = () => {};

    const onMicToggle = () => {
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled; // Toggle mic
            setIsMicOff(!audioTrack.enabled);
            console.log('Mic toggled:', audioTrack.enabled ? 'On' : 'Off');
        }
    };

    const onVideoToggle = () => {
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled; // Toggle video
            setIsVideoOff(!videoTrack.enabled);
            console.log('Video toggled:', videoTrack.enabled ? 'On' : 'Off');
        }
    };

    const onScreenShare = () => {
        console.log('Screen share toggled');
    };

    const onEndCall = () => {
        console.log('Call ended');
        // Stop all tracks when ending the call
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
        setVideoTrack(null);
        setAudioTrack(null);
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

    // Define content for the modal based on modalContent
    const renderModalContent = () => {
        switch (modalContent) {
            case 'Participants':
                return (
                    <div>
                        <h3>Participants List</h3>
                        <ul>
                            <li>Vedant Patel</li>
                            <li>John Doe</li>
                            <li>Jane Smith</li>
                        </ul>
                    </div>
                );
            case 'Transcribe':
            default:
                return <div>Vedant Patel</div>;
        }
    };

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
                    <VideoBox
                        videoTrack={videoTrack}
                        audioTrack={audioTrack}
                        isLocal={false}
                        isMicOff={isMicOff}
                        isVideoOff={isVideoOff}
                    />
                    {/*<VideoBox*/}
                    {/*    videoTrack={videoTrack}*/}
                    {/*    audioTrack={audioTrack}*/}
                    {/*    isLocal={false}*/}
                    {/*    isMicOff={isMicOff}*/}
                    {/*    isVideoOff={isVideoOff}*/}
                    {/*/>*/}
                    <VideoBox
                        videoTrack={videoTrack}
                        audioTrack={audioTrack}
                        isLocal={false}
                        isMicOff={isMicOff}
                        isVideoOff={isVideoOff}
                    />
                </div>

                <FloatingBottomBar
                    onToggleTranscription={onToggleTranscription}
                    onVideoToggle={onVideoToggle}
                    onMicToggle={onMicToggle}
                    onScreenShare={onScreenShare}
                    onEndCall={onEndCall}
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
}

export default App;
