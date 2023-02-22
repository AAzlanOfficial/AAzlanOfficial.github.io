
// CHAPTERS ACCORDION
document.getElementById("accordion-btn").onclick = function() {accordionClick()};

function accordionClick() {
  document.getElementById("accordion-content").classList.toggle("show");
}
const chapters = {
  'b1' : {
      id : 'b1',
      title : 'Biodiversity',
      description : 'Viruses',
      difficulty : 5
  },
  'b2' : {
      id : 'b2',
      title : 'Bioenergetics',
      description : 'Viruses',
      difficulty : 2
  },
  'p1' : {
      id : 'p1',
      title : 'Electrostatics',
      description : 'Columb Law',
      difficulty : 3
  }
}

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', () => {

  let startDate = new Date(document.getElementById("start-date").value);
  let endDate = new Date(document.getElementById("end-date").value);
  let hoursPerDay = document.getElementById("hours-per-day").value;

  const oneDay = 24 * 60 * 60 * 1000;
  const daysLeft = Math.round(Math.abs((endDate - startDate) / oneDay) + 1);

  const checkedTopics = [];
  const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  checkboxes.forEach((checkbox) => {
    checkedTopics.push(checkbox.value);
  });

 // Filter chapters for selected topics
 const selectedChapters = Object.values(chapters).filter(chapter => checkedTopics.includes(chapter.id));

 // Separate the selected chapters by subject
 const subjects = {};
 selectedChapters.forEach(chapter => {
   const subjectKey = chapter.id.startsWith('b') ? 'bio' : 'phy';
   if (!subjects[subjectKey]) subjects[subjectKey] = [];
   subjects[subjectKey].push(chapter);
 });
 const totalTimeNeeded = selectedChapters.reduce((total, chapter) => total + chapter.difficulty, 0);
 const totalHoursAvailable = daysLeft * hoursPerDay;
  const hoursPerTopic = totalHoursAvailable / totalTimeNeeded;

 // Calculate time allocation for each subject
 
 const totalHoursAvailablePerSubject = (totalHoursAvailable / 2) / totalTimeNeeded;
 const subjectHours = {
   bio: 0,
   phy: 0
 };
 let currentSubject = 'bio';


  

  

  let studyPlan = {};
  selectedChapters.forEach(chapter => {
    const topicTime = chapter.difficulty * totalHoursAvailablePerSubject;
    studyPlan[chapter.title] = topicTime;
    subjectHours[currentSubject] += topicTime;
    if (subjectHours[currentSubject] >= totalHoursAvailablePerSubject) {
      currentSubject = currentSubject === 'bio' ? 'phy' : 'bio';
    }
  });
  let timeAllocated = 0;
  checkedTopics.forEach((id) => {
  const topicTime = chapters[id]['difficulty'] * hoursPerTopic;
  
  studyPlan[chapters[id]['title']] = topicTime;
      
  timeAllocated += topicTime;
  });

  if (timeAllocated < totalHoursAvailable) {
  const lastTopic = chapters[checkedTopics[checkedTopics.length - 1]]['title'];
  studyPlan[lastTopic] += totalHoursAvailable - timeAllocated;
  }

  let currentDate = new Date(startDate.getTime());
  let day = 1;
  let hoursLeft = hoursPerDay;
  const studyPlanContainer = document.getElementById("study-plan-container");

  while (currentDate <= endDate) {
      let topicsForDay = [];
      let totalHoursForDay = 0;

      while (hoursLeft > 0 && checkedTopics.length > 0) {
          const topic = chapters[checkedTopics[0]]['title'];
          const topicTime = studyPlan[topic];
        
          if (topicTime <= hoursLeft) {
              if (topicTime >= 1) {
                  const topicTimeInMinutes = Math.floor(topicTime * 60);
                  const hours = Math.floor(topicTime);
                  const minutes = topicTimeInMinutes - hours * 60;
                  let topicTimeString = `${hours} hour${hours > 1 ? 's' : ''}`;
                  if (minutes > 0) {
                      topicTimeString += ` ${minutes} minute${minutes > 1 ? 's' : ''}`;
                  }
                  topicsForDay.push(`${topic} (${topicTimeString})`);
                  totalHoursForDay += topicTime;
                  hoursLeft -= topicTime;
              } else {
                  const topicTimeInMinutes = Math.round(topicTime * 60);
                  topicsForDay.push(`${topic} (${topicTimeInMinutes} minute${topicTimeInMinutes > 1 ? 's' : ''})`);
                  totalHoursForDay += topicTimeInMinutes / 60;
                  hoursLeft -= topicTimeInMinutes / 60;
              }
              checkedTopics.shift();
          } else {
              if (hoursLeft >= 1) {
                  const hours = Math.floor(hoursLeft);
                  const minutes = Math.round((hoursLeft - hours) * 60);
                  let topicTimeString = `${hours} hour${hours > 1 ? 's' : ''}`;
                  if (minutes > 0) {
                      topicTimeString += ` ${minutes} minute${minutes > 1 ? 's' : ''}`;
                  }
                  topicsForDay.push(`${topic} (${topicTimeString})`);
                  totalHoursForDay += hoursLeft;
                  studyPlan[topic] -= hoursLeft;
                  hoursLeft = 0;
              } else {
                  const hoursLeftInMinutes = Math.round(hoursLeft * 60);
                  topicsForDay.push(`${topic} (${hoursLeftInMinutes} minute${hoursLeftInMinutes > 1 ? 's' : ''})`);
                  totalHoursForDay += hoursLeftInMinutes / 60;
                  studyPlan[topic] -= hoursLeftInMinutes / 60;
                  hoursLeft = 0;
              }
          }
      }
      console.log(topicsForDay)
      const formattedDate = currentDate.getDate();
      const formattedMonth = currentDate.toLocaleDateString('en-US', { month: 'short' });
      
     
      const card = document.createElement('div');

      const cardDate = document.createElement('div');
      card.appendChild(cardDate);

      const dateNumber = document.createElement('div');
      dateNumber.classList.add('date-number', 'text-4xl');
      dateNumber.innerText = formattedDate;
      cardDate.appendChild(dateNumber);

      const dateMonth = document.createElement('div');
      dateMonth.innerText = formattedMonth;
      cardDate.appendChild(dateMonth);

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      if (topicsForDay.length === 0) {
          const noTopic = document.createElement('div');
          noTopic.classList.add('card-text');
          noTopic.innerText = 'No topics for the day';
          cardBody.appendChild(noTopic);
      } else {
          const chpContainer = document.createElement('div');
          topicsForDay.forEach(topic => {
          const chpTitle = document.createElement('div');
          chpTitle.innerText = topic;
          chpContainer.appendChild(chpTitle);
          });
          cardBody.appendChild(chpContainer);
      }
      card.appendChild(cardBody);

      const chpDesc = document.createElement('div');
      chpDesc.classList.add('chp-desc');
      cardBody.appendChild(chpDesc);

      if (topicsForDay.length > 1) {
          const cardFooter = document.createElement('div');
          cardFooter.classList.add('card-footer', 'font-medium', 'uppercase');
          cardFooter.innerText = 'Total hours: ' + Math.round(totalHoursForDay);
          cardBody.appendChild(cardFooter);
      }
      

      studyPlanContainer.appendChild(card);

      currentDate.setDate(currentDate.getDate() + 1);
      day++;
      hoursLeft = hoursPerDay;
  }
})
