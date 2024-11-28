// API URL
const apiUrl = 'https://project-web1-delta.vercel.app/api/guides'; // Replace with your actual API URL

// Fetch the guide data from the API
async function fetchGuideData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data)

    // Assuming the API returns an array of guides with their names and tickets
    if (data && Array.isArray(data.guides)) {
      const guides = data.guides;

      // Update the Admin Dashboard with guide and ticket details
      const adminDashboard = document.getElementById("admin-dashboard");
      const guideCountDisplay = document.getElementById("guide-count");
      const ticketCountDisplay = document.getElementById("ticket-count");

      guideCountDisplay.textContent = guides.length;
      ticketCountDisplay.textContent = guides.reduce((count, guide) => count + guide.tickets.length, 0);

      guides.forEach((guide) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${guide.id}</td>
          <td>${guide.name}</td>
          <td>${guide.tickets.join(", ")}</td>
        `;
        adminDashboard.appendChild(row);
      });

      // Handle Contest Logic
      const winners = new Set();
      const generateRandomButton = document.getElementById("generate-random");
      const resultDisplay = document.getElementById("result");

      generateRandomButton.addEventListener("click", () => {
        if (winners.size >= 2) {
          resultDisplay.textContent = "The contest is over!";
          return;
        }

        let ticket, winnerGuide;
        do {
          ticket = Math.floor(Math.random() * 1000) + 1; // Example of range for tickets
          winnerGuide = guides.find((guide) => guide.tickets.includes(ticket));
        } while (!winnerGuide || winners.has(winnerGuide.id));

        winners.add(winnerGuide.id);
        const prize = winners.size === 1 ? "Pulsar Bike" : "Activa";
        resultDisplay.textContent = `Winner ${winners.size}: ${winnerGuide.name} with ticket number ${ticket}. Won the Prize: ${prize}`;
      });

    } else {
      console.error("Invalid data format received from API.");
    }
  } catch (error) {
    console.error("Error fetching guide data:", error);
  }
}

// Fetch guide data when the page loads
fetchGuideData();

// Tab Switching Logic
const contestTab = document.getElementById("contest-tab");
const adminTab = document.getElementById("admin-tab");
const contestView = document.getElementById("contest-view");
const adminView = document.getElementById("admin-view");

contestTab.addEventListener("click", () => {
  contestTab.classList.add("active");
  adminTab.classList.remove("active");
  contestView.style.display = "block";
  adminView.style.display = "none";
});

adminTab.addEventListener("click", () => {
  adminTab.classList.add("active");
  contestTab.classList.remove("active");
  contestView.style.display = "none";
  adminView.style.display = "block";
});


