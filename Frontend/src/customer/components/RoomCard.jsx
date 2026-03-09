export default function RoomCard({ room, onBook }) {

 return (

  <div className="bg-white shadow rounded p-4">

   <h3 className="text-xl font-bold">

    Room {room.number}

   </h3>

   <p>{room.type}</p>

   <p className="text-blue-600 font-bold">

    ${room.price}

   </p>

   <button
    onClick={() => onBook(room)}
    className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
   >
    Book Now
   </button>

  </div>

 )
}