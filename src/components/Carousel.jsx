import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import bebida from '../assets/bebidas2.jpg'
import bebida2 from '../assets/cervezas.png'


const carousel = () =>{     
        
  return (
    <div className='hero'>
    <h3 className='titulo'>La tienda mas grande de bebidas</h3>
        
        <Carousel slide={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bebida}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bebida2}
          alt="Second slide"
        />
      </Carousel.Item>
      
    </Carousel>
    </div>
  );
}


export default carousel;