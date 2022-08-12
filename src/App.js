import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";

function App(props) {
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();
  const { state } = useLocation();
  const addNew = () => {
    navigate("/add");
  };
  const editData = (id) => {
    navigate(`/edit/${id}`);
  };
  const deleteData = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        console.log(res.data);
        let newPosts = posts.filter((post) => post.id != id);
        setPosts(newPosts);
      });
  };
  useEffect(() => {
    console.log(state);

    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((postsData) => {
        setPosts(postsData.data);
      });
  }, []);
  return (
    <div className="App">
      <Container>
        <h1>React CRUD App</h1>
        <hr></hr>
        <div className="my-3 d-flex ">
          <h3>All Posts - {posts.length}</h3>
          <Button style={{ float: "right" }} onClick={() => addNew()}>
            Add New Post
          </Button>
        </div>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.map((post) => (
                <tr>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <Button
                        className="mx-2"
                        onClick={() => editData(post.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteData(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
