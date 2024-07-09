import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;

