import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  changeRoute,
  signOutUser
} from '../../actions';

const mapStateToProps = state => ({
  isSignedIn: state.signInOutUser.isSignedIn,
});

const mapDispatchToProps = dispatch => ({
  onRouteChange: (route) => dispatch(changeRoute(route)),
  onSignOutUser: () => dispatch(signOutUser())
});

class Navigation extends Component {
  render() {
    const { isSignedIn, onRouteChange, onSignOutUser } = this.props;
    if (isSignedIn) {
      return (
        <nav className='flex justify-end'>
          <p onClick={() => onSignOutUser()} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav className='flex justify-end'>
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);