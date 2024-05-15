import React, { useState, useEffect } from 'react';
import styled from 'styled-components';




function Typewriter({ paragraph, typeSpeed }) {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < paragraph.length) {
        setText((prevText) => prevText + paragraph[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, typeSpeed);

    return () => clearInterval(interval);
  }, [currentIndex, paragraph, typeSpeed]);

  return <p>{text}</p>;
}

const StyledInfo = styled.div`
  padding: 20px;
  max-height: 400px; 
  overflow-y: auto; 
`

function Info() {
  const paragraph = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, alias. Voluptatibus, voluptatem! Est quaerat alias earum dolore quasi inventore illo ipsum rem aperiam, fugit modi repellat nam, error delectus nemo!"
    
  return(
  <StyledInfo>
     <Typewriter paragraph={paragraph} typeSpeed={100} />
  </StyledInfo>
  )
}

export default Info;
