"use server";

import {Account, Avatars, Client, Databases} from "node-appwrite";
import {appwriteConfig} from "../appwrite/config";
import {cookies} from "next/headers";
import { Avatar } from "radix-ui";

export const appwriteClient = async () => {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)

    const session = (await cookies()).get('appwrite-session');

    if (!session || !session.value) throw new Error('No session cookie found');

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
        get database() {
            return new Databases(client);
        },
    }
};
export const createAdminlient = async () => {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setKey(appwriteConfig.secretKey);

    return {
        get account() {
            return new Account(client);
        },
        get database() {
            return new Databases(client);
        },
        get avatar() {
            return new Avatars(client);
        },
        get storage() {
            return new Storage(client);
        }
    }
};

