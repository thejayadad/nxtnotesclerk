'use server'
import prisma from "../prisma"

export async function createNote(eventData){
    try {
        const {title, description, creator} = eventData
        const newNote = await prisma.note.create({
            data: {
                title, creator, description
            }
        })
        return newNote
    } catch (error) {
        console.log("Error creating note:", error);
        throw new Error('Error: ' + error.message); // Throw the actual error message
    }
}

