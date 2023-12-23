import { v4 as uuidv4 } from 'uuid';
import { UserAndAccessToken, User, stringOrUndefined } from '../../../types/models';
import { hashPassword, signAccessToken } from '../../auth';



export default async (email: stringOrUndefined, username: stringOrUndefined, password: stringOrUndefined) => {

    if (!email || !username || !password) throw new Error('INVALID_FORM_DATA');
    const userId = uuidv4();
    const lowercasedEmail = email.toLowerCase();
    const lowercasedUsername = username.toLowerCase();
    const hashedPassword = await hashPassword(password);
    const accessTokenVersion = 1;
    const user: User = {
        email: lowercasedEmail,
        username: lowercasedUsername,
        password: hashedPassword,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        userId,
        accessTokenVersion,
    }
    return <UserAndAccessToken>{
        user,
        accessToken: await signAccessToken(userId, accessTokenVersion)
    }
}