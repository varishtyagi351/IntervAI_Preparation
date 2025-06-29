import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);
    // Do your form submission here
    try{
        //Call api
        const aiResponse = await axiosInstance.post(
            API_PATHS.AI.GENERATE_QUESTIONS,
            {
                role,
                experience,
                topicsToFocus,
                numberOfQuestions: 10,
            }
        );
        // should we array like [{question, answer}]
        const generatedQuestions = aiResponse.data;

        const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
            ...formData,
            questions: generatedQuestions,
        });

        if(response.data?.session?._id) {
            navigate(`/interview-prep/${response.data?.session?._id}`);
        }
    } catch (error){ 
        if(error.response && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong. Please try again."); 
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 p-6 md:p-8 bg-white rounded-2xl shadow-lg 
      max-h-[90vh] overflow-y-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Start a New Interview Journey</h3>
      <p className="text-sm text-gray-500 mb-6">
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-5">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer, UI/UX Designer"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="e.g., 1, 3, 5"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="Comma-separated, e.g., React, Node.js, MongoDB"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="Any specific goals or notes for this session"
          type="text"
        />

        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
