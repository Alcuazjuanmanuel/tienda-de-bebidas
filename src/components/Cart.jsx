import React, { useContext,useState } from 'react';
import { CartContext } from "../context/CartContext";
import Table from 'react-bootstrap/Table';
import '../styles/styledComponents.css'
import { collection, serverTimestamp, setDoc, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"
import Swal  from "sweetalert2"
import { Modal, Button, Form } from 'react-bootstrap';

const Cart = () => {
    const test = useContext(CartContext);
    //console.log(test.cartList);

    const [showModal, setShowModal] = useState(false);
    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        let itemsForFirebase = test.cartList.map(item => ({
            key: item.id,
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.cantidad
        }));

        let order = {
            buyer: {
                email: buyerInfo.email,
                name: buyerInfo.name,
                phone: buyerInfo.phone
            },
            date: serverTimestamp(),
            items: itemsForFirebase,
            total: test.totalPrice()
        };
        //console.log(order);

        const createOrdeFirestore = async () => {
            const orderRef = doc(collection(db, "orders"));
            await setDoc(orderRef,order);
            return orderRef;
        };

        createOrdeFirestore().then(result => 
            Swal.fire({
                title: "Gracias por su compra!!!!!",
                text: "Tu Orden fue creada exitosamente bajo el ID " + result.id,
                imageUrl: 'https://sannicolasbebidas.uy/wp-content/uploads/2022/04/san-nicolas-bebidas-espirituosas-mobile.png',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'bebidas varias',
            })
        );
      
        test.cartList.forEach(async (item) => {
            const itemRef = doc(db, "bebidas", item.id);
            await updateDoc(itemRef, {
                stock: increment(-item.cantidad)
            });
        });

        // Vaciar el carrito después de concretar la compra
        test.clearAll();
        setBuyerInfo({
            name: '',
            email: '',
            phone: ''
        });
        handleCloseModal();
    }

return (
        <>
            {
                (test.cartList.length > 0 )
                ? 
                <>
                    <button className="btn btn-danger btn-sm btn-borrar btn-vaciarCarrito" onClick={test.clearAll}>Vaciar Carrito</button>
                    
{test.cartList.map(item => 
  <Table table bordered hover variant="dark">
    <tbody>
      <tr className="tr">
        <td className="td-img"><img className="img-carrito" src={item.image} alt="" /></td>
        <td className="td-texto" style={{ paddingTop: 50 }}>{item.name}</td>
        <td className="td-texto" style={{ paddingTop: 50 }}>{item.description}</td>
        <td className="td-texto" style={{ paddingTop: 50 }}>{item.cantidad} items</td>
        <td className="td-texto" style={{ paddingTop: 50 }}>${item.price} c/u</td>
        <td><button className="btn btn-sm btn-trash" onClick={() => test.removeItem(item.id)}>🗑 </button></td>
      </tr>
    </tbody>
  </Table>
)}
<div className="total">Total: ${test.totalPrice()}</div>
<button className="btn btn-success btn-sm btn-comprar" onClick={handleShowModal}>Comprar</button>
<Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Ingrese sus datos</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formBasicName">
        <Form.Label>Nombre y Apellido</Form.Label>
        <Form.Control type="text" name="name" value={buyerInfo.name} onChange={handleChange} required placeholder="Ingrese su nombre y apellido" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={buyerInfo.email} onChange={handleChange} required placeholder="Ingrese su email" />
      </Form.Group>
<Form.Group controlId="formBasicPhone">
<Form.Label>Teléfono</Form.Label>
<Form.Control type="tel" name="phone" value={buyerInfo.phone} onChange={handleChange} required placeholder="Ingrese su teléfono" />
</Form.Group>
</Form>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleCloseModal}>
Cancelar
</Button>
<Button variant="primary" onClick={handleSubmit}>
Comprar
</Button>
</Modal.Footer>
</Modal>
</>
:
<div className="carrito-vacio empty-cart text-center">Tu carrito está vacío</div>
}
</>
)
}

export default Cart;




