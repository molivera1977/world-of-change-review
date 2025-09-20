import React, { useState } from "react";
import "./index.css";

// --- Shuffle helper ---
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// --- Vocabulary Questions ---
const vocabQuestions = [
  { q: "The breaking down of rocks into smaller pieces.", options: ["erosion", "weathering", "deposition", "collapse"], answer: "weathering" },
  { q: "A difference between two things.", options: ["contrast", "pressure", "disaster", "crisis"], answer: "contrast" },
  { q: "A group of people living in the same area.", options: ["community", "structure", "potential", "event"], answer: "community" },
  { q: "To fall down or break apart suddenly.", options: ["loosen", "collapse", "surface", "prevent"], answer: "collapse" },
  { q: "The dropping of rocks or dirt in a new place.", options: ["destruction", "deposition", "evacuation", "erosion"], answer: "deposition" },
  { q: "Something that can be dangerous or cause harm.", options: ["hazard", "pressure", "process", "landform"], answer: "hazard" },
  { q: "A sudden event that causes great harm or damage.", options: ["disaster", "crisis", "landslide", "structure"], answer: "disaster" },
  { q: "Happening all the time or staying the same.", options: ["constant", "swift", "gradual", "unpredictable"], answer: "constant" },
  { q: "To change something.", options: ["prevent", "alter", "collapse", "pressure"], answer: "alter" },
  { q: "A force that pushes on something.", options: ["eruption", "contrast", "pressure", "landform"], answer: "pressure" },
  { q: "When rocks and dirt slide down a hill or mountain.", options: ["erosion", "landslide", "process", "severe"], answer: "landslide" },
  { q: "The movement of broken-down rocks and soil from one place to another.", options: ["weathering", "erosion", "warning", "alter"], answer: "erosion" },
  { q: "structure", options: ["A natural shape on Earth’s surface", "A tool used to measure weather", "Something that has been built", "A group of people living nearby"], answer: "Something that has been built" },
  { q: "surface", options: ["A flat area with rocks", "The outside or top layer of something", "A hill or mountain", "A large natural event"], answer: "The outside or top layer of something" },
  { q: "potential", options: ["The chance that something might happen", "A sudden and strong storm", "A tool to dig deep into the ground", "A type of flood warning"], answer: "The chance that something might happen" },
  { q: "warning", options: ["A way to measure wind", "A sign or message that tells people something bad might happen", "A person who helps during a storm", "A shelter for disasters"], answer: "A sign or message that tells people something bad might happen" },
  { q: "crisis", options: ["A sunny and warm day", "A strong wall built by people", "A serious problem or emergency", "A deep hole in the ground"], answer: "A serious problem or emergency" },
  { q: "prevent", options: ["To protect something using sandbags", "To stop something from happening", "To clean up after a disaster", "To form a new hill over time"], answer: "To stop something from happening" },
  { q: "gradual", options: ["Happening slowly over time", "Occurring all at once", "A large sudden eruption", "Causing destruction to a town"], answer: "Happening slowly over time" },
  { q: "swift", options: ["A slow and steady change", "Something that forms a canyon", "Happening very quickly", "A heavy wall built along water"], answer: "Happening very quickly" },
  { q: "evacuate", options: ["To leave a place because it is not safe", "To repair something broken", "To dig away dirt", "To yell for help"], answer: "To leave a place because it is not safe" },
  { q: "event", options: ["A group of moving rocks", "Something important that happens", "A way to stop flooding", "A new kind of landform"], answer: "Something important that happens" },
  { q: "unpredictable", options: ["Easy to know in advance", "Not able to be guessed or known ahead of time", "Part of a regular routine", "Controlled by scientists"], answer: "Not able to be guessed or known ahead of time" },
  { q: "eruption", options: ["A fast flood from rain", "When lava, gas, or ash bursts out of a volcano", "A mountain falling apart", "A warning that comes before a disaster"], answer: "When lava, gas, or ash bursts out of a volcano" },
];

