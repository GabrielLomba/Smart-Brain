import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  changeRoute,
  signInUser
} from '../../actions';

const mapStateToProps = state => ({
  error: state.signInOutUser.error,
});

const mapDispatchToProps = dispatch => ({
  onRouteChange: (route) => dispatch(changeRoute(route)),
  onSignInUser: (user) => dispatch(signInUser(user))
});

class SignIn extends Component {
  state = {
    user: { email: '', password: '' }
  };

  updateUserField = (field, event) => {
    const newValue = event.target.value;
    this.setState(prevState => {
      return { user: { ...prevState.user, [field]: newValue } };
    });
  }

  render() {
    const { onRouteChange, onSignInUser, error } = this.props;
    const { user } = this.state;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address"
                value={user.email} onChange={(event) => this.updateUserField('email', event)}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"
                value={user.password} onChange={(event) => this.updateUserField('password', event)}/>
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() => onSignInUser(user)}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')}
                className="f6 link dim black db pointer">Register</p>
            </div>
            {error &&
              <h3 className='f4 red'>{error}</h3>
            }
          </div>
        </main>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);