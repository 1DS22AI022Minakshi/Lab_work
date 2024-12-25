import { useState } from "react";
import Card from "./Card";

function Page({ Places, removePlace, setPlaces }) {
  const [showForm, setShowForm] = useState(false); 
  const [newPlace, setNewPlace] = useState({
    name: "",
    info: "",
    image: "",
    price: "",
  });

  const addPlace = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlace),
      });
      const addedPlace = await response.json();

      // Update the places state in the parent component
      setPlaces((prev) => [...prev, addedPlace]);

      // Reset form state and hide form
      setNewPlace({ name: "", info: "", image: "", price: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <div className="container ">
      <h2 className="title">Plan With Friends</h2>

      {/* Button to toggle the add place form */}
      <button
        className="add-place-btn  "
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Cancel" : "Add Place"}
      </button>

      {/* Add Place Form */}
      {showForm && (
        <form onSubmit={addPlace} className="add-place-form">
          <input
            type="text"
            placeholder="Name"
            value={newPlace.name}
            onChange={(e) =>
              setNewPlace((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <input
            type="text"
            placeholder="Info"
            value={newPlace.info}
            onChange={(e) =>
              setNewPlace((prev) => ({ ...prev, info: e.target.value }))
            }
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPlace.image}
            onChange={(e) =>
              setNewPlace((prev) => ({ ...prev, image: e.target.value }))
            }
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={newPlace.price}
            onChange={(e) =>
              setNewPlace((prev) => ({ ...prev, price: e.target.value }))
            }
            required
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      )}

      <div className="cards">
        {Places.map((Place) => (
          <Card key={Place.id} {...Place} removePlace={removePlace} />
        ))}
      </div>
    </div>
  );
}

export default Page;
