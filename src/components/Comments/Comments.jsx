import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Comments() {
  const dispatch = useDispatch();
  const history = useHistory();

  // capture local state
  const [comments, setComments] = useState('')

  const handleButton = (movement) => {
    if (movement) {
      dispatch({
        type: 'COMMENTS',
        payload: comments
      })
      history.push('/submit')
    }
    else {
      history.push('/support')
    }
  }

  return(
    <>
    <div className="page_number">
    <p>4 of 4</p>
    <div className="page_box4"></div>
    </div>
    <div className="comment_box">
      <h1>Any comments you want to leave?</h1>
      <textarea
        id="comments"
        name="comments"
        placeholder="Comments..."
        onChange={event => setComments(event.target.value)}>  
      </textarea>
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

export default Comments;