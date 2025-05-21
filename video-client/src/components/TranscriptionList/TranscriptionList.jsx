import React, { useEffect, useRef } from 'react';
import './TranscriptionList.scss';

const TranscriptionList = ({ transcripts }) => {
    const listRef = useRef(null);

    // Scroll to bottom when new transcripts are added
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [transcripts]);

    return (
        <div className="transcription-list" ref={listRef}>
            <h3>Transcriptions</h3>
            {transcripts.length === 0 ? (
                <p>No transcriptions yet.</p>
            ) : (
                <ul role="list">
                    {transcripts.map((transcript, index) => (
                        <li key={index} className="transcription-item" role="listitem">
                            <div className="transcription-header">
                                <span className="transcription-user">{transcript.userId}</span>
                                <span className="transcription-time">
                                    {transcript.startTime} - {transcript.endTime}
                                </span>
                            </div>
                            <p className="transcription-text">{transcript.text}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TranscriptionList;
