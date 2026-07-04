import crypto from "crypto";

export function calculateHash(
    previousHash: string,
    payload: string
): string {

    return crypto
        .createHash("sha256")
        .update(previousHash + payload)
        .digest("hex");

}