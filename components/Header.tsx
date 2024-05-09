interface HeaderProps {
  onToggleForm: () => void;
}
const Header: React.FC<HeaderProps> = ({ onToggleForm }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>ETC Time Tracker</h1>
      <button onClick={onToggleForm}>Add Task</button>
    </div>
  );
};

export default Header;
