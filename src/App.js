import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accepted from "./pages/Accepted";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import ClientDashboard from "./pages/ClientDashboard";
import ClientHistory from "./pages/ClientHistory";
import ClientLogin from "./pages/ClientLogin";
import Decline from "./pages/Decline";
import Discuss from "./pages/Discuss";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/login" element={<ClientLogin />} />
          <Route path="/home" element={<ClientDashboard />} />
          <Route path="/history" element={<ClientHistory />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="accept" element={<Accepted />} />
            <Route path="discuss" element={<Discuss />} />
            <Route path="decline" element={<Decline />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
