import { useHistory, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

function Home() {
  const history = useHistory();

  const begin = () => {
    history.push('/feeling')
  }

  return(
    <div>
      <h2>Cullen Feedback Form</h2>
      <Button
        endIcon={<PlayCircleOutlineIcon />}
        variant="contained"
        color="secondary"
        onClick={() => begin()}>
      Start Feedback!</Button>
    </div>
  )
}

export default Home;