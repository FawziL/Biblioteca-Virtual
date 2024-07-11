import React, { useRef, useEffect } from 'react';
import './Carousel.css';
import img1 from '../../assets/photo2.jpg'
import img2 from '../../assets/photo1.jpg'
import img3 from '../../assets/photo3.jpg'
import img4 from '../../assets/photo4.jpg'

export default function Component() {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const totalItems = carousel.children.length;
      const itemWidth = carousel.children[0].offsetWidth;
      const scrollPosition = (totalItems / 2 - 0.5) * itemWidth - (carousel.offsetWidth / 2) + (itemWidth / 2);

      carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const categories = [
    { 
      type: 'Sátira', 
      description: 'La sátira es una técnica literaria y de expresión artística que busca ridiculizar o criticar mediante la exageración y la ironía, aspectos sociales, políticos o personales.', 
      link: '/search?category=satira',
      img: img4
    },
    { 
      type: 'Historia', 
      description: 'La historia es el estudio del pasado, especialmente cómo se relaciona con los humanos. Se analiza a través de documentos, relatos y restos arqueológicos.', 
      link: '/search?category=historia',
      img: img2 
    },
    { 
      type: 'Ciencia', 
      description: 'La ciencia es el estudio sistemático de la estructura y el comportamiento del mundo físico y natural a través de la observación y el experimento.', 
      link: '/search?category=ciencia',
      img: img1
    },
    { 
      type: 'Ficción', 
      description: 'La ficción es la creación de historias imaginarias que pueden basarse en la realidad pero incorporan elementos inventados o fantásticos.', 
      link: '/search?category=ficcion',
      img: img3 
    },
    { 
      type: 'Arte', 
      description: 'El arte abarca una amplia gama de actividades humanas creativas que expresan ideas y emociones, incluyendo la pintura, la escultura, la música y la literatura.', 
      link: '/search?category=arte',
      img: img1
    },
  ];

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel" ref={carouselRef}>
          {categories.map((category, index) => (
            <div className="carousel-item" key={index}>
              <img
                src={category.img}
                alt={`Image ${index + 1}`}
                width={600}
                height={400}
                className="carousel-image"
              />
              <div className="carousel-content">
                <h3 className="carousel-category">{category.type}</h3>
                <p className="carousel-description">{category.description}</p>
                <a href={category.link} className="carousel-button">Ver más</a>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-gradient" />
      </div>
    </div>
  );
}
