// HabitTracker.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./HabitTracker.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [goal, setGoal] = useState(0);
  const [newGoal, setNewGoal] = useState(0);
  const [journalEntries, setJournalEntries] = useState({}); // Track journal entries per habit
  const [isEditing, setIsEditing] = useState({}); // Track editing state per habit
  const [showVisualizations, setShowVisualizations] = useState(false);
  const timers = useRef({});

  const fetchHabits = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/habits", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setHabits(response.data);

    // Fetch journal entries for each habit
    const journalEntriesResponse = await axios.get(
      "http://localhost:5000/api/habits/journalEntries",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const journalData = {};
    journalEntriesResponse.data.forEach((entry) => {
      journalData[entry.habitId] = entry.content;
    });
    setJournalEntries(journalData);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/api/habits",
      { name: habitName, frequency, goal },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setHabitName("");
    setFrequency("daily");
    setGoal(0);
    fetchHabits();
  };

  const startHabitTimer = (id) => {
    if (timers.current[id] || habits.find((h) => h._id === id)?.progress >= 100)
      return;

    const startTime = Date.now();
    timers.current[id] = setInterval(() => {
      updateHabitProgress(id, startTime);
    }, 1000);
  };

  const stopHabitTimer = (id) => {
    clearInterval(timers.current[id]);
    delete timers.current[id];
  };

  const toggleHabitTimer = (id) => {
    if (timers.current[id]) {
      stopHabitTimer(id);
    } else {
      startHabitTimer(id);
    }
  };

  const updateHabitProgress = async (id, startTime) => {
    const token = localStorage.getItem("token");
    const habit = habits.find((h) => h._id === id);
    if (!habit) return;

    const elapsedTime = (Date.now() - startTime) / 60000; // Time in minutes
    const updatedTime = Math.min(
      habit.durationCompleted + elapsedTime,
      habit.goal
    );
    const progress = (updatedTime / habit.goal) * 100;

    await axios.put(
      `http://localhost:5000/api/habits/${id}`,
      {
        durationCompleted: updatedTime,
        progress,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchHabits();
  };

  const modifyGoal = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/habits/${id}`,
      {
        goal: newGoal,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setNewGoal(0);
    fetchHabits();
  };

  const deleteHabit = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/habits/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
      alert("Failed to delete habit. Please try again later.");
    }
  };

  const saveJournalEntry = async (id) => {
    const token = localStorage.getItem("token");
    const entry = journalEntries[id];
    if (!entry) return;

    try {
      await axios.post(
        "http://localhost:5000/api/habits/journalEntries",
        {
          habitId: id,
          content: entry,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Disable editing after save
      setIsEditing({ ...isEditing, [id]: false });
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  const handleJournalEntryChange = (id, content) => {
    setJournalEntries((prevEntries) => ({ ...prevEntries, [id]: content }));
  };

  const enableEdit = (id) => {
    setIsEditing({ ...isEditing, [id]: true });
  };

  const getChartData = () => {
    return {
      labels: habits.map((habit) => habit.name),
      datasets: [
        {
          label: "Progress",
          data: habits.map((habit) => habit.progress || 0),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="habit-tracker-container">
      <h2>Your Habits</h2>
      <form className="habit-tracker-form" onSubmit={addHabit}>
        <div className="add-habit-container">
          <div className="form-group-container">
            <div className="form-group">
              <label htmlFor="habitName">Habit Name:</label>
              <input
                id="habitName"
                type="text"
                placeholder="New Habit (e.g., Reading, Coding, etc.)"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="frequency">Frequency:</label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="goal">Goal Time (minutes):</label>
              <input
                id="goal"
                type="number"
                placeholder="Goal (minutes)"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <button type="submit">Add Habit</button>
        </div>
      </form>

      <div className="habit-container">
        {habits.map((habit) => (
          <div key={habit._id} className="habit-card">
            <div className="habit-header">
              <h3>{habit.name}</h3>
              <p>
                Progress: {(habit.progress || 0).toFixed(2)}% | Goal:{" "}
                {habit.goal || 0} mins
              </p>
            </div>

            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${habit.progress || 0}%` }}
              ></div>
            </div>

            <div className="habit-controls">
              <input
                type="number"
                placeholder="New Goal (minutes)"
                value={newGoal}
                onChange={(e) => setNewGoal(Number(e.target.value))}
              />
              <button onClick={() => modifyGoal(habit._id)}>Update Goal</button>
            </div>

            <div className="habit-actions">
              <button
                onClick={() => deleteHabit(habit._id)}
                disabled={!!timers.current[habit._id]}
              >
                Delete Habit
              </button>
              <button
                onClick={() => toggleHabitTimer(habit._id)}
                disabled={habit.progress >= 100}
              >
                {timers.current[habit._id] ? "Stop" : "Start"}
              </button>
            </div>

            <div className="habit-journal">
              <textarea
                placeholder="Journal Entry"
                value={journalEntries[habit._id] || ""}
                onChange={(e) =>
                  handleJournalEntryChange(habit._id, e.target.value)
                }
                disabled={!isEditing[habit._id]}
              />
              {!isEditing[habit._id] ? (
                <button onClick={() => enableEdit(habit._id)}>
                  Edit Journal
                </button>
              ) : (
                <button onClick={() => saveJournalEntry(habit._id)}>
                  Save Journal Entry
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className="toggle-visualizations"
        onClick={() => setShowVisualizations(!showVisualizations)}
      >
        {showVisualizations ? "Hide Visualizations" : "Show Visualizations"}
      </button>

      {showVisualizations && (
        <div className="habit-chart">
          <h3>Habit Progress Visualization</h3>
          <Bar data={getChartData()} />
        </div>
      )}
    </div>
  );
};

export default HabitTracker;
