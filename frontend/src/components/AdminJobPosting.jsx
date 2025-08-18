<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "./AdminJobPosting.css";
import { API_ENDPOINTS } from "../config/api";
import {
  FiEdit2,
  FiTrash2,
  FiUpload,
  FiCheck,
  FiX,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  MdWork,
  MdBusiness,
  MdDescription,
  MdSchool,
  MdEvent,
  MdLocationOn,
  MdAttachMoney,
  MdContacts,
} from "react-icons/md";

const initialForm = {
  companyName: "",
  companyLogo: "",
  companyWebsite: "",
  position: "",
  jobType: "Full-time",
  salaryPackage: "",
  location: "",
  applicationDeadline: "",
  jobDescription: "",
  skillsRequired: "",
  selectionProcess: "",
  bondDetails: "",
  benefits: "",
  contactPerson: "",
  contactEmail: "",
  contactPhone: "",
  driveDate: "",
  additionalInfo: "",
  eligibleCourses: [],
  eligibleBranches: [],
  eligibleYears: [],
};

const COURSES = ["BTech", "BSc", "BBA", "MBA", "MTech", "MCA", "PhD"];
const BRANCHES = ["CSE", "IT", "ECE", "EEE", "ME", "CE", "AIML", "DS", "CSIT"];
const YEARS = ["2023", "2024", "2025", "2026", "2027"];
=======
import React, { useState, useEffect } from 'react';
import './AdminJobPosting.css';
import { API_ENDPOINTS } from '../config/api';
import AdminHeader from './AdminHeader';
import { getAllJobs, createJob, updateJob, deleteJob } from '../../api/jobs';

const initialForm = {
  companyName: '',
  companyLogo: '',
  companyWebsite: '',
  position: '',
  jobType: 'Full-time',
  campusType: 'off-campus',
  salaryPackage: '',
  location: '',
  applicationDeadline: '',
  jobDescription: '',
  skillsRequired: '',
  selectionProcess: '',
  bondDetails: '',
  benefits: '',
  contactPerson: '',
  contactEmail: '',
  contactPhone: '',
  driveDate: '',
  additionalInfo: '',
  eligibleCourses: [],
  eligibleBranches: [],
  eligibleYears: [],
  applicationFormFields: [],
  applicationLink: ''
};

// Add these arrays for dropdown options
const COURSES = ['BTech', 'BSc', 'BBA', 'MBA', 'MTech', 'MCA', 'PhD'];
const BRANCHES = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'AIML', 'DS', 'CSIT'];
const YEARS = [ '2023', '2024', '2025', '2026', '2027'];

// Form field types for on-campus jobs
const FORM_FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'email', label: 'Email Input' },
  { value: 'phone', label: 'Phone Input' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'select', label: 'Dropdown Select' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'file', label: 'File Upload' }
];
>>>>>>> origin/job-fetching-fix

const AdminJobPosting = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [formData, setFormData] = useState(initialForm);
<<<<<<< HEAD
  const [logoPreview, setLogoPreview] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("create");
  const [expandedSections, setExpandedSections] = useState({
    company: true,
    jobDetails: true,
    requirements: true,
    eligibility: true,
    additional: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "applicationDeadline",
    direction: "asc",
  });

  // Fetch jobs from backend
  useEffect(() => {
    fetch(API_ENDPOINTS.JOBS)
      .then((res) => res.json())
      .then((data) => setJobPostings(data));
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

=======
  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState('create');
  const [showFormBuilder, setShowFormBuilder] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await getAllJobs();
        setJobPostings(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Error loading job postings');
      }
    };
    fetchJobs();
  }, []);

