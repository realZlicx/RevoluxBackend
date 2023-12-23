import { Collection } from 'mongodb';
import { sign, verify } from 'jsonwebtoken'
export const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

export const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
}

export const validatePassword = (password: string): boolean => {

    // Check if password has a length of 8 or more characters
    if (password.length < 8) {
        throw new Error('INVALID_PASSWORD_LENGTH');
    }

    /*    // Check if password has at least one uppercase letter
       if (!/[A-Z]/.test(password)) {
           throw new Error('INVALID_PASSWORD_UPPERCASE');
       }
   
       // Check if password has at least one lowercase letter
       if (!/[a-z]/.test(password)) {
           throw new Error('INVALID_PASSWORD_LOWERCASE');
       }
   
       // Check if password has at least one number
       if (!/\d/.test(password)) {
           throw new Error('INVALID_PASSWORD_NUMBER');
       }
   
       // Check if password has at least one special character
       if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
           throw new Error('INVALID_PASSWORD_SPECIAL_CHARACTER');
       } */

    // If all checks pass, return true
    return true;

};



export const checkEmailAndUsernameAvailability = async (email: string | undefined, username: string | undefined, collection: Collection) => {
    const retrivedUserBasedOnUsername = await collection.find({ username: username }).toArray();
    if (retrivedUserBasedOnUsername.length > 0) throw new Error('USERNAME_ALREADY_EXISTS');

    const retrivedUserBasedOnEmail = await collection.find({ email: email }).toArray();
    if (retrivedUserBasedOnEmail.length > 0) throw new Error('EMAIL_ALREADY_EXISTS');

}

export const validateRegisterFormData = async (email: string | undefined, username: string | undefined, password: string | undefined) => {
    if (!email || !username || !password) throw new Error('INVALID_FORM_DATA');
    const lowercasedEmail = email.toLowerCase();
    const lowercasedUsername = username.toLowerCase();
    if (!validateEmail(lowercasedEmail)) throw new Error('INVALID_EMAIL');
    if (!validateUsername(lowercasedUsername)) throw new Error('INVALID_USERNAME');
    if (!validatePassword(password)) throw new Error('INVALID_PASSWORD');
};


export const validateLoginFormData = async (email: string | undefined, password: string | undefined) => {
    if (!email || !password) throw new Error('INVALID_FORM_DATA');
    const lowercasedEmail = email.toLowerCase();
    if (!validateEmail(lowercasedEmail)) throw new Error('INVALID_EMAIL');
}


export const signAccessToken = async (userId: string, version: number) => {
    const accessToken = await sign({ userId, version }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.EXPIRE });
    return accessToken;
}


export const verifyAccessToken = async (accessToken: string) => {
    const decoded = await verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    return decoded;
}

export const hashPassword = async (password: string) => {
    const hashedPassword = await Bun.password.hash(password);
    return hashedPassword;
}

export const comparePassword = async (password: string | undefined, hashedPassword: string): Promise<Boolean> => {
    if (!password) throw new Error('INVALID_PASSWORD');
    const isPasswordCorrect = await Bun.password.verify(password, hashedPassword);
    return isPasswordCorrect;
}