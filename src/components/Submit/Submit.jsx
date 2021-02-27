import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

function Submit() {
  const feedbackReducer = useSelector(store => store.feedbackReducer)
  const history = useHistory();
  const dispatch = useDispatch();

  const submitFeedback = () => {
    alert('Submitted!')
    dispatch({
      type: 'RESET'
    })
    history.push('/')
  }

  return(
    <div>
      <h1>Review Your feedback</h1>
      <h4>Feelings: {feedbackReducer.feeling}</h4>
      <h4>Understanding: {feedbackReducer.understanding}</h4>
      <h4>Support: {feedbackReducer.support}</h4>
      <h3>Comments: {feedbackReducer.comments}</h3>
      <button onClick={() => submitFeedback()}>Submit</button>
    </div>
  )
}

export default Submit;