import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    doc, getDoc,
    where,
    documentId
} from 'firebase/firestore'
import { database } from '../firebase/config'

export function useFetchFavourites(userObject) {

    const [favorites, setFavorites] = useState(null)


    useEffect(() => {
        const fetchFavourites = async () => {
            if (!userObject) return
            const favouriteIds = userObject.favourites
            if (favouriteIds.length === 0) {
                setFavorites(null)
                return
            }
            const q = query(collection(database, 'films'), 'films', where(documentId(), 'in', favouriteIds))
            onSnapshot(q, async (querySnapshot) => {
                setFavorites(
                    await Promise.all(querySnapshot.docs.map(async (document) => {
                        let movie = document.data()
                        console.log(document.data())
                        let userRef = doc(database, 'users', movie.user);
                        let userSnap = await getDoc(userRef)
                        return userSnap.exists() ? {
                            id: document.id,
                            ...movie,
                            user: userSnap.data()
                        } : {
                            id: document.id,
                            ...movie,
                        }
                    }))
                )
            })
        }

        fetchFavourites();
    }, [userObject])
    return { favorites }
}