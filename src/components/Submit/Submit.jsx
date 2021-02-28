import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneAllIcon from '@material-ui/icons/DoneAll';

function Submit() {
  const feedbackReducer = useSelector(store => store.feedbackReducer)
  const history = useHistory();
  const dispatch = useDispatch();

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
        .then(submit => {
          if(submit) {
            dispatch({
              type: 'RESET'
            })
            history.push('/');
          }
        });
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
  return(
    <div className="review_box">
      <h1>Review Your feedback</h1>
      <h4>Feelings: {feedbackReducer.feeling}</h4>
      <h4>Understanding: {feedbackReducer.understanding}</h4>
      <h4>Support: {feedbackReducer.support}</h4>
      <h3>Comments: {feedbackReducer.comments}</h3>
      <div className="button_area">
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
    </div>
  )
}

export default Submit;