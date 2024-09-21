import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddRecordForm from './AddRecordForm';

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const SkeletonCard = () => (
  <div className="flex flex-col gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden shadow-lg animate-pulse">
    <div className="relative w-full h-32 bg-gray-200"></div>
    <div className="flex flex-col gap-2 py-4 px-6">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

const fetchRecords = async (token) => {
  try {
    const response = await axios.get('https://health-records.onrender.com/api/health-records', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching records:', err.response ? err.response.data : err.message);
    throw err; 
  }
};

const Dashboard = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }

    const loadRecords = async () => {
      try {
        const data = await fetchRecords(token);
        setRecords(data);
        setAllRecords(data);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, [token]);

  if (loading) {
    return (
      <div className="px-10 mx-auto mt-24">
        <h2 className="text-2xl font-bold mb-4">Your Health Records</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-10 mx-auto mt-24">
        <h2 className="text-2xl font-bold mb-4">Your Health Records</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="px-10 mx-auto mt-24">
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">Search</label>
        <input placeholder='Heart Rate (Equal or Above)' type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e)=>{
          const searchValue = e.target.value;
          if (searchValue === '') {
            setRecords(allRecords); 
          } else {
            const filteredRecords = allRecords.filter((record) =>
              record.heartRate >= Number(searchValue)
            );
            setRecords(filteredRecords);
          }
        }}/>
      </div>
      <h2 className="text-2xl font-bold mb-4">Your Health Records</h2>
      {records.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record) => (
            <div key={record._id} className="flex flex-col gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden shadow-lg">
              <div className="relative w-full h-32">
                <img
                  className="absolute left-0 top-0 w-full h-full object-cover object-center"
                  loading="lazy"
                  src="https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Record"
                />
              </div>
              <div className="flex flex-col gap-2 py-4 px-6">
                <h3 className="text-xl font-bold">Record on {formatDate(record.date)}</h3>
                <p className="text-gray-500">Temperature: {record.bodyTemperature} °C</p>
                <p className="text-gray-500">Heart Rate: {record.heartRate} bpm</p>
                <p className="text-gray-500">
                  Blood Pressure: {record.bloodPressure.systolic}/{record.bloodPressure.diastolic} mmHg
                </p>
                <Link to={`/record/${record._id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddRecordForm />
    </div>
  );
};

export default Dashboard;
