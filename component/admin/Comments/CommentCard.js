import React from 'react';
import axios from "axios";

const CommentCard = (props) => {
    const {comment, setIsLoading, setRefresh, refresh} = props;
    const d = new Date(comment.createdAt);
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const handleDeleteComment = async (commentId) => {
        setIsLoading(true)
        try {
            const response = await axios.delete(`/api/comments/${commentId}`);
            if (response.status !== 200) {
                throw new Error('Suppression NOK');
            } else {
                setRefresh(!refresh);
                setIsLoading(false);
            }
        } catch (error) {
            alert(error.message);
            setRefresh(!refresh);
            setIsLoading(false)
        }
    }
    return (
        <div className='flex border-2 border-BluePrimary-1 p-5 mx-5 mt-5 rounded'>
            <img src={comment.user.imageAvatar} className='mr-10 w-40 h-40'/>
            <div className='w-full'>
                <p className='font-bold mb-5'>Publié
                    le {`${date}/${month}/${year}`} par {comment.user.username.toUpperCase()}</p>
                <p className='overflow-scroll overflow-hidden h-30'>
                    {comment.content}
                </p>
                <div>
                    {comment.pictures.map(picture =>
                        <img key={picture.url} src={picture.url} className='mr-10 w-20 h-20 mt-4 hover:scale-150'/>
                    )}
                </div>
                <div className='flex justify-end'>
                    <button
                        className='bg-BluePrimary-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5'
                        onClick={() => handleDeleteComment(comment._id)}>Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;