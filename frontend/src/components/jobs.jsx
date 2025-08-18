import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, Building, User, Award } from 'lucide-react';
import './jobs.css';
import { API_ENDPOINTS } from '../config/api';

// JobCard Component
const JobCard = ({ job, onClick }) => {
  console.log('Job data in JobCard:', job); // Debug log
  
<<<<<<< HEAD
  // Handle logo URL for local storage only
  const logoUrl = job.companyLogo
    ? job.companyLogo.startsWith('/uploads/')
      ? `${API_ENDPOINTS.UPLOADS}${job.companyLogo}` // Local storage URL
      : `${API_ENDPOINTS.UPLOADS}/uploads/${job.companyLogo}` // Fallback for local
    : '/default-logo.png'; // Default logo fallback
=======
  const logoUrl = job.companyLogo
    ? `${API_ENDPOINTS.UPLOADS}${job.companyLogo}`
    : '/default-logo.png';
>>>>>>> origin/job-fetching-fix

  const skills = job.skillsRequired ? job.skillsRequired.split(',').map(s => s.trim()) : [];

  return (
    <div className="job-card" onClick={() => onClick(job)}>
      <div className="job-card-content">
        <div className="job-card-header">
          <img 
            src={logoUrl} 
            alt={`${job.companyName} logo`} 
            className="company-logo"
          />
          <div className="company-name">{job.companyName}</div>
        </div>
        
        <div className="job-details-container">
          <div className="job-position">{job.position}</div>
          
          <div className="job-info-row">
            <div className="job-info-item">
              <MapPin className="detail-icon" size={16} />
              <span className="job-location">{job.location}</span>
            </div>
            <div className="job-info-item">
              <Clock className="detail-icon" size={16} />
              <span>{job.jobType}</span>
            </div>
          </div>
<<<<<<< HEAD
            <div className="job-info-row">
=======
          <div className="job-info-row">
>>>>>>> origin/job-fetching-fix
            <div className="job-salary">
              <DollarSign className="detail-icon" size={16} style={{display: 'inline', marginRight: '4px'}} />
              {job.salaryPackage}
            </div>
<<<<<<< HEAD
          </div>          {/* Eligibility Information Section */}
=======
          </div>
          
          {/* Campus Type Badge */}
          <div className="job-campus-type">
            <span className={`campus-badge ${job.campusType || 'off-campus'}`}>
              {job.campusType === 'on-campus' ? '🏫 On-Campus' : '🌐 Off-Campus'}
            </span>
          </div>
          
          {/* Eligibility Information Section */}
>>>>>>> origin/job-fetching-fix
          <div className="job-eligibility-section">
            {(job.eligibleCourses && job.eligibleCourses.length > 0) ||
             (job.eligibleYears && job.eligibleYears.length > 0) ||
             (job.eligibleBranches && job.eligibleBranches.length > 0) ? (
              <>
                {job.eligibleCourses && job.eligibleCourses.length > 0 && (
                  <div className="eligibility-row">
                    <Award className="detail-icon" size={14} />
                    <span className="job-eligible-courses">
                      <strong>Courses:</strong> {Array.isArray(job.eligibleCourses) 
                        ? job.eligibleCourses.join(", ") 
                        : job.eligibleCourses}
                    </span>
                  </div>
                )}
                
                {job.eligibleYears && job.eligibleYears.length > 0 && (
                  <div className="eligibility-row">
                    <span className="job-eligible-years">
                      <strong>Years:</strong> {Array.isArray(job.eligibleYears) 
                        ? job.eligibleYears.join(", ") 
                        : job.eligibleYears}
                    </span>
                  </div>
                )}
                
                {job.eligibleBranches && job.eligibleBranches.length > 0 && (
                  <div className="eligibility-row">
                    <span className="job-eligible-branches">
                      <strong>Branches:</strong> {Array.isArray(job.eligibleBranches) 
                        ? job.eligibleBranches.join(", ") 
                        : job.eligibleBranches}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="eligibility-row">
                <span className="job-eligible-courses">
                  <strong>Eligibility:</strong> Check job details
                </span>
              </div>
            )}
          </div>
        </div>
        
        {job.skillsRequired && (
          <div className="job-skills">
            <div className="skills-label">Required Skills</div>
            <div className="skills-tags">
              {skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="skill-tag">+{skills.length - 3}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
// JobDetails Component
const JobDetails = ({ job, onBack, onApply }) => {
  if (!job) return null;
=======
// Application Form Component for on-campus jobs
const ApplicationForm = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    applicantCourse: '',
    applicantYear: '',
    applicantBranch: '',
    formResponses: []
  });
  const [errors, setErrors] = useState({});

  // Initialize form responses based on job's applicationFormFields
  useEffect(() => {
    if (job.applicationFormFields && job.applicationFormFields.length > 0) {
      const initialResponses = job.applicationFormFields.map(field => ({
        fieldName: field.fieldName,
        fieldLabel: field.fieldLabel,
        fieldType: field.fieldType,
        response: field.fieldType === 'checkbox' ? [] : '',
        filePath: ''
      }));
      setFormData(prev => ({ ...prev, formResponses: initialResponses }));
    }
  }, [job]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormResponseChange = (index, value, isFile = false) => {
    const updatedResponses = [...formData.formResponses];
    if (isFile) {
      updatedResponses[index].filePath = value;
    } else {
      updatedResponses[index].response = value;
    }
    setFormData(prev => ({ ...prev, formResponses: updatedResponses }));
  };

  const handleCheckboxChange = (index, option) => {
    const updatedResponses = [...formData.formResponses];
    const currentResponse = updatedResponses[index].response || [];
    
    if (currentResponse.includes(option)) {
      updatedResponses[index].response = currentResponse.filter(item => item !== option);
    } else {
      updatedResponses[index].response = [...currentResponse, option];
    }
    
    setFormData(prev => ({ ...prev, formResponses: updatedResponses }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.applicantName.trim()) newErrors.applicantName = 'Name is required';
    if (!formData.applicantEmail.trim()) newErrors.applicantEmail = 'Email is required';
    if (!formData.applicantPhone.trim()) newErrors.applicantPhone = 'Phone is required';
    if (!formData.applicantCourse) newErrors.applicantCourse = 'Course is required';
    if (!formData.applicantYear) newErrors.applicantYear = 'Year is required';
    if (!formData.applicantBranch) newErrors.applicantBranch = 'Branch is required';
    
    // Validate form responses
    formData.formResponses.forEach((response, index) => {
      if (response.fieldType === 'file' && !response.filePath && job.applicationFormFields[index]?.required) {
        newErrors[`form_${index}`] = `${response.fieldLabel} is required`;
      }
      if (response.fieldType !== 'file' && !response.response && job.applicationFormFields[index]?.required) {
        if (response.fieldType === 'checkbox' && Array.isArray(response.response)) {
          if (response.response.length === 0) {
            newErrors[`form_${index}`] = `${response.fieldLabel} is required`;
          }
        } else if (typeof response.response === 'string' && !response.response.trim()) {
          newErrors[`form_${index}`] = `${response.fieldLabel} is required`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit({
        jobId: job._id,
        applicantData: {
          applicantName: formData.applicantName,
          applicantEmail: formData.applicantEmail,
          applicantPhone: formData.applicantPhone,
          applicantCourse: formData.applicantCourse,
          applicantYear: formData.applicantYear,
          applicantBranch: formData.applicantBranch
        },
        formResponses: formData.formResponses
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const renderFormField = (field, index) => {
    const response = formData.formResponses[index];
    const error = errors[`form_${index}`];
    
    switch (field.fieldType) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <div className="form-group" key={index}>
            <label>
              {field.fieldLabel}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type={field.fieldType === 'email' ? 'email' : 'text'}
              value={response?.response || ''}
              onChange={(e) => handleFormResponseChange(index, e.target.value)}
              placeholder={field.placeholder || ''}
              className={error ? 'error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      
      case 'textarea':
        return (
          <div className="form-group" key={index}>
            <label>
              {field.fieldLabel}
              {field.required && <span className="required">*</span>}
            </label>
            <textarea
              value={response?.response || ''}
              onChange={(e) => handleFormResponseChange(index, e.target.value)}
              placeholder={field.placeholder || ''}
              rows="4"
              className={error ? 'error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      
      case 'select':
        return (
          <div className="form-group" key={index}>
            <label>
              {field.fieldLabel}
              {field.required && <span className="required">*</span>}
            </label>
            <select
              value={response?.response || ''}
              onChange={(e) => handleFormResponseChange(index, e.target.value)}
              className={error ? 'error' : ''}
            >
              <option value="">Select an option</option>
              {field.options?.map((option, optIndex) => (
                <option key={optIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="form-group" key={index}>
            <label>
              {field.fieldLabel}
              {field.required && <span className="required">*</span>}
            </label>
            <div className="checkbox-options">
              {field.options?.map((option, optIndex) => (
                <label key={optIndex} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={response?.response?.includes(option) || false}
                    onChange={() => handleCheckboxChange(index, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      
      case 'file':
        return (
          <div className="form-group" key={index}>
            <label>
              {field.fieldLabel}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="file"
              onChange={(e) => handleFormResponseChange(index, e.target.files[0]?.name || '', true)}
              className={error ? 'error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="application-form-overlay">
      <div className="application-form-container">
        <div className="form-header">
          <h2>Apply for {job.position}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  required
                  className={errors.applicantName ? 'error' : ''}
                />
                {errors.applicantName && <span className="error-message">{errors.applicantName}</span>}
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="applicantEmail"
                  value={formData.applicantEmail}
                  onChange={handleInputChange}
                  required
                  className={errors.applicantEmail ? 'error' : ''}
                />
                {errors.applicantEmail && <span className="error-message">{errors.applicantEmail}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="applicantPhone"
                  value={formData.applicantPhone}
                  onChange={handleInputChange}
                  required
                  className={errors.applicantPhone ? 'error' : ''}
                />
                {errors.applicantPhone && <span className="error-message">{errors.applicantPhone}</span>}
              </div>
              <div className="form-group">
                <label>Course *</label>
                <select
                  name="applicantCourse"
                  value={formData.applicantCourse}
                  onChange={handleInputChange}
                  required
                  className={errors.applicantCourse ? 'error' : ''}
                >
                  <option value="">Select Course</option>
                  <option value="BTech">BTech</option>
                  <option value="BSc">BSc</option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                  <option value="MTech">MTech</option>
                  <option value="MCA">MCA</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.applicantCourse && <span className="error-message">{errors.applicantCourse}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Year *</label>
                <select
                  name="applicantYear"
                  value={formData.applicantYear}
                  onChange={handleInputChange}
                  required
                  className={errors.applicantYear ? 'error' : ''}
                >
                  <option value="">Select Year</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
                {errors.applicantYear && <span className="error-message">{errors.applicantYear}</span>}
              </div>
              <div className="form-group">
                <label>Branch *</label>
                <select
                  name="applicantBranch"
                  value={formData.applicantBranch}
                  onChange={handleInputChange}
                  required
                  className={errors.applicantBranch ? 'error' : ''}
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                  <option value="AIML">AIML</option>
                  <option value="DS">DS</option>
                  <option value="CSIT">CSIT</option>
                </select>
                {errors.applicantBranch && <span className="error-message">{errors.applicantBranch}</span>}
              </div>
            </div>
          </div>
          
          {job.applicationFormFields && job.applicationFormFields.length > 0 && (
            <div className="form-section">
              <h3>Additional Information</h3>
              {job.applicationFormFields.map((field, index) => renderFormField(field, index))}
            </div>
          )}
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// JobDetails Component
const JobDetails = ({ job, onBack, onApply }) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  if (!job) return null;
  
>>>>>>> origin/job-fetching-fix
  // Parse skills and benefits from comma-separated strings
  const skills = job.skillsRequired ? job.skillsRequired.split(',').map(s => s.trim()) : [];
  const benefits = job.benefits ? job.benefits.split(',').map(s => s.trim()) : [];

<<<<<<< HEAD
  // Build the correct logo URL - support both Cloudinary and local storage
  const logoUrl = job.companyLogo
    ? job.companyLogo.startsWith('http')
      ? job.companyLogo // Cloudinary URL (starts with https://)
      : job.companyLogo.startsWith('/uploads/')
        ? `${API_ENDPOINTS.UPLOADS}${job.companyLogo}` // Local storage URL
        : `${API_ENDPOINTS.UPLOADS}/uploads/${job.companyLogo}` // Fallback for local
    : '/default-logo.png'; // Default logo fallback

  return (
    <div className="job-details-container">
      <button className="back-button" onClick={onBack}>
        <span className="back-arrow">←</span> Back to Jobs
      </button>
      <div className="job-details-header">        <img src={logoUrl} alt={`${job.companyName} logo`} className="details-logo" />
        <div className="header-content">
          <h1>{job.position}</h1>
          <h2>{job.companyName}</h2>          <div className="job-meta">
            <span className="meta-item location">📍 {job.location}</span>
            <span className="meta-item salary">💰 {job.salaryPackage}</span>
            <span className="meta-item type">🕒 {job.jobType}</span>
          </div>
        </div>
      </div><div className="job-details-content">        <div className="job-section">
          <h3>Eligibility Criteria</h3>
          <div className="eligibility-grid">
            {job.eligibleCourses && job.eligibleCourses.length > 0 && (
              <div className="eligibility-item">
                <strong>Eligible Courses:</strong>
                <div className="eligibility-tags">
                  {(Array.isArray(job.eligibleCourses) ? job.eligibleCourses : [job.eligibleCourses]).map((course, index) => (
                    <span key={index} className="eligibility-tag course-tag">{course}</span>
                  ))}
                </div>
              </div>
            )}
            
            {job.eligibleYears && job.eligibleYears.length > 0 && (
              <div className="eligibility-item">
                <strong>Eligible Years:</strong>
                <div className="eligibility-tags">
                  {(Array.isArray(job.eligibleYears) ? job.eligibleYears : [job.eligibleYears]).map((year, index) => (
                    <span key={index} className="eligibility-tag year-tag">{year}</span>
                  ))}
                </div>
              </div>
            )}
            
            {job.eligibleBranches && job.eligibleBranches.length > 0 && (
              <div className="eligibility-item">
                <strong>Eligible Branches:</strong>
                <div className="eligibility-tags">
                  {(Array.isArray(job.eligibleBranches) ? job.eligibleBranches : [job.eligibleBranches]).map((branch, index) => (
                    <span key={index} className="eligibility-tag branch-tag">{branch}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="job-section">
          <h3>Job Description</h3>
          <p>{job.jobDescription || 'No job description provided.'}</p>
        </div>        <div className="job-section">
          <h3>Requirements</h3>
          <ul className="requirements-list">
            <li className="requirement-item">
              <span className="bullet">•</span> Check eligibility criteria above for course, year, and branch requirements
            </li>
            <li className="requirement-item">
              <span className="bullet">•</span> Good academic record and relevant skills as mentioned
            </li>
          </ul>
        </div>
        {skills.length > 0 && (
          <div className="job-section">
            <h3>Skills</h3>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}
        <div className="job-section">
          <h3>Benefits</h3>
          <ul className="benefits-list">
            {benefits.length > 0 ? benefits.map((benefit, index) => (
              <li key={index} className="benefit-item">
                <span className="bullet">•</span> {benefit}
              </li>
            )) : (
              <li className="benefit-item">
                <span className="bullet">•</span> Benefits information not provided.
              </li>
            )}
          </ul>
        </div>        {job.companyWebsite ? (
          <a 
            href={job.companyWebsite} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="apply-button"
          >
            Apply Now
          </a>
        ) : (
          <button className="apply-button" onClick={() => onApply && onApply(job)}>
            Apply Now
          </button>
        )}
      </div>
=======
  // Build the correct logo URL
  const logoUrl = job.companyLogo
    ? `${API_ENDPOINTS.UPLOADS}${job.companyLogo}`
    : '/default-logo.png';

  const handleApplyClick = () => {
    if (job.campusType === 'on-campus') {
      setShowApplicationForm(true);
    } else if (job.applicationLink) {
      window.open(job.applicationLink, '_blank');
    } else {
      alert('Application link not available for this job.');
    }
  };

  const handleApplicationSubmit = async (applicationData) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE_URL}/api/applications/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setShowApplicationForm(false);
        onBack(); // Go back to jobs list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to submit application'}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="job-details-container">
      {showApplicationForm ? (
        <ApplicationForm
          job={job}
          onSubmit={handleApplicationSubmit}
          onCancel={() => setShowApplicationForm(false)}
        />
      ) : (
        <>
          <button className="back-button" onClick={onBack}>
            <span className="back-arrow">←</span> Back to Jobs
          </button>
          
          <div className="job-details-header">
            <img src={logoUrl} alt={`${job.companyName} logo`} className="details-logo" />
            <div className="header-content">
              <h1>{job.position}</h1>
              <h2>{job.companyName}</h2>
              <div className="job-meta">
                <span className="meta-item location">📍 {job.location}</span>
                <span className="meta-item salary">💰 {job.salaryPackage}</span>
                <span className="meta-item type">🕒 {job.jobType}</span>
                <span className={`meta-item campus-type ${job.campusType || 'off-campus'}`}>
                  {job.campusType === 'on-campus' ? '🏫 On-Campus' : '🌐 Off-Campus'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="job-details-content">
            <div className="job-section">
              <h3>Eligibility Criteria</h3>
              <div className="eligibility-grid">
                {job.eligibleCourses && job.eligibleCourses.length > 0 && (
                  <div className="eligibility-item">
                    <strong>Eligible Courses:</strong>
                    <div className="eligibility-tags">
                      {(Array.isArray(job.eligibleCourses) ? job.eligibleCourses : [job.eligibleCourses]).map((course, index) => (
                        <span key={index} className="eligibility-tag course-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {job.eligibleYears && job.eligibleYears.length > 0 && (
                  <div className="eligibility-item">
                    <strong>Eligible Years:</strong>
                    <div className="eligibility-tags">
                      {(Array.isArray(job.eligibleYears) ? job.eligibleYears : [job.eligibleYears]).map((year, index) => (
                        <span key={index} className="eligibility-tag year-tag">{year}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {job.eligibleBranches && job.eligibleBranches.length > 0 && (
                  <div className="eligibility-item">
                    <strong>Eligible Branches:</strong>
                    <div className="eligibility-tags">
                      {(Array.isArray(job.eligibleBranches) ? job.eligibleBranches : [job.eligibleBranches]).map((branch, index) => (
                        <span key={index} className="eligibility-tag branch-tag">{branch}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="job-section">
              <h3>Job Description</h3>
              <p>{job.jobDescription || 'No job description provided.'}</p>
            </div>
            
            <div className="job-section">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                <li className="requirement-item">
                  <span className="bullet">•</span> Check eligibility criteria above for course, year, and branch requirements
                </li>
                <li className="requirement-item">
                  <span className="bullet">•</span> Good academic record and relevant skills as mentioned
                </li>
              </ul>
            </div>
            
            {skills.length > 0 && (
              <div className="job-section">
                <h3>Skills</h3>
                <div className="skills-container">
                  {skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="job-section">
              <h3>Benefits</h3>
              <ul className="benefits-list">
                {benefits.length > 0 ? benefits.map((benefit, index) => (
                  <li key={index} className="benefit-item">
                    <span className="bullet">•</span> {benefit}
                  </li>
                )) : (
                  <li className="benefit-item">
                    <span className="bullet">•</span> Benefits information not provided.
                  </li>
                )}
              </ul>
            </div>
            
            {/* Application Button */}
            <button className="apply-button" onClick={handleApplyClick}>
              {job.campusType === 'on-campus' ? 'Apply Now' : 'Apply on Company Website'}
            </button>
            
            {job.campusType === 'off-campus' && job.applicationLink && (
              <p className="application-note">
                You will be redirected to the company's website to complete your application.
              </p>
            )}
          </div>
        </>
      )}
>>>>>>> origin/job-fetching-fix
    </div>
  );
};

// Main Jobs Component
const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< HEAD
=======

>>>>>>> origin/job-fetching-fix
  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.JOBS);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const jobsData = await response.json();
        console.log('Fetched jobs data:', jobsData); // Debug log
        setJobs(jobsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleBack = () => {
    setSelectedJob(null);
  };

<<<<<<< HEAD
  const handleApply = (job) => {
    alert(`Applied for ${job.position} at ${job.companyName}`);
  };

=======
>>>>>>> origin/job-fetching-fix
  if (loading) {
    return (
      <div className="jobs-page-container">
        <div className="loading-container">
          <h2>Loading jobs...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-page-container">
        <div className="error-container">
          <h2>Error loading jobs</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page-container">
      {!selectedJob ? (
        <div>
          <div className="jobs-header">
            <h1 className="jobs-title">Available Jobs</h1>
            <p className="jobs-subtitle">{jobs.length} job(s) available</p>
          </div>
          <div className="jobs-list">
            {jobs.length === 0 ? (
              <div className="no-jobs-container">
                <h3>No jobs available at the moment</h3>
                <p>Please check back later for new opportunities.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard key={job._id} job={job} onClick={handleJobClick} />
              ))
            )}
          </div>
        </div>
      ) : (
        <JobDetails 
          job={selectedJob} 
<<<<<<< HEAD
          onBack={handleBack} 
          onApply={handleApply} 
=======
          onBack={handleBack}
>>>>>>> origin/job-fetching-fix
        />
      )}
    </div>
  );
};

export default Jobs;