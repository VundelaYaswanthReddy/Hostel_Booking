import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../key";
import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const Reseravtion = ({ setOpen, hotelId }) => {
  console.log("Im here in reservation");
  console.log(`${API_URL}/hotels/rooms/${hotelId}`);
  const { data, loading, error } = useFetch(
    `${API_URL}/hotels/rooms/${hotelId}`
  );

  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const getDatesinRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let dates = [];
    let date = new Date(start.getTime());
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const allDates = getDatesinRange(dates[0].startDate, dates[0].endDate);
  console.log(allDates);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${API_URL}/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      //   navigate("/");
    } catch (err) {}
  };

  console.log(selectedRooms);
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms: </span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">Price {item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label htmlFor="">{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now !
        </button>
      </div>
    </div>
  );
};

export default Reseravtion;
