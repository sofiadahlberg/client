import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ContentEditable from "react-contenteditable";
import DOMpurify from "dompurify";
//Tydlighet så TS förstår vilken typ av data som orders innehåller
interface Order {
  category: string;
  price: string;
  quantity: string;
  storeNameOrder: string;
  type: string;
  _id: number;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [editable, setEditable] = useState<{ [key: number]: string }>({});
  const triggerEdit = (_id: number) => {
    // Implement logic here to handle the edit action based on Id
    console.log(`Edit triggered for customer with ID ${_id}`);
    // You can call the necessary functions or set state here to initiate the edit process
  };
  useEffect(() => {
    //Funktion för att hämta ordrar från backend
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/order/");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          throw new Error("Något gick fel vid hämtning av ordrar");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders(); // Funktion som hämtar ordrar
  }, []);
  //radera order
  const deleteOrder = async (_id: number) => {
    try {
      console.log("Deleting order with ID:", _id); // Log to check the ID
    
      const response = await fetch(`http://localhost:4000/order/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Uppdatera kunderna efter radering
        const updatedOrders = orders.filter((order) => order._id !== _id);
        setOrders(updatedOrders);
        console.log("Order raderad!");
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
  //ändra i kolumnerna
  const EditContent = (
    _id: number,
    field: keyof Order,
    newEditContent: string
  ) => {
    const updatedOrderIndex = orders.findIndex((order) => order._id === _id);
    if (updatedOrderIndex !== -1) {
      const updatedOrders = orders.map((order, index) => {
        if (index === updatedOrderIndex) {
          return {
            ...order,
            [field]: newEditContent,
          };
        }
        return order;
      });
      setOrders(updatedOrders);

      updateOrder(_id, updatedOrders[updatedOrderIndex]);
    } else {
      console.error("Order not found");
    }
  };

  // Ändra order
  const updateOrder = async (_id: number, updatedOrder: Order) => {
    try {
      const response = await fetch(`http://localhost:4000/order/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (response.ok) {
        console.log("Order uppdaterad i databasen!");
      } else {
        throw new Error("Något gick fel vid uppdatering av ordern");
      }
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  };

  return (
    <div className="main ">
      <Header />
      <div>
        <h1>Ordrar</h1>
        <ul>
          {orders.map((order, index) => (
            <div key={order._id} className="articlediv">
              <article>
                <div className="categoryStyle">
                  <ContentEditable
                    html={sanitizeHTML(order.category)}
                    disabled={false}
                    onChange={(e) =>
                      EditContent(order._id, "category", e.target.value)
                    }
                  />
                </div>
                <div className="typeStyle">
                  <ContentEditable
                    html={sanitizeHTML(order.type)}
                    disabled={false}
                    onChange={(e) =>
                      EditContent(order._id, "type", e.target.value)
                    }
                  />
                </div>
                <div className="quantityStyle">
                  <ContentEditable
                    html={sanitizeHTML(order.quantity)}
                    disabled={false}
                    onChange={(e) =>
                      EditContent(order._id, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="storeOrderStyle">
                  <ContentEditable
                    html={sanitizeHTML(order.storeNameOrder)}
                    disabled={false}
                    onChange={(e) =>
                      EditContent(order._id, "storeNameOrder", e.target.value)
                    }
                  />
                </div>
                <div className="priceStyle">
                  <ContentEditable
                    html={sanitizeHTML(order.price)}
                    onChange={(e) =>
                      EditContent(order._id, "price", e.target.value)
                    }
                  />
                </div>

                <button
                  onClick={() => {
                    console.log("Deleting customer with _id:", order._id);

                    deleteOrder(order._id);
                  }}
                  className="deleteBtn"
                >
                  Radera
                </button>
              </article>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Orders;
