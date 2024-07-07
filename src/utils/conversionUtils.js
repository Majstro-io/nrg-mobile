import dateFormat from "dateformat";


const formatDate = (date) => {
    return date ? dateFormat(date, "dd-mm-yyyy") : '';
};

const formatTime = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const secsLeft = secs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`;
};


const conversionUtils = {
    formatDate,
    formatTime
}

export default conversionUtils;