import React, { useEffect, useState } from "react";
import { fetchUsers, fetchUserPosts } from "./api";
import { User, Post } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true);
      setError(null);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        setError("Failed to load users.");
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  const handleUserClick = async (userId: number) => {
    if (userId === selectedUser) return; 

    setSelectedUser(userId);
    setPosts([]); 
    setLoadingPosts(true);
    setError(null);

    try {
      const postsData = await fetchUserPosts(userId);
      setPosts(postsData);
    } catch (error) {
      setError("Failed to load posts.");
    } finally {
      setLoadingPosts(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        
        <div className="col-md-4">
          <h2 className="mb-3">Users</h2>
          {loadingUsers && <p>Loading users...</p>}
          {error && <p className="text-danger">{error}</p>}
          <ul className="list-group">
            {users.map((user) => (
              <li
                key={user.id}
                className={`list-group-item list-group-item-action ${
                  selectedUser === user.id ? "active" : ""
                }`}
                onClick={() => handleUserClick(user.id)}
                style={{ cursor: "pointer" }}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-8">
          <h2 className="mb-3">Posts</h2>
          {selectedUser ? (
            loadingPosts ? (
              <p>Loading posts...</p>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="card mb-3">
                  <div className="card-body">{post.content}</div>
                </div>
              ))
            ) : (
              <p>No posts available for this user.</p>
            )
          ) : (
            <p>Select a user to view posts.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
