import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

// set up for styling
import swal from 'sweetalert';
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Support() {
  const dispatch = useDispatch();
  const history = useHistory();

  // capture local state
  const [support, setSupport] = useState('')

  // handle event to go to next page and back
  // alert to make sure option picked
  const handleButton = (movement) => {
    if (movement) {
      if (support === "") {
          swal({
            title: "Please pick one",
            text: "Your feedback helps us improve",
            icon: "warning",
            button: "OK",
          })
          .then(response => {
            if(response) {
              return
            }
          });
          }
      else {
        dispatch({
          type: 'SUPPORT',
          payload: support
      })
        history.push('/comments')   
      }
    }
    else {
      history.push('/understanding')
    }
  }

  return(
    <>
    <div className="page_number">
    <p>3 of 4</p>
    <div className="page_box3"></div>
    </div>
    <div className="feedback_box">
      <h1>How well did you feel supported today?</h1>
      <select
          name="support"
          id="support"
          value={support}
          onChange={event => setSupport(event.target.value)}>
            <option value="" disabled>How well did you feel supported today?</option>
            <option value="5">5 - All of the support!</option>
            <option value="4">4 - I feel well supported</option>
            <option value="3">3 - I felt supported</option>
            <option value="2">2 - I could have used more support</option>
            <option value="1">1 - Not at all</option>
      </select>
      <div className="button_area">
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          color="secondary"
          onClick={() => handleButton(false)}>
        Previous</Button>
        <Button
          endIcon={<ArrowForwardIcon />}
          variant="contained"
          color="primary"
          onClick={() => handleButton(true)}>
        Next</Button>
      </div>
    </div>
    </>   
  )
}

export default Support;