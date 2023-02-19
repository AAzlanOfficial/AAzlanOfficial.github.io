
const submitBtn = document.getElementById('submitBtn');

// Object that maps topic difficulty levels to the number of times it should be studied
const difficultyMap = {
    easy: 1,
    medium: 2,
    hard: 3
};

const topics = {
    topic1: "easy",
    topic2: "medium",
    topic3: "hard"
};

submitBtn.addEventListener('click', () => {
    const daysLeft = parseInt(document.getElementById('days-input').value);
    const hoursPerDay = parseInt(document.getElementById('hours-per-day').value)

    // Filter the topics that the student has checked
const checkedTopics = [];
const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
checkboxes.forEach((checkbox) => {
  checkedTopics.push(checkbox.value);
});

// Calculate the total time needed for all the checked topics
let totalTimeNeeded = 0;
checkedTopics.forEach((topic) => {
  totalTimeNeeded += difficultyMap[topics[topic]];
});

// Calculate the time available for each day in hours
const totalHoursAvailable = daysLeft * hoursPerDay;
const hoursPerTopic = totalHoursAvailable / totalTimeNeeded;

// Allocate time for each topic according to its difficulty level
let studyPlan = {};
let timeAllocated = 0;
checkedTopics.forEach((topic) => {
  const topicTime = Math.round(difficultyMap[topics[topic]] * hoursPerTopic);
  studyPlan[topic] = topicTime;
  timeAllocated += topicTime;
});

// In case the allocated time is less than the total available time, add the remaining time to the last topic
if (timeAllocated < totalHoursAvailable) {
  const lastTopic = checkedTopics[checkedTopics.length - 1];
  studyPlan[lastTopic] += totalHoursAvailable - timeAllocated;
}

// Display the study plan
let day = 1;
let hoursLeft = hoursPerDay;
for (let i = 0; i < daysLeft; i++) {
  let topicsForDay = [];
  let totalHoursForDay = 0;
  while (hoursLeft > 0 && checkedTopics.length > 0) {
    const topic = checkedTopics[0];
    const topicTime = studyPlan[topic];
    if (topicTime <= hoursLeft) {
      topicsForDay.push(topic + ' (' + topicTime + ' hours)');
      totalHoursForDay += topicTime;
      hoursLeft -= topicTime;
      checkedTopics.shift();
    } else {
      topicsForDay.push(topic + ' (' + hoursLeft + ' hours)');
      totalHoursForDay += hoursLeft;
      studyPlan[topic] -= hoursLeft;
      hoursLeft = 0;
    }
  }
  console.log('Day ' + day + ': ' + topicsForDay.join(', ') + ' (Total ' + totalHoursForDay + ' hours)');
  day++;
  hoursLeft = hoursPerDay;
}
});



