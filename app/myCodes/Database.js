import { arrayRemove, arrayUnion, deleteField, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { DATABASE } from '../../Firebase';


export async function addToDatabase(collection, Doc, field, data, merge = true) {
    console.log(collection, Doc, field, data)
    if (Doc) {
        try {
            await setDoc(doc(DATABASE, collection, Doc), {
                [field]: data,
            }, { merge: merge });
        } catch (error) {
            console.log(error.message)
        }
    }

}
export async function addToDoc(collection, Doc, data) {
    console.log(collection, Doc, data)
    if (Doc) {
        try {
            await setDoc(doc(DATABASE, collection, Doc),
                { ...data }, { merge: true });
        } catch (error) {
            console.log(error.message)
        }
    }

}
export async function updateDatabaseItem(collection, Doc, Field, Value) {

    await updateDoc(doc(DATABASE, collection, Doc), {
        [Field]: Value ? Value : deleteField()
    });
}

export async function updateArrayDatabaseItem(collection, Doc, Field, Value, remove) {
    await updateDoc(doc(DATABASE, collection, Doc), {
        [Field]: !remove ? arrayUnion(Value) : arrayRemove(Value)
    });
}

export async function fetchDocument(collection, document, setterfunction) {
    const docRef = doc(DATABASE, collection, document);
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if (setterfunction) setterfunction(docSnap.data());
            return docSnap.data()
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error.message)
    }
}
export async function fetchDocument2(collection, document, setterfunction) {
    const docRef = doc(DATABASE, 'User', collection, document ? document : '');
    try {
        console.log(docRef)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if (setterfunction) setterfunction(docSnap.data());
            return docSnap.data()
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return ("No such document!");
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchInOrder = async (datacollection, orderby, _limit = 100) => {
    const ref = collection(DATABASE, datacollection)
    const qry = _limit ? query(ref, orderBy(orderby, 'desc'), limit(_limit)) : query(ref, orderBy(orderby, 'desc'))
    const snapShot = await getDocs(qry)

    let data = []
    snapShot.forEach((doc) => {
        data = [...data, doc.data()]
    });

    return data

}