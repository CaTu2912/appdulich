import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkedAlt, FaBlog, FaPen, FaEnvelope, FaSignInAlt, FaSearch, FaUser } from 'react-icons/fa';
import VImg from "../assets/img/vietnam.jpeg";
import "../assets/css/navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Search Term:', searchTerm);
    };

    return (
        <nav className="navbar" style={{ backgroundImage: `url(${VImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="navbar-container">
                <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </div>
                <ul className={`navbar-list ${isOpen ? 'open' : ''}`}>
                    <li className="navbar-item"><Link to="/" className="navbar-link"><FaHome /> Trang chủ</Link></li>
                    <li className="navbar-item"><Link to="/destination" className="navbar-link"><FaMapMarkedAlt /> Điểm đến</Link></li>
                    <li className="navbar-item"><Link to="/blog" className="navbar-link"><FaBlog /> Blog</Link></li>
                    <li className="navbar-item"><Link to="/post" className="navbar-link"><FaPen /> Bài viết</Link></li>
                    <li className="navbar-item"><Link to="/contact" className="navbar-link"><FaEnvelope /> Liên hệ</Link></li>
                    <li className="navbar-item"><Link to="/profile" className="navbar-link"><FaUser /> Hồ sơ</Link></li>
                    <li className="navbar-item"><Link to="/login" className="navbar-link"><FaSignInAlt /> Đăng nhập</Link></li>
                </ul>

                {/* Thanh tìm kiếm ngoài danh sách menu */}
                <div className="search-container">
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm..." 
                            value={searchTerm} 
                            onChange={handleSearchChange} 
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <FaSearch />
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
