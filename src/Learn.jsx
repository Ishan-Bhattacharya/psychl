import React, { useState } from 'react';

const LIGHT_THEME = {
  background: '#fff',
  header: '#b25bb2',
  text: '#181818',
  tab: '#fff',
  popupBg: '#f5d6ea', // light pink
  popupText: '#181818',
  intro: '#b25bb2',
};

const DARK_THEME = {
  background: '#23222b', // greyish black
  header: '#7a206f',    // dark pink
  text: '#fff',
  tab: '#23222b',
  popupBg: '#b25bb2',   // dark pink for dark mode
  popupText: '#fff',
  intro: '#fff', // Introduction text white
};

const PHQ9_QUESTIONS = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
  'Trouble concentrating on things, such as reading the newspaper or watching television',
  'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
  'Thoughts that you would be better off dead or of hurting yourself in some way',
];
const PHQ9_OPTIONS = [
  'Not at all',
  'Several days',
  'More than half the days',
  'Nearly every day',
];
const PHQ9_SCORES = [0, 1, 2, 3];

function getPHQ9Interpretation(score) {
  if (score <= 4) return 'Minimal or no depression';
  if (score <= 9) return 'Mild depression';
  if (score <= 14) return 'Moderate depression';
  if (score <= 19) return 'Moderately severe depression';
  return 'Severe depression';
}

