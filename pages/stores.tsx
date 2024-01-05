/* Sofia Dahlberg
Mittuniversitet Sundsvall
Webbutvecklingsprogrammet DT162G 
2024-01-05*/

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ContentEditable from "react-contenteditable";
import DOMpurify from "dompurify";
//Tydlighet så TS förstår vilken typ av data som orders innehåller
interface Store {
  storeCity: string;
  storeLocation: string;
  storeName: string;
  storeNumber: string;
  storeEmail: string;
  storeZipcode: string;
  _id: number;
}

function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [EditInfo, setEditStore] = useState<{ [key: number]: string }>({});
  
  useEffect(() => {
    //Hämta butik från backend
    const fetchStores = async () => {
      try {
        const response = await fetch("http://localhost:4000/store/");
        if (response.ok) {
          const data = await response.json();
          setStores(data);
        } else {
          throw new Error("Något gick fel vid hämtning av ordrar");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStores();
  }, []);
//Radera butik
  const deleteStore = async (_id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/store/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Uppdatera kunderna efter radering
        const updatedStores = stores.filter(
          (store) => store._id !== _id
        );
        setStores(updatedStores);
      } else {
        throw new Error("Något gick fel vid radering av kund");
      }
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  };
  const sanitizeHTML = (html: string) => {
    return DOMpurify.sanitize(html);
  };

  const EditStore = (
    _id: number,
    field: keyof Store,
    newEditStore: string
  ) => {
    //Ändringar för butiker i de olika kolumnerna 
    const editStoreIndex = stores.findIndex(
      (store) => store._id === _id
    );
    if (editStoreIndex !== -1) {
      const updatedStores = stores.map((store, index) => {
        if (index === editStoreIndex) {
          return {
            ...store,
            [field]: newEditStore,
          };
        }
        return store;
      });
      setStores(updatedStores);

      updateStore(_id, updatedStores[editStoreIndex]);
    } else {
      console.error("Store not found");
    }
  };

  //Uppdatera butikernas ändringar i databasen
  const updateStore = async (Id: number, updatedStore: Store) => {
    try {
      const response = await fetch(`http://localhost:4000/store/${Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStore),
      });
      if (response.ok) {
        console.log("Butikens uppgifter uppdaterad i databasen!");
      } else {
        throw new Error("Något gick fel vid uppdatering av butikens uppgifter");
      }
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  };
//Skriva ut butikinformation i articleelement. 
  return (
    <div className="main ">
      <Header />
      <div>
        <h1>Nuvarande kundbutiker</h1>
        <ul>
          {stores.map((store, index) => (
            <div key={store._id} className="articlediv">
              <article key={index}>
                <div className="storeStyle">
                  <ContentEditable
                    html={sanitizeHTML(store.storeName)}
                    disabled={false}
                    onChange={(e) =>
                      EditStore(store._id, "storeName", e.target.value)
                    }
                  />
                </div>
                <div className="storeCity">
                  <ContentEditable
                    html={sanitizeHTML(store.storeCity)}
                    disabled={false}
                    onChange={(e) =>
                      EditStore(store._id, "storeCity", e.target.value)
                    }
                  />
                </div>
                <div className="storeLocation">
                  <ContentEditable
                    html={sanitizeHTML(store.storeLocation)}
                    disabled={false}
                    onChange={(e) =>
                      EditStore(
                        store._id,
                        "storeLocation",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="storeZip">
                  <ContentEditable
                    html={sanitizeHTML(store.storeZipcode)}
                    disabled={false}
                    onChange={(e) =>
                      EditStore(store._id, "storeZipcode", e.target.value)
                    }
                  />
                </div>
                <div className="storeEmail">
                  <ContentEditable
                    html={sanitizeHTML(store.storeEmail)}
                    disabled={false}
                    onChange={(e) =>
                      EditStore(store._id, "storeEmail", e.target.value)
                    }
                  />
                </div>
                <div className="storeNumber">
                  <ContentEditable
                    html={sanitizeHTML(store.storeNumber)}
                    disabled={false}
                    onChange={(e) =>
                      EditStore(store._id, "storeNumber", e.target.value)
                    }
                  />
                </div>
                <div className="btndiv">
                  <button
                    onClick={() => {
                    
                      deleteStore(store._id);
                    }}
                    className="deleteBtn"
                  >
                    Radera
                  </button>
                </div>
              </article>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Stores;
