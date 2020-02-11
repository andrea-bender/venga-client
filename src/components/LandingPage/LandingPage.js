import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';


class LandingPage extends React.Component {
  constructor(props) {
		super(props);
    this.state = {};
  }
  render() {
    return (
      <main className='landing-page'>
        <div className='landing-page-top'>
          <img
                className="logo-img"
                src={require('../../assets/logo1.png')}
                alt={'venga logo'}
                width={'200px'}
            />
        </div>    
        <h2>Welcome to Venga!</h2> 
        <p>A user friendly app designed to bring the climbing community 
          together. With the number of climbs increasing every year, it 
          can be hard to know what new climbs exist. The purpose of Venga
          is to create a platform where anyone can add new climbs from all 
          over the world. Here you can add the name, location, decsription,
          grade, type of climb, and rate it. So climb on!
        </p>
        <div className='lp-links'>
          <h3>Get Started Below</h3>
        <Link to={'/addclimb'}>Add Climb</Link>
				<Link to={'/climbs'}>View Climbs</Link>
        </div>
        <footer> @Copyright 2020</footer>

      </main>
    )
  }
}


export default LandingPage
