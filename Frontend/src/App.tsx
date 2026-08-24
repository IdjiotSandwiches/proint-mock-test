import Index from "@/pages/Index";
import Create from "@/pages/Create";
import Update from "@/pages/Update";
import AppLayout from "@/layouts/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </AppLayout>
  );
}

export default App;
