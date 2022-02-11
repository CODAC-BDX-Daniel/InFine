/* eslint-disable react/jsx-no-comment-textnodes */
import Comment from "./comment";
import Image from "next/image";

export default function User({ user }) {
  return (
    <div>
      <br></br>
      <label>NOM D'UTILISATEUR :</label>
      <p className="text-xl font-normal leading-normal mt-0 mb-2 text-pink-800">
        {" "}
        {user.username}
      </p>
      <br></br>
      <label>RUE :</label>
      <p className="text-xl font-normal leading-normal mt-0 mb-2 text-pink-800">
        {user.rue}
      </p>
      <br></br>
      <label>CODE POSTAL :</label>
      <p className="text-xl font-normal leading-normal mt-0 mb-2 text-pink-800">
        {user.codeP}
      </p>
      <br></br>
      <label>VILLE :</label>
      <p className="text-xl font-normal leading-normal mt-0 mb-2 text-pink-800">
        {user.ville}
      </p>
      <br></br>
      <label>EMAIL :</label>
      <p className="text-xl font-normal leading-normal mt-0 mb-2 text-pink-800">
        {user.email}
      </p>
      <br></br>
      <Image
        src={user.imageAvatar}
        alt={user.username + "'s Profil"}
        layout="responsive"
        width={250}
        height={250}
      />
    </div>
  );
}
