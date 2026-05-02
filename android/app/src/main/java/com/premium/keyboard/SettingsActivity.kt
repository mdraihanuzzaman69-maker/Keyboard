package com.premium.keyboard

import android.os.Bundle
import android.widget.Button
import android.widget.SeekBar
import android.widget.Switch
import androidx.appcompat.app.AppCompatActivity

class SettingsActivity : AppCompatActivity() {

    private lateinit var settingsManager: SettingsManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.settings_activity)

        settingsManager = SettingsManager(this)

        val switchVibration = findViewById<Switch>(R.id.switch_vibration)
        val switchSound = findViewById<Switch>(R.id.switch_sound)
        val switchVoice = findViewById<Switch>(R.id.switch_voicetyping)
        val switchAutoCorrect = findViewById<Switch>(R.id.switch_autocorrect)
        val seekHeight = findViewById<SeekBar>(R.id.seek_height)
        val btnReset = findViewById<Button>(R.id.btn_reset)

        // Load current values
        switchVibration.isChecked = settingsManager.isVibrationEnabled
        switchSound.isChecked = settingsManager.isSoundEnabled
        switchVoice.isChecked = settingsManager.isVoiceTypingEnabled
        switchAutoCorrect.isChecked = settingsManager.isAutoCorrectEnabled
        seekHeight.progress = settingsManager.keyboardHeight

        // Save on change
        switchVibration.setOnCheckedChangeListener { _, isChecked ->
            settingsManager.isVibrationEnabled = isChecked
        }
        switchSound.setOnCheckedChangeListener { _, isChecked ->
            settingsManager.isSoundEnabled = isChecked
        }
        switchVoice.setOnCheckedChangeListener { _, isChecked ->
            settingsManager.isVoiceTypingEnabled = isChecked
        }
        switchAutoCorrect.setOnCheckedChangeListener { _, isChecked ->
            settingsManager.isAutoCorrectEnabled = isChecked
        }
        seekHeight.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                if (fromUser) settingsManager.keyboardHeight = progress
            }
            override fun onStartTrackingTouch(seekBar: SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: SeekBar?) {}
        })

        btnReset.setOnClickListener {
            settingsManager.reset()
            // Reload UI
            recreate()
        }
    }
}
