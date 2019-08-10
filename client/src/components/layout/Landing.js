import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Bounce from 'react-reveal/Bounce';
import LightSpeed from 'react-reveal/LightSpeed';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <LightSpeed left>
            <h1 className='x-large'>
              <i className='fas fa-align-right' /> innerwebnets
            </h1>
          </LightSpeed>
          <LightSpeed right>
            <p className='lead'>
              Your super-highway to learn about web development
            </p>
          </LightSpeed>
          <div className='buttons'>
            <Bounce left>
              <Link
                to='/register'
                className='btn btn-primary'
                style={{ margin: '20px' }}
              >
                Get Started
              </Link>
            </Bounce>
            <Bounce right>
              <Link to='/login' className='btn btn-primary'>
                Login
              </Link>
            </Bounce>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
