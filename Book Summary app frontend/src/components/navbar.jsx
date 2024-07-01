import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
// import Link from './Link';
import { Link } from 'react-router-dom';


function Navbars() {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-info">

      <Container>
        {/* <Navbar.Brand Link to="\"  style={{paddingLeft:'30vw'}} className='text-center'><h1>Book Summary app</h1></Navbar.Brand> */}
        {/* <Nav className="me-auto"> */}
         <Link to="/" style={{paddingLeft:'30vw',textDecoration:'none',color:'black'}} className='text-center navbar brand classname'>
      <h1>Book Summary app</h1>

         </Link>  
          
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {/* <Nav.Link href="/about">About</Nav.Link> */}
        <Link to="/about" className='btn btn-danger' >About </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;