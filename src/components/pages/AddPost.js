import axios from "axios";
import React, { useId, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMsg, setShowAlertMsg] = useState(false);
  let navigate = useNavigate();
  const onSubmit = () => {
    if (!title || !body || !userId) {
      setShowAlert(true);
      setShowAlertMsg("Please fill all the fields");
      return;
    }
    let newPost = { title, body, userId };
    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then((res) => {
        setShowAlert(true);
        setShowAlertMsg("Added Successfully");
        console.log(res);
      });
  };
  return (
    <div>
      <Container>
        <h3>Add Post</h3>

        <hr></hr>
        {showAlert && <Alert variant="success">{showAlertMsg}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Post Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Post Body</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Post Body"
              rows={3}
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="User ID"
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="success" onClick={() => onSubmit()}>
              Add
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default AddPost;
