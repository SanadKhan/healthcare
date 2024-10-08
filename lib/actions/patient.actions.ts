"use server"

import { ID, Query } from "node-appwrite"
import { BUCKET_ID, database, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { getBufferImage, parseStringify } from "../utils";
import {InputFile} from 'node-appwrite/file'

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        )
        
        return parseStringify(newUser)
    } catch (error: any) {
        if(error && error.code === 409){
            const existingUser = await users.list([
                Query.equal("email", [user.email])
            ])

            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user:", error);
    }
}

export const getUser = async(userId: string) => {
    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error: any) {
        console.log("Error", error);
    }
}

export const getPatient = async(userId: string) => {
    try {
        const patients = await database.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal('userId', userId)]
        )
        return parseStringify(patients.documents[0])
    } catch (error: any) {
        console.log("Error", error);
    }
}

export const registerPatient = async({ identificationDocument, ...patient}: RegisterUserParams) => {
    try {
        let file        
        if(identificationDocument) {
            const docFile =  identificationDocument?.get('blobFile') as File;
            const fileName = identificationDocument?.get('fileName') as string
            const bufferImg: Buffer = await getBufferImage(docFile);
            const inputFile = InputFile.fromBuffer(bufferImg,fileName)            
            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
        }
        
        const newPatient = await database.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            { 
                identificationDocumentId: file?.$id ? file.$id : null,
                identificationDocumentUrl: file?.$id ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}` : null,
                ...patient
            } 
        )
        return parseStringify(newPatient)
        // return 
    } catch (error: any) {
        console.log("Erorr", error);
        
    }
}