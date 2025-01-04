import React, { useState } from "react";
import {
  Button,
  Modal,
  Table,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import CalendarComponent from "../components/TestModel";
import Calendar from "react-calendar";
import { Tooltip} from "@mui/material";
import "react-calendar/dist/Calendar.css";
import { CalendarToday } from "@mui/icons-material"; // Material UI Calendar Icon

const UserModule = () => {
  const [companies, setCompanies] = useState([
    {
      name: "Tech Solutions Inc",
      communications: [
        { type: "LinkedIn Post", date: "2025-01-01", notes: "Initial contact" },
        { type: "Email", date: "2024-12-15", notes: "Follow up" },
      ],
      nextCommunication: { type: "Phone Call", date: "2025-01-05" },
      overdue: true,
    },
    {
      name: "Global Enterprises",
      communications: [
        { type: "Phone Call", date: "2024-12-30", notes: "Introduction call" },
      ],
      nextCommunication: { type: "LinkedIn Message", date: "2025-01-10" },
      overdue: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCommunication, setNewCommunication] = useState({
    type: "",
    date: "",
    notes: "",
  });

  const handleShowModal = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCommunication({ type: "", date: "", notes: "" });
  };

  const handleCommunicationSubmit = () => {
    const updatedCompanies = companies.map((company) =>
      company.name === selectedCompany.name
        ? {
            ...company,
            communications: [
              ...company.communications,
              { ...newCommunication },
            ],
          }
        : company
    );
    setCompanies(updatedCompanies);
    handleCloseModal();
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewCommunication({ ...newCommunication, [name]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 p-6">
      <div className="bg-white w-full max-w-4xl p- rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 flex items-center justify-center mt-12 ">
          <CalendarToday className="mr-3 text-blue-500" />
          Communication Tracker
        </h2>

        {/* Notifications Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 ">
          <table className="w-full table-auto">
            <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 text-white ">
              <tr>
                <th className="px-4 py-2 text-center text-white border border-gray-300">
                  Overdue Communications
                </th>
                <th className="px-4 py-2  text-white text-center  border border-gray-300">
                  Today's Communications
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">
                  {companies
                    .filter((company) => company.overdue)
                    .map((company, index) => (
                      <div key={index} className="text-red-600 text-lg">
                        {company.name}
                      </div>
                    ))}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {companies
                    .filter(
                      (company) =>
                        company.nextCommunication.date === "2025-01-02"
                    )
                    .map((company, index) => (
                      <div key={index} className="text-yellow-500 text-lg">
                        {company.name}
                      </div>
                    ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dashboard */}
        <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center justify-center">
            <CalendarToday className="mr-3 text-blue-500" />
            Communication Dashboard
          </h3>
          <Table className="table-auto w-full text-gray-700">
            <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 text-white">
              <tr>
                <th className="px-6 py-3 text-left  border border-gray-300">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left  border border-gray-300">
                  Last Communications
                </th>
                <th className="px-6 py-3 text-left  border border-gray-300">
                  Next Communication
                </th>
                <th className="px-6 py-3 text-center   border border-gray-300">
                  Highlights
                </th>
                <th className="px-6 py-3 text-center  border border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr
                  key={index}
                  className={`${
                    company.overdue
                      ? "bg-red-50"
                      : company.today
                      ? "bg-yellow-50"
                      : ""
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-6 py-4  border border-gray-300">
                    {company.name}
                  </td>
                  <td className="px-6 py-4  border border-gray-300">
                    {company.communications.map((comm, idx) => (
                      <Tooltip key={idx} title={comm.notes} arrow>
                        <div className="text-sm cursor-pointer">
                          {comm.type} on {comm.date}
                        </div>
                      </Tooltip>
                    ))}
                  </td>
                  <td className="px-6 py-4  border border-gray-300">
                    {company.nextCommunication.type} on{" "}
                    {company.nextCommunication.date}
                  </td>
                  <td className="px-6 py-4 text-center border border-gray-300">
                    {company.overdue && (
                      <span className="text-red-500">Overdue</span>
                    )}
                    {company.today && (
                      <span className="text-yellow-500">Due Today</span>
                    )}
                    {!company.overdue && !company.today && (
                      <span className="text-gray-500">On Track</span>
                    )}
                  </td>

                  <td className="px-4 py-2 text-center  border border-gray-300">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleShowModal(company)}
                    >
                      click
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal for Adding Communication */}
        <Modal open={showModal} onClose={handleCloseModal}>
          <div className="flex justify-center items-center mr-4  ">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 w-full max-w-4xl">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Log Communication
              </h2>

              {/* Communication Type */}
              <FormControl fullWidth variant="outlined">
                <InputLabel>Communication Type</InputLabel>
                <Select
                  name="type"
                  value={newCommunication.type}
                  onChange={handleDateChange}
                  label="Communication Type"
                >
                  <MenuItem value="LinkedIn Post">LinkedIn Post</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="Phone Call">Phone Call</MenuItem>
                </Select>
              </FormControl>

              {/* Date of Communication */}
              <TextField
                label="Date of Communication"
                type="date"
                fullWidth
                name="date"
                value={newCommunication.date}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* Notes */}
              <TextField
                label="Notes"
                fullWidth
                name="notes"
                value={newCommunication.notes}
                onChange={handleDateChange}
                multiline
                rows={4}
              />

              {/* Modal Buttons */}
              <div className="flex justify-between mt-4">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCommunicationSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        {/* Calendar View */}
        <CalendarComponent/>
        
      </div>
    </div>
  );
};

export default UserModule;
