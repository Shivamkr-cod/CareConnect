import React from "react";

const AppointmentForm = ({ doctorId, slot, onBack, onComplete }) => {
  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-medium text-white mb-4">Appointment Form</h3>
      <p className="text-muted-foreground">Appointment form placeholder</p>
      <div className="flex gap-4 mt-4">
        <button onClick={onBack} className="px-4 py-2 bg-gray-500 rounded">Back</button>
        <button onClick={onComplete} className="px-4 py-2 bg-emerald-600 rounded">Complete</button>
      </div>
    </div>
  );
};

export default AppointmentForm;
