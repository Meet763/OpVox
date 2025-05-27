import Meeting from '../models/meeting.model.js'
import { generateMeetingCode } from '../utils/meetingCode.js';
//import { compareSecretKey } from '../utils/keyUtils.js';

export const createMeeting = async (meetingData) => {
    const meeting_code = generateMeetingCode();

    const meeting_link = `http:localhost:3000/api/v1/meeting/join/${meeting_code}`;

    const createMeeting = await Meeting.create({
        meeting_code: meeting_code,
        meeting_link: meeting_link,
        ...meetingData
    })

    return createMeeting
 
}
    
