import React from 'react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import './ParticipantsSection.scss';

const ParticipantList = ({ participants, userId }) => {
    return (
        <div className="participant-list">
            <h3>Participants ({participants.length})</h3>
            <ul role="list">
                {participants.map((participant) => (
                    <li key={participant.id} className="participant-item" role="listitem">
                        <span className="participant-name">
                            {participant.id} {participant.id === userId && '(You)'}
                        </span>
                        <div className="participant-status">
                            <span
                                className={`status-icon ${participant.isAudioMuted ? 'muted' : ''}`}
                                aria-label={participant.isAudioMuted ? 'Microphone off' : 'Microphone on'}
                            >
                                {participant.isAudioMuted ? <MicOff size={16} /> : <Mic size={16} />}
                            </span>
                            <span
                                className={`status-icon ${participant.isVideoOff ? 'off' : ''}`}
                                aria-label={participant.isVideoOff ? 'Video off' : 'Video on'}
                            >
                                {participant.isVideoOff ? <VideoOff size={16} /> : <Video size={16} />}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParticipantList;
