# Elite Premium Keyboard (Android)

This project is a high-performance, feature-rich Android Keyboard application built with Kotlin. It follows clean architecture principles and provides advanced features like Phonetic Banglish typing, Voice input, and extensive customization.

## Features

- **Keyboard Engine**: Built using `InputMethodService` for deep OS integration.
- **Phonetic Banglish**: Real-time conversion (e.g., typing "ami" outputs "আমি").
- **Voice Typing**: Integrated Google Speech-to-Text with Banglish support.
- **Modern UI**: Rounded keys, ripple animations, and dark/light themes.
- **Smart Suggestions**: Suggestion bar with predictive text (simulated).
- **Settings Panel**: Fully functional settings to control haptics, sounds, and layouts.

## Project Structure

- `android/`: The complete Android Studio project.
  - `app/src/main/java/`: Kotlin source code.
  - `app/src/main/res/`: XML layouts and resources.
- `src/`: The React-based companion app/simulator for previewing the keyboard design.

## How to Install (Android)

1. **Prerequisites**: Download and install [Android Studio](https://developer.android.com/studio).
2. **Import**: Open Android Studio and select "Open an Existing Project". Navigate to the `android/` directory in this codebase.
3. **Build**: Let Gradle sync and download dependencies.
4. **Deploy**: Connect your Android device (ensure Developer Options and USB Debugging are on) and click the **Run** button.
5. **Enable**:
   - On your phone: Go to **Settings > System > Languages & input > Manage keyboards**.
   - Turn on **Elite Premium Keyboard**.
   - Tap any text field, swipe down from the notification bar (or tap the keyboard icon at the bottom) and select **Elite Premium Keyboard** as your active method.

## Technologies Used

- **Android**: Kotlin, XML, InputMethodService, SharedPreferences, SpeechRecognizer.
- **Frontend (Simulator)**: React, Tailwind CSS, Framer Motion, Lucide Icons.

---
Developed as a production-grade prototype for premium keyboard enthusiasts.
