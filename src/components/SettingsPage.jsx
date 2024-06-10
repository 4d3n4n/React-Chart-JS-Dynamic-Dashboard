const SettingsPage = ({ user }) => {
  return (
    <div>
      <h1>SettingsPage</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
};

export default SettingsPage;
