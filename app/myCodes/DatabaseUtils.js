import { addToDoc, updateArrayDatabaseItem } from "./Database"

export const addEmailToList = (name, email) => {
    //addToDatabase('Admin', 'Emails', 'emails', {email})
    addToDoc('Emails', name, { email: email })
}

export const addUIDToList = (UID) => {
    //addToDatabase('Admin', 'Emails', 'emails', {email})
    updateArrayDatabaseItem('Admin', 'Users', 'allUIDs', UID)
}
