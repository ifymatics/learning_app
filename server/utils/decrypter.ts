import * as brcypt from "bcryptjs";

export const hasher = async (password: string) => {
    const salt = await brcypt.genSalt(10);
    const hashedPassword = await brcypt.hash(password, salt);
    return hashedPassword;
};

export const decrypter = async (databaseHash: string, userPassword: string) => {
    const isMatch = await brcypt.compare(userPassword, databaseHash);

    return isMatch;
};