'use server'

import prisma from "../prisma"

export async function deleteNote(eventData) {
    try {
        const {id} = eventData
        const deleteSingleNote = await prisma.note.delete({
            where: {
                id: id
            }
        })
        return deleteSingleNote
    } catch (error) {
        console.log("Error deleting note :", error);
        throw new Error('Error: ' + error.message);
    }

}