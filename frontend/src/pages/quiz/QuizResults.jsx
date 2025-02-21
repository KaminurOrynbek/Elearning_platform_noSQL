import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../../main";
import toast from "react-hot-toast";
import "./QuizResults.css";

const QuizResults = ({ user }) => {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      console.log("fetchResults function called"); // Log when fetchResults is called
      try {
        const response = await axios.get(`${server}/api/quiz/results/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        console.log("API response:", response); // Log the API response
        const { data } = response;
        console.log("Fetched results:", data.results); // Log the fetched results
        setResults(data.results);
      } catch (error) {
        console.error("Error fetching results:", error); // Log the error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
          toast.error(error.response.data.message || "An error occurred");
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error request data:", error.request);
          toast.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
          toast.error("An error occurred while setting up the request");
        }
      }
    };

    fetchResults();
  }, [id]);

  if (!results) return <div>Loading...</div>;

  console.log("Results state:", results); // Log the results state

  return (
    <div className="quiz-results-container">
      <h2>Quiz Results</h2>
      <div className="quiz-results">
        <h3>Your Results</h3>
        <p>Score: {results.filter(result => result.isCorrect).length} / {results.length}</p>
        <ul>
          {results.map((result, index) => (
            <li key={index} className={result.isCorrect ? "correct" : "incorrect"}>
              <p>Question: {result.question}</p>
              <p>Your Answer: {result.userAnswer}</p>
              <p>Correct Answer: {result.correctAnswer}</p>
            </li>
          ))}
        </ul>
        {results.length > 0 && results[0]?.course && (
          <button onClick={() => navigate(`/course/study/${results[0].course}`)} className="common-btn">
            Back to Course
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizResults;