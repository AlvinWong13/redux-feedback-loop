import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

// set up for styling
import swal from 'sweetalert';
import Button from '@material-ui/core/Button'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Feeling() {
  const dispatch = useDispatch();
  const history = useHistory();

  // capture local state
  const [feeling, setFeeling] = useState('')

  // handle event to go to next page and back
  // alert to make sure option picked
  const handleButton = () => {
    if (feeling === "") {
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
              type: 'FEELING',
              payload: feeling
            })
          history.push('/understanding')   
          }
  }

  return(
    <>
    <div className="page_number">
    <p>1 of 4</p>
    <div className="page_box1"></div>
    </div>
    <div className="feedback_box" >
      <h1>How are you feeling today?</h1>
      <select
          name="feeling"
          id="feeling"
          value={feeling}
          onChange={event => setFeeling(event.target.value)}>
            <option value="" disabled>How did you feel today?</option>
            <option value="5">5 - Best day ever!</option>
            <option value="4">4 - Feeling pretty good</option>
            <option value="3">3 - Not too bad, but it could be better</option>
            <option value="2">2 - Not too great</option>
            <option value="1">1 - I wish today was over</option>
      </select>
      <div className="button_area">
        <Button 
          endIcon={<ArrowForwardIcon />} 
          variant="contained" 
          color="primary"
          onClick={() => handleButton()}>
        Next</Button>
      </div>
    </div>
    </>
  )
}

export default Feeling;