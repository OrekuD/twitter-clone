import React, { useState } from "react";
import { Modal, Form, FormGroup, FormControl, Button } from "rsuite";

const CreatePost = () => {
  const [isVisible, setIsVisible] = useState(false);
  const close = () => {
    setIsVisible(false);
  };
  return (
    <div>
      <Button
        style={{ width: 150, marginTop: 10 }}
        appearance="primary"
        onClick={() => setIsVisible(true)}
      >
        New Post
      </Button>
      <Modal show={isVisible} onHide={close} size="xs">
        <Modal.Header>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            //   onChange={handleChange}
            //   formValue={state.formValue}
          >
            <FormGroup>
              <FormControl rows={5} name="textarea" componentClass="textarea" />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} appearance="primary">
            Post!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePost;
