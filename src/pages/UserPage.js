import React from "react";
import UserSelect from "../components/UserSelect";
import PageTitle from "../components/PageTitle";
import { Container } from "@mui/material";
import PageBreadcrumbs from "../components/PageBreadcrumbs";

export default function UserPage() {
  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
      <PageBreadcrumbs
        current={"Employee"}
      />
      <PageTitle>Employee</PageTitle>
      <UserSelect />
    </Container>
  );
}