const Learn = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [activeTab, setActiveTab] = useState('Learn');
  const [darkMode, setDarkMode] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState(Array(9).fill(null));
  const [showScore, setShowScore] = useState(false);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [lastScore, setLastScore] = useState(null);

  const theme = darkMode ? DARK_THEME : LIGHT_THEME;

  const handleTabClick = (tab) => {
    if (!showPopup) setActiveTab(tab);
  };

  // Crescent moon SVG
  const CrescentMoon = ({ filled }) => (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="19" r="15" fill={filled ? '#fff' : '#23222b'} />
      <path d="M19 4a15 15 0 1 0 0 30c-6-2-10-8-10-15s4-13 10-15z" fill={filled ? theme.header : '#b25bb2'} />
    </svg>
  );

  const handleQuizAnswer = (qIdx, oIdx) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = oIdx;
    setAnswers(newAnswers);
  };

  const handleCalculate = () => {
    setShowScore(true);
    setLastScore(answers.reduce((sum, val) => sum + (val !== null ? PHQ9_SCORES[val] : 0), 0));
  };

  const totalScore = answers.reduce((sum, val) => sum + (val !== null ? PHQ9_SCORES[val] : 0), 0);
  const allAnswered = answers.every(a => a !== null);

  return (
    <div style={{ minHeight: '100vh', background: theme.background, transition: 'background 0.3s' }}>
      {/* Sticky Header */}
      <div style={{
        background: theme.header,
        color: '#fff',
        padding: '0.5rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        fontFamily: 'serif',
        fontSize: '2.8rem',
        boxSizing: 'border-box',
      }}>
        <div style={{ position: 'absolute', left: 0, display: 'flex', gap: '4vw', paddingLeft: '2vw', fontSize: '2rem' }}>
          <span style={{ cursor: showPopup ? 'not-allowed' : 'pointer', opacity: showPopup ? 0.7 : 1 }} onClick={() => handleTabClick('Learn')}>Learn</span>
          <span style={{ cursor: showPopup ? 'not-allowed' : 'pointer', opacity: showPopup ? 0.7 : 1 }} onClick={() => handleTabClick('Link')}>Link</span>
        </div>
        <span>PsychL</span>
        {/* Crescent moon icon */}
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', paddingRight: '2vw', cursor: 'pointer' }} onClick={() => setDarkMode(m => !m)}>
          <CrescentMoon filled={darkMode} />
        </div>
      </div>

      {/* Popup with Introduction */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '7vh',
          left: 0,
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 10,
        }}>
          <div style={{
            background: theme.popupBg,
            borderRadius: '6vw',
            padding: '2.5vw 3vw 3vw 3vw',
            width: '75vw',
            maxWidth: '1000px',
            boxShadow: `0 2px 16px ${theme.header}`,
            textAlign: 'left',
            color: theme.popupText,
            transition: 'background 0.3s, color 0.3s',
          }}>
            <h1 style={{ color: theme.intro, textAlign: 'center', fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Introduction</h1>
            <div style={{ fontSize: '1.6rem', color: theme.popupText, marginBottom: '2.5rem', fontFamily: 'sans-serif' }}>
              <p>Welcome to PsychL</p>
              <p>At PsychL, we believe that understanding mental health is the first step toward healing. Whether you're here to learn about mental health or connect with trusted professionals, we've created a safe, supportive, and informative platform just for you.</p>
              <p>Explore expert content, track your well being, and find the right help—all in one place.</p>
              <p>Join us in breaking the stigma, one step at a time.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button style={{ background: theme.header, color: '#fff', border: 'none', borderRadius: '2vw', fontSize: '1.6rem', padding: '0.7rem 2.5rem', cursor: 'pointer' }} onClick={() => setShowPopup(false)}>
                I understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content (Learn Tab) */}
      {!showPopup && activeTab === 'Learn' && (
        <div style={{ width: '100%', padding: 0, margin: 0 }}>
          {/* Post element */}
          <div style={{
            background: darkMode ? '#23222b' : '#fff',
            borderRadius: 0,
            boxShadow: `0 2px 8px ${theme.header}33`,
            padding: 0,
            marginBottom: '2rem',
            color: theme.text,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            minHeight: '120px',
            height: '8.5vw',
            maxHeight: '180px',
          }}>
            <div style={{ fontSize: '1.3rem', marginLeft: '2.5rem', textAlign: 'left', flex: 1 }}>
              How Are You Really Feeling?<br/>
              Take the PHQ-9 — a short, confidential questionnaire that can help you reflect on symptoms of depression.<br/>
              <span style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#888' }}>
                *For educational purposes and does not claim to provide clinical diagnosis
              </span>
            </div>
            <div style={{ marginRight: '3.5rem', display: 'flex', alignItems: 'center', height: '100%', gap: '1.5rem' }}>
              {lastScore !== null && (
                <span style={{ color: darkMode ? theme.popupBg : theme.header, fontWeight: 600, fontSize: '1.1rem' }}>
                  Last Score: {lastScore}
                </span>
              )}
              <button
                style={{
                  background: lastScore !== null ? (darkMode ? theme.popupBg : theme.popupBg) : theme.header,
                  color: lastScore !== null ? (darkMode ? '#23222b' : theme.header) : '#fff',
                  border: 'none',
                  borderRadius: '1rem',
                  fontSize: '1.1rem',
                  padding: '0.6rem 1.8rem',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => {
                  setShowQuiz(true);
                  setShowScore(false);
                  setAnswers(Array(9).fill(null));
                }}
              >
                {lastScore !== null ? 'Take Quiz Again' : 'Take Quiz'}
              </button>
            </div>
          </div>

          {/* PHQ-9 Quiz Popup */}
          {showQuiz && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.25)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                background: theme.popupBg,
                color: theme.popupText,
                borderRadius: '2rem',
                boxShadow: `0 2px 16px ${theme.header}`,
                padding: '2.5rem 2.5rem 2rem 2.5rem',
                width: '95vw',
                maxWidth: 600,
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
              }}>
                <button
                  style={{ position: 'absolute', top: 16, right: 24, background: 'none', border: 'none', fontSize: 28, color: theme.header, cursor: 'pointer' }}
                  onClick={() => { setShowQuiz(false); setShowInterpretation(false); }}
                  aria-label="Close"
                >
                  ×
                </button>
                {!showInterpretation ? (
                  <>
                    <h2 style={{ color: theme.intro, textAlign: 'center', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem' }}>PHQ-9 Quiz</h2>
                    {PHQ9_QUESTIONS.map((q, qIdx) => (
                      <div key={qIdx} style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontWeight: 500, marginBottom: 8 }}>{qIdx + 1}. {q}</div>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                          {PHQ9_OPTIONS.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              style={{
                                background: answers[qIdx] === oIdx ? theme.header : theme.popupBg,
                                color: answers[qIdx] === oIdx ? '#fff' : theme.popupText,
                                border: `1.5px solid ${theme.header}`,
                                borderRadius: '0.7rem',
                                padding: '0.4rem 1.1rem',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                fontWeight: 500,
                                outline: 'none',
                              }}
                              onClick={() => handleQuizAnswer(qIdx, oIdx)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div style={{ textAlign: 'center', marginTop: 24 }}>
                      <button
                        style={{
                          background: allAnswered ? theme.header : '#ccc',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '1rem',
                          fontSize: '1.1rem',
                          padding: '0.6rem 1.8rem',
                          cursor: allAnswered ? 'pointer' : 'not-allowed',
                          fontWeight: 500,
                        }}
                        disabled={!allAnswered}
                        onClick={handleCalculate}
                      >
                        Calculate
                      </button>
                    </div>
                    {showScore && (
                      <div style={{ marginTop: 32, textAlign: 'center' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 600, color: theme.header }}>
                          Your PHQ-9 Score: {totalScore}
                        </div>
                        <div style={{ fontSize: '1.1rem', marginTop: 8 }}>
                          {getPHQ9Interpretation(totalScore)}
                        </div>
                        <button
                          style={{
                            marginTop: 24,
                            background: theme.header,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '1rem',
                            fontSize: '1.1rem',
                            padding: '0.6rem 1.8rem',
                            cursor: 'pointer',
                            fontWeight: 500,
                          }}
                          onClick={() => setShowInterpretation(true)}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <h2 style={{ color: theme.intro, textAlign: 'center', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem' }}>How to analyze yourself</h2>
                    <div style={{ margin: '1.5rem 0', fontFamily: 'monospace', fontSize: '1.1rem', color: theme.popupText }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', background: theme.popupBg }}>
                        <thead>
                          <tr style={{ borderBottom: `2px solid ${theme.header}` }}>
                            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: `2px solid ${theme.header}` }}>Total Score</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: `2px solid ${theme.header}` }}>Depression Severity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td style={{ padding: '0.5rem' }}>1-4</td><td style={{ padding: '0.5rem' }}>Minimal depression</td></tr>
                          <tr><td style={{ padding: '0.5rem' }}>5-9</td><td style={{ padding: '0.5rem' }}>Mild depression</td></tr>
                          <tr><td style={{ padding: '0.5rem' }}>10-14</td><td style={{ padding: '0.5rem' }}>Moderate depression</td></tr>
                          <tr><td style={{ padding: '0.5rem' }}>15-19</td><td style={{ padding: '0.5rem' }}>Moderately severe depression</td></tr>
                          <tr><td style={{ padding: '0.5rem' }}>20-27</td><td style={{ padding: '0.5rem' }}>Severe depression</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div style={{ marginTop: '2rem', fontSize: '0.98rem', color: '#888', fontStyle: 'italic', lineHeight: 1.6 }}>
                      Kroenke, K., Spitzer, R. L., & Williams, J. B. W. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606–613. <a href="https://doi.org/10.1046/j.1525-1497.2001.016009606.x" target="_blank" rel="noopener noreferrer">https://doi.org/10.1046/j.1525-1497.2001.016009606.x</a><br/><br/>
                      Disclaimer: The PHQ-9 is in the public domain and provided courtesy of Drs. Kurt Kroenke, Robert L. Spitzer, and Janet B.W. Williams. This tool is for informational purposes only and not a substitute for professional diagnosis or treatment.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Learn; 