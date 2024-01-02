// CollapsibleComponent.jsx
import React, { useState } from "react";

interface Order {
  category: string;
  price: string;
  quantity: string;
  storeNameOrder: string;
  type: string;
}

const CollapsibleComponent = () => {
  const [orderData, setOrderData] = useState<Order>({
    category: "", // Fyll i de förvalda värdena här
    price: "",
    quantity: "",
    storeNameOrder: "",
    type: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("/icons8-arrow-down-50.png"); // Default closed image
  const openImageSrc = "/icons8-arrow-up-30.png"; // Image when collapsible is open
  const [formattedErrors, setFormattedErrors] = useState("");
  const [error, setError] = useState<string>(""); // State to manage error message

  // Funktion för att växla tillståndet för öppen/stängd
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
    setImageSrc(isOpen ? "/icons8-arrow-down-50.png" : openImageSrc);
  };

  const handleOrder = (
    event: React.ChangeEvent<HTMLSelectElement>,
    fieldName: string
  ) => {
    console.log('fieldName:', fieldName); 
    const { value } = event.target;
    setOrderData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleOrderId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    
    // Ta bort eventuella tecken som inte är siffror
  const orderId = value.replace(/\D/g, ''); // Håller bara siffror kvar
  
      setOrderData((prevData) => ({
        ...prevData,
        orderId: Number(orderId),
      }));
    }
  
 

  const handlepriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const changedValue = parseFloat(value); // Parse the input value to a floating-point number
    const updatedPrice = isNaN(changedValue) ? "" : changedValue.toString(); // Convert it back to string or handle invalid input
    setOrderData((prevData) => ({
      ...prevData,
      price: updatedPrice,
    }));
  };

  //Postförfrågan
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      console.log("Data som skickades:", orderData);

      if (response .ok){
        console.log("Beställning skickad!");
        setError("");
        //Response på att ordern skickats iväg
        alert("Ordern har nu skickats iväg och du kan se den under 'pågående ordrar'");
    }
      else {
        const errorResponse = await response.json();
        console.error('Server error response:', errorResponse);

        if (errorResponse && errorResponse.message) {
          // Display the specific error messages for each field that failed validation
          const errorMessages = errorResponse.message.split(':')[1].trim();
        const fieldErrors = errorMessages.split(',').map((error: string) => error.trim());

        let errors = ""; 

        fieldErrors.forEach((errorMessage: string) => {
          const parts = errorMessage.split('`').slice(1, 3);

          if (parts.length === 2) {
            const [fieldName, fieldError] = parts;
            const formattedError = `${fieldName}: ${fieldError}`;
            errors += formattedError + ". "; 
        
        } else {
          const unexpectedFormatError = `Error: du måste göra ett val för: ${errorMessage}`;
          errors += unexpectedFormatError + ". ";
          console.error(unexpectedFormatError);
        
        }
      });
      setFormattedErrors(errors);
    } 
       
      }
    }
    catch (error) {
      console.error("Något gick fel:", error);
      // Lägg till logik för att hantera nätverksfel eller andra fel här
      setError("Något gick fel. Vänligen försök igen");
    }
  };

  const Category = () => {
   
    const [selectedCategory, setSelectedCategory] = useState("");
    const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;

    
      /*setSelectedCategory(selectedValue);*/
      setOrderData((prevData) => ({
        ...prevData,
        category: selectedValue,
        type: "", // Nollställs när category ändras
      }));
    };
