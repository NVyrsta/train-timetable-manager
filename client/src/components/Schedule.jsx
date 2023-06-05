import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';

const Schedule = () => {
  const [timetable, setTimetable] = useState([]);
  const [filteredTimetable, setFilteredTimetable] = useState([]);

  useEffect(() => {
    getAllRecords();
  }, []);

  const getAllRecords = async () => {
    try {
      const res = await axios.get(
        'https://train-timetable-manager-nvyrsta.onrender.com/train-timetable'
      );
      setTimetable(res.data);
      setFilteredTimetable(res.data);
    } catch (err) {
      console.log('getAllRecords error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://train-timetable-manager-nvyrsta.onrender.com/train-timetable/${id}`
      );
      getAllRecords();
    } catch (err) {
      console.log('handleDelete error:', err);
    }
  };

  const handleFilterByDay = () => {
    const currentDate = moment().startOf('day');
    const filteredSchedule = timetable.filter((record) =>
      moment(record.departure_date).isSame(currentDate, 'day')
    );
    setFilteredTimetable(filteredSchedule);
  };

  const handleFilterByWeek = () => {
    const startDate = moment().startOf('week');
    const endDate = moment().endOf('week');
    const filteredSchedule = timetable.filter((record) =>
      moment(record.departure_date).isBetween(
        startDate,
        endDate,
        undefined,
        '[]'
      )
    );
    setFilteredTimetable(filteredSchedule);
  };

  const handleFilterByMonth = () => {
    const startDate = moment().startOf('month');
    const endDate = moment().endOf('month');
    const filteredSchedule = timetable.filter((record) =>
      moment(record.departure_date).isBetween(
        startDate,
        endDate,
        undefined,
        '[]'
      )
    );
    setFilteredTimetable(filteredSchedule);
  };

  const handleShowAll = () => {
    setFilteredTimetable(timetable);
  };

  return (
    <div className="container-fluid">
      <div className="hero bg-primary text-white text-center py-5">
        <h1 className="display-4">Train Timetable Manager</h1>
      </div>
      <div className="row my-4">
        <div className="col-lg-3 col-md-6">
          <button
            className="btn btn-success mb-2 btn-block w-100"
            onClick={handleFilterByDay}
          >
            Today's Schedule
          </button>
        </div>
        <div className="col-lg-3 col-md-6 mb-2 btn-block">
          <button
            className="btn btn-success w-100"
            onClick={handleFilterByWeek}
          >
            Week's Schedule
          </button>
        </div>
        <div className="col-lg-3 col-md-6 mb-2 btn-block">
          <button
            className="btn btn-success w-100"
            onClick={handleFilterByMonth}
          >
            Month's Schedule
          </button>
        </div>
        <div className="col-lg-3 col-md-6 mb-2 btn-block">
          <button className="btn btn-success w-100" onClick={handleShowAll}>
            Show All
          </button>
        </div>
      </div>
      <Link to="/add" className="btn btn-primary mb-4">
        +
      </Link>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="bg-dark text-white">Departure Point</th>
              <th className="bg-dark text-white">Arrival Point</th>
              <th className="bg-dark text-white">Departure Time</th>
              <th className="bg-dark text-white">Arrival Time</th>
              <th className="bg-dark text-white">Departure Date</th>
              <th className="bg-dark text-white">Arrival Date</th>
              <th className="bg-dark text-white">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTimetable.map(
              ({
                id,
                arrival_point,
                arrival_date,
                arrival_time,
                departure_date,
                departure_time,
                departure_point
              }) => (
                <tr key={id}>
                  <td>{departure_point}</td>
                  <td>{arrival_point}</td>
                  <td>{moment(departure_time, 'HH:mm:ss').format('HH:mm')}</td>
                  <td>{moment(arrival_time, 'HH:mm:ss').format('HH:mm')}</td>
                  <td>{moment(departure_date).utc().format('YYYY-MM-DD')}</td>
                  <td>{moment(arrival_date).utc().format('YYYY-MM-DD')}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-danger mr-2"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                      <Link
                        style={{ marginLeft: '1rem' }}
                        to={`/update/${id}`}
                        className="btn btn-primary ml-4"
                      >
                        Update
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
