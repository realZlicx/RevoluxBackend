import { Response } from 'express';

export const handleError = (error: Error, res: Response) => {
    switch (error.message) {
        case 'INVALID_EMAIL':
            res.status(400).send({ error: 'Invalid email' });
            break;
        case 'INVALID_USERNAME':
            res.status(400).send({ error: 'Invalid username' });
            break;
        case 'INVALID_PASSWORD_LENGTH':
            res.status(400).send({ error: 'Password must be at least 8 characters long' });
            break;
        case 'INVALID_PASSWORD_UPPERCASE':
            res.status(400).send({ error: 'Password must contain at least one uppercase letter' });
            break;
        case 'INVALID_PASSWORD_LOWERCASE':
            res.status(400).send({ error: 'Password must contain at least one lowercase letter' });
            break;
        case 'INVALID_PASSWORD_NUMBER':
            res.status(400).send({ error: 'Password must contain at least one number' });
            break;
        case 'INVALID_PASSWORD_SPECIAL_CHARACTER':
            res.status(400).send({ error: 'Password must contain at least one special character' });
            break;
        case 'EMAIL_ALREADY_EXISTS':
            res.status(409).send({ error: 'Email already exists' });
            break;
        case 'USERNAME_ALREADY_EXISTS':
            res.status(409).send({ error: 'Username already exists' });
            break;
        case 'INVALID_FORM_DATA':
            res.status(400).send({ error: 'Invalid form data' });
            break;
        case 'INTERNAL_SERVER_ERROR':
            res.status(500).send({ error: 'Internal server error' });
            break;
        case 'INVALID_PASSWORD':
            res.status(400).send({ error: 'Invalid password' });
            break;
        case 'USER_NOT_FOUND':
            res.status(404).send({ error: 'User not found' });
            break;
        default:
            res.status(500).send({ error: 'Internal server error' });
            break;
    }
};

