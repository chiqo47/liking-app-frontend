import React from 'react'
import { connect } from 'react-redux'
import {closeSignupWindow, signup} from '../actions'


class SignupPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onOverlayClick = this.onOverlayClick.bind(this)
    }

    handleChange(e) {
      const { name, value } = e.target
      this.setState({ [name]: value })
    }

    handleClose() {
      const { dispatch } = this.props
      dispatch(closeSignupWindow())
    }

    onOverlayClick (e) {
      if (this.overlayNode === e.target) {
        this.handleClose()
      }
    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({ submitted: true })
        const { username, password } = this.state
        const { dispatch } = this.props
        if (username && password) {
            dispatch(signup(username, password))
        }
    }

    render() {
      if (!this.props.signupWindowOpen)
        return null
        // const { isOpen } = this.props
        const { username, password, submitted } = this.state
        return (
          <div className="modal-overlay" onClick={this.onOverlayClick} ref={node => { this.overlayNode = node }}>
            <div className="login-window">
                <h2>Signup</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn-primary">Sign up</button>
                        <button type="button" onClick={this.handleClose} className="btn-secondary">Close</button>
                    </div>
                </form>
            </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        signupWindowOpen: state.auth.signupWindowOpen
    }
}

export default connect(mapStateToProps)(SignupPage)
