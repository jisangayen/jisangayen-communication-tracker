import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Modal, TextField, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CalendarComponent = () => {
  const [communications, setCommunications] = useState([
    {
      id: 1,
      date: "2025-01-01",
      type: "Email",
      notes: "Initial follow-up email.",
      isPast: true,
    },
    {
      id: 2,
      date: "2025-01-05",
      type: "Phone Call",
      notes: "Scheduled discussion with client.",
      isPast: false,
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCommunication, setCurrentCommunication] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsEditing(false);
    setCurrentCommunication({
      date: date.toISOString().split("T")[0],
      type: "",
      notes: "",
    });
    setShowModal(true);
  };

  const handleSaveCommunication = () => {
    if (isEditing) {
      setCommunications(
        communications.map((comm) =>
          comm.id === currentCommunication.id ? currentCommunication : comm
        )
      );
    } else {
      const newEntry = {
        ...currentCommunication,
        id: Date.now(),
        isPast: new Date(currentCommunication.date) < new Date(),
      };
      setCommunications([...communications, newEntry]);
    }
    setShowModal(false);
  };

  const handleEditCommunication = (comm) => {
    setCurrentCommunication(comm);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteCommunication = (id) => {
    setCommunications(communications.filter((comm) => comm.id !== id));
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Calendar Tracker</h1>
      <Calendar
        onClickDay={handleDateChange}
        tileContent={({ date }) => {
          const comms = communications.filter(
            (comm) => comm.date === date.toISOString().split("T")[0]
          );
          return (
            comms.length > 0 && (
              <div className="text-xs text-center text-blue-500">
                {comms.map((comm, idx) => (
                  <div key={idx}>{comm.type}</div>
                ))}
              </div>
            )
          );
        }}
      />

      {/* Modal for Adding/Editing Communication */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          className="bg-white p-6 rounded shadow-lg"
          sx={{ width: "400px", margin: "auto", marginTop: "10vh" }}
        >
          <h2 className="text-xl font-semibold mb-8">
            {isEditing ? "Edit Communication" : "Add Communication"} on{" "}
            {new Date(selectedDate).toDateString()}
          </h2>
          <div className="space-y-6">

          <TextField
            label="Communication Type"
            fullWidth
            value={currentCommunication?.type || ""}
            onChange={(e) =>
              setCurrentCommunication({
                ...currentCommunication,
                type: e.target.value,
              })
            }
            className=" mt-4"
          />
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={4}
            value={currentCommunication?.notes || ""}
            onChange={(e) =>
              setCurrentCommunication({
                ...currentCommunication,
                notes: e.target.value,
              })
            }
            className="mt-8"
          />

          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowModal(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveCommunication}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>

      {/* List of Communications */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Communications</h2>
        <ul>
          {communications.map((comm, idx) => (
            <li
              key={idx}
              className={`p-4 border rounded mb-2 flex justify-between items-center text-white ${
                comm.isPast ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400"
              }`}
            >
              <div>
                <strong>{comm.date}:</strong> {comm.type} - {comm.notes}
              </div>
              <div className="flex items-center space-x-2">
                <IconButton
                  color="secondary"
                  onClick={() => handleEditCommunication(comm)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="warning"
                  onClick={() => handleDeleteCommunication(comm.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarComponent;
