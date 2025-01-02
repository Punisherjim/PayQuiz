/* // Simulate checking if user has an existing account
const hasExistingAccount = false; // Change to true to test auto-login

// References to HTML elements
const loadingScreen = document.getElementById("loading-screen");
const loginForm = document.getElementById("login-form");

// Ensure the loading screen stays for at least 3 seconds
window.addEventListener("load", () => {
  setTimeout(() => {
    // Hide loading screen
    loadingScreen.style.opacity = "1"; // Add fade-out effect
    setTimeout(() => {
      loadingScreen.style.display = "none"; // Fully hide after fade-out
      
      // Check if user has an existing account
      if (hasExistingAccount) {
        // Redirect to main page (replace with your main page logic)
        alert("Welcome back! Redirecting to main page...");
        window.location.href = "main.html"; // Replace with your main page URL
      } else {
        // Show login form
        loginForm.classList.remove("hidden");
      }
    }, 500); // Delay for fade-out effect
  }, 3000); // 3-second delay for loading screen
}); */

/* Quiz Game page Card 1 */
let points = 0;
let level = 1;
let questionNumber = 1;
let currentAnswer = 0;
let totalQuestions = 30;
let quizActive = false;

function startQuiz() {
  document.querySelector("main").style.display = "none";
  document.getElementById("quizPage").style.display = "block";
  generateQuestion();
  quizActive = true;
}

function goBack() {
  document.querySelector("main").style.display = "block"; // Ipakita muli ang main page
  document.getElementById("quizPage").style.display = "none"; // Itago ang Quiz Game page
  quizActive = false; // Iset ang quizActive sa false kapag lumipat sa main page
}


function generateQuestion() {
  if (questionNumber <= totalQuestions) {
    const questionArea = document.getElementById("questionArea");
    const levelStatus = document.getElementById("levelStatus");

    // Generate random question based on level
    let num1, num2;
    if (level <= 5) {
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
    } else if (level <= 20) {
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 100);
    } else {
      num1 = Math.floor(Math.random() * 100);
      num2 = Math.floor(Math.random() * 100);
    }

    currentAnswer = num1 + num2;

    questionArea.textContent = `What is ${num1} + ${num2}?`;
    levelStatus.textContent = `Question: ${questionNumber}/${totalQuestions} | Level: ${level}`;

    // Enable the submit button
    document.getElementById("submitBtn").disabled = false;
  } else {
    alert("Congratulations! You've completed this level.");
    // Move to the next level
    level++;
    questionNumber = 1;
    totalQuestions += 30; // Increase questions every level
    generateQuestion();
  }
}

function submitAnswer() {
  const userAnswer = parseInt(document.getElementById("answer").value);

  if (userAnswer === currentAnswer) {
    points += 5;
    alert("Correct! You earn 5 points.");
  } else {
    alert("Incorrect, try again.");
  }

  // Clear input and disable button
  document.getElementById("answer").value = '';
  document.getElementById("submitBtn").disabled = true;

  // Proceed to next question
  questionNumber++;
  generateQuestion();

  // Update brain points in main page
  document.getElementById("points").textContent = `${points} Points`;

  // Show ad after every 5 questions
  if (questionNumber % 5 === 0) {
    alert("Watch an ad now!");
    // Placeholder for ad logic
  }
}

/* function getPoints() {
  points += 10;
  alert("You've earned 10 points!");
  document.getElementById("points").textContent = `${points} Points`;
} */

/* Card 2 */
// Function to simulate watching an ad
function watchAd() {
  // Simulating the video ad process (this is just a placeholder, actual ad logic will vary)
  alert("Watch this ad!");

  // Simulate a delay for the ad (e.g., 5 seconds)
  setTimeout(function() {
    // After the ad finishes, give random points between 15 and 20
    let earnedPoints = Math.floor(Math.random() * (20 - 15 + 1)) + 15;

    // Update the brain points balance
    points += earnedPoints;

    // Update the points display
    document.getElementById("points").textContent = `${points} Points`;

    // Show a pop-up message
    alert(`You received ${earnedPoints} points!`);
  }, 5000); // Delay of 5 seconds (simulating video ad duration)
}

/* Cash Out Page */
let brainPointBalance = 0; // Real-time Brain Point Balance
let selectedPoints = 0; // Points selected by the user

// Simulate getting brain point balance (update this dynamically in real app)
function updateBrainPointBalance(points) {
  brainPointBalance = points;
  document.getElementById("brainPointBalance").textContent = points;
  document.getElementById("usdEquivalent").textContent = (points / 30000).toFixed(2);
}

// Show the Cash Out Page
document.querySelector(".cashout-btn").addEventListener("click", () => {
  updateBrainPointBalance(parseInt(document.getElementById("points").textContent));
  document.getElementById("cashOutPage").style.display = "block";
});

