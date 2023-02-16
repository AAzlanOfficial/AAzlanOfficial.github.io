
function calculate() {
    const matric = document.getElementById('matric').value;
    const matricAlert = document.getElementById('matric-alert');

    const inter = document.getElementById('inter').value;
    const interAlert = document.getElementById('inter-alert');

    const mdcat = document.getElementById('mdcat').value;
    const mdcatAlert = document.getElementById('mdcat-alert');

    const progressBar = document.getElementById('progress-bar');

    let aggregate = document.getElementById('aggregate');

    if (matric >= 0 && matric <= 1100 && inter >= 0 && inter <= 1100 && mdcat >= 0 && mdcat <= 200) {
        //Removes any previous alert boxes
        matricAlert.style.display = 'none'; 
        interAlert.style.display = 'none';
        mdcatAlert.style.display = 'none';

        //Aggregate caluculation
        aggregateTotal  = (matric / 1100 * 10) + (inter / 1100 * 40) + (mdcat / 200 * 50);
        aggregateTotalRounded = aggregateTotal.toFixed(4); //rounded to  four places
        aggregatePercentage = aggregateTotalRounded + '%';
        aggregate.innerText = aggregatePercentage;
        progressBar.style.width = aggregatePercentage; //Progress Bar

        //Matric marks alert
    } else if (matric < 0 || matric > 1100) {
        matricAlert.style.display = 'block';
        mdcatAlert.style.display = 'none'; //Removes any previous alert boxes
        interAlert.style.display = 'none';
        matricAlert.classList.add('alert-shake'); // Add the shake animation class
        setTimeout(() => { matricAlert.classList.remove('alert-shake'); }, 1000); // Remove the class after 1 second
    
        //Inter marks alert
    } else if (inter < 0 || inter > 1100) {
        matricAlert.style.display = 'none'; 
        mdcatAlert.style.display = 'none';
        interAlert.style.display = 'block';
        interAlert.classList.add('alert-shake'); 
        setTimeout(() => { interAlert.classList.remove('alert-shake'); }, 1000);
    
        //MDCAT marks alert
    }   else if (mdcat < 0 || mdcat > 200) {
        matricAlert.style.display = 'none'; 
        interAlert.style.display = 'none'; 
        mdcatAlert.style.display = 'block';
        mdcatAlert.classList.add('alert-shake'); 
        setTimeout(() => { mdcatAlert.classList.remove('alert-shake'); }, 1000);
    }
    
    return false;
}


