import React, { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import wed1 from "../../assets/images/wed.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import bookSchema from "../../utils/formValidation/bookValidation";
import TextError from "../../utils/TextError";
import { toast } from "react-toastify";

import event from "../../services/eventService";

const Book = () => {
  const navigate = useNavigate();

  let { vid } = useParams();
  const { data, loading, error, reFetch } = useFetch(`/venue/${vid}`);
  const { dispatch, price, people, place, date } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("You need to login before booking");
    }
  }, [navigate, user]);

  const formData = {
    name: "",
    venue: vid,
    author: user ? user?._id : "",
    dates: date ? date : "",
    expectedPeople: "",
  };

  return (
    <>
      <div className="common-padding book">
        <h3 className="common-header">{data.data?.name}</h3>
        <div className="row g-5 justify-content-between">
          <div className="col-lg-5">
            <div className="most-booked_each">
              <img src={wed1} alt="hotel" className="mb-2" />
              <div className="p-3 d-flex justify-content-between">
                <div>
                  <h3>{data?.data?.name}</h3>
                  <p className="type mb-3"> {data.data?.type} </p>
                  <p className="mb-3 price">
                    Rs. {data?.data?.pricePerDay} per day
                  </p>

                  <p className="address mb-3 text-capitalize">
                    <i class="fa-solid fa-location-dot"></i>{" "}
                    {data?.data?.address}
                  </p>
                  <p className="description mb-4">{data?.data?.desc}</p>
                </div>
                <div>
                  <p className="mb-2 text-bold">
                    Capacity : {data.data?.maxCapacity} people
                  </p>
                  <p class="light-text green-text">Free cancelation</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <Formik
              initialValues={formData}
              validationSchema={bookSchema}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                try {
                  const res = await event.createEvent(values);
                  console.log(res);
                  actions.setSubmitting(false);
                  navigate("/bookings");
                  toast.success("Event Booked Successfully");
                } catch (error) {
                  actions.setSubmitting(false);
                  toast.error(error.response.data.message);
                }
              }}
            >
              <Form>
                <div className="form-pack">
                  <label htmlFor="name">
                    <i class="fa-solid fa-signature"></i> Name:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="eg : Marriage"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <div className="form-pack">
                  <label htmlFor="dates">
                    <i class="fa-solid fa-calendar-days"></i> Date:
                  </label>
                  <Field
                    type="date"
                    name="dates"
                    autoComplete="off"
                    placeholder="Select Date"
                  />
                  <ErrorMessage name="dates" component={TextError} />
                </div>
                <div className="form-pack">
                  <label htmlFor="expectedPeople">
                    <i class="fa-solid fa-users"></i> Expected Peope:
                  </label>
                  <Field
                    type="number"
                    name="expectedPeople"
                    autoComplete="off"
                    placeholder="eg : Marriage"
                  />
                  <ErrorMessage name="expectedPeople" component={TextError} />
                </div>
                <button type="submit" className="log-btn">
                  Book !
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
