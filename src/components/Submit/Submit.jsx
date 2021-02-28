import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

// set up for styling
import swal from 'sweetalert';
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HomeIcon from '@material-ui/icons/Home';

function Submit() {
  // get data from store on current feedback
  const feedbackReducer = useSelector(store => store.feedbackReducer)
  const history = useHistory();
  const dispatch = useDispatch();

  // toggle button to go home after submitting feedback in local state
  const [isVisible, setIsVisible] = useState(true);
  // toggle description after submitting feedback
  const [reviewFeedback, setReviewFeedback] = useState(true);

  // handle event to go to next page, back, or home
  // alert that Feedback has been submitted
  const handleButton = (movement) => {
    if (movement) {
      // console.log("feedbackReducer", feedbackReducer)
      axios.post('/feedback',  feedbackReducer )
      .then(response => {
        console.log(response);
        swal({
          title: "Thank you!",
          text: "We appreciate you taking the time to leave feedback!",
          icon: "success",
          button: "OK",
        })
        setIsVisible(!isVisible);
        setReviewFeedback(!reviewFeedback);
      })
      .catch(err => {
        console.log(err);
        alert('Error sending data to DB')
      })
    }
    else {
      history.push('/comments')
    }
  }

  // button to return home and clear feedback data
  const goHomeBtn = () => {
    dispatch({
      type: 'RESET'
    })
    history.push('/')
    setIsVisible(!isVisible);
    setReviewFeedback(!reviewFeedback);
  }
  
  return(
    <div className="review_box">
      {reviewFeedback ? (
      <div>
      <h1>Review Your feedback</h1>
      <h4>Feelings: {feedbackReducer.feeling}</h4>
      <h4>Understanding: {feedbackReducer.understanding}</h4>
      <h4>Support: {feedbackReducer.support}</h4>
      <h4>Comments: {feedbackReducer.comments}</h4>
      </div>
      ) : (
      <div><h4>If you would like to start another feedback form, click the home button below!</h4></div>
      )}
      <div className="button_area">
      {isVisible ? (
        <div className="submit_buttons">
        <Button 
          startIcon={<ArrowBackIcon />}
          variant="contained"
          color="secondary"
          onClick={() => handleButton(false)}>
        Previous</Button>
        <Button
          endIcon={<DoneAllIcon />}
          variant="contained"
          color="primary"
          onClick={() => handleButton(true)}>
        Submit</Button>
        </div>
        ) : (
        <Button
          endIcon={<HomeIcon />}
          variant="contained"
          color="primary"
          onClick={() => goHomeBtn()}>
        Home</Button>
        )}
      </div>
    </div>
  )
}

export default Submit;