/* Sofia Dahlberg
Mittuniversitet Sundsvall
Webbutvecklingsprogrammet DT162G 
2024-01-05*/

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";
//Definera de olika kolumner i schemat för Store
interface Store {
  storeCity: string;
  storeLocation: string;
  storeName: string;
  storeNumber: string;
  storeEmail: string;
  storeZipcode: string;
}

const Footer: React.FC = () => {
  const [formData, setFormData] = useState<Store>({
    storeName: "",
    storeCity: "",
    storeLocation: "",
    storeNumber: "",
    storeEmail: "",
    storeZipcode: "",
  });

  const [inputErrors, setInputErrors] = useState("");
  const [error, setError] = useState<string>(""); // State för att hantera felmeddelanden
  //Funktion för att hantera postföfrågan när submitknappen trycks på
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData);
      const response = await fetch("http://localhost:4000/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
         // Rensa inputfälten vid ok response
      setFormData({
        storeName: "",
        storeCity: "",
        storeLocation: "",
        storeNumber: "",
        storeEmail: "",
        storeZipcode: "",
      });
        // Altermeddelande till användare
        alert("Butiken är nu inlagd i systemet och det går att beställa!");
      } else {
        //Om felmeddelande
        const errorResponse = await response.json();
        console.error("Server error response:", errorResponse);

        if (errorResponse && errorResponse.message) {
          // Visar fel för varje fält som är felaktigt
          const errorMessages = errorResponse.message.split(":")[1].trim();
          const fieldErrors = errorMessages
            .split(",")
            .map((error: string) => error.trim());

          let errors = "";
          //Separerar de olika felmeddelandena
          fieldErrors.forEach((errorMessage: string) => {
            const parts = errorMessage.split("`").slice(1, 3);
            
            //Felmeddelande + aktuellt fält
            if (parts.length === 2) {
              const [fieldName, fieldError] = parts;
              const formattedError = `${fieldName}: ${fieldError}`;
              errors += formattedError + ". ";
            } else {
              //Utskrift av felmeddelandet
              const FormatError = `Error: du måste göra ett val för: ${errorMessage}`;
              errors += FormatError + ". ";
              console.error(FormatError);
            }
          });
          setInputErrors(errors);
        }
      }
    } catch (error) {
      // Hantera nätverksfel eller andra fel
      console.error("Något gick fel:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //Formulär för att lägga till ny butik
  return (
    <footer className=" text-white" id="bottom">
      <div className="footerdiv">
        <h6 className="h6class md:w-4/4">Lägg till ny butik:</h6>
        <form className="footertext" onSubmit={handleFormSubmit}>
          {inputErrors && (
            <span className="error-messageStore">{inputErrors}</span>
          )}{" "}
          <br></br>
          <label htmlFor="storeName">Butiksnamn</label>
          <br></br>
          <input
            type="text"
            id="storeName"
            name="storeName"
            onChange={handleInputChange}
            value={formData.storeName}
          ></input>
          <br></br>
          <br></br>
          <label htmlFor="storeLocation">Adress</label>
          <br></br>
          <input
            type="text"
            id="storeLocation"
            name="storeLocation"
            onChange={handleInputChange}
            value={formData.storeLocation}
          ></input>
          <br></br>
          <br></br>
          <label htmlFor="storeZipcode">Postnummer</label>
          <br></br>
          <input
            type="text"
            id="storeZipcode"
            name="storeZipcode"
            onChange={handleInputChange}
            value={formData.storeZipcode}
          ></input>
          <br></br>
          <br></br>
          <label htmlFor="storeCity">Stad</label>
          <br></br>
          <input
            type="text"
            id="storeCity"
            name="storeCity"
            onChange={handleInputChange}
            value={formData.storeCity}
          ></input>
          <br></br>
          <br></br>
          <label htmlFor="storeEmail">Email-adress</label>
          <br></br>
          <input
            type="text"
            id="storeEmail"
            name="storeEmail"
            onChange={handleInputChange}
            value={formData.storeEmail}
          ></input>
          <br></br>
          <br></br>
          <label htmlFor="storeNumber">Telefonnummer</label>
          <br></br>
          <input
            type="text"
            id="storeNumber"
            name="storeNumber"
            onChange={handleInputChange}
            value={formData.storeNumber}
          ></input>
          <br></br>
          <br></br>
          <div className="flex justify-end">
            <button type="submit" className="addStore text-white self-end">
              Lägg till
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
};
export default Footer;
