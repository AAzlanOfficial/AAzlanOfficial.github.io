import Head from 'next/head';
import React, { useState } from 'react';



const ScheduleGenerator = ({ topics={topic1: "easy",
topic2: "medium",
topic3: "hard"}, hoursPerDay, days }) => {
  
    const [hoursPerDayValue, setHoursPerDayValue] = useState(hoursPerDay); // create state variable and set initial value to hoursPerDay
  
    const handleHoursPerDayChange = (event) => {
      setHoursPerDayValue(event.target.value); // update state variable with input value
    }

    const [daysValue, setDaysValue] = useState(days); // create state variable and set initial value to day
  
    const handleDaysChange = (event) => {
      setDaysValue(event.target.value); // update state variable with input value
    }



  const [selectedTopics, setSelectedTopics] = useState({});
  const [schedule, setSchedule] = useState({});

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const topic = event.target.name;
    const isChecked = event.target.checked;

    setSelectedTopics({ ...selectedTopics, [topic]: isChecked });
  };

  // Function to generate the study schedule
  const generateSchedule = () => {
    const topics = {
      topic1: "easy",
      topic2: "medium",
      topic3: "hard"
    };
    const numTopics = Object.values(selectedTopics).filter(Boolean).length;
    const totalHours = hoursPerDay * days;
    const easyTopics = Object.entries(topics).filter(([topic, difficulty]) => difficulty === 'easy');
    const mediumTopics = Object.entries(topics).filter(([topic, difficulty]) => difficulty === 'medium');
    const hardTopics = Object.entries(topics).filter(([topic, difficulty]) => difficulty === 'hard');

    

    let easyTime = Math.floor(totalHours / (numTopics + easyTopics.length * 1.0 + mediumTopics.length * 2.0 + hardTopics.length * 3.0));
    let mediumTime = easyTime * 2;
    let hardTime = easyTime * 3;

    const schedule = {};
    for (let i = 1; i <= days; i++) {
      const day = `Day ${i}`;
      schedule[day] = {};

      // Add easy topics to schedule
      for (let [topic, difficulty] of easyTopics) {
        if (selectedTopics[topic]) {
          schedule[day][topic] = easyTime;
        }
      }

      // Add medium topics to schedule
      for (let [topic, difficulty] of mediumTopics) {
        if (selectedTopics[topic]) {
          schedule[day][topic] = mediumTime;
        }
      }

      // Add hard topics to schedule
      for (let [topic, difficulty] of hardTopics) {
        if (selectedTopics[topic]) {
          schedule[day][topic] = hardTime;
        }
      }
    }

    setSchedule(schedule);
  };

  return (
    <div>
      <h2>Study Schedule Generator</h2>
      <p>Select the topics you want to study:</p>
      {Object.entries(topics).map(([topic, difficulty]) => (
        <div key={topic}>
          <input
            type="checkbox"
            name={topic}
            id={topic}
            checked={selectedTopics[topic] || false}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={topic}>{topic} ({difficulty})</label>
          
        </div>
      ))}
      <br />
      <label htmlFor="days">Days</label>
      <input type="number" id="days" value={daysValue} onChange={handleDaysChange} />
      <label htmlFor="hours-per-day">Hours per day:</label>
      <input type="number" id="hours-per-day" value={hoursPerDayValue} onChange={handleHoursPerDayChange} />
      <button onClick={generateSchedule}>Generate Schedule</button>
      <br />
      <br />
      {Object.entries(schedule).map(([day, topics]) => (
        <div key={day}>
          <h3>{day}</h3>
          {Object.entries(topics).map(([topic, hours]) => (
            <div key={topic}>
              {topic}: {hours} hours
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScheduleGenerator;
