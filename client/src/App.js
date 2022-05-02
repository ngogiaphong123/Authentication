import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/login" element={LoginScreen} />
          <Route exact path="/register" element={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            element={forgotPasswordScreen}
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
