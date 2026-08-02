import React from "react";

const SpecialityPage = ({ params }) => {
  const { specialty } = params;

  return <div>SpecialityPage: {specialty}</div>;
};

export default SpecialityPage;