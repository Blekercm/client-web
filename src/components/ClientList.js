import React, { useState, useEffect } from "react";
// import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
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
      <br></br>
      {clients.map((item, index) => (
        <Card
          key={index}
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
              <Grid container direction="column">
                <Grid item container direction="row">
                  <Typography style={{
                    color: "#BCBCBC"
                  }}>Nombres:</Typography>
                  <Typography paddingLeft={1}>{item.name}</Typography>
                </Grid>
                <Grid item container direction="row">
                  <Typography style={{
                    color: "#BCBCBC"
                  }}>Apellidos:</Typography>
                  <Typography paddingLeft={1}>{item.surname}</Typography>
                </Grid>
                <Grid item container direction="row">
                  <Typography style={{
                    color: "#BCBCBC"
                  }}>Edad:</Typography>
                  <Typography paddingLeft={1}>{item.age}</Typography>
                </Grid>
              </Grid>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/client/${item.id}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                onClick={() => handleDelete(item.id)}
                style={{ marginLeft: ".5rem", color: "white", backgroundColor: "red" }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ClientList;
