import React from "react";
import { DoctorPersonDefault } from "@/components/doctor/DoctorPerson";
import { ServiceItemDefault } from "@/components/service/ServiceItem";
const CreateContent = () => {
  return (
    <>
      <div className="container">
        <DoctorPersonDefault />
      </div>
        <ServiceItemDefault />
    </>
  );
};

export default CreateContent;
