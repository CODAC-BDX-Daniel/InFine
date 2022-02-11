import React from 'react';

const EventCard = (props) => {
    const {event, userToken, setIsLoading, setRefresh, refresh} = props;
    const handleDeleteEvent = async () => {
        setIsLoading(true);
        const endPoint = `/api/events/${event._id}`;
        const myInit = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };
        const response = await fetch(endPoint, myInit);
        if (response.status === 200 && response.ok) {
            alert('Evènement supprimé avec succès');
            setRefresh(!refresh);
            setIsLoading(false);
        } else {
            alert('Erreur durant la suppression');
            setIsLoading(false);
        }
    }
    return (
        <div
            key={event._id}
            className='flex border-2  mt-10 p-5 rounded bg-GrayPrimary-1 shadow-lg shadow-BluePrimary-1 mx-10 '>
            {event.picture ?
                <img src={event.picture} className='block h-40 w-40 mr-5'/> :
                <img src='/no-photo.png' className='block h-40 w-40 mr-5'/>}
            <div className='w-full  '>
                <div className='w-full '>
                    <p><span>Titre:</span> {event.title}</p>
                    <p><span>Date:</span>{event.date}</p>
                    <p>Description: {event.description}</p>
                    <p>Adresse: {event.address}</p>
                    <p>Mots clé: ${event.keywords[0]}</p>
                </div>
                <div className='flex items-center justify-end  mt-10'>
                    <button onClick={handleDeleteEvent}
                            className='block  w-30 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold  border  rounded p-2'>Supprimer
                        cet évènement
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;


// "_id": "62026ebb036100b13ce3a3fc",
//     "title": "100 Millions d'Années sous les Mers",
//     "description": "100 Millions d'Années sous les Mers",
//     "keywords": [
//     "exposition;prehistoire;fossile;musee;mmm;musee mer marine;mer;poisson;animal;liban;poisson de pierre;roche;paleonthologie;pierre anhoury;histoire;legende;terre;evolution;sous les mers;plongee;especes;dinosaures;collection"
// ],
//     "location": [
//     -0.554034,
//     44.867337
// ],
//     "address": "89 rue des étrangers, 33300 Bordeaux",
//     "users": [],
//     "notes": [],
//     "comments": [],
//     "picture": "https://cibul.s3.amazonaws.com/location18191842.jpg",
//     "date": "2022-05-18",