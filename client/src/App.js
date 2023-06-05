import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTimeTable from './components/AddTimeTable';
import UpdateTimeTable from './components/UpdateTimeTable';
import Schedule from './components/Schedule';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/train-timetable-manager" element={<Schedule />} />
          <Route path="/add" element={<AddTimeTable />} />
          <Route path="/update/:id" element={<UpdateTimeTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
