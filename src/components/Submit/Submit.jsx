import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HomeIcon from '@material-ui/icons/Home';

function Submit() {
  const feedbackReducer = useSelector(store => store.feedbackReducer)
  const history = useHistory();
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(true);

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

  const goHomeBtn = () => {
    dispatch({
      type: 'RESET'
    })
    history.push('/')
    setIsVisible(!isVisible);
  }



  return(
    <div className="review_box">
      <h1>Review Your feedback</h1>
      <h4>Feelings: {feedbackReducer.feeling}</h4>
      <h4>Understanding: {feedbackReducer.understanding}</h4>
      <h4>Support: {feedbackReducer.support}</h4>
      <h4>Comments: {feedbackReducer.comments}</h4>
      <div className="button_area">
        <Button 
          startIcon={<ArrowBackIcon />}
          variant="contained"
          color="secondary"
          onClick={() => handleButton(false)}>
        Previous</Button>
        {isVisible ? (
        <Button
          endIcon={<DoneAllIcon />}
          variant="contained"
          color="primary"
          onClick={() => handleButton(true)}>
        Submit</Button>
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