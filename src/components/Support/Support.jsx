import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';

function Support() {
  const dispatch = useDispatch();
  const history = useHistory();

  // capture local state
  const [support, setSupport] = useState('')

  // handle event to go to next page
  const toComments = () => {
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

  return(
    <div>
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
      <button onClick={() =>toComments()}>Next</button>
    </div>   
  )
}

export default Support;