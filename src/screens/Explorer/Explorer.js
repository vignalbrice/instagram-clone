import React from "react";
import Header from "../../components/Header/Header";

const Explorer = ({ user }) => {
  return (
    <div className="explorer">
      <Header user={user} />
      Explorer
    </div>
  );
};

export default Explorer;
