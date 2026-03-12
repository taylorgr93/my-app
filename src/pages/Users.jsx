import { useState, useEffect } from "react";
import "../css/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        console.log(data);

        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  // Conditional rendering
  if (loading) return <p className="status-message">Loading users...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <p className="user-count">Total: {users.length} users found</p>

      <ul className="user-list">
        {/* ✅ Usar un ID único del dato */}
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-company">Company: {user.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
