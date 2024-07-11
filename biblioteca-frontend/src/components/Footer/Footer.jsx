import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div>
                <h4>Recursos</h4>
                <a>Ayuda</a>
                <a>Preguntas Frecuentes</a>
                <a>Términos de Uso</a>
            </div>
            <div>
                <h4>Contacto</h4>
                    <p>Correo: info@bibpotecavirtual.com</p>
                    <p>Teléfono: +1 (555) 123-4567</p>
            </div>
            <div className='footerMargin'>
                <h4>Derechos de Autor</h4>
                <p>© 2024 Biblioteca Virtual. </p>
                <p>Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;

