/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import EvaluateAll from "../../features/Users/EvaluateAll"; // Assuming EvaluateAll is a React component
import Row from "../../ui/Row";

const RatingScale = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px; /* Adjust as needed */

  h2 {
    color: #f0594a; /* Orange-red for a clear distinction */
    margin-bottom: 10px; /* Adjust as needed */
  }

  .rating-bar {
    width: 100%;
    height: 20px;
    background: linear-gradient(
      to right,
      #f0a30a,
      #f9d423,
      #f0f0f0,
      #92d0c3,
      #428bca
    ); /* Gradient with more distinct colors */
    border-radius: 10px;
    position: relative;
  }

  .rating-segment {
    position: absolute;
    top: 0;
    height: 100%;
    width: calc(20% - 2px); /* Adjust based on number of segments */

    /* Use consistent naming conventions (e.g., veryGood -> veryGood) */
    &.veryGood {
      background-color: #92d0c3; /* Light blue for "Good" */
      left: 80%;
    }

    &.good {
      background-color: #92d0c3; /* Light blue for "Good" */
      left: 60%;
    }

    &.neutral {
      background-color: #f0f0f0; /* Gray for "Neutral" */
      left: 40%;
    }

    &.bad {
      background-color: #f9d423; /* Yellow for "Bad" */
      left: 20%;
    }

    &.veryBad {
      background-color: #f0a30a; /* Orange for "Very Bad" */
      left: 0%;
    }
  }

  .rating-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 5px; /* Adjust as needed */
    font-size: 12px;
  }
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* Adjust as needed */
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  cursor: pointer;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Tmeval = () => {
  const [language, setLanguage] = useState("English");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <LanguageSelector>
        <Label htmlFor="languageSelect">Select Language:</Label>
        <Select
          id="languageSelect"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="English">English</option>
          <option value="Amhric">Amharic</option>
        </Select>
      </LanguageSelector>

      <RatingScale>
        <h2>RATING SCALE</h2>
        <div className="rating-bar">
          <div className="rating-segment veryGood">Very Good (5)</div>
          <div className="rating-segment good">Good (4)</div>
          <div className="rating-segment neutral">Neutral (3)</div>
          <div className="rating-segment bad">Bad (2)</div>
          <div className="rating-segment very-bad">Very Bad(1)</div>
        </div>
      </RatingScale>

      <EvaluateAll language={language} />
    </>
  );
};

export default Tmeval;
