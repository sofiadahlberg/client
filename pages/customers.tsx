import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ContentEditable from "react-contenteditable";
import DOMpurify from "dompurify";
//Tydlighet så TS förstår vilken typ av data som orders innehåller
interface Customer {
  storeCity: string;
  storeLocation: string;
  storeName: string;
  storeNumber: string;
  storeEmail: string;
  storeZipcode: string;
  _id: number;
}
function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [EditInfo, setEditCustomer] = useState<{ [key: number]: string }>({});
  const triggerEdit = (_id: number) => {
    // Implement logic here to handle the edit action based on Id
    console.log(`Edit triggered for customer with ID ${_id}`);
    // You can call the necessary functions or set state here to initiate the edit process
  };
  useEffect(() => {
    //Hämta kunder från backend
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:4000/store/");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          throw new Error("Något gick fel vid hämtning av ordrar");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomers();
  }, []);

  const deleteCustomer = async (_id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/store/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Uppdatera kunderna efter radering
        const updatedCustomers = customers.filter(
          (customer) => customer._id !== _id
        );
        setCustomers(updatedCustomers);
        console.log("Kund raderad!");
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

  const EditCustomer = (
    _id: number,
    field: keyof Customer,
    newEditCustomer: string
  ) => {
    //Ändringar i kolumner + databasenS
    const editCustomerIndex = customers.findIndex(
      (customer) => customer._id === _id
    );
    if (editCustomerIndex !== -1) {
      const updatedCustomers = customers.map((customer, index) => {
        if (index === editCustomerIndex) {
          return {
            ...customer,
            [field]: newEditCustomer,
          };
        }
        return customer;
      });
      setCustomers(updatedCustomers);

      updateCustomer(_id, updatedCustomers[editCustomerIndex]);
    } else {
      console.error("Customer not found");
    }
  };

  //Ändra customer
  const updateCustomer = async (Id: number, updatedCustomer: Customer) => {
    try {
      const response = await fetch(`http://localhost:4000/store/${Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCustomer),
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

  return (
    <div className="main ">
      <Header />
      <div>
        <h1>Nuvarande kundbutiker</h1>
        <ul>
          {customers.map((customer, index) => (
            <div key={customer._id} className="articlediv">
              <article key={index}>
                <div className="storeStyle">
                  <ContentEditable
                    html={sanitizeHTML(customer.storeName)}
                    disabled={false}
                    onChange={(e) =>
                      EditCustomer(customer._id, "storeName", e.target.value)
                    }
                  />
                </div>
                <div className="storeCity">
                  <ContentEditable
                    html={sanitizeHTML(customer.storeCity)}
                    disabled={false}
                    onChange={(e) =>
                      EditCustomer(customer._id, "storeCity", e.target.value)
                    }
                  />
                </div>
                <div className="storeLocation">
                  <ContentEditable
                    html={sanitizeHTML(customer.storeLocation)}
                    disabled={false}
                    onChange={(e) =>
                      EditCustomer(
                        customer._id,
                        "storeLocation",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="storeZip">
                  <ContentEditable
                    html={sanitizeHTML(customer.storeZipcode)}
                    disabled={false}
                    onChange={(e) =>
                      EditCustomer(customer._id, "storeZipcode", e.target.value)
                    }
                  />
                </div>
                <div className="storeEmail">
                  <ContentEditable
                    html={sanitizeHTML(customer.storeEmail)}
                    disabled={false}
                    onChange={(e) =>
                      EditCustomer(customer._id, "storeEmail", e.target.value)
                    }
                  />
                </div>
                <div className="storeNumber">
                  <ContentEditable
                    html={sanitizeHTML(customer.storeNumber)}
                    disabled={false}
                    onChange={(e) =>
                      EditCustomer(customer._id, "storeNumber", e.target.value)
                    }
                  />
                </div>
                <div className="btndiv">
                  <button
                    onClick={() => {
                      console.log("Deleting customer with _id:", customer._id);
                      deleteCustomer(customer._id);
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
export default Customers;
