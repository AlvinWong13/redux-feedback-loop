import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Understanding() {
  const dispatch = useDispatch();
  const history = useHistory();

  // capture local state
  const [understanding, setUnderstanding] = useState('')

  // handle event to go to next page
  const handleButton = (movement) => {
    if (movement) {
      if (understanding === "") {
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
          type: 'UNDERSTANDING',
          payload: understanding
      })
        history.push('/support')   
      }
    }
    else {
      history.push('/feeling')
    }
  }

  return(
    <div>
      <h1>How well did you understand the material today?</h1>
      <select
          name="understanding"
          id="understanding"
          value={understanding}
          onChange={event => setUnderstanding(event.target.value)}>
            <option value="" disabled>How well did you understand the material today?</option>
            <option value="5">5 - I can teach someone!</option>
            <option value="4">4 - I have a great grasp on the material</option>
            <option value="3">3 - I understand it but could use some practice</option>
            <option value="2">2 - I understood a little bit</option>
            <option value="1">1 - I did not understand anything</option>
      </select>
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
  )
}

export default Understanding;