// Close the Cash Out Page
function closeCashOutPage() {
  document.getElementById("cashOutPage").style.display = "none";
}

// Select Points Card
document.querySelectorAll(".pointCard").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".pointCard").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedPoints = parseInt(card.getAttribute("data-points"));
    validatePayPalButton();
  });
});

// Validate PayPal Button
function validatePayPalButton() {
  const email = document.getElementById("paypalEmail").value;
  const isValidEmail = email.includes("@") && email.includes(".");
  const hasEnoughBalance = brainPointBalance >= selectedPoints;
  const isPointsSelected = selectedPoints > 0;

  document.getElementById("payPalBtn").disabled = !(isValidEmail && hasEnoughBalance && isPointsSelected);
}

// Enable PayPal Button on Email Input
document.getElementById("paypalEmail").addEventListener("input", validatePayPalButton);

// Process Payment
function processPayment() {
  if (brainPointBalance >= selectedPoints) {
    // Deduct points
    brainPointBalance -= selectedPoints;
    document.getElementById("points").textContent = brainPointBalance;
    updateBrainPointBalance(brainPointBalance);

    // Add notification
    const notificationIcon = document.getElementById("notificationIcon");
    notificationIcon.style.color = "red"; // Highlight notification icon
    alert("Payment in process. Please wait 24 hours for confirmation.");

    // Simulate adding to notification list
    addNotification(`Payment of $${(selectedPoints / 30000).toFixed(2)} is being processed.`);

    // Close Cash Out Page
    closeCashOutPage();
  } else {
    alert("Insufficient balance.");
  }
}

// Add Notification Functionality
function addNotification(message) {
  const notificationList = document.getElementById("notificationList");
  const notifItem = document.createElement("div");
  notifItem.textContent = message;
  notificationList.appendChild(notifItem);
}

// Add style for selected card
const style = document.createElement("style");
style.textContent = `
  .pointCard.selected {
    border-color: #50a3a4;
    background: #eafafc;
  }
`;
document.head.appendChild(style);

document.querySelector(".cashout-btn").addEventListener("click", cashOutPage);

/* Notification Icon Page */
let notifications = [];
let isNotificationActive = false; // Flag to check if notification has been read or not

// Simulating new notifications
function addNotification(message) {
  notifications.push(message);
  updateNotifications();
  highlightNotificationIcon(true);
}

// Update the notification messages on the page
function updateNotifications() {
  const notificationMessages = document.getElementById("notificationMessages");
  notificationMessages.innerHTML = ''; // Clear previous notifications
  
  notifications.forEach((message, index) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    if (index === notifications.length - 1 && !isNotificationActive) {
      messageElement.classList.add("new"); // Highlight new notification
    }
    messageElement.innerText = message;
    notificationMessages.appendChild(messageElement);
  });
}

// Function to show the notification page
function showNotificationPage() {
  document.getElementById("notificationPage").style.display = "block"; // Show notification page
  isNotificationActive = true; // Mark as read
  updateNotifications();
  highlightNotificationIcon(false);
}

// Function to close the notification page
document.getElementById("closeNotification").addEventListener("click", function() {
  document.getElementById("notificationPage").style.display = "none"; // Close the page
});

// Function to highlight the notification icon if there are new notifications
function highlightNotificationIcon(highlight) {
  const icon = document.getElementById("notificationIcon");
  if (highlight) {
    icon.style.color = "red"; // Highlight color when there are new messages
  } else {
    icon.style.color = "black"; // Default color
  }
}

// Event listener to open the notification page when icon is clicked
document.getElementById("notificationIcon").addEventListener("click", showNotificationPage);

// Example of adding notifications (this can be dynamic)
setTimeout(() => {
  addNotification("Payment process started.");
}, 1000);

setTimeout(() => {
  addNotification("Payment completed successfully.");
}, 5000);

/* User Icon Page */





/* Sample */
// Function to update Brain Point Balance on Cash Out Page
function updateBrainPointBalance() {
  // Kunin ang current points mula sa Brain Point Balance icon
  const currentPoints = document.getElementById("points").innerText;

  // I-update ang Brain Point Balance sa Cash Out Page
  document.getElementById("brainPointBalance").innerText = currentPoints;

  // I-calculate ang USD Equivalent
  const points = parseInt(currentPoints.split(" ")[0]); // Kunin ang numerical value
  const usdEquivalent = (points / 30000).toFixed(2); // 30000 points = 1 USD
  document.getElementById("usdEquivalent").innerText = usdEquivalent;
}

// Real-time update example (simulate points change)
function simulatePointsChange(newPoints) {
  document.getElementById("points").innerText = `${newPoints} Points`;
  updateBrainPointBalance(); // Update balance kapag nagbago ang points
}


/* Loading screen & Log In */
let generatedCode = "";
let username = "";
let avatarUrl = "";

