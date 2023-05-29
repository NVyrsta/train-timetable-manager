import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTimeTable = () => {
  const [timetable, setTimetable] = useState({
    departure_point: '',
    arrival_point: '',
    departure_time: '',
    arrival_time: '',
    departure_date: '',
    arrival_date: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTimetable((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/train-timetable', timetable);
      navigate('/');
    } catch (err) {
      console.log('error on add record page');
    }
  };

  return (
    <div className="container py-4">
      <h2>Add Train Timetable</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="departure_point" className="form-label">
            Departure Point:
          </label>
          <input
            type="text"
            id="departure_point"
            name="departure_point"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="arrival_point" className="form-label">
            Arrival Point:
          </label>
          <input
            type="text"
            id="arrival_point"
            name="arrival_point"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departure_time" className="form-label">
            Departure Time:
          </label>
          <input
            type="time"
            id="departure_time"
            name="departure_time"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="arrival_time" className="form-label">
            Arrival Time:
          </label>
          <input
            type="time"
            id="arrival_time"
            name="arrival_time"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departure_date" className="form-label">
            Departure Date:
          </label>
          <input
            type="date"
            id="departure_date"
            name="departure_date"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="arrival_date" className="form-label">
            Arrival Date:
          </label>
          <input
            type="date"
            id="arrival_date"
            name="arrival_date"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTimeTable;
