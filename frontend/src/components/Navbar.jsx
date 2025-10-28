import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { AppContext } from '../Context/AppContext';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { searchBar, setSearchBar } = useContext(AppContext)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-blue-600 text-white fixed w-full top-0 right-0 left-0 z-10 ">
            <div className="md:container mx-auto flex justify-between items-center p-3">
                {/* Logo */}
                <h3 className="text-xl font-bold">
                    Finance
                </h3>

                <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`} >
                    <ul onClick={toggleMenu} className={`flex flex-col bg-blue-600 absolute ${isMenuOpen ? 'top-[55px]' : 'top-[-100%]'
                        } left-0 right-0 transition-all duration-500 w-full gap-4 md:static md:flex-row md:bg-transparent md:gap-6`} >
                        <Link to="/">
                            <li className="hover:bg-white hover:text-black py-2 px-3 rounded-full font-medium">Home</li>
                        </Link>

                        <Link to="/print">
                            <li className="hover:bg-white hover:text-black py-2 px-3 rounded-full font-medium">Print</li>
                        </Link>

                        <Link to="/add">
                            <li className="hover:bg-white hover:text-black py-2 px-3 rounded-full font-medium">Add</li>
                        </Link>
                        <Link to="/entry">
                            <li className="hover:bg-white hover:text-black py-2 px-3 rounded-full font-medium">Entry</li>
                        </Link>
                    </ul>
                </nav>

                <input onChange={(e) => setSearchBar(e.target.value)} value={searchBar} type='text' placeholder='Search Client Name...' className='text-black font-medium placeholder:font-normal  pl-1 border border-black rounded-md outline-none bg-white' />

                {/* Mobile menu toggle */}
                <button onClick={toggleMenu} className="block md:hidden p-2 text-white rounded-full hover:text-white hover:bg-blue-700"><GiHamburgerMenu />
                </button>

            </div>
        </header>
    );
};

export default Navbar;