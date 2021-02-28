import { useHistory } from 'react-router-dom';

// set up for styling
import Button from '@material-ui/core/Button'
import ForwardIcon from '@material-ui/icons/Forward';

function Home() {
  const history = useHistory();

  // handle event to go to next page
  const begin = () => {
    history.push('/feeling')
  }

  return(
    <div className="home_button">
      <h2>Click below to being leaving your feedback!</h2>
      <Button
        endIcon={<ForwardIcon />}
        variant="contained"
        color="primary"
        onClick={() => begin()}>
      Start!</Button>
    </div>
  )
}

export default Home;