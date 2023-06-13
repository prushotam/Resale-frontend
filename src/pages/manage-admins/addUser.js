import React, { useState } from "react";
import Modal from "../../layout/Modal";
import Button from "../../layout/Button";
import Form from "react-bootstrap/Form";

export default function Page({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  ...props
}) {
  const [isDiscard, setIsDiscard] = useState(false);
  const [state, setState] = useState({});

  const onDoClose = (e) => {
    e.preventDefault();
    setIsDiscard(true);
  };

  const onDiscard = (e) => {
    e.preventDefault();
    onClose();
  };

  const onDoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("template_name", state.template_name);
    formData.append("template_type", state.template_type);
    formData.append("description", state.description);
    formData.append("template", state.template);
    formData.append(
      "spotlights",
      JSON.stringify([
        {
          name: "Example Spotlight 1",
        },
      ])
    );
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="blueBg form-area">
        {isDiscard ? (
          <div className="flex">
            <img className="mt-50" src="/imgs/discard.png" />
            <div className="mt-50"></div>
            <Button
              type="button"
              variant="secondary"
              className="btn-lg pull-left"
              text="Discard"
              onClick={(e) => onDiscard(e)}
            />
            <Button
              type="button"
              variant="secondary"
              className="btn-lg pull-right"
              text="No"
              onClick={(e) => setIsDiscard(false)}
            />
          </div>
        ) : (
          <Form className="form-middle container-fluid">
            <h1 className="mb-50">Add Checklist</h1>
            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setState({
                  ...state,
                  template_name: e.target.value,
                });
              }}
            >
              <Form.Label>Template Name</Form.Label>
              <Form.Control type="email" placeholder="Enter Document Name" />
            </Form.Group>

            <Form.Select
              className="form-control mb-3"
              onChange={(e) => {
                setState({
                  ...state,
                  template_type: e.target.value,
                });
              }}
            >
              <option value="">-- Select --</option>
              <option value="OFFER_LETTER">Offer Letter</option>
              <option value="MOU">Mou</option>
              <option value="SALE_AGGREMENT">Sale Aggrement</option>
              <option value="SALE_DEED">Sale deed</option>
              <option value="SMS">SMS</option>
              <option value="EMAIL">Email</option>
            </Form.Select>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setState({
                  ...state,
                  description: e.target.value,
                });
              }}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group
              controlId="formFile"
              className="mb-3"
              onChange={(e) => {
                setState({
                  ...state,
                  template: e.target.files[0],
                });
              }}
            >
              <Form.Label>Template</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <div className="mt-50"></div>
            <Button
              type="button"
              variant="secondary"
              className="btn-lg pull-left"
              text="Add"
              onClick={(e) => onDoSubmit(e)}
            />
            <Button
              type="button"
              variant="secondary"
              className="btn-lg pull-right"
              text="Cancel"
              onClick={(e) => onDoClose(e)}
            />
          </Form>
        )}
      </div>
    </Modal>
  );
}
