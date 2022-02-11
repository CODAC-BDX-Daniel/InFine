import axios from "axios";
import {useRouter} from 'next/router';
import { getCookies} from "cookies-next";

const DeleteUser = () => {

    const router = useRouter();
    const {id} = router.query
    const token = getCookies("access_token").access_token;

    function deleteUs () {
        axios.delete(`/api/users/${id}`, {
            headers: {
                authorization: `token ${token}`,
            },

        })
        alert("Vous avez supprimer l'utilisateur!");
        router.push('/Admin')
    }
    return (
        <div>
            <button className="bg-red-700 text-white active:bg-pink-600 font-bold
            uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none
            mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={deleteUs}>
                Supprimer cette utilisateur
            </button>
        </div>
    );
}
export default DeleteUser;
