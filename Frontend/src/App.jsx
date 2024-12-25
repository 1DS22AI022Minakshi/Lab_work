import { useState, useEffect } from "react";
import Page from "./component/Page";
import data from "./data";

function App() {
  const [places, setPlaces] = useState([]); 

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/places");
        const data = await response.json();
        setPlaces(data); 
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const removePlace = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/places/${id}`, {
        method: "DELETE",
      });
      setPlaces((prev) => prev.filter((place) => place.id !== id)); 
    } catch (error) {
      console.error("Error removing place:", error);
    }
  };

  return (
    <div className="App">
      <Page Places={places} setPlaces={setPlaces} removePlace={removePlace} />
    </div>
  );
}

export default App;
