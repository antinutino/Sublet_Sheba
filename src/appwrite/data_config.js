import { Client, Databases, ID, Query } from 'appwrite';
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

    async setUserDetail({ name, email, phone, role, address, nid, photo }) {
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
                    nid,
                    photo
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async setpost({ district,subdistrict,rent,title,details,photo1,photo2,email,name }) {
        try {
            return await this.databases.createDocument(
                conf.subletshebaDatabaseId,
                conf.subletshebaCollectionId,
                ID.unique(), {
                    district,
                    subdistrict,
                    rent,
                    title,
                    details,
                    photo1,
                    photo2,
                    email,
                    name
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async setInboxData({title,details,username,useremail,reciveremail,postid,message}) {

        try {
            return await this.databases.createDocument(
                conf.subletshebaDatabaseId,
                conf.subletshebaInboxCollectionId,
                ID.unique(), {
                    title,
                    details,
                    username,
                    useremail,
                    reciveremail,
                    postid,
                    message
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async getUserDetails(email) {
        try {
          // Make a request to fetch the document by email
          const response = await this.databases.listDocuments(
            conf.subletshebaDatabaseId,
            conf.subletshebaUserDetailId,
            [Query.equal('email', email)]
          );
          
          // Handle the response
          console.log('Fetched Document:', response);
          
          if (response.total > 0) {
            return response.documents[0]; // Return the first matching document
          } else {
            throw new Error('No document found');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
          throw error; // Handle or rethrow the error as needed
        }
    }

    async getUserPosts(email) {
        try {
          // Make a request to fetch the document by email
          const response = await this.databases.listDocuments(
            conf.subletshebaDatabaseId,
            conf.subletshebaCollectionId,
            [Query.equal('email', email)]
          );
          // Handle the response
          console.log('Fetched Document:', response);
          
         return response.documents; // Return the first matching document
        } catch (error) {
          console.error('Error fetching document:', error);
          throw error; // Handle or rethrow the error as needed
        }
    }
    async getInboxData(email) {
        try {
          // Make a request to fetch the document by email
          const response = await this.databases.listDocuments(
            conf.subletshebaDatabaseId,
            conf.subletshebaInboxCollectionId,
            [
                Query.equal('useremail', email),
                Query.equal('reciveremail', email)
            ]

          );
          // Handle the response
          console.log('Fetched Document:', response);
          
         return response.documents; // Return the first matching document
        } catch (error) {
          console.error('Error fetching document:', error);
          throw error; // Handle or rethrow the error as needed
        }
    }
    async getAllPosts() {
        try {
          // Make a request to fetch the document by email
          const response = await this.databases.listDocuments(
            conf.subletshebaDatabaseId,
            conf.subletshebaCollectionId
          );
          // Handle the response
          console.log('Fetched Document:', response);
          
         return response.documents; // Return the first matching document
        } catch (error) {
          console.error('Error fetching document:', error);
          throw error; // Handle or rethrow the error as needed
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

    async deletePost(documentid) {
        try {
            console.log(documentid);
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
