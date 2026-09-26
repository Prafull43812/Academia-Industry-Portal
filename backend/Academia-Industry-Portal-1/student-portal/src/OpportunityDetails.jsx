import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("Dashboard");
  const [score, setScore] = useState(null);

  const menu = [
    "Dashboard",
    "Skill Assessment",
    "My Skills",
    "Recommendations",
    "Applications",
    "My Portfolio",
    "Profile",
  ];

  const navigate = (name) => {
    setPage(name);
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>AyushConnect</h2>

        <nav>
          {menu.map((item) => (
            <p
              key={item}
              className={page === item ? "active" : ""}
              onClick={() => navigate(item)}
            >
              {item}
            </p>
          ))}
        </nav>

        <p className="logout" onClick={() => alert("Logout feature coming soon")}>
          Logout
        </p>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{getPageTitle(page)}</h1>
            <p>Academia–Industry Collaboration Portal</p>
          </div>

          <div className="profile">
            <div className="avatar">PS</div>
            <span>Prafull</span>
          </div>
        </header>

        {/* DASHBOARD */}
        {page === "Dashboard" && (
          <>
            <section className="stats">
              <div className="card">
                <h3>Skill Score</h3>
                <strong>{score !== null ? `${score}%` : "78%"}</strong>
                <p>Overall skill level</p>
              </div>

              <div className="card">
                <h3>Skill Gaps</h3>
                <strong>3</strong>
                <p>Skills to improve</p>
              </div>

              <div className="card">
                <h3>Recommendations</h3>
                <strong>5</strong>
                <p>Opportunities available</p>
              </div>

              <div className="card">
                <h3>Applications</h3>
                <strong>2</strong>
                <p>Active applications</p>
              </div>
            </section>

            <section className="dashboard-grid">
              <div className="panel">
                <h2>Complete Your Skill Assessment</h2>
                <p>
                  Take the assessment to identify your strengths and skill gaps.
                </p>

                <button onClick={() => navigate("Skill Assessment")}>
                  Start Assessment →
                </button>
              </div>

              <div className="panel">
                <h2>Recommended Internship</h2>
                <h3>AyushTech Research Internship</h3>
                <p>Python • Data Analysis • Research</p>

                <span className="match">92% Match</span>

                <br />

                <button onClick={() => navigate("Recommendations")}>
                  View Opportunity →
                </button>
              </div>
            </section>
          </>
        )}

        {/* ASSESSMENT */}
        {page === "Skill Assessment" && (
          <Assessment setScore={setScore} navigate={navigate} />
        )}

        {/* MY SKILLS */}
        {page === "My Skills" && (
          <section className="content-section">
            <h2>My Skill Profile</h2>
            <p className="section-subtitle">
              Your current skills based on assessment results.
            </p>

            <div className="skill-list">
              <Skill name="Python" value="85%" />
              <Skill name="Data Analysis" value="78%" />
              <Skill name="Communication" value="82%" />
              <Skill name="Research Methodology" value="70%" />
              <Skill name="Teamwork" value="65%" />
            </div>

            <div className="panel gap-panel">
              <h2>⚠️ Skill Gap Analysis</h2>
              <p>
                Based on your assessment, these skills need improvement:
              </p>

              <div className="tags">
                <span>Teamwork</span>
                <span>Digital Health</span>
                <span>Ayurveda Fundamentals</span>
              </div>
            </div>
          </section>
        )}

        {/* RECOMMENDATIONS */}
        {page === "Recommendations" && (
          <Recommendations navigate={navigate} />
        )}

        {/* APPLICATIONS */}
        {page === "Applications" && (
          <Applications />
        )}

        {/* PORTFOLIO */}
        {page === "My Portfolio" && (
          <Portfolio />
        )}

        {/* PROFILE */}
        {page === "Profile" && (
          <Profile />
        )}
      </main>
    </div>
  );
}

/* PAGE TITLE */
function getPageTitle(page) {
  const titles = {
    Dashboard: "Welcome back, Student 👋",
    "Skill Assessment": "Skill Assessment",
    "My Skills": "My Skills",
    Recommendations: "Recommended Opportunities",
    Applications: "My Applications",
    "My Portfolio": "Digital Portfolio",
    Profile: "My Profile",
  };

  return titles[page];
}

