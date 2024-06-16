'use server'
import prisma from "../prisma"

export async function updateNote(eventData){
    try {
        const { description, title, noteId } = eventData;
        const updateNoteItem = await prisma.note.update({
            where: {
                id: noteId
            },
            data: {
                title, description
            }
        })
        return updateNoteItem
    } catch (error) {
        console.log("Error updating note:", error);
        throw new Error('Error: ' + error.message);
    }

}