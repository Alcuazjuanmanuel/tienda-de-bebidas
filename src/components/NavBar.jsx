import '../styles/NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/pizzarra.jpg';
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg shadow-lg-a p-3 mb-5 rounded navbar-dark bg-dark border-bottom">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <img src={logo} alt="" width="100" height="100" className="d-inline-block align-text-bottom" color=' rgb(252 89 168)'/>
        
        <h4 className='brand'>TOMA 1</h4>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        
        <li className="nav-item">
          <Link className="cat.beb title-nav nav-link" to={`/category/2`}>Bebidas con alcohol</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to={`/category/1`}>Bebidas sin alcohol</Link>
        </li>
        </ul>
        </div>
        <CartWidget/>
        </div>
        </nav>
    )
}

export default NavBar;