import { Client, Databases, ID } from 'appwrite';
import conf from '../conf/conf.js';

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.subletshebaURL)
            .setProject(conf.subletshebaProjectId);
        this.databases = new Databases(this.client);
        // this.bucket = new Storage(this.client);
    }

    async setUserDetail({ name, email, phone, role, address, nid }) {
        try {
            return await this.databases.createDocument(
                conf.subletshebaDatabaseId,
                conf.subletshebaUserDetailId,
                ID.unique(), {
                    name,
                    email,
                    phone,
                    role,
                    address,
                    nid
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async createPost({ title, details }) {
        try {
            return await this.databases.createDocument(
                conf.subletshebaDatabaseId,
                conf.subletshebaCollectionId,
                ID.unique(), {
                    title,
                    details
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost({ title, details }) {
        try {
            return await this.databases.updateDocument(
                conf.subletshebaDatabaseId,
                conf.subletshebaCollectionId,
                ID.unique(), {
                    title,
                    details
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost({ documentid }) {
        try {
            await this.databases.deleteDocument(
                conf.subletshebaDatabaseId,
                conf.subletshebaCollectionId,
                documentid
            );
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }
}

const service = new Service();
export default service;
