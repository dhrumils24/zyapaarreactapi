import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

function EditPost() {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMsg, setShowAlertMsg] = useState(false);

  const onSubmit = () => {
    if (!title || !body || !userId) {
      setShowAlert(true);
      setShowAlertMsg("Please fill all the fields");
      return;
    }
    let newPost = { title, body, userId };
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, newPost)
      .then((res) => {
        setShowAlert(true);
        setShowAlertMsg("Updated Successfully");
        console.log(res);
      });
  };
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
        setUserId(res.data.userId);
      });
  }, []);
  return (
    <div>
      <Container>
        <h3>Edit Post</h3>

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
              Update
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default EditPost;
