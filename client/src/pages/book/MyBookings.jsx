import React, { useEffect, useContext, useState } from "react";
import event from "../../services/eventService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await event.userEvents(user.id);
      setEvents(res.data.data);
    };
    fetchEvents();
  }, [user]);

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      try {
        await event.deleteEvent(id);
        const filter = events.filter((item) => item._id !== id);
        setEvents(filter);
        toast.success("Event deleted successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="common-padding">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Venue</th>
            <th scope="col">Date</th>
            <th scope="col">Expected People</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {events && events.length > 0 ? (
            events.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>

                <td>{item.venue.venueName}</td>
                <td>{item.dates.substring(0, 10)}</td>
                <td>{item.expectedPeople}</td>

                <td className="edit">
                  <i className="fa-solid fa-pen-to-square"></i>
                </td>
                <td className="delete">
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => deleteBooking(item._id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <>
              <h3 className="my-2">No data to show</h3>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
