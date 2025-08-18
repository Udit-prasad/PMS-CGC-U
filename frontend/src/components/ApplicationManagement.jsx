import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ApplicationManagement.css';

const ApplicationManagement = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`/api/applications/job/${jobId}`);
        setApplications(res.data);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (applicationId, status, notes) => {
    try {
      await axios.put(`/api/applications/${applicationId}/status`, { status, notes });
      setApplications(applications.map(app => app._id === applicationId ? { ...app, status, notes } : app));
    } catch (err) {
      // handle error
    }
  };

  if (loading) return <div>Loading applications...</div>;

  return (
    <div className="application-management">
      <h2>Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.student?.name || app.student?.email}</td>
              <td>{app.status}</td>
              <td>{app.notes}</td>
              <td>
                <button onClick={() => handleStatusChange(app._id, 'Shortlisted')}>Shortlist</button>
                <button onClick={() => handleStatusChange(app._id, 'Selected')}>Select</button>
                <button onClick={() => handleStatusChange(app._id, 'Rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationManagement;
