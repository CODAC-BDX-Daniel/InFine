import React, {useState} from 'react';

const StreetsList = (props) => {
    const [displayRegisterBtn2, setDisplayRegisterBtn2] = useState(false);
    const {data, setDisplayStreetsList, setSelectedGeocodedAddress, handleSubmit, setDisplayRegisterBtn1} = props;
    const handleChoice = (data) => {
        setDisplayRegisterBtn2(true)
        setSelectedGeocodedAddress(data);
    }
    return (
        <div className='border-2 border-red-500 w-screen   flex justify-center z-10 absolute z-40 h-90 py-20'>
            <div className='rounded border-8 border-GrayPrimary-1 min-h-fit p-5  bg-BluePrimary-1 h-screen '>
                <h3 className='text-white text-center font-extrabold text-xl mb-10'>Choisir votre adresse</h3>
                {
                    data?.map(elem =>
                        <div key={elem.properties.id} className='flex items-center'>
                            <input
                                onChange={() => handleChoice(elem)}
                                type='radio'
                                name='address_option'
                                className='cursor-pointer'
                            />
                            <label className='ml-3 text-white cursor-pointer'>{elem.properties.label}</label>
                        </div>
                    )
                }
                {displayRegisterBtn2 &&   <button
                    onClick={handleSubmit}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-RedPrimary-1
                                border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700
                                focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition rounded-full mt-5"
                >S'enregistrer</button> }

                <button
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-RedPrimary-1
                                border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700
                                focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition rounded-full mt-5"
                    onClick={() => setDisplayStreetsList(false)}>Annuler</button>
            </div>
        </div>
    );
};

export default StreetsList;