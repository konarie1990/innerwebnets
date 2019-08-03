import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>innerwebnets</h1>
          <p className='lead'>
            Your super highway to the coolest place on the internet
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Get Started
            </Link>
            <Link to='/login' className='btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
