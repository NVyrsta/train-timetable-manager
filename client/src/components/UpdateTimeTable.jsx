import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const UpdateTimeTable = () => {
  const [timetable, setTimetable] = useState({
    departure_point: '',
    arrival_point: '',
    departure_time: '',
    arrival_time: '',
    departure_date: '',
    arrival_date: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getRecord = async () => {
      try {
        const res = await axios.get(
          `https://train-timetable-manager-nvyrsta.onrender.com/train-timetable/${id}`
        );
        const record = res.data;

        const formattedRecord = {
          ...record,
          departure_date: moment(record.departure_date).format('YYYY-MM-DD'),
          arrival_date: moment(record.arrival_date).format('YYYY-MM-DD')
        };
        console.log(formattedRecord, 'formattedRecord');

        setTimetable(formattedRecord);
      } catch (err) {
        console.log('error on edit record page');
      }
    };

    getRecord();
  }, [id]);

  const handleChange = (e) => {
    setTimetable((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://train-timetable-manager-nvyrsta.onrender.com/train-timetable/${id}`,
        timetable
      );
      navigate('/');
    } catch (err) {
      console.log('error on edit record page');
    }
  };

  return (
    <div className="container py-4">
      <h2>Edit Train Timetable</h2>
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
            value={timetable.departure_point}
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
            value={timetable.arrival_point}
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
            value={timetable.departure_time}
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
            value={timetable.arrival_time}
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
            value={timetable.departure_date}
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
            value={timetable.arrival_date}
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

export default UpdateTimeTable;
