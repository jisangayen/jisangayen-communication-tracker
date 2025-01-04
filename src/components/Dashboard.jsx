import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {

  const defaultCompanies = [
    {
      companyName: "Tech Solutions Inc.",
      location: "New York",
      linkedinProfile: "https://www.linkedin.com/company/tech-solutions",
      emails: ["contact@techsolutions.com"],
      phoneNumbers: ["123-456-7890"],
      comments: "Preferred communication in Q1.",
      communicationPeriodicity: "Monthly",
    },
    {
      companyName: "Global Enterprises",
      location: "San Francisco",
      linkedinProfile: "https://www.linkedin.com/company/global-enterprises",
      emails: ["info@globalenterprises.com"],
      phoneNumbers: ["987-654-3210"],
      comments: "Follow up after every campaign.",
      communicationPeriodicity: "Quarterly",
    },
    {
      companyName: "Innovatech Ltd.",
      location: "London",
      linkedinProfile: "https://www.linkedin.com/company/innovatech",
      emails: ["hello@innovatech.co.uk"],
      phoneNumbers: ["555-123-4567"],
      comments: "Check for partnership opportunities.",
      communicationPeriodicity: "Bi-weekly",
    },
    {
      companyName: "Creative Solutions Ltd.",
      location: "Toronto",
      linkedinProfile: "https://www.linkedin.com/company/creative-solutions-ltd",
      emails: ["contact@creativesolutions.com"],
      phoneNumbers: ["666-777-8888"],
      comments: "Discussing future projects.",
      communicationPeriodicity: "Monthly",
    },
    {
      companyName: "Bright Horizons",
      location: "Los Angeles",
      linkedinProfile: "https://www.linkedin.com/company/brighthorizons",
      emails: ["hello@brighthorizons.com"],
      phoneNumbers: ["444-555-6666"],
      comments: "Exploring partnership options.",
      communicationPeriodicity: "Bi-weekly",
    },
    {
      companyName: "Future Enterprises",
      location: "Boston",
      linkedinProfile: "https://www.linkedin.com/company/future-enterprises",
      emails: ["contact@futureenterprises.com"],
      phoneNumbers: ["777-888-9999"],
      comments: "Interested in technological advancements.",
      communicationPeriodicity: "Quarterly",
    },
  ];



  const [activeTab, setActiveTab] = useState("userList");
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers && savedUsers !== "[]" ? JSON.parse(savedUsers) : defaultCompanies;
  });
  


  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [emails, setEmails] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [comments, setComments] = useState("");
  const [communicationPeriodicity, setCommunicationPeriodicity] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate();

  // Sync users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/"); // Redirect to login page
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!companyName || !location || !linkedinProfile || !emails || !phoneNumbers) {
      alert("All required fields must be filled out!");
      return;
    }

    const userData = {
      companyName,
      location,
      linkedinProfile,
      emails: emails.split(",").map((email) => email.trim()),
      phoneNumbers: phoneNumbers.split(",").map((phone) => phone.trim()),
      comments,
      communicationPeriodicity,
    };

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = userData;
      setUsers(updatedUsers);
      setEditIndex(null);
      toast.success("Company details updated successfully!");
    } else {
      setUsers([...users, userData]);
      toast.success("Company added successfully!");
    }
    setCompanyName("");
    setLocation("");
    setLinkedinProfile("");
    setEmails("");
    setPhoneNumbers("");
    setComments("");
    setCommunicationPeriodicity("");

    setActiveTab("userList"); // Redirect to the Company List tab after success
  };

  const handleEditUser = (index) => {
    const user = users[index];
    setCompanyName(user.companyName);
    setLocation(user.location);
    setLinkedinProfile(user.linkedinProfile);
    setEmails(user.emails.join(", "));
    setPhoneNumbers(user.phoneNumbers.join(", "));
    setComments(user.comments);
    setCommunicationPeriodicity(user.communicationPeriodicity);
    setEditIndex(index);
    setActiveTab("addUser");
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    toast.error("Company deleted successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-700">
            Admin Dashboard
          </h2>
          <nav className="p-4">
          
            <button
              className={`block w-full text-left px-4 py-2 rounded-lg mb-2 ${
                activeTab === "userList" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("userList")}
            >
              Company List
            </button>

            <button
              className={`block w-full text-left px-4 py-2 rounded-lg mb-2 ${
                activeTab === "addUser" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("addUser")}
            >
              Add Company
            </button>
          </nav>
        </div>
        <div className="p-4">
          <button
            className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
          {/* Company List Tab */}
          {activeTab === "userList" && (
          <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Company List</h3>
            {users.length === 0 ? (
              <p className="text-gray-500 text-center">No companies added yet.</p>
            ) : (
              <div className="max-h-[28rem] overflow-y-auto border border-gray-300 rounded-md">
              <table className="w-full border border-gray-300 text-left text-sm">
                <thead className=" bg-gray-300 sticky top-0 z-10 rounded-md ">
                  <tr className="bg-gray-300 py-4">
                    <th className="px-4 py-2 border">Company Name</th>
                    <th className="px-4 py-2 border">Emails</th>
                    <th className="px-4 py-2 border">Phone Numbers</th>
                    <th className="px-4 py-2 border">LinkedIn</th>
                    <th className="px-4 py-2 border">Location</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border">{user.companyName}</td>
                      <td className="px-4 py-2 border">{user.emails.join(", ")}</td>
                      <td className="px-4 py-2 border">{user.phoneNumbers.join(", ")}</td>
                      <td className="px-4 py-2 border">
                        <a
                          href={user.linkedinProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          LinkedIn
                        </a>
                      </td>
                      <td className="px-4 py-2 border">{user.location}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleEditUser(index)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        )}



        {activeTab === "addUser" && (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Add Company Details</h3>
            <form onSubmit={handleAddUser} className="grid grid-cols-2 gap-6">
              {/* Form Fields */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Name of the Company</label>
             
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
                <input
                  type="url"
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter LinkedIn URL"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emails</label>
                <input
                  type="text"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter emails, separated by commas"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
                <input
                  type="text"
                  value={phoneNumbers}
                  onChange={(e) => setPhoneNumbers(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter phone numbers, separated by commas"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter additional comments"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Communication Periodicity
                </label>
                <input
                  type="text"
                  value={communicationPeriodicity}
                  onChange={(e) => setCommunicationPeriodicity(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter periodicity (e.g., 2 weeks)"
                />
              </div>
              <button
                type="submit"
                className="col-span-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {editIndex !== null ? "Update Company" : "Add Company"}
              </button>
            </form>
          </div>
        )}

      
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Dashboard;
