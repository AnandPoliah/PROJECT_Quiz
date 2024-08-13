import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { QuizContext } from '../context/QuizContext';
import './ResultOfAIQuiz.css';
import Navigationbar from '../.Sub_component/NavBar/Navigationbar';

function ResultOfAIQuiz() {
  const { username,aimark,aifoctopic } = useContext(QuizContext);

  return (
    <div style={{ background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)', height: '100vh' }}>
    <div className='navbar-container'>
      <Navigationbar />
    </div>
    <div className="result-container">
    <div style={{ display: 'flex', justifyContent: 'center'}}>
    <Navigationbar />
  </div>
  
      <h2 className="result-header">Result Page</h2>
      <div className="result-info">
        <ul>
          <li>UserName: {username}</li>
          <li>You Scored: {aimark}</li>
        </ul>
      </div>
      <table className="result-table">
        <thead>
          <tr>
            <th>Focus Topic</th>
            <th>Total Questions</th>
            <th>No of Correct</th>
            <th>No of Wrong</th>
          </tr>
        </thead>
        <tbody>
          {aifoctopic.map((quiz, index) => (
            <tr key={index}>
              <td>{quiz.topic}</td>
              <td>{quiz.totalQuestions}</td>
              <td>{quiz.correct}</td>
              <td>{quiz.totalQuestions - quiz.correct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ResultOfAIQuiz;
