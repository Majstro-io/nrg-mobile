const validateUserRegistrationDetails = (data) => {
    let valid = true;
    let errors = {};

    if (!data.firstName) {
        errors.firstName = 'First name is required';
        valid = false;
    }

    if (!data.lastName) {
        errors.lastName = 'Last name is required';
        valid = false;
    }

    if (!data.gender) {
        errors.gender = 'Gender is required';
        valid = false;
    }

    if (!data.dob) {
        errors.dob = 'Birth date is required';
        valid = false;
    }

    if (!data.email) {
        errors.email = 'Email is required';
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
        valid = false;
    }

    if (!data.mobileNo) {
        errors.mobileNo = 'Mobile number is required';
        valid = false;
    }

    return { valid, errors };
}

const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
}

const validationUtils = {
    validateUserRegistrationDetails,
    validateEmail
}

export default validationUtils;