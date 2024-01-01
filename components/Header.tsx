//Component header.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';

const Header: React.FC = () => {
    return (
        
        <header className={styles.header}>
         
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Judson&family=Julius+Sans+One&display=swap" rel="stylesheet" />
     
            <div className={styles.background}>
                <div className={styles.circleheader}>
                    <h1 className="text-white text-5xl font-bold absolute inset-0 flex items-center justify-center">
                        <span>C</span>
                        <span>o</span>
                        <span>f</span>
                        <span>f</span>
                        <span>t</span>
                        <span>e</span>
                        <span>a</span>
                    </h1>
                </div>
                <p className="headerText">Kaffe & Te </p>
            </div>
            <nav className="md:flex md:justify-center md:items-center">
                <ul className="ulmenu flex justify-center items-center md:w-3/4 lg:w-2/4">
                   <li className="menu ">
                    <Link href="/"  className="Link">
                        Startsida
                    </Link>
                    </li>
                    <li className="menu ">
                    <Link href="/orders" className="Link ">
                       Pågående ordrar
                    </Link>
                    </li>
                    <li className="menu">
                    <Link href="/customers" className="Link ">
                        Kundbutiker
                    </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;