// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import styled, { keyframes } from "styled-components";
// import logo from "../assets/logo.svg"; // Assure-toi que le chemin d'accès est correct
// import useFetch from "../hooks/useFetch";

// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const LoginContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background: linear-gradient(-45deg, #0b2447, #19376d, #576cbc, #a5d7e8);
//   background-size: 400% 400%;
//   animation: ${gradientAnimation} 15s ease infinite;
// `;

// const LoginForm = styled.div`
//   padding: 2rem;
//   background: white;
//   border-radius: 20px;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//   text-align: center;
//   width: 400px;
// `;

// const GoogleLoginButtonContainer = styled.div`
//   margin-top: 1rem;
//   display: flex; // Utilise flexbox pour le centrage
//   justify-content: center; // Centre horizontalement
//   align-items: center; // Centre verticalement (au besoin)
//   width: 100%; // Assure que le conteneur prend toute la largeur disponible
// `;

// const Login = () => {
  // const { handleGoogle, loading, error } = useFetch(
  //   "http://localhost:5152/login"
  // );

  // useEffect(() => {
  //   // Assurez-vous que la bibliothèque Google est chargée
  //   const script = document.createElement("script");
  //   script.src = "https://accounts.google.com/gsi/client";
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);

  //   script.onload = () => {
  //     if (window.google) {
  //       window.google.accounts.id.initialize({
  //         client_id:
  //           "509938645259-pmtvqe7ni98ivq69k4omgimi5mbfl4uv.apps.googleusercontent.com",
  //         callback: handleGoogle,
  //       });

  //       window.google.accounts.id.renderButton(
  //         document.getElementById("googleLoginButton"),
  //         {
  //           theme: "filled_black",
  //           text: "signin_with",
  //           shape: "pill",
  //         }
  //       );
  //     }
  //   };

  //   // Nettoyage du script
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, [handleGoogle]);

//   return (
//     <>
//       <LoginContainer>
//         <LoginForm>
//           <header style={{ textAlign: "center" }}>
//             <img
//               src={logo}
//               alt="Logo"
//               style={{ width: "150px", margin: "0 auto" }}
//             />
//             <h1>Login to continue</h1>
//           </header>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <GoogleLoginButtonContainer id="googleLoginButton"></GoogleLoginButtonContainer>
//           )}
//           <footer style={{ marginTop: "1rem" }}>
//             <Link to="/">Go Back</Link>
//           </footer>
//         </LoginForm>
//       </LoginContainer>
//     </>
//   );
// };
// export default Login;
