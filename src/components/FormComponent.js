import React, { useState } from 'react';
import './FormComponent.css'; // Import the CSS file for styling
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.13.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const values = {
  ZOOM_MEETING_SDK_KEY : "tvzGMbNTSqCcNGaAST4AlQ",
  ZOOM_MEETING_SDK_SECRET : "SdR3KkTYV8wdTe5qbikWXTQ0wpdfcIza",
  meetingNumber: 89295397410,
  role : 0,
  signature : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJ0dnpHTWJOVFNxQ2NOR2FBU1Q0QWxRIiwibW4iOjg5Mjk1Mzk3NDEwLCJyb2xlIjowLCJpYXQiOjE2OTQ0MTQ2MTcsImV4cCI6MTY5NDQyMTgxNywiYXBwS2V5IjoidHZ6R01iTlRTcUNjTkdhQVNUNEFsUSIsInRva2VuRXhwIjoxNjk0NDIxODE3fQ.tP_hHwTjutdHTaW5prAhmqHkcD99warO1s1-qK9Ei2c"
}

const FormComponent = () => {
  var sdkKey = values.ZOOM_MEETING_SDK_KEY
  var meetingNumber = values.meetingNumber;
  var passWord = values.password;
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = 'http://localhost:3000'

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [userEmailError, setUserEmailError] = useState('');

  const validateUserName = () => {
    if (userName.length <= 3 || !/^[a-zA-Z]+$/.test(userName)) {
      setUserNameError('User name must be greater than 3 characters and contain only alphabets.');
      return false;
    }
    setUserNameError('');
    return true;
  };

  const validateUserEmail = () => {
    if (!userEmail.includes('@gmail.com')) {
      setUserEmailError('Please enter a valid Gmail address.');
      return false;
    }
    setUserEmailError('');
    return true;
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const getSignature = () => {
    startMeeting(values.signature);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isUserNameValid = validateUserName();
    const isUserEmailValid = validateUserEmail();

    if (isUserNameValid && isUserEmailValid) {
      getSignature();
    }
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>User Name</label>
          <input
            type="text"
            className={`input-field ${userNameError ? 'input-error' : ''}`}
            value={userName}
            onChange={handleUserNameChange}
          />
          {userNameError && <span className="error-message">{userNameError}</span>}
        </div>
        <div className="input-container">
          <label>User Email</label>
          <input
            type="text"
            className={`input-field ${userEmailError ? 'input-error' : ''}`}
            value={userEmail}
            onChange={handleUserEmailChange}
          />
          {userEmailError && <span className="error-message">{userEmailError}</span>}
        </div>
        <button type="submit">Join Meeting</button>
      </form>
    </div>
  );
};

export default FormComponent;
