import './Footer.css';
import logo from '../../assets/logo.png'

const Footer = () => {
    return (
        <footer>
            <img src={logo} alt="logo" />
            <div>
                <h4>Recursos</h4>
                <a>Ayuda</a>
                <a>Preguntas Frecuentes</a>
                <a>Términos de Uso</a>
            </div>
            <div>
                <h4>Contacto</h4>
                    <p>Correo: barquisimeto@uts.edu.ve</p>
                    <p>Teléfono: (0251) 9351767 / 252.49.82</p>
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

