import React from 'react';

const VerifiedDoctors = ({ doctors }) => {
  if (!doctors || doctors.length === 0) {
    return <div className="p-4 text-muted-foreground">No verified doctors found.</div>;
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 mb-4">
            <h3 className="font-semibold leading-none tracking-tight">{doctor.name || doctor.email}</h3>
            <p className="text-sm text-muted-foreground">{doctor.email}</p>
          </div>
          <div className="text-sm space-y-2">
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            {doctor.description && <p><strong>Description:</strong> {doctor.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerifiedDoctors;