>>>>>>> origin/job-fetching-fix
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
<<<<<<< HEAD
      [name]: value,
    });
  };

  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setFormData({
      ...formData,
      [field]: updatedValues,
    });
  };

  const handleSelectAll = (field, options) => {
    const currentValues = formData[field] || [];
    const allSelected = options.every((option) =>
      currentValues.includes(option)
    );

    setFormData({
      ...formData,
      [field]: allSelected ? [] : options,
=======
      [name]: value
    });
  };

  // Handle checkbox change for multiple selections
  const handleCheckboxChange = (field, value) => {
    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    setFormData({
      ...formData,
      [field]: updatedValues
    });
  };

  // Handle select all/clear all for multiple selections
  const handleSelectAll = (field, options) => {
    const currentValues = formData[field] || [];
    const allSelected = options.every(option => currentValues.includes(option));
    
    setFormData({
      ...formData,
      [field]: allSelected ? [] : options
>>>>>>> origin/job-fetching-fix
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.eligibleCourses.length === 0) {
      alert("Please select at least one eligible course.");
      return;
    }
    if (formData.eligibleYears.length === 0) {
      alert("Please select at least one eligible year.");
      return;
    }

    if (logoFile) {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => {
            form.append(`${key}[]`, item);
          });
        } else {
          form.append(key, formData[key]);
        }
      });

      form.append("companyLogo", logoFile);

      const url = editId
        ? `${API_ENDPOINTS.JOBS}/${editId}`
        : API_ENDPOINTS.JOBS;

      fetch(url, {
        method: editId ? "PUT" : "POST",
        body: form,
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText}`);
          }
          return res.json();
        })
        .then(handleSuccess)
        .catch(handleError);
    } else {
      const url = editId
        ? `${API_ENDPOINTS.JOBS}/${editId}`
        : API_ENDPOINTS.JOBS;

      fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText}`);
          }
          return res.json();
        })
        .then(handleSuccess)
        .catch(handleError);
