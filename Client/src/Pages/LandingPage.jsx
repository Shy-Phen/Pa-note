import { BookOpen } from "lucide-react";
import SignupModal from "../Components/SignupModal";
import SigninModal from "../Components/SigninModal";

const LandingPage = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex justify-center items-center min-h-screen ">
        <div className="flex flex-col items-center p-8 rounded">
          <BookOpen className="w-16 h-16 text-blue-600 mb-4 animate-bounce" />

          <h1 className="text-2xl font-bold text-center mb-6">
            Welcome to <span className="text-blue-600">Pa-note</span>, a
            note-taking app for productive ninjas.
          </h1>

          <div className="flex gap-4">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => document.getElementById("signup").showModal()}
            >
              Signup
            </button>
            <button
              className="btn btn-outline btn-secondary"
              onClick={() => document.getElementById("signin").showModal()}
            >
              Signin
            </button>
            <SignupModal />
            <SigninModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
