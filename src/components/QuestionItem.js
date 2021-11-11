import React from "react";

function QuestionItem({ question , handleDeleteQuestion, updateCorrectIndex}) {
  const { id, prompt, answers, correctIndex } = question;
  
  let options = [];
  try { 
    options = answers.map((answer, index) => (
      <option key={index} value={index}>
        {answer}
      </option>
    ));
  } catch (error) {
    return null;
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={(e) => updateCorrectIndex(e, question)} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={() => handleDeleteQuestion(question)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
