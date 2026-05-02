package com.premium.keyboard

import android.content.Context
import android.content.SharedPreferences

class SettingsManager(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences("keyboard_settings", Context.MODE_PRIVATE)

    var isVibrationEnabled: Boolean
        get() = prefs.getBoolean("vibration", true)
        set(value) = prefs.edit().putBoolean("vibration", value).apply()

    var isSoundEnabled: Boolean
        get() = prefs.getBoolean("sound", true)
        set(value) = prefs.edit().putBoolean("sound", value).apply()

    var currentTheme: String
        get() = prefs.getString("theme", "Dark") ?: "Dark"
        set(value) = prefs.edit().putString("theme", value).apply()

    var keyboardHeight: Int
        get() = prefs.getInt("height", 250)
        set(value) = prefs.edit().putInt("height", value).apply()

    var isAutoCorrectEnabled: Boolean
        get() = prefs.getBoolean("autocorrect", true)
        set(value) = prefs.edit().putBoolean("autocorrect", value).apply()

    var isVoiceTypingEnabled: Boolean
        get() = prefs.getBoolean("voicetyping", true)
        set(value) = prefs.edit().putBoolean("voicetyping", value).apply()

    fun reset() {
        prefs.edit().clear().apply()
    }
}
