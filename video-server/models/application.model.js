import mongoose from 'mongoose';

const { Schema } = mongoose;

const applicationSchema = new Schema({
    applicationId: String,
    name: String,
    isActive: Boolean,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
