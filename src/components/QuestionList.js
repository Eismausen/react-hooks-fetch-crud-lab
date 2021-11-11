import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, handleDeleteQuestion, updateCorrectIndex}) {
  
  //generate questionItems
  let questionsToRender = questions.map(question => <QuestionItem key={question.id} question={question} handleDeleteQuestion={handleDeleteQuestion} updateCorrectIndex={updateCorrectIndex}/>);
    
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsToRender}</ul>
    </section>
  );
}

export default QuestionList;