// --- Comprehension Questions ---
const compQuestions = [
  { q: "What does the author mean when they say, 'Earth may seem as if it is a large rock that never changes'?", options: ["Earth is too big to change.", "Earth looks still, but changes happen constantly.", "Earth was formed long ago and hasn't changed since.", "Only fast changes matter to scientists."], answer: "Earth looks still, but changes happen constantly." },
  { q: "What are some examples of slow natural processes described in the text?", options: ["Volcanic eruptions and earthquakes", "Rainstorms and tsunamis", "Weathering, erosion, and deposition", "Avalanches and floods"], answer: "Weathering, erosion, and deposition" },
  { q: "According to the text, what is the result of erosion over many years?", options: ["Beaches are washed away.", "Rocks form new mountains.", "Entire landforms collapse.", "Rivers dry up."], answer: "Entire landforms collapse." },
  { q: "Which sentence from the passage best supports the idea that natural changes shape the Earth?", options: ["'Natural changes take place every day.'", "'Volcanoes are scary.'", "'Scientists can't always stop disasters.'", "'The Grand Canyon is an example of the effect of erosion.'"], answer: "'The Grand Canyon is an example of the effect of erosion.'" },
  { q: "What is deposition?", options: ["The breaking of rocks into smaller pieces", "The process of dropping dirt and rocks in a new place", "The collapse of a landform", "The movement of magma to the surface"], answer: "The process of dropping dirt and rocks in a new place" },
  { q: "What causes volcanoes to erupt?", options: ["Erosion from water", "Pressure from earthquakes", "Pressure builds under Earth's surface and forces magma up", "Too much rainfall"], answer: "Pressure builds under Earth's surface and forces magma up" },
  { q: "What natural disaster can occur when rain loosens rocks and dirt?", options: ["Eruption", "Landslide", "Deposition", "Weathering"], answer: "Landslide" },
  { q: "What can communities do to stay safe from fast-moving disasters?", options: ["Watch movies about disasters", "Wait until they happen", "Create emergency plans and try to predict them", "Move to the city"], answer: "Create emergency plans and try to predict them" },
  { q: "Which of these is an example of a gradual change to Earth’s surface?", options: ["Lava covering a town", "A landslide after heavy rain", "A sand dune forming from wind", "An earthquake cracking a road"], answer: "A sand dune forming from wind" },
  { q: "What does the author suggest people do to reduce beach erosion?", options: ["Avoid beaches", "Use umbrellas", "Build structures and plant vegetation", "Dig holes"], answer: "Build structures and plant vegetation" },
  { q: "What does the word 'unpredictable' most likely mean in this sentence: 'Some disasters are unpredictable and strike without warning'?", options: ["Easy to plan for", "Cannot be guessed", "Very small", "Predicted by scientists"], answer: "Cannot be guessed" },
  { q: "What is the central idea of the text 'A World of Change'?", options: ["Earth is fragile and should not be explored", "Natural disasters are always dangerous", "Earth is always changing, and people respond in different ways", "People should avoid the Grand Canyon"], answer: "Earth is always changing, and people respond in different ways" },
  { q: "Which type of process is most dangerous to people?", options: ["Slow processes", "Gradual erosion", "Fast processes like eruptions and landslides", "Deposition"], answer: "Fast processes like eruptions and landslides" },
  { q: "Why can’t people always protect land from fast natural processes?", options: ["Because plants don’t grow fast enough", "Because disasters are too unpredictable", "Because soil is too strong", "Because scientists stop studying them"], answer: "Because disasters are too unpredictable" },
  { q: "What is the purpose of the diagram showing the parts of a volcano?", options: ["To show where to build homes", "To name each mountain", "To explain the layers of the Earth", "To help readers understand how volcanoes erupt"], answer: "To help readers understand how volcanoes erupt" },
];

