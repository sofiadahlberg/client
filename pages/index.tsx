/* Sofia Dahlberg
Mittuniversitet Sundsvall
Webbutvecklingsprogrammet DT162G 
2024-01-05*/

import React, { useState } from "react";
import Header from "../components/Header";
import CollapsibleComponent from "../components/CollapsibleComponent";
import Link from "next/link";
import Footer from "../components/Footer";

function Index() {
  return (
    <div className="main ">
      <Header />
      <h1>Startsida</h1>
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
      <div className="coffeesort">
        <h2 className="h2class">Beställ kaffe till eran butik</h2>
        <h3 className="h3class">Våra kaffesorter:</h3>

        
        <div className="products">
          <div className="shop flex items-center justify-between">
            <img src="/capsules150.jpg" className="productimages"></img>
            <h4 className="h4class">Kapsyler</h4>
            <h5 className="h5class">Frosted caramel 10st</h5>
            <p className="text">
              De maltiga korn-noterna från brasilianska och colombianska bönor
              blandas harmoniskt med den uppvärmande karamellsmaken, som möts av
              en not av mandel och vaniljkaka.
            </p>
            <p className="price">69 Kr</p>
          </div>

          <div className="shop flex items-center justify-between">
            <img src="/malet150.jpg" className="productimages"></img>
            <h4 className="h4class">Malet</h4>
            <h5 className="h5class">Lucaffé Mamma Lucia 500g</h5>
            <p className="text">
              I blandningen används 40 % Arabica- och 60 % Robusta-bönor. För en
              piggare start på morgonen!
            </p>
            <p className="price">199 Kr</p>
          </div>
          <div className="shop flex items-center justify-between">
            <img src="/beans150.jpg" className="productimages"></img>
            <h4 className="h4class">Bönor</h4>
            <h5 className="h5class">LYKKE BAM BAM 500g</h5>
            <p className="text">
              Lykke BAM BAM är ett espressokaffe för alla. Kaffet har en mjuk
              men livfull smakprofil och toner av fransk nougat, mjölkchoklad,
              kola och söta röda bär.
            </p>
            <p className="price">229 Kr</p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Index;
