import { appwriteConfig } from "../appwrite/config";
import { createAdminlient } from "../appwrite/index";
import { ID, Query } from "node-appwrite";

const getUserByEmail = async (email: string) => {
    const { database } = await createAdminlient();

    const result = await database.listDocuments(
        appwriteConfig.userscollectionId,
        appwriteConfig.databaseId,
        [Query.equal('email', email)],
    );
    return result.documents.length > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    throw new Error(message);
}

const sendEmailOTP = async ({email}: { email: string }) => {
    const { account } = await createAdminlient();
    
    try {
        const session = await account.createEmailToken(ID.unique(), email);

        return  session.userId;
    } catch (error) {
        console.error("Error creating email token:", error);
        throw error;
    }
}

const createAccount = async ({ name, email }: { email: string; name: string }) => {
    const existingUser = await getUserByEmail(email);
    const accountId = await sendEmailOTP({ email });

    if (!accountId) {
        throw new Error("Failed to create account. Please try again.");
    }

    if (!existingUser) {
        const { database } = await createAdminlient();

        await database.createDocument(
            appwriteConfig.userscollectionId,
            appwriteConfig.databaseId,
            ID.unique(),
            { name, email, avatar: "https://example.com/default-avatar.png" },
            accountId,
        );
    }
};
export { createAccount, getUserByEmail, sendEmailOTP };