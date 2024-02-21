import React, { useState, useEffect, useContext } from 'react';
import '../../styles/createItinerary.css';
import avatar1 from "../../img/avatar1.png";
import { Context } from "../store/appContext";
import { ToastContainer, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const CreateItinerary = () => {
  {
    const initialQuestions =
    {
      "Location": 'We have 8 questions for you..Where do you want to go?',
      "Group size": 'How many people are there in your group?',
      "Time at disposal": 'How many days do you plan to stay?',
      "Time of the year": 'What time of the year would you like to go?',
      "Interests": 'What are your interests? Like food, history, nature, arts..',
      "Level of fitness": 'What is your level of fitness?',
      "Dietary requirement": 'Almost there, please indicate your dietary preferences?',
      "Budget": 'And finally.. your daily budget?',
    };

    const [questions, setQuestions] = useState(initialQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({
      "Location": "",
      "Group size": "",
      "Time at disposal": "",
      "Time of the year": "",
      "Interests": "",
      "Level of fitness": "",
      "Dietary requirement": "",
      "Budget": "",
    });

    const [generatedItinerary, setGeneratedItinerary] = useState(null);
    const [quizInProgress, setQuizInProgress] = useState(true);
    const { store, actions } = useContext(Context);
    const [itineraryName, setItineraryName] = useState("");
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleAnswerInput = (e) => {
      e.persist();

      const key = getKeyByIndex();
      setUserAnswers((oldValue) => ({
        ...oldValue,
        [key]: e.target.value,
      }));

      if (e.key === 'Enter') {
        askNextQuestion();
      }
    };

    const askNextQuestion = async () => {
      if (!quizInProgress) {
        return;
      }

      if (!userAnswers[getKeyByIndex()].trim()) {
        setToastMessage("Please provide an answer before moving to the next question.");
        setShowToast(true);
        return;
      }

      setUserAnswers((oldValue) => ({
        ...oldValue,
        [getKeyByIndex()]: userAnswers[getKeyByIndex()],
      }));

      if (currentQuestionIndex === 2) {
        const numDays = parseInt(userAnswers["Time at disposal"]);
        if (!store.accessToken && (isNaN(numDays) || numDays > 3)) {
          setToastMessage("In the Demo version, you can only see itineraries of up to 3 days. Please Login to unlock this feature!");
          setShowToast(true);
          return;
        }
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);

      if (currentQuestionIndex === 7) {
        if (!store.accessToken) {
          const numItineraries = parseInt(sessionStorage.getItem('numItineraries')) || 0;
          if (numItineraries >= 3) {
            setToastMessage("In the Demo version, you can only generate up to 3 itineraries per day.");
            setShowToast(true);
            return;
          }
          // Increment the number of itineraries
          sessionStorage.setItem('numItineraries', numItineraries + 1);
        }
        setLoading(true);

        const response = await fetch(process.env.BACKEND_URL + '/api/createItinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userAnswers),
        });

        const result = await response.json();

        if (response.ok) {
          setGeneratedItinerary(result.days);
          setQuizInProgress(false);
          setLoading(false);
        } else {
          console.error('Error generating itinerary:', result.error);
          setLoading(false);
        }
      }
    };

    const goToPreviousQuestion = () => {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const getKeyByIndex = () => {
      const keys = Object.keys(questions);
      return keys[currentQuestionIndex];
    };

    const handleSaveItinerary = async () => {
      try {
        const accessToken = store.accessToken;

        const response = await fetch(process.env.BACKEND_URL + '/api/saveItinerary', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${store.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itinerary: generatedItinerary,
            itineraryName: itineraryName,
          }),
        });

        console.log(response);

        if (!response.ok) {
          setToastMessage(`Error saving itinerary: ${response.statusText}`);
          setShowToast(true);
        } else {
          setToastMessage("Itinerary successfully saved!");
          setShowToast(true);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    const handleStartAgain = () => {
      if (!store.accessToken) {
        const numItineraries = parseInt(sessionStorage.getItem('numItineraries')) || 0;
        if (numItineraries >= 3) {
          setToastMessage("In the Demo version, you can only generate up to 3 itineraries per day.");
          setShowToast(true);
          return;
        }
      }
      setQuestions(initialQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setGeneratedItinerary(null);
      setQuizInProgress(true);
    };

    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && currentQuestionIndex === 8) {
          handleStartAgain();
        }
      };

      if (currentQuestionIndex === 8) {
        document.addEventListener('keypress', handleKeyPress);
      }

      return () => {
        document.removeEventListener('keypress', handleKeyPress);
      };
    }, [currentQuestionIndex]);


    return (
      <>
          <div className="avatar-container col-12" id='avatarcontainer'>
            <div className="card1 col-6">
              <div className='avatar-box '>
                <div className='avatar ' id='avatar-placeholder'><img src={avatar1} alt="avatar" id='avatar' />
                  <p className="card-text" id='Dio'>Assistant DioDio</p> 
                </div>
                <div className='box n1' id='question'>
                  {currentQuestionIndex === 8
                    ? 'Here is your itinerary, enjoy your holiday!'
                    : questions[getKeyByIndex()]}
                </div>
              </div>
              <div className="card-body">
                
                {currentQuestionIndex !== 8 && (
                  <div className='input-buttons'>
                    <input
                      type='text'
                      id='answerInput'
                      placeholder='Your answer'
                      value={userAnswers[getKeyByIndex()] || ''}
                      onChange={handleAnswerInput}
                      onKeyPress={handleAnswerInput}
                      required
                    />
                    <div className='nbutton'>
                      {currentQuestionIndex !== 0 && (
                      <button id='nextbutton' className='me-4' onClick={goToPreviousQuestion}>Previous Question</button>
                      )}
                      <button id='nextbutton' onClick={askNextQuestion}>{currentQuestionIndex === 7 ? 'Generate Itinerary' : 'Next Question'}</button>
                    </div>
                  </div>
                )}
                <div className='start-again'>
                  {currentQuestionIndex === 8 && (
                    <button id='nextbutton' onClick={handleStartAgain}>Start Again</button>
                  )}
                </div>
              </div>
            </div>
            <div className='answer-card'>
              <div className='answer-box'>
                <div className='answer-item '>
                  {loading ? (
                    <FontAwesomeIcon className='cog' icon={faSync} spin />
                  ) : (
                    <>
                      {generatedItinerary !== null && (
                        <div className='generated-itinerary' id='generated-itinerary'>
                          {generatedItinerary.map((day, index) => (
                            <div className="mapped" key={index}>
                              <div className='days'> <h3>Day {index + 1}</h3> </div>
                              <div className='itinerary'>
                                <div className='object'><strong>Accommodation</strong> {day.accommodation}</div> <br />
                                <div className='object'><strong>Activities</strong>
                                  <ul>
                                    {day.activities.map((activity, i) => (
                                      <li key={i}>{activity}</li>
                                    ))}
                                  </ul></div>
                                <div className='object'> <strong>Lunch</strong> {day.lunch}</div> <br />
                                <div className='object'> <strong>Dinner</strong> {day.dinner}</div> <br />
                                <div className='object'> <strong>Transportation</strong> {day.transportation}</div>
                              </div>
                              {index < generatedItinerary.length - 1 && <hr className='day-divider' />}
                            </div>
                          ))}
                          {store.accessToken && (
                            <div>
                              <input type="text" name="Itinerary Name" placeholder="Please give a name to your itinerary..." onChange={e => setItineraryName(e.target.value)} required></input>
                              <button className="save-button" onClick={handleSaveItinerary}>Save Itinerary</button>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="toaster">
                <ToastContainer position="top-center">
                  <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide
                    className="bg-dark text-white border border-light">
                    <Toast.Header>
                      <strong className="me-auto text-black">Notification</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                  </Toast>
                </ToastContainer>
              </div>
            </div>
          </div>
        
      </>
    );

  }
}
export default CreateItinerary;