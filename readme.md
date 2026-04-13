🚥 Keyboard Reaction Game

An interactive browser-based application designed using Human-Computer Interaction (HCI) principles to evaluate and enhance reaction time, cognitive processing, memory, and user attention.

🎮 Game Modes
1. 🔤 Number or Letter (Stimulus Classification Task)
The system displays a random alphanumeric stimulus.
User must classify it:
L → Letter
A → Number
Focus: cognitive decision-making + reaction speed
2. ⌨️ Which One? (Direct Input Mapping)
A stimulus (character) is presented.
User must press the exact corresponding key.
Focus: stimulus-response compatibility & motor response accuracy
3. 🧠 Guess the Pattern (Sequential Memory Task)
a) Alpha-numeric Pattern
Users observe a sequence of stimuli.
They must reproduce it in correct order.
Focus: short-term memory & recall accuracy
b) 🎨 Color Pattern
A visual sequence of colors is presented.
Users repeat the sequence via mouse interaction.
Focus: visual memory + pattern recognition
🧩 HCI Design Features
Immediate Feedback System
Visual (color glow, animations)
Auditory (correct/wrong sounds)
→ Enhances learnability & responsiveness
Time Constraint (30s)
→ Introduces cognitive load & urgency
Progressive Interaction
→ Pattern complexity increases over time (Mode 3)
Error Handling
→ Incorrect input triggers:
Negative feedback
Pattern reset (Mode 3)
Affordances
Buttons and color boxes clearly indicate interactivity
Consistency
Uniform feedback patterns across modes
Visibility of System Status
Timer, score, trials, and accuracy always visible
📊 Performance Metrics

The system tracks user performance in real time:

Score → Reinforcement feedback
Trials → Total attempts
Accuracy (%) → Correct / Total responses
Reaction Time (ms) → Measured per interaction
📁 Data Collection

User interaction data is recorded and exported as CSV files:

Mode
Stimulus
User Input
Correct / Incorrect
Reaction Time

This supports usability analysis and behavioral evaluation.

⏱️ Interaction Flow
User selects a mode
Presses SPACE to initiate session
System presents stimuli
User responds via keyboard/mouse
Immediate feedback is provided
Session ends after 30 seconds
🛠️ Tech Stack
HTML5 → Interface structure
CSS3 → Visual design & feedback
JavaScript → Interaction logic & state management
🎯 Usability Goals
Minimize response time latency
Maximize user engagement
Provide clear feedback loops
Ensure low learning curve
Maintain interaction consistency
🔮 Future Improvements (HCI-Oriented)
Adaptive difficulty based on user performance (adaptive systems)
Eye-tracking or advanced input analysis
Personalized feedback dashboards
Gamification elements (badges, streaks)
Accessibility improvements (colorblind modes, audio cues)
👨‍💻 Author

Developed as an HCI-focused interactive system to explore how users respond to time-critical stimuli and memory-based challenges.
