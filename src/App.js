import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
// import Landing from "./screens/Landing";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fakeUser = {
      email: "fakeuser@example.com",
      name: "Fake User",
    };

    setUser(fakeUser);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/login"
          element={user?.email ? <Navigate to="/dashboard" /> : <Landing />}
        /> */}
        <Route
          path="*"
          element={
            user?.email ? <Dashboard user={user} /> : <Navigate to="/dashboard" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
