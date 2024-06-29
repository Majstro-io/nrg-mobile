import dateFormat from "dateformat";


const formatDate = (date) => {
    return date ? dateFormat(date, "dd-mm-yyyy") : '';
};

const conversionUtils = {
    formatDate
}

export default conversionUtils;