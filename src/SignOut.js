import React from 'react'
import './SignOut.css'

const SignOut = ({signOut}) =>{
    return(
        <div className = "SignOut">
            <button
            onClick={signOut}
            >
            <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
            </button>
        </div>
    )
}

export default SignOut