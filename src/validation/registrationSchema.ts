import * as yup from 'yup';

const registrationSchema = yup.object({
    firstName: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters long')   
        .max(20, 'Name must be less than 20 characters long'), 
    lastName: yup
        .string()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters long')
        .max(20, 'Last name must be less than 20 characters long'),
    username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username must be less than 20 characters long'),
    address: yup
        .string()
        .required('Address is required')
        .min(3, 'Address must be at least 3 characters long')
        .max(20, 'Address must be less than 20 characters long'),
    city: yup
        .string()
        .required('City is required')
        .min(3, 'City must be at least 3 characters long')
        .max(20, 'City must be less than 20 characters long'),
    postcode: yup
        .string()
        .required('Postcode is required')
        .min(3, 'Postcode must be at least 3 characters long')
        .max(20, 'Postcode must be less than 20 characters long'),
    phone: yup
        .string()
        .required('Phone is required')
        .min(3, 'Phone must be at least 3 characters long')
        .max(20, 'Phone must be less than 20 characters long'),
    email:yup.string().email().required('Email is required'),
    avatar: yup
        .string()
        .required('Avatar is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters long'),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
export default registrationSchema; 