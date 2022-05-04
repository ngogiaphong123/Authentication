import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//? routing
import PrivateRoute from "./components/routing/PrivateRoute";
//? Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import forgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import resetPasswordScreen from "./components/screens/ResetPasswordScreen";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PrivateScreen />
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route
            exact
            path="/forgotpassword"
            element={<forgotPasswordScreen />}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            element={resetPasswordScreen}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
