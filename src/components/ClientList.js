import React, { useState, useEffect } from "react";
// import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { urlApi } from "../utils/config"

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const loadClient = async () => {
    const response = await fetch(urlApi + "client/getAll");
    const data = await response.json();
    setClients(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(urlApi + `client/delete/${id}`, {
        method: "DELETE",
      });
      setClients(clients.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadClient();
  }, []);

  return (
    <>
      <h1>Client</h1>
      {clients.map((item) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
              }}
            >
              <Typography>{item.name}</Typography>
              <Typography>{item.surname}</Typography>
              <Typography>{item.age.years}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/client/${item.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(item.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ClientList;
