import mongoose from 'mongoose';

const { Schema } = mongoose;

const applicationSchema = new Schema({
    applicationId: String,
    name: String,
    application_email_id:{
        type:String,
        required:true
    },
    isActive: {
        type:Boolean,
        default:true
    },
}, {
    timestamps: true
});

export default mongoose.model('Application', applicationSchema);

