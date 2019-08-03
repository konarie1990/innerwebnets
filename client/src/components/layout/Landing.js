import React from 'react';

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
            <a href='register.html' className='btn btn-primary'>
              Get Started
            </a>
            <a href='login.html' className='btn'>
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
