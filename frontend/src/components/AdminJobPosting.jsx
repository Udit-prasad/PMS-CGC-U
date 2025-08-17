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

const AdminJobPosting = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [formData, setFormData] = useState(initialForm);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };

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
    }
  };

  const handleSuccess = (job) => {
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
    }
    setLogoFile(null);
  };

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobPostings(jobPostings.filter(job => job._id !== jobId));
      alert('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job. Please try again.');
    }
  };

  const handleCancel = () => {
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
    }
    setActiveTab(tab);
  };

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
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Company Website</label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>
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
                      <label key={course} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.eligibleCourses.includes(course)}
                          onChange={() => handleCheckboxChange('eligibleCourses', course)}
                        />
                        <span className="checkbox-label">{course}</span>
                      </label>
                    ))}
                  </div>
                  {formData.eligibleCourses.length > 0 && (
                    <div className="selected-items">
                      <span className="selected-label">Selected: </span>
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
                      <label key={branch} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.eligibleBranches.includes(branch)}
                          onChange={() => handleCheckboxChange('eligibleBranches', branch)}
                        />
                        <span className="checkbox-label">{branch}</span>
                      </label>
                    ))}
                  </div>
                  {formData.eligibleBranches.length > 0 && (
                    <div className="selected-items">
                      <span className="selected-label">Selected: </span>
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
                      <label key={year} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.eligibleYears.includes(year)}
                          onChange={() => handleCheckboxChange('eligibleYears', year)}
                        />
                        <span className="checkbox-label">{year}</span>
                      </label>
                    ))}
                  </div>
                  {formData.eligibleYears.length > 0 && (
                    <div className="selected-items">
                      <span className="selected-label">Selected: </span>
                      {formData.eligibleYears.join(', ')}
                    </div>
                  )}
                </div>
              </div>
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
    </div>
  );
};

export default AdminJobPosting;