import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    particiapnt_name: { type: String, required: true},
    participant_role: { 
        type: String,
        enum: ['host', 'participant'],
        default: 'participant',
        required: true
    },
    particiapnt_email_id: { type: String, required: true},
    participant_mobile_number: { type: Number, required: true},
    participant_secret_key: { type: String, required: true},
    joined_at: {type: Date},
    leave_at: {type: Date}
})

const meetingSchema = new mongoose.Schema({
    meeting_code:{
        type: String,
        require: true,
        unique: true
    },
    meeting_link:{
        type: String,
        required: true,
    },
    application_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    meeting_start_time: { type: Date, required: true },
    meeting_end_time: { type: Date, required: false },
    participants: [participantSchema],
    meeting_type: {
        type: String,
        enum: ['Mesh', 'SFU'],
        default: 'Mesh',
        required: true
    },
    meeting_permission: {
        record_meeting: { type: Boolean, default: false },
        allow_screen_share: { type: Boolean, default: true },
        allow_transcription: { type: Boolean, default: false },
        join_without_host: { type: Boolean, default: false },
        allow_audio: { type: Boolean, default: true },
        allow_video: { type: Boolean, default: true }
    }
},{
    timestamps:true
});

export default mongoose.model('Meeting', meetingSchema)