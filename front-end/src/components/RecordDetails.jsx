import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecordDetails = () => {
  const { id } = useParams();
  const [record, setRecord] = useState({
    date: '',
    bodyTemperature: 0,
    bloodPressure: {
      systolic: 0,
      diastolic: 0,
    },
    heartRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const { data } = await axios.get(`https://health-records.onrender.com/api/health-records/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecord(data.record);
      } catch (err) {
        setError('Error fetching record');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://health-records.onrender.com/api/health-records/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Error deleting record');
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://health-records.onrender.com/api/health-records/${id}`, record, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false); 
    } catch (err) {
      setError('Error updating record');
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecord({ ...record, [name]: value });
  };

  const handleBloodPressureChange = (e) => {
    const { name, value } = e.target;
    setRecord({
      ...record,
      bloodPressure: { ...record.bloodPressure, [name]: value },
    });
  };

  

  if (loading) {
    return (
      <div className='flex flex-col justify-center h-screen'>
          <div className='flex justify-center'>Loading...</div>
      </div>
      
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto mt-6">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
              <label className="text-sm text-slate-600 font-medium" htmlFor="date">Date</label>
            </div>
            <div className="p-4">
              <input
                type="date"
                name="date"
                value={record.date}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5"
              />
            </div>
          </div>

          <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
              <label className="text-sm text-slate-600 font-medium" htmlFor="bodyTemperature">Temperature</label>
            </div>
            <div className="p-4">
              <input
                type="number"
                name="bodyTemperature"
                value={record.bodyTemperature}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5"
              />
            </div>
          </div>

          <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
              <label className="text-sm text-slate-600 font-medium">Blood Pressure</label>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <input
                type="number"
                name="systolic"
                value={record.bloodPressure.systolic}
                onChange={handleBloodPressureChange}
                placeholder="Systolic"
                className="block w-full rounded-md border-0 py-1.5"
              />
              <input
                type="number"
                name="diastolic"
                value={record.bloodPressure.diastolic}
                onChange={handleBloodPressureChange}
                placeholder="Diastolic"
                className="block w-full rounded-md border-0 py-1.5"
              />
            </div>
          </div>

          <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
              <label className="text-sm text-slate-600 font-medium" htmlFor="heartRate">Heart Rate</label>
            </div>
            <div className="p-4">
              <input
                type="number"
                name="heartRate"
                value={record.heartRate}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5"
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
              <span className="text-sm text-slate-600 font-medium">Date</span>
            </div>
            <div className="p-4">
              <h5 className="text-slate-800 text-xl font-semibold">
                {new Date(record.date).toLocaleDateString()}
              </h5>
            </div>
          </div>

          <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
              <span className="text-sm text-slate-600 font-medium">Temperature</span>
            </div>
            <div className="p-4">
              <h5 className="text-slate-800 text-xl font-semibold">
                {record.bodyTemperature} °C
              </h5>
            </div>
          </div>

          <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
              <span className="text-sm text-slate-600 font-medium">Blood Pressure</span>
            </div>
            <div className="p-4">
              <h5 className="text-slate-800 text-xl font-semibold">
                {record.bloodPressure.systolic}/{record.bloodPressure.diastolic} mmHg
              </h5>
            </div>
          </div>

          <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
              <span className="text-sm text-slate-600 font-medium">Heart Rate</span>
            </div>
            <div className="p-4">
              <h5 className="text-slate-800 text-xl font-semibold">
                {record.heartRate} bpm
              </h5>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
            >
              Edit Record
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Record
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecordDetails;
