export const generateMeetingCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const segmentLength = 3;
    const segments = [];

    for(let i = 0; i < 3; i++){
        let segment ='';
        for (let j = 0; j < segmentLength; j++) {
          segment += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        segments.push(segment);
        // console.log(segment)
    }
    return segments.join('-');
}
