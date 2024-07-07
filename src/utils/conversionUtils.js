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

const generateDates = (startYear = 2023) => {
    const dates = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    for (let year = startYear; year <= currentYear; year++) {
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day);
          const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          dates.push(formattedDate);
        }
      }
    }
    
    return dates;
  };

const conversionUtils = {
    formatDate,
    formatTime,
    generateDates
}

export default conversionUtils;