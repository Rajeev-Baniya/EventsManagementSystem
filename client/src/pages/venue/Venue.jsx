import React, { useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useFetch from "../../hooks/useFetch";
import SearchItem from "../../components/searchItem/SearchItem";
import { SearchContext } from "../../context/SearchContext.js";

const Venue = () => {
  const location = useLocation();
  const formData = {
    place: location.state?.place ? location.state.place : "",
    date: location.state?.date ? location.state.date : "",
    people: "",
    price: location.state?.price ? location.state.price : "",
  };
  const formRef = useRef();
  const { dispatch } = useContext(SearchContext);

  const { data, loading, error, reFetch } = useFetch(
    formRef.current?.values.place == ""
      ? `venue?price=${formRef.current?.values.price}&people=${formRef.current?.values.people}&count=bookedCount`
      : `venue?city=${formRef.current?.values.place}&price=${formRef.current?.values.price}&people=${formRef.current?.values.people}&count=bookedCount`
  );
  return (
    <div className="common-padding">
      <div className="row g-5 justify-content-between searchVenue">
        <div className="col-lg-4">
          <div className="mb-5">
            <Formik
              initialValues={formData}
              innerRef={formRef}
              onSubmit={(values, actions) => {
                reFetch();
                dispatch({
                  type: "NEW_SEARCH",
                  payload: values,
                });
              }}
            >
              <Form>
                <div className="form-pack">
                  <label htmlFor="place">
                    <i class="fa-solid fa-location-dot"></i> Destination:
                  </label>
                  <Field
                    type="text"
                    name="place"
                    autoComplete="off"
                    placeholder="eg : Pokhara"
                  />
                </div>
                <div className="form-pack">
                  <label htmlFor="place">
                    <i class="fa-solid fa-calendar-days"></i> Date:
                  </label>
                  <Field
                    type="date"
                    name="date"
                    min={
                      new Date(
                        new Date().getTime() -
                          new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                    autoComplete="off"
                    placeholder="Input the Date"
                  />
                </div>
                <div className="form-pack">
                  <label htmlFor="people">
                    <i class="fa-solid fa-users"></i> Max Capacity:
                  </label>
                  <Field
                    type="text"
                    name="people"
                    autoComplete="off"
                    placeholder="Input guest's number"
                  />
                </div>
                <div className="form-pack">
                  <label htmlFor="place">
                    <i class="fa-solid fa-indian-rupee-sign"></i> Min Price in
                    Rs:
                  </label>
                  <Field
                    type="text"
                    name="price"
                    autoComplete="off"
                    placeholder="5000"
                  />
                </div>
                <button type="submit" className="log-btn">
                  Search
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="col-lg-7">
          {loading ? (
            "loading"
          ) : (
            <>
              {data.data &&
                data.data.map((item) => (
                  <div className="py-5">
                    <SearchItem item={item} key={item._id} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Venue;
