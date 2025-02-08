let jobs = [];
let currentPage = 1;
const jobsPerPage = 8;

// JSON ფაილის ჩატვირთვა
async function loadJobs() {
    try {
        const response = await fetch('jobs.json');
        jobs = await response.json();
        showHome();
    } catch (error) {
        console.error('შეცდომა JSON ფაილის ჩატვირთვისას:', error);
    }
}

function showHome() {
    populateCitySelect();
    displayJobs(jobs, currentPage);
}

function populateCitySelect() {
    const citySelect = document.getElementById('citySelect');
    const cities = [...new Set(jobs.map(job => job.city))].sort();
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

function displayJobs(jobArray, page) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    const start = (page - 1) * jobsPerPage;
    const end = start + jobsPerPage;
    const paginatedJobs = jobArray.slice(start, end);

    if (paginatedJobs.length === 0) {
        content.innerHTML = '<p>ვაკანსიები ვერ მოიძებნა</p>';
        return;
    }

    paginatedJobs.forEach(job => {
        const jobListing = document.createElement('div');
        jobListing.className = 'job-listing';
        jobListing.innerHTML = `
          <h2>${job.title}</h2>
          <p>${job.company}</p>
          <p><strong>ქალაქი:</strong> ${job.city}</p>
          <p><strong>პროფესია:</strong> ${job.profession}</p>
          <p><strong>განრიგი:</strong> ${job.schedule}</p>
          <button class="contact-btn" onclick="showJobDetails(${job.id})">დეტალების ნახვა</button>
        `;
        content.appendChild(jobListing);
    });

    setupPagination(jobArray);
}

function setupPagination(jobArray) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const pageCount = Math.ceil(jobArray.length / jobsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            displayJobs(jobArray, currentPage);
        };
        if (i === currentPage) {
            button.disabled = true;
        }
        pagination.appendChild(button);
    }
}

function showJobDetails(jobId) {
    const job = jobs.find(j => j.id === jobId);
    const jobDetails = document.getElementById('jobDetails');
    jobDetails.innerHTML = `
        <h2>${job.title}</h2>
        <p>${job.company}</p>
        <p><strong>ქალაქი:</strong> ${job.city}</p>
        <p><strong>პროფესია:</strong> ${job.profession}</p>
        <p><strong>განრიგი:</strong> ${job.schedule}</p>
        <p>${job.description}</p>
        <button class="contact-btn" onclick="window.location.href='mailto:${job.contact}'">ელფოსტით დაკავშირება</button>
        <a class="phone-btn" href="tel:${job.phone}" style="display: none;">დამსაქმებელთან დარეკვა</a>
        <button class="contact-btn" onclick="closeJobDetails()">დახურვა</button>
    `;
    if (window.innerWidth <= 768) {
        jobDetails.querySelector('.phone-btn').style.display = 'inline-block';
    }
    document.getElementById('overlay').classList.add('open');
    jobDetails.classList.add('open');
}

function closeJobDetails() {
    document.getElementById('overlay').classList.remove('open');
    document.getElementById('jobDetails').classList.remove('open');
}

function searchJobs() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const city = document.getElementById('citySelect').value;
    const profession = document.getElementById('professionSelect').value;
    const schedule = document.getElementById('scheduleSelect').value;
    const filteredJobs = jobs.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(input);
        const matchesCompany = job.company.toLowerCase().includes(input);
        const matchesCity = city === '' || job.city === city;
        const matchesProfession = profession === '' || job.profession === profession;
        const matchesSchedule = schedule === '' || job.schedule === schedule;
        return (matchesTitle || matchesCompany) && matchesCity && matchesProfession && matchesSchedule;
    });
    displayJobs(filteredJobs, currentPage);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

document.addEventListener('DOMContentLoaded', loadJobs);

const navLinks = document.querySelectorAll('.navbar .links a');
const menuToggle = document.querySelector('.navbar .menu-toggle');
const links = document.querySelector('.navbar .links');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});

menuToggle.addEventListener('click', () => {
    links.classList.toggle('active');
});

document.getElementById('addvacancies').addEventListener('click', async function() {
    try {
        const response = await fetch('addvac.json');
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('შეცდომა JSON ფაილის წაკითხვისას:', error);
    }
});

document.getElementById('addvacancies2').addEventListener('click', async function() {
    try {
        const response = await fetch('addvac.json');
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('შეცდომა JSON ფაილის წაკითხვისას:', error);
    }
});

document.getElementById('nameButton').addEventListener('click', async function() {
    try {
        const response = await fetch('rules.json');
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('შეცდომა JSON ფაილის წაკითხვისას:', error);
    }
});

document.getElementById('nameButton2').addEventListener('click', async function() {
    try {
        const response = await fetch('rules.json');
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('შეცდომა JSON ფაილის წაკითხვისას:', error);
    }
});