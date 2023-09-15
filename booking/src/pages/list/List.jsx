import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../key";
function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [opendate, setOpendate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  //console.log("options ", options);
  const { data, loading, error, reFetch } = useFetch(
    `${API_URL}/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );
  //console.log("Destination ", destination);
  console.log("Data", data);
  console.log("Dates in list page ", date);
  const handleClick = () => {
    reFetch();
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsOptionItem">
              <label>Destination</label>
              <input
                type="text"
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsOptionItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpendate(!opendate)}>{`${format(
                date[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
              {opendate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptionItem">
                <label className="lsOptionText">
                  Min price<small>per night</small>
                </label>
                <input
                  type="number"
                  onChange={(e) => setMin(e.target.value)}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <label className="lsOptionText">
                  Max price<small>per night</small>
                </label>
                <input
                  type="number"
                  onChange={(e) => setMax(e.target.value)}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <label className="lsOptionText">Adult</label>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  placeholder={options.adult}
                />
              </div>
              <div className="lsOptionItem">
                <label className="lsOptionText">Children</label>
                <input
                  type="number"
                  min={0}
                  className="lsOptionInput"
                  placeholder={options.children}
                />
              </div>
              <div className="lsOptionItem">
                <label className="lsOptionText">Room</label>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  placeholder={options.room}
                />
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                  {data.map((item) => (
                  <SearchItem item={item} key={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
