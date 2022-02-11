/* eslint-disable @next/next/no-img-element */

export default function Event({ event }) {
  const comments = event.comments;

  return (
    <div className="max-w-sm overflow-hidden rounded bg-white shadow-lg">
      {event.picture ? (
        <img className="w-full" src={event.picture} alt={event.title} />
      ) : (
        <img
          className="w-full"
          src="https://cibul.s3.amazonaws.com/location18191842.jpg"
          alt={event.title}
        />
      )}
      <div className="m-1 h-80">
        <div className="mb-2 text-xl font-bold"> {event.title}</div>
        <br />
        <p className="text-base text-gray-700">{event.description}</p>

        <div className="px-6 pt-4 pb-2">
          <span
            className="mr-2 mb-2
                     inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {event.address}
          </span>
          <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
            Date de l&apos;évènement : {event.date}
          </span>
        </div>
      </div>
    </div>
  );
}
