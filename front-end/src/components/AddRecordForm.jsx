import { useState } from 'react';
import axios from 'axios';

const AddRecordForm = () => {
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState({ systolic: '', diastolic: '' });
  const [heartRate, setHeartRate] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newRecord = {
      date: date.toString(),
      bodyTemperature: Number(temperature),
      bloodPressure: {
        systolic: bloodPressure.systolic,
        diastolic: bloodPressure.diastolic,
      },
      heartRate
    };

    try {
      await axios.post('https://health-records.onrender.com/api/health-records', newRecord, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.log('Error adding record:', err);
    }
  };

  const handleBloodPressureChange = (e) => {
    const { name, value } = e.target;
    setBloodPressure((prevBP) => ({
      ...prevBP,
      [name]: value,
    }));
  };

  return (
   <form className="space-y-12 mt-10" onSubmit={handleSubmit}>
  <div className="border-b border-gray-900/10 pb-12">
    <h2 className="text-base font-semibold leading-7 text-gray-900">Add New Record</h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">Please provide the following health details:</p>

    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      
      <div className="sm:col-span-3">
        <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
        <div className="mt-2">
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="temperature" className="block text-sm font-medium leading-6 text-gray-900">Temperature</label>
        <div className="mt-2">
          <input
            type="number"
            name="temperature"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Temperature (Celsius)"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>

      <div className="col-span-full">
        <label className="block text-sm font-medium leading-6 text-gray-900">Blood Pressure</label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <div>
            <input
              type="number"
              name="systolic"
              id="systolic"
              value={bloodPressure.systolic}
              onChange={handleBloodPressureChange}
              placeholder="Systolic"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="diastolic"
              id="diastolic"
              value={bloodPressure.diastolic}
              onChange={handleBloodPressureChange}
              placeholder="Diastolic"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
      </div>

      <div className="sm:col-span-3">
        <label htmlFor="heart-rate" className="block text-sm font-medium leading-6 text-gray-900">Heart Rate</label>
        <div className="mt-2">
          <input
            type="number"
            name="heartRate"
            id="heart-rate"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            placeholder="Heart Rate (BPM)"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>

    </div>
  </div>

  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button
      type="submit"
      className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      Add Record
    </button>
  </div>
</form>


  );
};

export default AddRecordForm;
