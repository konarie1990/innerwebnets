import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn'>
        <i class='fas fa-user-astronaut text-primary' /> Edit Profile
      </Link>
      <Link to='/add-experience' class='btn'>
        <i class='fas fa-briefcase text-primary' /> Add Experience
      </Link>
      <Link to='/add-education' class='btn'>
        <i class='fas fa-glasses text-primary' /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
