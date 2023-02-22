
// CHAPTERS ACCORDION
document.getElementById("accordion-btn").onclick = function() {accordionClick()};

function accordionClick() {
  document.getElementById("accordion-content").classList.toggle("show");
}

//Print

/* document.getElementById("download-pdf").addEventListener("click", function() {
    // Open the print preview dialog
    window.print();
}); */

//////////////////  CHECKBOX CODE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

 


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
    'b3' : {
        id : 'b3',
        title : 'Biological Molecules',
        description : 'Viruses',
        difficulty : 3
    }
}

const toggleButton = document.getElementById('div-b');
const exampleCheckboxes = document.querySelectorAll('input[name="b"]');
let areAllChecked = true;

toggleButton.addEventListener('click', () => {
  areAllChecked = !areAllChecked; // toggle the state
  exampleCheckboxes.forEach(checkbox => checkbox.checked = areAllChecked);
});

  
const submitBtn = document.getElementById('submitBtn');
const studyPlanContainer = document.getElementById("study-plan-container");

submitBtn.addEventListener('click', () => {
    
  studyPlanContainer.innerHTML = '';

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
    checkedTopics.forEach((id) => {
      totalTimeNeeded += chapters[id]['difficulty'];
    });
  
    // Calculate the time available for each day in hours
    const totalHoursAvailable = daysLeft * hoursPerDay;
    const hoursPerTopic = totalHoursAvailable / totalTimeNeeded;
  
    // Allocate time for each topic according to its difficulty level
    let studyPlan = {};
    let timeAllocated = 0;
    checkedTopics.forEach((id) => {
    const topicTime = chapters[id]['difficulty'] * hoursPerTopic;
    
    studyPlan[chapters[id]['title']] = topicTime;
        
    timeAllocated += topicTime;
    });

    // In case the allocated time is less than the total available time, add the remaining time to the last topic
    if (timeAllocated < totalHoursAvailable) {
    const lastTopic = chapters[checkedTopics[checkedTopics.length - 1]]['title'];
    studyPlan[lastTopic] += totalHoursAvailable - timeAllocated;
    }
  
    // Display the study plan
    let currentDate = new Date(startDate.getTime());
    let day = 1;
    let hoursLeft = hoursPerDay;
    

    while (currentDate <= endDate) {
        let topicsForDay = [];
        let totalHoursForDay = 0;

        while (hoursLeft > 0 && checkedTopics.length > 0) {
            const topic = chapters[checkedTopics[0]]['title'];
            const topicTime = studyPlan[topic];
          
            if (topicTime <= hoursLeft) {
                if (topicTime >= 1) {
                    const topicTimeInMinutes = Math.ceil(topicTime * 60);
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
                    const topicTimeInMinutes = Math.ceil(topicTime * 60);
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
        
       
        // Create the study plan card for the current day
        const card = document.createElement('div');
        card.classList.add('card', 'flex', 'items-center','max-w-md', 'm-8', 'border', 'bg-gray-50', 'shadow-lg', 'rounded', 'px-6', 'py-4');

        const cardDate = document.createElement('div');
        cardDate.classList.add('card-date',"flex","flex-col","justify-center","items-center","w-20","h-20","mr-8","rounded","shadow","bg-violet-800","text-white");
        card.appendChild(cardDate);

        const dateNumber = document.createElement('div');
        dateNumber.classList.add('date-number', 'text-4xl');
        dateNumber.innerText = formattedDate;
        cardDate.appendChild(dateNumber);

        const dateMonth = document.createElement('div');
        dateMonth.classList.add('date-month', 'text-xl', 'font-semibold', 'uppercase');
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
            chpContainer.classList.add('chp-container', "chp-container", "font-bold", "text-gray-800", "text-xl", "mb-2", "capitalize");
            topicsForDay.forEach(topic => {
            const chpTitle = document.createElement('div');
            chpTitle.classList.add('chp-title', "border-b-2", "border-b-violet-700", "pb-1", "pt-2");
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