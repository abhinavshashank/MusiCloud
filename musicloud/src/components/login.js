// import React, { useState, useEffect  } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase/firebase';
// import { NavLink, useNavigate } from 'react-router-dom';
// import styles from './login_signup.css'; // Import the CSS stylesheet
// import PrivateRoute from './PrivateRoute';

// const Login = ({ setIsAuthenticated, isAuthenticated }) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);


//   // const onLogin = (e) => {
//   //   e.preventDefault();
//   //   signInWithEmailAndPassword(auth, email, password)
//   //     .then((userCredential) => {
//   //       // Signed in
//   //       const user = userCredential.user;
//   //       navigate('/home');
//   //       console.log(user);
//   //     })
//   //     .catch((error) => {
//   //       const errorCode = error.code;
//   //       const errorMessage = error.message;
//   //       setError(errorMessage); // Set error message for display
//   //       console.error(errorCode, errorMessage);
//   //     });
//   // };

//   const onLogin = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         setIsAuthenticated(true);
//         console.log('User logged in:', user);
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         setError(errorMessage);
//         console.error('Login error:', errorCode, errorMessage);
//       });
//   };

  

//   useEffect(() => {
//     // Navigate after isAuthenticated is set to true
//     if (isAuthenticated) {
//       navigate('/home');
//     }
//   }, [isAuthenticated, navigate]);
  

//   return (
//     <div className={styles.loginsignupContainer}>
//         <div className='signin-container'>
//     <div>
//             <img src="musicloud-color-logo.svg" alt="MusiCloud Logo"/>
//             <br/>
//             <h1>MusiCloud</h1>
//         </div>
      
        
//           <div>
//             <form>
//               <div>
//                 <label htmlFor="email-address">Email address</label>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   required
//                   placeholder="Email address"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password">Password</label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   placeholder="Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <button onClick={onLogin}>Log In</button>
//               </div>
//             </form>

//             {error && <p className="text-red-500 text-center">{error}</p>}

//             <p className="text-sm text-white text-center">
//               No account yet?{' '}
//               <NavLink to="/signup" className="text-blue-500">
//               <button>Sign Up</button>  
//               </NavLink>
//             </p>
//           </div>
        
      
//     </div>
//     </div>
    
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './login_signup.css'; // Import the CSS stylesheet

const Login = ({ setIsAuthenticated, isAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsAuthenticated(true);
        console.log('User logged in:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.error('Login error:', errorCode, errorMessage);
      });
  };

  useEffect(() => {
    // Navigate after isAuthenticated is set to true
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.loginsignupContainer}>
      <div className='signin-container'>
        <div>
          <img src="musicloud-color-logo.svg" alt="MusiCloud Logo"/>
          <br/>
          <h1>MusiCloud</h1>
        </div>
        
        <div>
          <form>
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button onClick={onLogin}>Log In</button>
            </div>
          </form>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="text-sm text-white text-center">
            No account yet?{' '}
            <NavLink to="/signup" className="text-blue-500">
              <button>Sign Up</button>  
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
