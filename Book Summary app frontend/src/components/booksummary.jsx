import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';
// import './animation.css'
import { TypeAnimation } from 'react-type-animation';
import { remark } from 'remark';
import parse from 'html-react-parser';
import Button from 'react-bootstrap/Button';


function Book() {
  const [bookName, setBookName] = useState('');
  const [bookInfo, setBookInfo] = useState('');
  const [bookUrl, setBookUrl] = useState('');
  const [animationKey, setAnimationKey] = useState(0);
  const [questions,setQuestions]=useState({})
  const [showquestion,setShowQuestion]=useState()



const qCalled=async(q)=>{
  try{
  const ans=await axios.post(`http://127.0.0.1:5000/questions/`,{
    params: {
      q: questions[q],
    }

  }
    
  );
  setBookInfo(ans.data.data)
  console.log(ans.data.data)
  setShowQuestion(questions[q])
  const  question=await axios.get(`http://127.0.0.1:5000/question/`);
  console.log(ans.data.data)
  questions[q]=question.data.q
  setAnimationKey(animationKey + 1); // Update the animation key

  }
  catch (error) {
    console.error(error);
  }
  
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:5000/info/${bookName}`);
      // setBookInfo(parse(marked.parse(response.data.data)));
    // setBookInfo(marked(response.data.data))
    setShowQuestion()
    setBookInfo(parse(response.data.data))

    
      
      const bookmeta = await axios.get(`http://127.0.0.1:5000/bookinfo`);
      const cover_img = await axios.get(`https://bookcover.longitood.com/bookcover`, {
        params: {
          book_title: bookmeta.data.title,
          author_name: bookmeta.data.author
        }
      });
      const  question=await axios.get(`http://127.0.0.1:5000/questions/`);
      setQuestions(question.data)
      setBookUrl(cover_img.data.url);
      setAnimationKey(animationKey + 1); // Update the animation key
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='my-5'>
        <input
          type="text"
          value={bookName}
          onChange={(event) => setBookName(event.target.value)}
          placeholder="Enter book name"
        />
        <button type="submit">send</button>
      </form>
      {bookName
       &&<img src={bookUrl} style={{ maxWidth: '200px', maxHeight: '400px', border: '2px solid black' }} alt={bookName} />
}

      {bookInfo && (
        
        <div className='container my-3'>
          <div id='bookdata' style={{ border: '5px solid black', textAlign: 'left', marginRight: '50px', padding: '2px', fontFamily: 'serif' }}>
          <div style={{fontSize:'2em'}}>{showquestion}</div>
            <div className="typing.."  style={{}} key={animationKey}  >
              <TypeAnimation
                sequence={[

                  bookInfo,
                  3000,
                ]}
                speed={{ type: 'keyStrokeDelayInMs', value: 10 }}
                omitDeletionAnimation={true}
                style={{ whiteSpace: 'pre-line', fontSize: '2em', display: 'block', minHeight: '200px' }}
                // style={{ fontSize: '1em', display: 'block', minHeight: '200px' }}
                // repeat={Infinity}
                cursor={false}
              />
            </div>
          </div>
          <div className="d-grid gap-2 my-3">
      <Button variant="primary" size="lg" onClick={()=>qCalled("q1")}>
        {questions.q1}
      </Button>
      <Button variant="secondary" size="lg" onClick={()=>qCalled("q2")}>
      {questions.q2}
      </Button>
      <Button variant="warning" size="lg" onClick={()=>qCalled("q3")}>
      {questions.q3}
      </Button>
    </div>
        </div>
      )}
    </div>
  );
}

export default Book;