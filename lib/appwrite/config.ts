export const appwriteConfig = {
    endpoint: process.env.PROJECT_APPWRITE_ENDPOINT!,
    projectId: process.env.PROJECT_APPWRITE_ID!,
    databaseId: process.env.PROJECT_APPWRITE_DB!,
    userscollectionId: process.env.PROJECT_APPWRITE_USERS!,
    filescollectionId: process.env.PROJECT_APPWRITE_FILES!,
    bucketId: process.env.PROJECT_APPWRITE_BUCKET!,
    secretKey: process.env.PROJECT_APPWRITE_SECRET_KEY!,
}