// Beroende på vilken kategori som väljs så visas olika types i nästkommande lista
    const availableTypes = {
      coffee: ["Frosted caramel", "Lucaffé Mamma Lucia", "Lykke Bam Bam"],
      tea: ["Acai Power - Fruktte", "Hibiskus", "Minze Zitrone 20st"],
    };

    const typesToDisplay =
      orderData.category === "coffee"
        ? availableTypes.coffee
        : orderData.category === "tea"
        ? availableTypes.tea
        : [];

    const getPriceOnType = (type: string): number => {
      const priceMap: { [key: string]: number } = {
        // Pris för alla olika sorter /styck som visas längst ner
        "Frosted caramel": 69, 
        "Lucaffé Mamma Lucia": 199, 
        "Lykke Bam Bam": 229, 
        "Acai Power - Fruktte" : 91,
        "Hibiskus": 69,
        "Minze Zitrone 20st": 40,
      };
      return priceMap[type] || 0; //Returnera priset på typen som valts
    };
  
    //metod för att skriva ut pris beroende på type
    const handlePriceOnType = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedType = event.target.value;
      const priceForType = getPriceOnType(selectedType);
      const updatedPrice = priceForType.toString(); // Convert priceForType to a string

      setOrderData((prevData) => ({
        ...prevData,
        type: selectedType,
        price: updatedPrice,
      }));
    };
    
    return (
      <div className="content m-4">
       
        <form onSubmit={handleSubmit}>
         {formattedErrors && <span className="error-message">{formattedErrors}</span>} <br></br>
          <label htmlFor="category"></label>
          <select
            name="category"
            id="category"
            className="px-4 py-2 bg-white border shadow-lg"
            value={orderData.category}
            onChange={(event) => handleCategory(event)}
          >
            <option value="default" className="px-4 py-2">
              Välj kategori
            </option>
            <option value="coffee">Kaffe</option>
            <option value="tea">Te</option>
          </select>
         
          <br></br>
         <label htmlFor="type"></label>
          <select
            name="type"
            id="type"
            className="px-4 py-2 bg-white border shadow-lg"
            value={orderData.type}
            onChange={(event) => handlePriceOnType(event)}
          >
            <option value="default" className="px-4 py-2">
              Välj sort
            </option>
            {typesToDisplay &&
              typesToDisplay.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
          </select>

          <br></br>
          <label htmlFor="quantity"></label>
          <select
            name="quantity"
            id="quantity"
            className="px-4 py-2 bg-white border shadow-lg"
            value={orderData.quantity}
            onChange={(event) => handleOrder(event, "quantity")}
          >
            <option value="default" className="px-4 py-2">
              Antal
            </option>
            <option value="1" className="px-4 py-2">
              1
            </option>
            <option value="2" className="px-4 py-2">
              2
            </option>
            <option value="3" className="px-4 py-2">
              3
            </option>
            <option value="4" className="px-4 py-2">
              4
            </option>
            <option value="5" className="px-4 py-2">
              5
            </option>
            <option value="6" className="px-4 py-2">
              6
            </option>
            <option value="7" className="px-4 py-2">
              7
            </option>
            <option value="8" className="px-4 py-2">
              8
            </option>
            <option value="9" className="px-4 py-2">
              9
            </option>
            <option value="10" className="px-4 py-2">
              10
            </option>
          </select>
          <br></br>
          <label htmlFor="storeNameOrder"></label>
          <select
            name="storeNameOrder"
            id="storeNameOrder"
            className="px-4 py-2 bg-white border shadow-lg"
            value={orderData.storeNameOrder}
            onChange={(event) => handleOrder(event, "storeNameOrder")}
          >
            <option value="default" className="px-4 py-2">
              Butik
            </option>
            <option value="Arnes affär, Arboga" className="px-4 py-2">
              Arnes affär, Arboga
            </option>
            <option value="Davids desserter, Digtuna" className="px-4 py-2">
              Davids desserter, Digtuna
            </option>
            <option value="Ritas Livs, Vadstena" className="px-4 py-2">
              Ritas Livs, Vadstena
            </option>
          </select>
          <br></br>
          
          <label htmlFor="price">Kostnad:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={`${orderData.price}kr/styck`} // Uppdatera värdet från state för att visa nuvarande värde
            readOnly ></input>
          <div className="flex justify-end">
            <button className="order text-white type= submit">Beställ</button>
          </div>
          <p>Finns inte butiken med i listan?</p>
          <a href="#bottom" className="linktext">
            {" "}
            Lägg till ny butik här
          </a>
        </form>
      </div>
    );
  };
  return (
    <div className="storeOrder border-4 rounded-md border-black m-4">
      <button
        onClick={toggleCollapse}
        className="button flex items-center justify-between m-0.1"
      >
        <span className="flex-grow">Lägg till beställning till butik</span>
        <img src={imageSrc} alt="Pil" className="ml-20 w-10" />
      </button>
      {isOpen && <Category />}
    </div>
  );
};

export default CollapsibleComponent;
