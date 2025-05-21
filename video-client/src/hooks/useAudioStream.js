import { useState } from "react";

const useAudioStream = (socket, meetingCode, userCode) => {
    const [isRecording, setIsRecording] = useState(false);
    let mediaRecorder = null;

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 16000, // Match backend's 16000Hz
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });
            mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(event.data);
                    console.log("Sent audio chunk:", event.data);
                }
            };

            mediaRecorder.start(1000); // Send chunks every 1 second
            setIsRecording(true);

            socket.send(JSON.stringify({
                type: "startTranscription",
                meetingCode,
                userCode,
            }));

            console.log("Started recording & sending audio chunks");
        } catch (error) {
            console.error("Error accessing microphone:", error);
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);

            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                    type: "stopTranscription",
                    meetingCode,
                    userCode,
                }));
            }

            console.log("Stopped recording & transcription");
        }
        mediaRecorder = null;
    };

    return { isRecording, startRecording, stopRecording };
};

export default useAudioStream;