// Simulating the loading screen
window.onload = function () {
  let progressBar = document.getElementById("progressBar");
  let progress = 0;
  let loadingInterval = setInterval(() => {
    if (progress < 100) {
      progress += 1;
      progressBar.style.width = progress + "%";
    } else {
      clearInterval(loadingInterval);
      document.getElementById("loadingScreen").style.display = "none";
      document.getElementById("createAccount").style.display = "block";
    }
  }, 50); // Adjust speed here
};

// Simulating account creation
function submitAccount() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  if (validateEmail(email) && password.length >= 6) {
    // Generate random confirmation code and avatar
    generatedCode = generateRandomCode();
    username = generateRandomUsername();
    avatarUrl = generateRandomAvatar(username);

    alert(`Confirmation code sent to your email: ${generatedCode}`);
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("confirmAccount").style.display = "block";

    // Save user data temporarily
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("avatarUrl", avatarUrl);
  } else {
    alert("Please enter a valid email and password (min 6 characters).");
  }
}

// Simulating email confirmation
function confirmAccount() {
  const enteredCode = document.getElementById("confirmationCode").value;

  if (enteredCode === generatedCode) {
    alert("Account created successfully!");
    document.getElementById("confirmAccount").style.display = "none";
    document.getElementById("mainPage").style.display = "block";

    // Update User Icon page details
    const email = localStorage.getItem("email");
    const avatar = localStorage.getItem("avatarUrl");

    document.getElementById("userName").innerText = username;
    document.getElementById("userEmail").innerText = email;
    document.getElementById("profileAvatar").style.backgroundImage = `url('${avatar}')`;
  } else {
    alert("Invalid confirmation code.");
  }
}

// Generate random 6-digit confirmation code
function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures a 6-digit number
}

// Generate random username (shortened version)
function generateRandomUsername() {
  const adjectives = ["Cool", "Smart", "Quick", "Brave"];
  const nouns = ["Panda", "Tiger", "Falcon", "Wolf"];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 100)}`;
}

// Generate random avatar with color and first letter of username
function generateRandomAvatar(username) {
  // Check if username is valid
  if (!username || username.trim() === "") {
    username = "User"; // Default username if undefined or empty
  }

  // Generate a random color for the avatar background
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  // Get the first letter of the username
  const firstLetter = username.charAt(0).toUpperCase();

  // Create an avatar container
  const avatar = document.createElement('div');
  avatar.style.width = "100px";
  avatar.style.height = "100px";
  avatar.style.borderRadius = "50%";
  avatar.style.backgroundColor = color;
  avatar.style.display = "flex";
  avatar.style.justifyContent = "center";
  avatar.style.alignItems = "center";
  avatar.style.fontSize = "40px";
  avatar.style.color = "#FFF";
  avatar.innerText = firstLetter; // Set the first letter of the username

  return avatar;
}

// Function to display the avatar
function displayAvatar(username) {
  const avatarElement = generateRandomAvatar(username);
  const profileAvatarContainer = document.getElementById("profileAvatar");
  profileAvatarContainer.innerHTML = ""; // Clear previous avatar
  profileAvatarContainer.appendChild(avatarElement); // Append new avatar
}

// Email validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Show User Icon page
function showUserPage() {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("userPage").style.display = "block";
  // Update details
  document.getElementById("userName").innerText = username;
  document.getElementById("userEmail").innerText = localStorage.getItem("email");
  generateRandomAvatar(username);
}

// Close User Icon page
function closeUserPage() {
  document.getElementById("userPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
}

// Function to show Privacy and Policy content
function showPrivacyPolicy() {
  document.getElementById("privacyPolicy").style.display = "block";
}

// Function to close Privacy and Policy content
function closePrivacyPolicy() {
  document.getElementById("privacyPolicy").style.display = "none";
}

// Function to copy the current page URL (Share functionality)
function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url)
    .then(() => alert("Link copied to clipboard!"))
    .catch(err => console.error("Failed to copy link: ", err));
}

// Log Out Functionality
function logout() {
  alert("You have logged out.");
  // You can add logic to clear user data and navigate to the login page.
  // Example:
   window.location.href = "loadingScreen";
}

// Logout function (clear user data and reset app state)
function logout() {
  // Here you can clear session, localStorage, or cookies depending on your app's implementation
  alert("Logged out successfully!");
  // Example: localStorage.clear();
  window.location.reload();  // Reload the page to simulate logout
}

// Handle user icon click
document.getElementById("userIcon").addEventListener("click", function() {
  showUserPage();
});

// Close user profile page
document.getElementById("closeUserPage").addEventListener("click", function() {
  closeUserPage();
});

// Connect Front End to Back End
function signup() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const username = document.getElementById("usernameInput").value;

  fetch("backend/index.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `action=signup&email=${email}&password=${password}&username=${username}`
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Signup successful!");
      }
    })
    .catch(error => console.error("Error:", error));
}
