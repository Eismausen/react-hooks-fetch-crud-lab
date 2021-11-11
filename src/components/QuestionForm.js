import React, { useState } from "react";

function QuestionForm(props) {
  //important constants
  const API_URL = 'http://localhost:4000/questions';  
  //controlled form data
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctIndex: 0,
  });

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
      });
  }    
  

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    let formattedFormData = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: formData.correctIndex,
    }

    console.log(formattedFormData);

    const postConfig = {
      method: 'POST',
      headers: {'Content-Type': 'application/JSON'},
      body: JSON.stringify(formattedFormData)
    }

    fetch(API_URL, postConfig)
    .then(res => res.json())
    .then(questionObj => props.updateQuestions(questionObj))
    .then(() => setFormData({
      prompt: "",
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctIndex: 0,
    }));

  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
