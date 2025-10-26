import { decryptData, observeToken } from "src/token";


export function isCorrectToken(token: string) : {tg_id: number } | null {

    if (!token) return null

    const tokenData = decryptData(token);
    const checkToken = tokenData ? observeToken(tokenData) : false;

    if (!checkToken) return null

    return {
        tg_id: Number(tokenData!.userId)
    }

}