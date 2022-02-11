import Image from "next/image";

export default function Comment({ comment }) {
  const pictures = comment.pictures;
  return (
    <div>
      <p>{comment.content}</p>
      <p>{comment.createdAt}</p>
      {pictures.length === 0 ? (
        <div>No Pictures...</div>
      ) : (
        pictures.map((picture) => (
          <div key={picture}>
            <Image
              src={picture.url}
              alt={comment.content}
              width={100}
              height={100}
            />
          </div>
        ))
      )}
    </div>
  );
}

//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   event: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Event",
//   },
//   pictures: {
//     type: Array,
//   },
//   content: {
//     type: String,
//   },