/* ASSESSMENT COMPONENT */
function Assessment({ setScore, navigate }) {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "Which language is commonly used for data analysis?",
      options: ["Python", "HTML", "CSS", "XML"],
      answer: "Python",
    },
    {
      id: 2,
      question: "Which skill is important for effective teamwork?",
      options: ["Communication", "Typing", "Gaming", "Browsing"],
      answer: "Communication",
    },
    {
      id: 3,
      question: "Ayurveda is primarily associated with?",
      options: [
        "Traditional Indian healthcare",
        "Web development",
        "Networking",
        "Robotics",
      ],
      answer: "Traditional Indian healthcare",
    },
    {
      id: 4,
      question: "What is important in research methodology?",
      options: [
        "Data collection",
        "Video editing",
        "Gaming",
        "Graphic design",
      ],
      answer: "Data collection",
    },
    {
      id: 5,
      question: "Which is a soft skill?",
      options: [
        "Leadership",
        "JavaScript",
        "SQL",
        "Python",
      ],
      answer: "Leadership",
    },
  ];

  const selectAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const submitAssessment = () => {
    let correct = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        correct++;
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);

    setScore(finalScore);

    alert(`Assessment completed! Your score is ${finalScore}%`);

    navigate("My Skills");
  };

  return (
    <section className="assessment">
      <div className="assessment-header">
        <h2>Skill Assessment</h2>
        <p>
          Evaluate your technical, soft and domain-related skills.
        </p>
      </div>

      {questions.map((q, index) => (
        <div className="question-card" key={q.id}>
          <h3>
            {index + 1}. {q.question}
          </h3>

          <div className="options">
            {q.options.map((option) => (
              <label
                key={option}
                className={
                  answers[q.id] === option ? "option selected" : "option"
                }
              >
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  checked={answers[q.id] === option}
                  onChange={() => selectAnswer(q.id, option)}
                />

                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="submit-btn" onClick={submitAssessment}>
        Submit Assessment →
      </button>
    </section>
  );
}

/* SKILL COMPONENT */
function Skill({ name, value }) {
  return (
    <div className="skill-item">
      <div className="skill-heading">
        <span>{name}</span>
        <strong>{value}</strong>
      </div>

      <div className="progress">
        <div
          className="progress-fill"
          style={{ width: value }}
        ></div>
      </div>
    </div>
  );
}

/* RECOMMENDATIONS */
function Recommendations({ navigate }) {
  const opportunities = [
    {
      title: "AyushTech Research Internship",
      type: "Internship",
      skills: "Python • Data Analysis • Research",
      match: "92%",
    },
    {
      title: "Digital Health Innovation Program",
      type: "Training",
      skills: "Healthcare Technology • Communication",
      match: "86%",
    },
    {
      title: "Ayurveda Research Assistant",
      type: "Job",
      skills: "Research • Ayurveda • Documentation",
      match: "78%",
    },
  ];

  return (
    <section className="content-section">
      <h2>Recommended For You</h2>

      <p className="section-subtitle">
        Opportunities matched with your skills and interests.
      </p>

      <div className="opportunity-list">
        {opportunities.map((item) => (
          <div className="opportunity-card" key={item.title}>
            <div>
              <span className="type">{item.type}</span>

              <h3>{item.title}</h3>

              <p>Required Skills: {item.skills}</p>
            </div>

            <div className="opportunity-right">
              <span className="match">{item.match} Match</span>

              <button onClick={() => alert(`${item.title} selected`)}>
                View & Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* APPLICATIONS */
function Applications() {
  const applications = [
    {
      title: "AyushTech Research Internship",
      company: "Ayush Innovations",
      status: "Under Review",
    },
    {
      title: "Digital Health Internship",
      company: "HealthTech India",
      status: "Shortlisted",
    },
  ];

  return (
    <section className="content-section">
      <h2>Application Tracking</h2>

      <p className="section-subtitle">
        Track the status of your internship and job applications.
      </p>

      <div className="application-list">
        {applications.map((app) => (
          <div className="application-card" key={app.title}>
            <div>
              <h3>{app.title}</h3>
              <p>{app.company}</p>
            </div>

            <span className="status">{app.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* PORTFOLIO */
function Portfolio() {
  return (
    <section className="content-section">
      <h2>Digital Portfolio</h2>

      <p className="section-subtitle">
        Showcase your projects, certificates and experience.
      </p>

      <div className="portfolio-grid">
        <div className="panel">
          <h3>📁 Projects</h3>
          <p>Smart Healthcare Recommendation System</p>
          <p>Ayush Digital Portal</p>

          <button>Add Project</button>
        </div>

        <div className="panel">
          <h3>🏆 Certificates</h3>
          <p>Python Programming Certificate</p>
          <p>Cybersecurity Fundamentals</p>

          <button>Upload Certificate</button>
        </div>

        <div className="panel">
          <h3>📄 Resume</h3>
          <p>Prafull_Sawant_Resume.pdf</p>

          <button>Upload Resume</button>
        </div>
      </div>
    </section>
  );
}

/* PROFILE */
function Profile() {
  return (
    <section className="content-section">
      <h2>Student Profile</h2>

      <div className="profile-card">
        <div className="large-avatar">PS</div>

        <div>
          <h2>Prafull Sawant</h2>
          <p>B.Tech Computer Science Engineering</p>
          <p>Student ID: STU001</p>
          <p>Interests: AI • Cybersecurity • Healthcare Technology</p>
        </div>
      </div>

      <div className="panel">
        <h3>Education</h3>
        <p>B.Tech CSE — 2nd Year</p>
      </div>
    </section>
  );
}

export default App;