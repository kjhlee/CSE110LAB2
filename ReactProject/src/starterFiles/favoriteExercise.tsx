import React, { useEffect, useState } from 'react';
import {Label, Note} from "../types"


export function FavoriteToggle({ note, updateFavorites }: { note: string, updateFavorites: (note: string, isFavorite: boolean) => void }) {
    // set the useState to be false
    const [favorite, setfavorite] = useState(false)

    // const [favlist, setfavlist] = useState([]) 

    // go between true and false when clicked
    const handleClick = () => {
        const newFavoriteStatus = !favorite;
        // console.log(note, newFavoriteStatus)

        //sets the favorite to the new value
        setfavorite(newFavoriteStatus);
        //updates the list 
        updateFavorites(note, newFavoriteStatus);
    }
    return (
        // handles the favorite button flips back and forward
        <button onClick={handleClick} style={
            {   background: 'none', 
                border: 'none', 
                cursor: 'pointer' }
            }>
        {favorite ? '❤️' : '♡'}
        </button>
    );
}


