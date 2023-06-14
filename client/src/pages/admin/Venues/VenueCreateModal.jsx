import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../../utils/TextError";
import { toast } from "react-toastify";
import venueSchema from "../../../utils/formValidation/venueValidation";
import { createVenue } from "../../../services/venueService";

const VenueCreateModal = ({ show, setShow, reFetch }) => {
  const formData = {
    name: "",
    address: "",
    city: "",
    desc: "",
    pricePerDay: "",
    maxCapacity: "",
    type: "",
  };
  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Formik
          initialValues={formData}
          validationSchema={venueSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            try {
              await createVenue(values);
              setShow(false);
              toast.success("venue created successfully ");
              reFetch();
            } catch (error) {
              toast.error(error.response.data.message);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="modal-form">
              <Modal.Header closeButton>
                <Modal.Title>Create Venue</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-form-pack">
                  <label htmlFor="email">Venue Name: </label>
                  <Field
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="Enter Venue Name"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="city">City Name: </label>
                  <Field
                    type="text"
                    name="city"
                    autoComplete="off"
                    placeholder="Enter Venue Name"
                  />
                  <ErrorMessage name="city" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="pricePerDay">Price per day: </label>
                  <Field
                    type="number"
                    name="pricePerDay"
                    autoComplete="off"
                    placeholder="Enter price "
                  />
                  <ErrorMessage name="pricePerDay" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="address">Address: </label>
                  <Field
                    type="text"
                    name="address"
                    autoComplete="off"
                    placeholder="Enter address "
                  />
                  <ErrorMessage name="address" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="maxCapacity">Type: </label>
                  <Field
                    type="text"
                    name="type"
                    autoComplete="off"
                    placeholder="eg: Hotel, Eventhall "
                  />
                  <ErrorMessage name="type" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="maxCapacity">Capacity: </label>
                  <Field
                    type="number"
                    name="maxCapacity"
                    autoComplete="off"
                    placeholder="Enter Max Capacity "
                  />
                  <ErrorMessage name="maxCapacity" component={TextError} />
                </div>
                <div className="modal-form-pack">
                  <label htmlFor="description">Description: </label>
                  <Field
                    as="textarea"
                    rows="3"
                    type="text"
                    name="desc"
                    autoComplete="off"
                    placeholder="Enter capacity "
                  />
                  <ErrorMessage name="desc" component={TextError} />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default VenueCreateModal;
