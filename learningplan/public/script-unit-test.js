const topics = {
    'topic1': 'medium',
    'topic2': 'hard',
    'topic3': 'easy'
};
  
  const difficultyMap = {
    'easy': 1,
    'medium': 2,
    'hard': 3
};

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', () => {
    let startDate = new Date(document.getElementById("start-date").value);
    let endDate = new Date(document.getElementById("end-date").value);
    let hoursPerDay = document.getElementById("hours-per-day").value;

    // Calculate the total number of days available for preparation
    const oneDay = 24 * 60 * 60 * 1000;
    const daysLeft = Math.round(Math.abs((endDate - startDate) / oneDay) + 1);

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
    const topicTime = difficultyMap[topics[topic]] * hoursPerTopic;
    
        studyPlan[topic] = topicTime;
        
    timeAllocated += topicTime;
    });
    console.log(totalHoursAvailable, hoursPerTopic, studyPlan, timeAllocated);

    // In case the allocated time is less than the total available time, add the remaining time to the last topic
    if (timeAllocated < totalHoursAvailable) {
    const lastTopic = checkedTopics[checkedTopics.length - 1];
    studyPlan[lastTopic] += totalHoursAvailable - timeAllocated;
    }




    






    // Display the study plan
    let currentDate = new Date(startDate.getTime());
    let day = 1;
    let hoursLeft = hoursPerDay;
    const studyPlanContainer = document.getElementById("study-plan-container");
    while (currentDate <= endDate) {
        let topicsForDay = [];
        let totalHoursForDay = 0;
        while (hoursLeft > 0 && checkedTopics.length > 0) {
            const topic = checkedTopics[0];
            const topicTime = studyPlan[topic];
            if (topicTime <= hoursLeft) {
                if (topicTime >= 1) {
                    topicsForDay.push(topic + ' (' + Math.floor(topicTime) + ' hours)');
                    totalHoursForDay += Math.floor(topicTime);
                    hoursLeft -= Math.floor(topicTime);
                } else {
                    const topicTimeInMinutes = Math.round(topicTime * 60);
                    topicsForDay.push(topic + ' (' + topicTimeInMinutes + ' minutes)');
                    totalHoursForDay += topicTimeInMinutes / 60;
                    hoursLeft -= topicTimeInMinutes / 60;
                }
                checkedTopics.shift();
            } 
        }   
    }

    
});
