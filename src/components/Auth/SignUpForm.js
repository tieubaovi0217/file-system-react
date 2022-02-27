import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const SignUpForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();
    const enteredConfirmPassword = confirmPasswordInputRef.current.value.trim();

    //TODO: add validation

    setIsLoading(true);

    if (enteredPassword !== enteredConfirmPassword) {
      setIsLoading(false);
      return alert('Passwords do not match');
    }

    const url = `${process.env.REACT_APP_AUTH_API_URL}/signup`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        }
        // error
        return res.json().then((data) => {
          let errorMessage = data.error || 'Authentication failed';
          //
          throw new Error(errorMessage);
        });
      })
      .then((data) => {
        console.log(data);
        const { token, user } = data;
        authCtx.login(token);

        history.replace('/');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Sign up</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            id="password"
            required
            minlength="4"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirmPassword">Confirm your password</label>
          <input
            type="password"
            id="confirmPassword"
            required
            minlength="4"
            ref={confirmPasswordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Sign Up</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
