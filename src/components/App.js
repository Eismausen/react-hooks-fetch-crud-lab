import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {

  //import constants
  const API_URL = 'http://localhost:4000/questions';

  // state - this controls which "page" (component) is displayed
  //           - the QuestionList ("List"), or the QuestionForm ("Form")
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(arrOfQuestionObjs => setQuestions(arrOfQuestionObjs));
  },[])

  function updateQuestions (questionObj) {
    let newAllQuestions = [...questions, questionObj];
    setQuestions(newAllQuestions);
  }

  function handleDeleteQuestion (questionToDelete) {
    //fetch setup
    const DEL_URL = `${API_URL}/${questionToDelete.id}`;
    const DEL_config = {
      method: 'DELETE',
    }
    //prepping questions state update
    const filteredQuestions = questions.filter(question => question.id !== questionToDelete.id);
    //executing fetch DELETE request, and updating state on completion
    fetch(DEL_URL, DEL_config)
    .then(res => res.json())
    .then(() => setQuestions(filteredQuestions))
  }

  function updateCorrectIndex (e, questionObj) {
    //prep
    const newCorrectIndex = e.target.value;
    console.log(newCorrectIndex);
    const update = {correctIndex: newCorrectIndex};
    const PATCH_URL = `${API_URL}/${questionObj.id}`;
    const PATCH_config = {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(update),
    }
    const newQuestionObj = {...questionObj, update};
    const newQuestionList = [...questions].map(question => {
      if (question.id === newQuestionObj.id) {
        return newQuestionObj;
      } else {
        return question;
      }
    });

    //plug the prep work into the fetch, nice and pretty
    fetch(PATCH_URL, PATCH_config)
    .then(res => res.json())
    .then(() => setQuestions(newQuestionList));
    
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm updateQuestions={updateQuestions}/> : <QuestionList questions={questions} handleDeleteQuestion={handleDeleteQuestion} updateCorrectIndex={updateCorrectIndex}/>}
    </main>
  );
}

export default App;
