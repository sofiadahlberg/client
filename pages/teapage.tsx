import React, { useState } from 'react';
import Header from "../components/Header";
import CollapsibleComponent from "../components/CollapsibleComponent";
import Link from 'next/link';
import Footer from "../components/Footer";
const TeaPage = () => {
    return (
        <div className="main">
          <Header />
          <CollapsibleComponent />
          <div className="sort text-white flex flex-row justify-center">
          <Link href="/">
        <div className="coffee flex flex-row p-4 ">
          <img src="/icons8-coffee-50(1).png"></img>
          <li className="category pt-4 pl-4">Kaffe</li>
        </div>
        </Link>
        <Link href="/teapage">
        <div className="tea flex flex-row p-4">
          <img src="/icons8-tea-50.png"></img>
          <li className="category pt-4 pl-4">Te</li>
        </div>
        </Link>
      </div>
      <div className="menubar p-4"></div>

      <h2 className="h2class">Beställ te till eran butik</h2>
        <h3 className="h3class">Våra tesorter:</h3>
        <div className="products">
        <div className="shop flex items-center justify-between">
          <img src="/minze150.jpg" className="productimages"></img>
          <h4 className="h4class">Tepåsar</h4>
          <h5 className="h5class">Minze Zitrone 20 st</h5>
          <p className="text">
          Minze zitrone är en blanding av pepparmint, mynta ochCitron. Har en frisk och söt smak.
          </p>
          <p className="price">40 Kr</p>
        </div>
        <div className="shop flex items-center justify-between">
          <img src="/teaa150.jpg" className="productimages"></img>
          <h4 className="h4class">Löste</h4>
          <h5 className="h5class">Acai Power - Fruktte 200g</h5>
          <p className="text">Superfrukten Acai möter mjuka toner av banan i ett harmoniskt balanserat fruktte. Acaibärets smak kan jämföras med björnbär men med en liten bitterhet som liknar mörk choklad.
         </p>
          <p className="price">91 Kr</p>
       </div>
        <div className="shop flex items-center justify-between">
          <img src="/herbal150.jpg" className="productimages"></img>
          <h4 className="h4class">Örtte</h4>
          <h5 className="h5class">Hibiskus 100g</h5>
          <p className="text">Härligt sötsyrlig hibiskus med en friskt smak. Så fruktigt, och så gott! Dessutom sägs det vara nyttigt. Enkelt att brygga, njut det varmt eller kallt. </p>
          <p className="price">69 Kr</p>
         </div>
         </div>
        <Footer/>
      </div>
    );
}
export default TeaPage;