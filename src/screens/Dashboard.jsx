import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomePage from "../components/HomePage";
import Navbar from "../components/Navbar";
import SettingsPage from "../components/SettingsPage";
import VideoTracker from "../components/VideoTracker";

const LayoutContainer = styled.div`
  display: flex;
  overflow-x: hidden; // Empêche le débordement horizontal au niveau du conteneur principal
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  min-width: 0; // Assure que le conteneur peut se rétrécir sans causer de débordement
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Dashboard = ({ user }) => {
  return (
    <LayoutContainer>
      <Navbar user={user} />
      <ContentContainer>
        <Routes>
          <Route path="/dashboard" element={<HomePage user={user} />} />
          <Route path="/settings" element={<SettingsPage user={user} />} />
          <Route path="/video-tracker" element={<VideoTracker user={user} />} />
          {/* Add more nested routes as needed */}
        </Routes>
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Dashboard;



// const generateUserData = (user) => {
    //   const weekDaysData = Array.from({ length: 7 }, () => []);
    //   const hoursInDayData = Array.from({ length: 24 }, () => 0);

    //   // [{ day: 0, hour: 0, value: 100 }, { day: 1, hour: 1, value: 200 }, ...]
    //   // day représente le jour de la semaine (0 pour dimanche, 1 pour lundi, ..., 6 pour samedi)
    //   // hour représente l'heure dans la journée (0 pour minuit, 1 pour 1h, ..., 23 pour 23h)

    //   // 
    //   // une semaine, 2 seamine, 1 mois, lifetime (tout)

    //   user.data.forEach(entry => {
    //     weekDaysData[entry.day].push(entry.value);
    //   });

    //   user.data.forEach(entry => {
    //     hoursInDayData[entry.hour] += entry.value;
    //   });

    //   return { weekDaysData, hoursInDayData };
    // };