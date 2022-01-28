import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import Menu from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route index path="/" element={<ClientList />} />
          <Route path="/client/new" element={<ClientForm />} />
          <Route path="/client/:id/edit" element={<ClientForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
