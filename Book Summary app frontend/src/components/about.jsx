import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="about-section my-3"  >
      
          <h2>About This Project</h2>
          <section style={{textAlign: 'left', marginRight: '50px', padding: '2px', fontFamily: 'serif' }} className='my-5'>
          <p>Welcome to our AI book summary app, designed to empower book lovers, book clubs, researchers, and literature enthusiasts. Our mission is to provide a valuable resource for discovering and exploring new titles across a wide range of genres and topics.</p> 
          <p><b>One of the standout features of our app is the Q&A section, where users can ask questions about the books and receive answers from our AI assistant. This feature is designed to provide additional insights, clarification, and in-depth exploration of the literary works, further enhancing the user's understanding and engagement.</b></p> 
           <p>Join us on this exciting journey as we redefine the way you discover and engage with books. Welcome to our book summary app – your gateway to a world of literary exploration, discovery, and knowledge-sharing.</p> 

          </section>
          
    </Container>
  );
};

export default About;