=======
  // Form Builder Functions for on-campus jobs
  const addFormField = () => {
    const newField = {
      fieldName: `field_${Date.now()}`,
      fieldLabel: '',
      fieldType: 'text',
      required: false,
      options: [],
      placeholder: '',
      validation: ''
    };
    
    setFormData({
      ...formData,
      applicationFormFields: [...formData.applicationFormFields, newField]
    });
  };

  const updateFormField = (index, field, value) => {
    const updatedFields = [...formData.applicationFormFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    
    setFormData({
      ...formData,
      applicationFormFields: updatedFields
    });
  };

  const removeFormField = (index) => {
    const updatedFields = formData.applicationFormFields.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      applicationFormFields: updatedFields
    });
  };

  const addOption = (fieldIndex) => {
    const updatedFields = [...formData.applicationFormFields];
    updatedFields[fieldIndex].options.push('');
    setFormData({
      ...formData,
      applicationFormFields: updatedFields
    });
  };

  const updateOption = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...formData.applicationFormFields];
    updatedFields[fieldIndex].options[optionIndex] = value;
    setFormData({
      ...formData,
      applicationFormFields: updatedFields
    });
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...formData.applicationFormFields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFormData({
      ...formData,
      applicationFormFields: updatedFields
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submit - editId:', editId);
    console.log('Form submit - formData:', formData);
    
    // Validate required fields
    if (formData.eligibleCourses.length === 0) {
      alert('Please select at least one eligible course.');
      return;
    }
    if (formData.eligibleYears.length === 0) {
      alert('Please select at least one eligible year.');
      return;
    }
    
    // Validate on-campus job requirements
    if (formData.campusType === 'on-campus') {
      if (formData.applicationFormFields.length === 0) {
        alert('Please add at least one application form field for on-campus jobs.');
        return;
      }
      
      // Validate form fields
      for (let field of formData.applicationFormFields) {
        if (!field.fieldLabel.trim()) {
          alert('All form fields must have a label.');
          return;
        }
        if (field.fieldType === 'select' && field.options.length === 0) {
          alert('Select fields must have at least one option.');
          return;
        }
      }
    }
    
    try {
      let job;
      
      if (editId) {
        job = await updateJob(editId, formData);
        setJobPostings(jobPostings.map(j => j._id === editId ? job : j));
        alert('Job updated successfully!');
        setActiveTab('manage');
      } else {
        job = await createJob(formData);
        setJobPostings([...jobPostings, job]);
        alert('Job created successfully!');
      }
      
      setEditId(null);
      setFormData(initialForm);
      setLogoPreview('');
      setLogoFile(null);
      setShowFormBuilder(false);
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job. Please try again.');
>>>>>>> origin/job-fetching-fix
    }
  };

  const handleSuccess = (job) => {
<<<<<<< HEAD
    if (editId) {
      setJobPostings(jobPostings.map((j) => (j._id === editId ? job : j)));
      alert("Job updated successfully!");
      setActiveTab("manage");
    } else {
      setJobPostings([...jobPostings, job]);
      alert("Job created successfully!");
    }

    setEditId(null);
    setFormData(initialForm);
    setLogoPreview("");
    setLogoFile(null);
  };

  const handleError = (err) => {
    console.error("Error saving job:", err);
    alert(`Error saving job: ${err.message || err}`);
  };

  const handleEdit = (job) => {
    const editFormData = {
      ...job,
      eligibleCourses: Array.isArray(job.eligibleCourses)
        ? job.eligibleCourses
        : [],
      eligibleBranches: Array.isArray(job.eligibleBranches)
        ? job.eligibleBranches
        : [],
      eligibleYears: Array.isArray(job.eligibleYears) ? job.eligibleYears : [],
    };

    setFormData(editFormData);
    setEditId(job._id);
    setActiveTab("create");

    if (job.companyLogo) {
      setLogoPreview(`${API_ENDPOINTS.UPLOADS}${job.companyLogo}`);
    } else {
      setLogoPreview("");
=======
    console.log('handleSuccess called with:', job); // Debug log
    
    if (editId) {
      setJobPostings(jobPostings.map(j => j._id === editId ? job : j));
      alert('Job updated successfully!');
      setActiveTab('manage'); // Switch back to manage tab after edit
    } else {
      setJobPostings([...jobPostings, job]);
      alert('Job created successfully!');
    }
    
    setEditId(null);
    setFormData(initialForm);
    setLogoPreview('');
    setLogoFile(null);
    setShowFormBuilder(false);
  };

  const handleError = (err) => {
    console.error('Error saving job:', err);
    alert('Error saving job. Please try again.');
  };

  const handleEdit = (job) => {
    console.log('Editing job:', job); // Debug log
    
    // Ensure arrays are properly handled
    const editFormData = {
      ...job,
      eligibleCourses: Array.isArray(job.eligibleCourses) ? job.eligibleCourses : [],
      eligibleBranches: Array.isArray(job.eligibleBranches) ? job.eligibleBranches : [],
      eligibleYears: Array.isArray(job.eligibleYears) ? job.eligibleYears : [],
      applicationFormFields: Array.isArray(job.applicationFormFields) ? job.applicationFormFields : [],
      campusType: job.campusType || 'off-campus'
    };
    
    console.log('Form data for edit:', editFormData); // Debug log
    
    setFormData(editFormData);
    setEditId(job._id);
    setActiveTab('create');
    
    // Handle logo preview
    if (job.companyLogo) {
      setLogoPreview(`${API_ENDPOINTS.UPLOADS}${job.companyLogo}`);
    } else {
      setLogoPreview('');
>>>>>>> origin/job-fetching-fix
    }
    setLogoFile(null);
  };

<<<<<<< HEAD
  const handleDelete = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      fetch(`${API_ENDPOINTS.JOBS}/${jobId}`, { method: "DELETE" }).then(() => {
        setJobPostings(jobPostings.filter((job) => job._id !== jobId));
        alert("Job deleted successfully!");
      });
=======
  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobPostings(jobPostings.filter(job => job._id !== jobId));
      alert('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job. Please try again.');
>>>>>>> origin/job-fetching-fix
    }
  };

  const handleCancel = () => {
<<<<<<< HEAD
    setEditId(null);
    setFormData(initialForm);
    setLogoPreview("");
    setLogoFile(null);
    setActiveTab("manage");
  };

  const handleTabChange = (tab) => {
    if (tab === "manage" && editId) {
      setEditId(null);
      setFormData(initialForm);
      setLogoPreview("");
      setLogoFile(null);
=======
    console.log('Cancel button clicked'); // Debug log
    setEditId(null);
    setFormData(initialForm);
    setLogoPreview('');
    setLogoFile(null);
    setActiveTab('manage');
    setShowFormBuilder(false);
  };

  // Handle tab changes
  const handleTabChange = (tab) => {
    if (tab === 'manage' && editId) {
      // If switching to manage tab while editing, reset edit state
      setEditId(null);
      setFormData(initialForm);
      setLogoPreview('');
      setLogoFile(null);
      setShowFormBuilder(false);
>>>>>>> origin/job-fetching-fix
    }
    setActiveTab(tab);
  };

<<<<<<< HEAD
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedJobPostings = React.useMemo(() => {
    let sortableItems = [...jobPostings];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [jobPostings, sortConfig]);

  const filteredJobPostings = sortedJobPostings.filter(
    (job) =>
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <FiChevronUp /> : <FiChevronDown />;
  };

  return (
    <div className="admin-job-posting-container">
      <div className="admin-header">
        <h1>
          <MdWork className="header-icon" />
          Job Posting Management
        </h1>
        <div className="admin-controls">
          {activeTab === "manage" && (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => handleTabChange("create")}
        >
          {editId ? (
            <>
              <FiEdit2 /> Edit Job
            </>
          ) : (
            <>
              <MdWork /> Create New Job
            </>
          )}
        </button>
        <button
          className={activeTab === "manage" ? "active" : ""}
          onClick={() => handleTabChange("manage")}
        >
          <MdBusiness /> Manage Jobs
        </button>
      </div>

      {activeTab === "create" ? (
        <form
          onSubmit={handleSubmit}
          className="job-posting-form"
          encType="multipart/form-data"
        >
          {/* Company Information Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("company")}
            >
              <h2>
                <MdBusiness /> Company Information
              </h2>
              {expandedSections.company ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.company && (
              <div className="section-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <MdBusiness /> Company Name*
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="form-group logo">
                    <label className="xyz">
                      <FiUpload /> Company Logo
                    </label>
                    <div className="logo-upload-container">
                      <label className="logo-upload-label">
                        {logoPreview ? (
                          <div className="logo-preview-container">
                            <img
                              src={logoPreview}
                              alt="Company Logo Preview"
                              className="logo-preview"
                            />
                            <div className="logo-overlay">
                              <FiUpload className="upload-icon" />
                              <span>Change Logo</span>
                            </div>
                          </div>
                        ) : (
                          <div className="logo-upload-placeholder">
                            <FiUpload className="upload-icon" />
                            <span>Upload Logo</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="logo-upload-input"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <MdContacts /> Contact Person*
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      placeholder="Contact person name"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdContacts /> Contact Email*
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdContacts /> Contact Phone
                    </label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
=======
  return (
    <div className="admin-job-posting-container">
      <AdminHeader />
      <div className="admin-content">
        <h1>Job Posting Management</h1>
        <div className="admin-tabs">
          <button
            className={activeTab === 'create' ? 'active' : ''}
            onClick={() => handleTabChange('create')}
          >
            {editId ? 'Edit Job Posting' : 'Create New Job Posting'}
          </button>
          <button
            className={activeTab === 'manage' ? 'active' : ''}
            onClick={() => handleTabChange('manage')}
          >
            Manage Job Postings
          </button>
        </div>

        {activeTab === 'create' ? (
          <form onSubmit={handleSubmit} className="job-posting-form" encType="multipart/form-data">
            <div className="form-section">
              <h2>Job Type & Campus</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Campus Type*</label>
                  <select
                    name="campusType"
                    value={formData.campusType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="off-campus">Off-Campus</option>
                    <option value="on-campus">On-Campus</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Job Type*</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Company Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name*</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company Logo</label>
                  <div className="logo-upload">
                    {logoPreview && (
                      <img src={logoPreview} alt="Company Logo Preview" className="logo-preview" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
>>>>>>> origin/job-fetching-fix
                    />
                  </div>
                </div>
                <div className="form-group">
<<<<<<< HEAD
                  <label>
                    <MdBusiness /> Company Website
                  </label>
=======
                  <label>Company Website</label>
>>>>>>> origin/job-fetching-fix
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>
<<<<<<< HEAD
            )}
          </div>

          {/* Job Details Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("jobDetails")}
            >
              <h2>
                <MdWork /> Job Details
              </h2>
              {expandedSections.jobDetails ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.jobDetails && (
              <div className="section-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <MdWork /> Position Title*
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      placeholder="Job position title"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdWork /> Job Type*
                    </label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <MdAttachMoney /> Salary Package*
                    </label>
                    <input
                      type="text"
                      name="salaryPackage"
                      value={formData.salaryPackage}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 6 LPA or $50,000"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdLocationOn /> Location*
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="Job location"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <MdEvent /> Drive Date
                    </label>
                    <input
                      type="date"
                      name="driveDate"
                      value={formData.driveDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MdEvent /> Application Deadline*
                    </label>
                    <input
                      type="date"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Job Requirements Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("requirements")}
            >
              <h2>
                <MdDescription /> Job Requirements
              </h2>
              {expandedSections.requirements ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.requirements && (
              <div className="section-content">
                <div className="form-group">
                  <label>
                    <MdDescription /> Job Description*
                  </label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Detailed job description..."
                  />
                </div>
                <div className="form-group">
                  <label>
                    <MdDescription /> Skills Required*
                  </label>
                  <textarea
                    name="skillsRequired"
                    value={formData.skillsRequired}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    placeholder="Enter skills separated by commas"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Eligibility Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("eligibility")}
            >
              <h2>
                <MdSchool /> Eligibility Details
              </h2>
              {expandedSections.eligibility ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.eligibility && (
              <div className="section-content">
                <div className="form-group">
                  <label>Eligible Courses*</label>
                  <div className="selection-controls">
                    <button
                      type="button"
                      className="select-all-btn"
                      onClick={() =>
                        handleSelectAll("eligibleCourses", COURSES)
                      }
                    >
                      {formData.eligibleCourses.length === COURSES.length ? (
                        <>
                          <FiX /> Clear All
                        </>
                      ) : (
                        <>
                          <FiCheck /> Select All
                        </>
                      )}
                    </button>
                  </div>
                  <div className="checkbox-grid">
                    {COURSES.map((course) => (
=======
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Person*</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Email*</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Job Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Position Title*</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Salary Package*</label>
                  <input
                    type="text"
                    name="salaryPackage"
                    value={formData.salaryPackage}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Drive Date</label>
                  <input
                    type="date"
                    name="driveDate"
                    value={formData.driveDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Application Deadline*</label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Job Requirements</h2>
              <div className="form-group">
                <label>Job Description*</label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  required
                  rows="5"
                />
              </div>
              <div className="form-group">
                <label>Skills Required*</label>
                <textarea
                  name="skillsRequired"
                  value={formData.skillsRequired}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="Enter skills separated by commas"
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Eligibility Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Eligible Courses*</label>
                  <div className="selection-controls">
                    <button 
                      type="button" 
                      className="select-all-btn"
                      onClick={() => handleSelectAll('eligibleCourses', COURSES)}
                    >
                      {formData.eligibleCourses.length === COURSES.length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>
                  <div className="checkbox-grid">
                    {COURSES.map(course => (
>>>>>>> origin/job-fetching-fix
                      <label key={course} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.eligibleCourses.includes(course)}
<<<<<<< HEAD
                          onChange={() =>
                            handleCheckboxChange("eligibleCourses", course)
                          }
                        />
                        <span className="checkbox-custom"></span>
=======
                          onChange={() => handleCheckboxChange('eligibleCourses', course)}
                        />
>>>>>>> origin/job-fetching-fix
                        <span className="checkbox-label">{course}</span>
                      </label>
                    ))}
                  </div>
                  {formData.eligibleCourses.length > 0 && (
                    <div className="selected-items">
                      <span className="selected-label">Selected: </span>
<<<<<<< HEAD
                      {formData.eligibleCourses.join(", ")}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Eligible Branches (for technical courses)</label>
                  <div className="selection-controls">
                    <button
                      type="button"
                      className="select-all-btn"
                      onClick={() =>
                        handleSelectAll("eligibleBranches", BRANCHES)
                      }
                    >
                      {formData.eligibleBranches.length === BRANCHES.length ? (
                        <>
                          <FiX /> Clear All
                        </>
                      ) : (
                        <>
                          <FiCheck /> Select All
                        </>
                      )}
                    </button>
                  </div>
                  <div className="checkbox-grid">
                    {BRANCHES.map((branch) => (
=======
                      {formData.eligibleCourses.join(', ')}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Eligible Branches (for technical courses)</label>
                  <div className="selection-controls">
                    <button 
                      type="button" 
                      className="select-all-btn"
                      onClick={() => handleSelectAll('eligibleBranches', BRANCHES)}
                    >
                      {formData.eligibleBranches.length === BRANCHES.length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>
                  <div className="checkbox-grid">
                    {BRANCHES.map(branch => (
>>>>>>> origin/job-fetching-fix
                      <label key={branch} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.eligibleBranches.includes(branch)}
<<<<<<< HEAD
                          onChange={() =>
                            handleCheckboxChange("eligibleBranches", branch)
                          }
                        />
                        <span className="checkbox-custom"></span>
=======
                          onChange={() => handleCheckboxChange('eligibleBranches', branch)}
                        />
>>>>>>> origin/job-fetching-fix
                        <span className="checkbox-label">{branch}</span>
                      </label>
                    ))}
                  </div>
                  {formData.eligibleBranches.length > 0 && (
                    <div className="selected-items">
                      <span className="selected-label">Selected: </span>
<<<<<<< HEAD
                      {formData.eligibleBranches.join(", ")}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Eligible Years*</label>
                  <div className="selection-controls">
                    <button
                      type="button"
                      className="select-all-btn"
                      onClick={() => handleSelectAll("eligibleYears", YEARS)}
                    >
                      {formData.eligibleYears.length === YEARS.length ? (
                        <>
                          <FiX /> Clear All
                        </>
                      ) : (
                        <>
                          <FiCheck /> Select All
                        </>
                      )}
                    </button>
                  </div>
                  <div className="checkbox-grid">
                    {YEARS.map((year) => (
=======
                      {formData.eligibleBranches.join(', ')}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Eligible Years*</label>
                  <div className="selection-controls">
                    <button 
                      type="button" 
                      className="select-all-btn"
                      onClick={() => handleSelectAll('eligibleYears', YEARS)}
                    >
                      {formData.eligibleYears.length === YEARS.length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>
                  <div className="checkbox-grid">
                    {YEARS.map(year => (
>>>>>>> origin/job-fetching-fix
                      <label key={year} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.eligibleYears.includes(year)}
<<<<<<< HEAD
                          onChange={() =>
                            handleCheckboxChange("eligibleYears", year)
                          }
                        />
                        <span className="checkbox-custom"></span>
=======
                          onChange={() => handleCheckboxChange('eligibleYears', year)}
                        />
>>>>>>> origin/job-fetching-fix
                        <span className="checkbox-label">{year}</span>
                      </label>
                    ))}
                  </div>
                  {formData.eligibleYears.length > 0 && (
                    <div className="selected-items">
                      <span className="selected-label">Selected: </span>
<<<<<<< HEAD
                      {formData.eligibleYears.join(", ")}
=======
                      {formData.eligibleYears.join(', ')}
>>>>>>> origin/job-fetching-fix
                    </div>
                  )}
                </div>
              </div>
<<<<<<< HEAD
            )}
          </div>

          {/* Additional Information Section */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => toggleSection("additional")}
            >
              <h2>
                <MdDescription /> Additional Information
              </h2>
              {expandedSections.additional ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.additional && (
              <div className="section-content">
                <div className="form-group">
                  <label>Selection Process</label>
                  <textarea
                    name="selectionProcess"
                    value={formData.selectionProcess}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="e.g., Written Test, Technical Interview, HR Round"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Bond Details (if any)</label>
                    <input
                      type="text"
                      name="bondDetails"
                      value={formData.bondDetails}
                      onChange={handleInputChange}
                      placeholder="e.g., 1 year bond with Rs. 50,000 penalty"
                    />
                  </div>
                  <div className="form-group">
                    <label>Benefits</label>
                    <input
                      type="text"
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleInputChange}
                      placeholder="e.g., Health insurance, PF, etc."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Additional Information</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any other relevant information"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editId ? (
                <>
                  <FiEdit2 /> Update Job Posting
                </>
              ) : (
                <>
                  <MdWork /> Create Job Posting
                </>
              )}
            </button>
            {editId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                <FiX /> Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="job-postings-list">
          <div className="list-header">
            <h2>
              <MdBusiness /> Manage Job Postings ({filteredJobPostings.length})
            </h2>
          </div>
          {filteredJobPostings.length === 0 ? (
            <div className="no-postings">
              <div className="empty-state">
                <MdWork className="empty-icon" />
                <h3>No job postings found</h3>
                <p>
                  {searchTerm
                    ? "Try a different search term"
                    : "Create your first job posting"}
                </p>
                <button
                  onClick={() => handleTabChange("create")}
                  className="create-first-btn"
                >
                  <MdWork /> Create New Job
                </button>
              </div>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("companyName")}>
                      <div className="th-content">
                        Company {renderSortIcon("companyName")}
                      </div>
                    </th>
                    <th onClick={() => handleSort("position")}>
                      <div className="th-content">
                        Position {renderSortIcon("position")}
                      </div>
                    </th>
                    <th onClick={() => handleSort("jobType")}>
                      <div className="th-content">
                        Job Type {renderSortIcon("jobType")}
                      </div>
                    </th>
                    <th onClick={() => handleSort("salaryPackage")}>
                      <div className="th-content">
                        Package {renderSortIcon("salaryPackage")}
                      </div>
                    </th>
                    <th onClick={() => handleSort("applicationDeadline")}>
                      <div className="th-content">
                        Deadline {renderSortIcon("applicationDeadline")}
                      </div>
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobPostings.map((posting) => (
                    <tr key={posting._id}>
                      <td>
                        <div className="company-cell">
                          {posting.companyLogo && (
                            <img
                              src={
                                posting.companyLogo.startsWith("http")
                                  ? posting.companyLogo
                                  : `${API_ENDPOINTS.UPLOADS}${posting.companyLogo}`
                              }
                              alt={posting.companyName}
                              className="company-logo-small"
                              onError={(e) => {
                                e.target.src = "/default-logo.png";
                                e.target.onerror = null;
                              }}
                            />
                          )}
                          <div className="company-info">
                            <div className="company-name">
                              {posting.companyName}
                            </div>
                            <div className="company-location">
                              <MdLocationOn /> {posting.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="position-cell">
                          <div className="position-title">
                            {posting.position || "-"}
                          </div>
                          <div className="job-type-badge">
                            {posting.jobType || "-"}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="job-type-cell">
                          {posting.jobType || "-"}
                        </div>
                      </td>
                      <td>
                        <div className="salary-cell">
                          {posting.salaryPackage || "-"}
                        </div>
                      </td>
                      <td>
                        <div className="deadline-cell">
                          {posting.applicationDeadline
                            ? new Date(
                                posting.applicationDeadline
                              ).toLocaleDateString()
                            : "-"}
                          {posting.applicationDeadline &&
                            new Date(posting.applicationDeadline) <
                              new Date() && (
                              <span className="deadline-passed">(Expired)</span>
                            )}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEdit(posting)}
                            className="edit-btn"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(posting._id)}
                            className="delete-btn"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
=======
            </div>

            <div className="form-section">
              <h2>Additional Information</h2>
              <div className="form-group">
                <label>Selection Process</label>
                <textarea
                  name="selectionProcess"
                  value={formData.selectionProcess}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="e.g., Written Test, Technical Interview, HR Round"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bond Details (if any)</label>
                  <input
                    type="text"
                    name="bondDetails"
                    value={formData.bondDetails}
                    onChange={handleInputChange}
                    placeholder="e.g., 1 year bond with Rs. 50,000 penalty"
                  />
                </div>
                <div className="form-group">
                  <label>Benefits</label>
                  <input
                    type="text"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="e.g., Health insurance, PF, etc."
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
            </div>

            {/* Application Method Section */}
            {formData.campusType === 'on-campus' ? (
              <div className="form-section">
                <h2>Application Form Builder</h2>
                <p className="section-description">
                  Create a custom application form for students to fill out when applying for this on-campus job.
                </p>
                
                <div className="form-builder-controls">
                  <button
                    type="button"
                    className="add-field-btn"
                    onClick={addFormField}
                  >
                    ➕ Add Form Field
                  </button>
                </div>

                {formData.applicationFormFields.length > 0 && (
                  <div className="form-fields-container">
                    {formData.applicationFormFields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="form-field-builder">
                        <div className="field-header">
                          <h4>Field {fieldIndex + 1}</h4>
                          <button
                            type="button"
                            className="remove-field-btn"
                            onClick={() => removeFormField(fieldIndex)}
                          >
                            🗑️ Remove
                          </button>
                        </div>
                        
                        <div className="field-inputs">
                          <div className="form-row">
                            <div className="form-group">
                              <label>Field Label*</label>
                              <input
                                type="text"
                                value={field.fieldLabel}
                                onChange={(e) => updateFormField(fieldIndex, 'fieldLabel', e.target.value)}
                                placeholder="e.g., Resume, Cover Letter, Portfolio Link"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Field Type*</label>
                              <select
                                value={field.fieldType}
                                onChange={(e) => updateFormField(fieldIndex, 'fieldType', e.target.value)}
                              >
                                {FORM_FIELD_TYPES.map(type => (
                                  <option key={type.value} value={type.value}>
                                    {type.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          <div className="form-row">
                            <div className="form-group">
                              <label>Placeholder Text</label>
                              <input
                                type="text"
                                value={field.placeholder || ''}
                                onChange={(e) => updateFormField(fieldIndex, 'placeholder', e.target.value)}
                                placeholder="e.g., Enter your portfolio URL"
                              />
                            </div>
                            <div className="form-group">
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={field.required || false}
                                  onChange={(e) => updateFormField(fieldIndex, 'required', e.target.checked)}
                                />
                                Required Field
                              </label>
                            </div>
                          </div>
                          
                          {/* Options for select/checkbox fields */}
                          {(field.fieldType === 'select' || field.fieldType === 'checkbox') && (
                            <div className="field-options">
                              <label>Options</label>
                              <div className="options-container">
                                {field.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="option-input">
                                    <input
                                      type="text"
                                      value={option}
                                      onChange={(e) => updateOption(fieldIndex, optionIndex, e.target.value)}
                                      placeholder={`Option ${optionIndex + 1}`}
                                    />
                                    <button
                                      type="button"
                                      className="remove-option-btn"
                                      onClick={() => removeOption(fieldIndex, optionIndex)}
                                    >
                                      ❌
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  className="add-option-btn"
                                  onClick={() => addOption(fieldIndex)}
                                >
                                  ➕ Add Option
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="form-section">
                <h2>External Application</h2>
                <div className="form-group">
                  <label>Application Link*</label>
                  <input
                    type="url"
                    name="applicationLink"
                    value={formData.applicationLink}
                    onChange={handleInputChange}
                    placeholder="https://company.com/careers/apply"
                    required
                  />
                  <p className="field-help">
                    Students will be redirected to this link when they click "Apply Now"
                  </p>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editId ? 'Update Job Posting' : 'Create Job Posting'}
              </button>
              {editId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="job-postings-list">
            <h2>📋 Manage Job Postings ({jobPostings.length})</h2>
            {jobPostings.length === 0 ? (
              <div className="no-postings">
                <p>🎯 No job postings created yet.</p>
                <p>Start by creating your first job posting using the form above!</p>
              </div>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>🏢 Company</th>
                      <th>💼 Position</th>
                      <th>📍 Campus Type</th>
                      <th>⏰ Job Type</th>
                      <th>💰 Package</th>
                      <th>🎓 Eligible Courses</th>
                      <th>📅 Eligible Years</th>
                      <th>⏳ Deadline</th>
                      <th>🔧 Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobPostings.map((posting) => (
                      <tr key={posting._id}>
                        <td>
                          <div className="company-cell">
                            {posting.companyLogo && (
                              <img 
                                src={
                                  posting.companyLogo.startsWith('http') 
                                    ? posting.companyLogo 
                                    : `${API_ENDPOINTS.UPLOADS}${posting.companyLogo}`
                                }
                                alt={posting.companyName}
                                className="company-logo-small"
                                onError={(e) => {
                                  e.target.src = '/default-logo.png';
                                  e.target.onerror = null;
                                }}
                              />
                            )}
                            <span className="company-name">{posting.companyName}</span>
                          </div>
                        </td>
                        <td>
                          <span className="position-text">{posting.position || '-'}</span>
                        </td>
                        <td>
                          <span className={`campus-type ${posting.campusType || 'off-campus'}`}>
                            {posting.campusType === 'on-campus' ? '🏫 On-Campus' : '🌐 Off-Campus'}
                          </span>
                        </td>
                        <td>
                          <span className="job-type-badge">{posting.jobType || '-'}</span>
                        </td>
                        <td>
                          <span className="package-text">💰 {posting.salaryPackage || '-'}</span>
                        </td>
                        <td>
                          <div className="eligibility-info">
                            <div className="courses-text">
                              {(posting.eligibleCourses?.join(', ') || 'None')}
                            </div>
                            {posting.eligibleBranches?.length > 0 && (
                              <div className="branches-text">
                                <span className="branch-label">Branches:</span> {posting.eligibleBranches.join(', ')}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="years-text">{posting.eligibleYears?.join(', ') || '-'}</span>
                        </td>
                        <td>
                          <span className="deadline-text">
                            {posting.applicationDeadline 
                              ? new Date(posting.applicationDeadline).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })
                              : '-'}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              onClick={() => handleEdit(posting)}
                              className="edit-btn"
                              title="Edit this job posting"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this job posting?')) {
                                  handleDelete(posting._id);
                                }
                              }}
                              className="delete-btn"
                              title="Delete this job posting"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
>>>>>>> origin/job-fetching-fix
    </div>
  );
};

<<<<<<< HEAD
export default AdminJobPosting;
=======
export default AdminJobPosting;
>>>>>>> origin/job-fetching-fix
