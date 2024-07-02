import './Home.css'
import imgCTA from '../../assets/callToAction.avif'

const Home = () => {
  return (
    <>
      <div className='home'>
        <h1>Busca y encuentra información digital</h1>
        <h2>Encontrarás libros con información relevante a tu carrera universitaria</h2>
        <form action="/search">
          <input type="text" className='search' placeholder='Buscar...'/>
        </form>
        <a href="/search" className='advanceSearch'>Busqueda Avanzada</a>
      </div>

      <h3>Categotias</h3>

      <section className="content-section">
        <img src={imgCTA} alt="Descripción de la imagen" />
        <div className="text-container">
          <h2>Queremos brindar las mejores oportunidades para nuestros estudiantes</h2>
          <p>Con este nuevo catálogo podrás encontrar libros académicos necesarios para tu carrera.</p>
          <button href="/search" className='advanceSearch'>Buscar libros</button>
        </div>
      </section>
    </>
  );
};

export default Home;