import { useRef, useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    const url = `${process.env.REACT_APP_API_URL}/changepassword`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        newPassword: enteredNewPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // error
        return res.json().then((data) => {
          let errorMessage =
            data.error || 'Password must be at least 4 characters long';
          //
          throw new Error(errorMessage);
        });
      })
      .then((data) => {
        console.log(data);
        alert('Password changed');
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="newPassword">New Password</label>
        <input type="password" id="newPassword" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
