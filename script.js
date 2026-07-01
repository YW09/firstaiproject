const chartData = {
  "7d": [48, 56, 52, 67, 74, 69, 82],
  "30d": [38, 42, 45, 52, 49, 58, 62, 67, 72, 76, 74, 83],
  "90d": [28, 36, 33, 45, 51, 48, 57, 62, 71, 68, 77, 84, 91],
};

const rangeLabels = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
};

const activities = [
  ["Acme Cloud", "Maya Chen", "Closed", "$42,800"],
  ["Northline Labs", "Jon Bell", "In review", "$31,200"],
  ["Brightpath", "Ava Patel", "At risk", "$18,600"],
  ["Summit Retail", "Chris Wong", "Closed", "$27,450"],
  ["Vertex Health", "Nia Brooks", "In review", "$36,900"],
];

const svg = document.querySelector("#lineChart");
const chartSubtitle = document.querySelector("#chartSubtitle");
const segmentButtons = document.querySelectorAll(".segment");
const refreshButton = document.querySelector("#refreshButton");
const exportButton = document.querySelector("#exportButton");
const activityRows = document.querySelector("#activityRows");
const lastUpdated = document.querySelector("#lastUpdated");
const metricElements = {
  revenue: document.querySelector('[data-metric="revenue"]'),
  users: document.querySelector('[data-metric="users"]'),
  conversion: document.querySelector('[data-metric="conversion"]'),
  tickets: document.querySelector('[data-metric="tickets"]'),
};

function pointsForData(values) {
  const width = 720;
  const height = 280;
  const padding = 28;
  const min = Math.min(...values) - 8;
  const max = Math.max(...values) + 8;

  return values.map((value, index) => {
    const x = padding + (index * (width - padding * 2)) / (values.length - 1);
    const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
    return [x, y];
  });
}

function drawChart(range) {
  const values = chartData[range];
  const points = pointsForData(values);
  const linePath = points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const areaPath = `${linePath} L ${points.at(-1)[0]} 252 L ${points[0][0]} 252 Z`;
  const gridLines = [56, 112, 168, 224]
    .map((y) => `<line class="chart-grid" x1="28" y1="${y}" x2="692" y2="${y}" />`)
    .join("");
  const dots = points
    .map(([x, y]) => `<circle class="chart-point" cx="${x}" cy="${y}" r="5" />`)
    .join("");

  svg.innerHTML = `
    ${gridLines}
    <path class="chart-area" d="${areaPath}"></path>
    <path class="chart-line" d="${linePath}"></path>
    ${dots}
  `;

  chartSubtitle.textContent = rangeLabels[range];
}

function renderActivity() {
  activityRows.innerHTML = activities
    .map(([account, owner, status, value]) => {
      const statusClass = status === "Closed" ? "closed" : status === "At risk" ? "risk" : "review";

      return `
        <tr>
          <td>${account}</td>
          <td>${owner}</td>
          <td><span class="status ${statusClass}">${status}</span></td>
          <td>${value}</td>
        </tr>
      `;
    })
    .join("");
}

function updateTimestamp() {
  const time = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  lastUpdated.textContent = `Updated at ${time}`;
}

function refreshMetrics() {
  const revenue = 124 + Math.random() * 12;
  const users = 24000 + Math.floor(Math.random() * 1800);
  const conversion = 6.9 + Math.random() * 1.2;
  const tickets = 280 + Math.floor(Math.random() * 58);

  metricElements.revenue.textContent = `$${revenue.toFixed(1)}K`;
  metricElements.users.textContent = users.toLocaleString();
  metricElements.conversion.textContent = `${conversion.toFixed(1)}%`;
  metricElements.tickets.textContent = tickets.toString();
  updateTimestamp();
}

segmentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    segmentButtons.forEach((segment) => segment.classList.toggle("is-active", segment === button));
    drawChart(button.dataset.range);
  });
});

refreshButton.addEventListener("click", refreshMetrics);

exportButton.addEventListener("click", () => {
  const rows = activities.map((row) => row.join(",")).join("\n");
  const csv = `Account,Owner,Status,Value\n${rows}`;
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "dashboard-activity.csv";
  link.click();
  URL.revokeObjectURL(url);
});

drawChart("7d");
renderActivity();
refreshMetrics();
