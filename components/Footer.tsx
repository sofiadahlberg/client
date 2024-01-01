
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';

interface Customer {
    storeCity: string;
  storeLocation: string;
  storeName: string;
  storeNumber: string;
  storeEmail: string;
  storeZipcode: string;
}

const Footer: React.FC = () => {
    const [formData, setFormData] = useState<Customer>({
      storeName: "",  
      storeCity: "",
        storeLocation: "",
        storeNumber: "",
        storeEmail: "",
        storeZipcode: "",
      });
    
      const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          console.log('Form Data:', formData);
          const response = await fetch('http://localhost:4000/store', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Använd vid behov: Visa meddelande om framgångsrik postning
            console.log('Kund tillagd på servern!');
          } else {
            // Hantera felaktigt svar från servern
            console.error('Något gick fel vid tillägg av kunden på servern.');
            console.error('Server error response:', await response.json());
          }
        } catch (error) {
          // Hantera nätverksfel eller andra fel
          console.error('Något gick fel:', error);
        }
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    return ( 
        <footer className=" text-white" id="bottom">
            <div className="footerdiv">
            <h6 className="h6class md:w-4/4">Lägg till ny butik:</h6>
        <form className="footertext" onSubmit={handleFormSubmit}>
        <label htmlFor="storeName">Butiksnamn</label><br></br>
        <input type="text" id="storeName" name="storeName" onChange={handleInputChange}
            value={formData.storeName}
       ></input><br></br><br></br>
        <label htmlFor="storeLocation">Adress</label><br></br>
        <input type="text" id="storeLocation" name="storeLocation"  onChange={handleInputChange}
            value={formData.storeLocation}></input><br></br><br></br>
        <label htmlFor="storeZipcode">Postnummer</label><br></br>
        <input type="text" id="storeZipcode" name="storeZipcode"  onChange={handleInputChange}
            value={formData.storeZipcode}></input><br></br><br></br>
        <label htmlFor="storeCity">Stad</label><br></br>
        <input type="text" id="storeCity" name="storeCity"  onChange={handleInputChange}
            value={formData.storeCity}></input><br></br><br></br>
        <label htmlFor="storeEmail">Email-adress</label><br></br>
        <input type="text" id="storeEmail" name="storeEmail"  onChange={handleInputChange}
            value={formData.storeEmail} ></input><br></br><br></br>
        <label htmlFor="storeNumber">Telefonnummer</label><br></br>
        <input type="text" id="storeNumber" name="storeNumber"  onChange={handleInputChange}
            value={formData.storeNumber}></input><br></br><br></br>
        
        <div className="flex justify-end">
        <button type="submit" className="addStore text-white self-end">Lägg till</button>
       </div>
            </form>
            </div>
</footer>
    );
    

    };
export default Footer;