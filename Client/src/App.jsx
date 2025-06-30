import { useQuery } from "@tanstack/react-query";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import { checkAuth } from "./Helper/checkAuth";
import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const App = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loader2 />;
  }
  return (
    <div className="">
      <Routes>
        <Route
          path="/Landing-Page"
          element={!data ? <LandingPage /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={data ? <HomePage /> : <Navigate to="/Landing-Page" />}
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
