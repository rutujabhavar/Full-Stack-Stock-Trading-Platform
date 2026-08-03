import React, { useState, useEffect } from "react";
import "./Pages.css";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("₹");
  const [portfolio, setPortfolio] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [timeFormat, setTimeFormat] = useState("12 Hour");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings"));

    if (saved) {
      setNotifications(saved.notifications);
      setDarkMode(saved.darkMode);
      setAutoLogout(saved.autoLogout);
      setLanguage(saved.language);
      setCurrency(saved.currency);
      setPortfolio(saved.portfolio);
      setEmailAlerts(saved.emailAlerts);
      setSmsAlerts(saved.smsAlerts);
      setTwoFactor(saved.twoFactor);
      setTimeFormat(saved.timeFormat);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        notifications,
        darkMode,
        autoLogout,
        language,
        currency,
        portfolio,
        emailAlerts,
        smsAlerts,
        twoFactor,
        timeFormat,
      })
    );

    alert("Settings Saved Successfully!");
  };

  return (
    <div className="page">

      <h2>Settings</h2>
      <hr />

      <label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
        Enable Notifications
      </label>

      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        Dark Mode
      </label>

      <label>
        <input
          type="checkbox"
          checked={autoLogout}
          onChange={() => setAutoLogout(!autoLogout)}
        />
        Auto Logout
      </label>

      <label>
        Language:
        <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
          <option>English</option>
          <option>Marathi</option>
        </select>
      </label>

      <label>
        Currency:
        <select value={currency} onChange={(e)=>setCurrency(e.target.value)}>
          <option>₹</option>
          <option>$</option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={portfolio}
          onChange={()=>setPortfolio(!portfolio)}
        />
        Show Portfolio Value
      </label>

      <label>
        <input
          type="checkbox"
          checked={emailAlerts}
          onChange={()=>setEmailAlerts(!emailAlerts)}
        />
        Email Alerts
      </label>

      <label>
        <input
          type="checkbox"
          checked={smsAlerts}
          onChange={()=>setSmsAlerts(!smsAlerts)}
        />
        SMS Alerts
      </label>

      <label>
        <input
          type="checkbox"
          checked={twoFactor}
          onChange={()=>setTwoFactor(!twoFactor)}
        />
        Enable Two-Factor Authentication
      </label>

      <label>
        Time Format:
        <select value={timeFormat} onChange={(e)=>setTimeFormat(e.target.value)}>
          <option>12 Hour</option>
          <option>24 Hour</option>
        </select>
      </label>

      <br />

      <button onClick={saveSettings}>
        Save Settings
      </button>

    </div>
  );
};

export default Settings;