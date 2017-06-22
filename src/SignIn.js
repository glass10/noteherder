import React from 'react'

import './SignIn.css'
import { auth, githubProvider, googleProvider } from './base'

const SignIn = () => {
  const authenticate = (provider) => {
    auth.signInWithPopup(provider)
  }

  return (
    <div className="container">
      <section id="content">
          <h1>Login</h1>
            <button
                className="SignIn GitHub"
                onClick={() => authenticate(githubProvider)}
              >
              <img alt="" id="githubLogo" src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"></img>
                Sign In With GitHub
              </button>
            <button
                className="SignIn Google"
                onClick={() => authenticate(googleProvider)}
              >
              <img alt="" id="googleLogo" src="http://diaryofasocialgal.com/wp-content/uploads/2016/10/google-plus-icon.png"></img>
              Sign In With Google
              </button>
      </section>
    </div>
  )
}

export default SignIn