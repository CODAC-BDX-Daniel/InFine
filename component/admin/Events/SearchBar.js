import React, {useState} from 'react';

const SearchBar = (props) => {
    const {eventsList, setEventsList, setRefresh, refresh} = props;
    const [searchTerm, setSearchTerm] = useState();
    const handleSearchTerm = (e) => {
        if(e.target.value.length === 0){
            setRefresh(!refresh);
        }
        setSearchTerm(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredList = [];
        eventsList.map(event => {
            if (JSON.stringify(event).includes((searchTerm))) {
                filteredList.push(event);
            }
            setEventsList(filteredList);
            ;
        });
    }

    const handleRemoveSearch = () => {
        setSearchTerm('');
        setRefresh(!refresh);
    }
    return (
        <form
            onSubmit={handleSubmit}
            className='flex justify-center p-5'>
            <input className='border-2 border-BluePrimary-1 mr-5 p-2 rounded w-1/4' required
                   onChange={handleSearchTerm} value={searchTerm}/>
            <button className='bg-BluePrimary-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Rechercher
            </button>
            {searchTerm?.length > 0 && <button onClick={handleRemoveSearch}
                                               className='bg-BluePrimary-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>X
            </button>
            }
        </form>
    );
};

export default SearchBar;