// --- Cloze Questions (20 total) ---
const clozeQuestions = [
  // Part 1
  { sentence: "The surface of Earth is in a state of _____ change because it is always being shaped by natural forces.", options: ["constant", "collapse", "structure"], answer: "constant" },
  { sentence: "Weathering and erosion are examples of a natural _____ that slowly changes the Earth.", options: ["process", "landslide", "community"], answer: "process" },
  { sentence: "Strong winds and water can _____ landforms, changing their shape over time.", options: ["alter", "effect", "eruption"], answer: "alter" },
  { sentence: "The Grand Canyon was formed by the powerful force of _____ over millions of years.", options: ["erosion", "hazard", "crisis"], answer: "erosion" },
  { sentence: "_____ happens when small pieces of rock are dropped in a new place and build up.", options: ["Deposition", "Pressure", "Collapse"], answer: "Deposition" },
  { sentence: "When too much pressure builds inside a volcano, an _____ may occur.", options: ["eruption", "effect", "warning"], answer: "eruption" },
  { sentence: "When rocks and dirt slide down a mountain quickly, it is called a _____.", options: ["landslide", "process", "natural"], answer: "landslide" },
  { sentence: "The damage from the earthquake caused a major _____ in the city.", options: ["crisis", "constant", "surface"], answer: "crisis" },
  { sentence: "A tsunami can be a dangerous _____ to people living near the ocean.", options: ["hazard", "community", "structure"], answer: "hazard" },
  { sentence: "A volcanic eruption can cause great _____ to buildings and land.", options: ["destruction", "weathering", "warning"], answer: "destruction" },

  // Part 2
  { sentence: "The damage from the landslide was so _____ that entire buildings were buried.", options: ["severe", "gradual", "community"], answer: "severe" },
  { sentence: "Emergency workers helped people _____ the area after the volcano erupted.", options: ["evacuate", "prevent", "contrast"], answer: "evacuate" },
  { sentence: "A landslide can happen suddenly because it is a very _____ event.", options: ["swift", "gradual", "structure"], answer: "swift" },
  { sentence: "The scientist explained that the earthquake was completely _____ and could not be predicted.", options: ["unpredictable", "disaster", "hazard"], answer: "unpredictable" },
  { sentence: "It is important to try to _____ damage by building strong structures.", options: ["prevent", "evacuate", "loosen"], answer: "prevent" },
  { sentence: "A fast-moving _____ like a volcanic eruption can cause great destruction.", options: ["disaster", "event", "pressure"], answer: "disaster" },
  { sentence: "In _____ to fast changes, slow changes happen over a long time.", options: ["contrast", "warning", "unfortunate"], answer: "contrast" },
  { sentence: "It is _____ that some people do not have time to leave before a natural disaster.", options: ["unfortunate", "potential", "structure"], answer: "unfortunate" },
  { sentence: "Rain can _____ rocks and soil, making a landslide more likely.", options: ["loosen", "collapse", "prevent"], answer: "loosen" },
  { sentence: "A _____ is a group of people who live in the same area and help each other.", options: ["community", "hazard", "surface"], answer: "community" },
];

// --- Quiz Component ---
function Quiz({ questions }) {
  const [shuffledQuestions] = useState(() =>
    shuffleArray(
      questions.map(q => ({
        ...q,
        options: shuffleArray(q.options), // shuffle options too
      }))
    )
  );
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleAnswer(option) {
    if (option === shuffledQuestions[current].answer) {
      setScore(score + 1);
      setFeedback("🎉 Great job! That's correct!");
    } else {
      setFeedback("💡 Try again! You’ll get the next one!");
    }
    setTimeout(() => {
      setFeedback("");
      const next = current + 1;
      if (next < shuffledQuestions.length) {
        setCurrent(next);
      } else {
        setShowScore(true);
      }
    }, 1000);
  }

  if (showScore) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    let message = "";
    if (score === shuffledQuestions.length) message = "🌟 Perfect Score! Amazing work! 🌟";
    else if (score >= shuffledQuestions.length * 0.7) message = "🎉 Great job! You really know this!";
    else message = "✨ Keep practicing! You're learning a lot!";

    return (
      <div className="score-card">
        <h2>You scored {score} / {shuffledQuestions.length}</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: percentage + "%" }}></div>
        </div>
        <p>{message}</p>
        <button onClick={() => window.location.reload()}>🔄 Play Again</button>
      </div>
    );
  }

  return (
    <div className="quiz-card">
      <h2>{shuffledQuestions[current].q || shuffledQuestions[current].sentence}</h2>
      <div className="options">
        {shuffledQuestions[current].options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(opt)}>{opt}</button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

// --- Main App ---
export default function App() {
  const [section, setSection] = useState("menu");

  return (
    <div className="container">
      <h1>🌎 A World of Change Review</h1>

      {section === "menu" && (
        <><div className="photo-block">
  <img src="/cover.png" alt="A World of Change Cover" className="teacher-photo" />
</div>


          <div className="welcome-row">
            <p className="welcome-text">Welcome! Choose a section below to start practicing your skills. Have fun learning!</p>
            <img src="/applebooks.png" alt="Apple and Books" className="apple-books" />
          </div>

          <div className="menu-buttons">
            <button className="vocab-btn" onClick={() => setSection("vocab")}>📖 Vocabulary</button>
            <button className="comp-btn" onClick={() => setSection("comp")}>📘 Comprehension</button>
            <button className="cloze-btn" onClick={() => setSection("cloze")}>✏️ Cloze</button>
          </div>

          <p className="how-to-use">Click a button above to start practicing! Try to get the best score you can, and play again to keep learning!</p>
        </>
      )}

      {section === "vocab" && <Quiz questions={vocabQuestions} />}
      {section === "comp" && <Quiz questions={compQuestions} />}
      {section === "cloze" && <Quiz questions={clozeQuestions} />}

      {section !== "menu" && <button onClick={() => setSection("menu")}>⬅ Back</button>}

      <footer>Made by Mr. O</footer>
    </div>
  );
}
