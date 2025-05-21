const MESSAGE_TYPE = {
    JOIN_MEETING: 'join-meeting',
    JOIN_MEETING_RESPONSE: 'join-meeting-response',
    LEAVE_MEETING: 'leave-meeting',
    LEAVE_MEETING_RESPONSE: 'leave-meeting-response',
    START_RECORDING: 'start-recording',
    STOP_RECORDING: 'stop-recording',
    START_TRANSCRIPTION: 'start-transcription',
    STOP_TRANSCRIPTION: 'stop-transcription',
    SEND_MESSAGE: 'send-message',
}

export const MESSAGE_TYPES = {
    //User Management MESSAGE_TYPES: Sending
    JOIN_USER: "join-user",
    USER_LEAVE: "user-leave",

    //User Management MESSAGE_TYPES: Receiving
    NEW_USER_JOINED: "new-user-joined",
    USER_LEFT: "user-left",

    //Stream Management MESSAGE_TYPES


    //WebRTC MESSAGE_TYPES
    OFFER: "offer",
    ANSWER: "answer",
    ICE_CANDIDATE: "ice-candidate",

    //Speech To Text MESSAGE_TYPES
    SPEECH_TO_TEXT: "speech-to-text",
    AUDIO_DATA: "audio-data"
};
