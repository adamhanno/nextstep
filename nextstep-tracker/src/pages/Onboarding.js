import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css"; // Import external CSS file

const commonHabits = [
  { id: 1, name: "Sleep 8 Hours", icon: "🛏️" },
  { id: 2, name: "Reading", icon: "📚" },
  { id: 3, name: "Playing", icon: "🎮" },
  { id: 4, name: "Exercise", icon: "🏋️" },
  { id: 5, name: "Meditation", icon: "🧘" },
  { id: 6, name: "Drinking Water", icon: "💧" },
  { id: 7, name: "Studying", icon: "📖" },
  { id: 8, name: "Journaling", icon: "✍️" },
  { id: 9, name: "Cooking", icon: "🍳" },
  { id: 10, name: "Socializing", icon: "🥳" },
  { id: 11, name: "Walking", icon: "🚶" },
  { id: 12, name: "Time for Hobbies", icon: "🎨" },
  { id: 13, name: "Cleaning", icon: "🧹" },
  { id: 14, name: "Planning the Day", icon: "🗓️" },
  { id: 15, name: "Going to Bed Early", icon: "🌙" },
];

const Onboarding = () => {
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [selectedHabits, setSelectedHabits] = useState([]);
  const navigate = useNavigate();

  // Handle Habit Selection
  const handleCommonHabitClick = (habit) => {
    setSelectedHabits((prev) =>
      prev.includes(habit.id)
        ? prev.filter((id) => id !== habit.id)
        : [...prev, habit.id]
    );
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      for (const id of selectedHabits) {
        const habit = commonHabits.find((h) => h.id === id);
        await axios.post(
          "http://localhost:5000/api/habits",
          { name: habit.name, frequency: "daily", goal: 0 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving habits:", error);
    }
  };

  return (
    <div className="onboarding-container">
      {/* Onboarding Form */}
      <div className="onboarding-form">
        <h2>Onboarding</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Wake-Up Time:
            <input
              type="time"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              required
            />
          </label>

          <label>
            Sleep Time:
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              required
            />
          </label>

          <button type="submit">Continue</button>
        </form>
      </div>

      {/* Habit Selection Section */}
      <h3>Select Your Habits</h3>
      <div className="habit-list">
        {commonHabits.map((habit) => (
          <div
            key={habit.id}
            className={`habit-card ${selectedHabits.includes(habit.id) ? "selected" : ""}`}
            onClick={() => handleCommonHabitClick(habit)}
          >
            <span className="habit-icon">{habit.icon}</span>
            <p>{habit.name}</p>
            {selectedHabits.includes(habit.id) && <span className="checkmark">✔️</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
