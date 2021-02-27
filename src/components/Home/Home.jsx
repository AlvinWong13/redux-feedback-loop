import { useHistory, Link } from 'react-router-dom';

function Home() {
  const history = useHistory();

  const begin = () => {
    history.push('/feeling')
  }

  return(
    <div>
      <p>Cullen Feedback Form</p>
      <button onClick={() => begin()}>Begin!</button>
    </div>
  )
}

export default Home;