let currentPage = 1;
const totalPages = 11;

function updatePage() {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show current page
  document.getElementById(`page${currentPage}`).classList.add("active");

  // Update page number
  document.querySelectorAll(".page-number").forEach((num) => {
    num.textContent = currentPage;
  });

  // Handle animations based on current page
  if (currentPage === 2 || currentPage === 4) {
    animateGraph(currentPage === 2 ? "dfs-visualization" : "bfs-visualization");
  } else if (currentPage === 6) {
    animateComparison();
  } else if (currentPage === 9) {
    animateApplications();
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePage();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePage();
  }
}

function animateGraph(graphId) {
  const svg = document.getElementById(graphId);
  const nodes = svg.querySelectorAll(".node");
  const edges = svg.querySelectorAll(".edge");

  // Reset styles
  nodes.forEach((node) => (node.style.fill = "#1a237e"));
  edges.forEach((edge) => (edge.style.stroke = "#283593"));

  // Animate nodes and edges
  let delay = 0;
  const delayStep = 500; // 500ms between each node

  nodes.forEach((node, index) => {
    setTimeout(() => {
      node.style.fill = "#4caf50";
      // Highlight connected edges
      edges.forEach((edge) => {
        const start = edge.getAttribute("d").split(" ")[1];
        const end = edge.getAttribute("d").split(" ")[3];
        if (
          start === node.getAttribute("cx") ||
          end === node.getAttribute("cx")
        ) {
          edge.style.stroke = "#4caf50";
        }
      });
    }, delay);
    delay += delayStep;
  });
}

function animateComparison() {
  const svg = document.getElementById("comparison-visualization");
  const paths = svg.querySelectorAll(".edge");

  paths.forEach((path, index) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    setTimeout(() => {
      path.style.transition = "stroke-dashoffset 1s ease-in-out";
      path.style.strokeDashoffset = "0";
    }, index * 1000);
  });
}

function animateApplications() {
  const svg = document.getElementById("applications-visualization");
  const groups = svg.querySelectorAll("g");

  groups.forEach((group, index) => {
    const nodes = group.querySelectorAll(".node");
    const edges = group.querySelectorAll(".edge");

    setTimeout(() => {
      nodes.forEach((node) => {
        node.style.fill = "#4caf50";
      });
      edges.forEach((edge) => {
        edge.style.stroke = "#4caf50";
      });
    }, index * 1000);
  });
}

function runDFS() {
  const output = document.getElementById("dfsOutput");
  output.innerHTML = "Running DFS...<br>";

  // Simulate DFS execution
  const steps = ["0", "1", "3", "4", "5", "2"];
  let delay = 0;

  steps.forEach((step, index) => {
    setTimeout(() => {
      output.innerHTML += `Visited node ${step}<br>`;
      if (index === steps.length - 1) {
        output.innerHTML += "<br>DFS completed!";
      }
    }, delay);
    delay += 500;
  });
}

function runBFS() {
  const output = document.getElementById("bfsOutput");
  output.innerHTML = "Running BFS...<br>";

  // Simulate BFS execution
  const steps = ["0", "1", "2", "3", "4", "5"];
  let delay = 0;

  steps.forEach((step, index) => {
    setTimeout(() => {
      output.innerHTML += `Visited node ${step}<br>`;
      if (index === steps.length - 1) {
        output.innerHTML += "<br>BFS completed!";
      }
    }, delay);
    delay += 500;
  });
}

let quizAnswers = {
  1: null,
  2: null,
  3: null,
};

function checkAnswer(question, answer) {
  quizAnswers[question] = answer;
  const buttons = document.querySelectorAll(
    `.question:nth-child(${question}) .options button`
  );

  buttons.forEach((button) => {
    button.classList.remove("selected");
    if (button.textContent === answer) {
      button.classList.add("selected");
    }
  });

  checkQuizCompletion();
}

function checkQuizCompletion() {
  const allAnswered = Object.values(quizAnswers).every(
    (answer) => answer !== null
  );

  if (allAnswered) {
    const result = document.getElementById("quizResult");
    let score = 0;

    if (quizAnswers[1] === "stack") score++;
    if (quizAnswers[2] === "O(V+E)") score++;
    if (quizAnswers[3] === "BFS") score++;

    result.innerHTML = `
      <h3>Quiz Results:</h3>
      <p>Your score: ${score}/3</p>
      <p>${getScoreMessage(score)}</p>
    `;
  }
}

function getScoreMessage(score) {
  if (score === 3) return "Excellent! You've mastered DFS and BFS!";
  if (score === 2) return "Good job! You have a solid understanding.";
  if (score === 1) return "Keep practicing! You're getting there.";
  return "You might want to review the material again.";
}

// Initialize the first page
updatePage();

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
