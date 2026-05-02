package com.premium.keyboard

import android.inputmethodservice.InputMethodService
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TableRow
import android.widget.TextView
import com.premium.keyboard.utils.BanglishTranslator
import java.lang.StringBuilder

class KeyboardService : InputMethodService(), VoiceManager.VoiceInputListener {

    private lateinit var settingsManager: SettingsManager
    private lateinit var voiceManager: VoiceManager
    private var isShifted = false
    private var isBanglishMode = false
    private val currentWord = StringBuilder()

    private val qwertyLayout = listOf(
        listOf("q", "w", "e", "r", "t", "y", "u", "i", "o", "p"),
        listOf("a", "s", "d", "f", "g", "h", "j", "k", "l"),
        listOf("SHIFT", "z", "x", "c", "v", "b", "n", "m", "DEL"),
        listOf("MODE", "SPACE", "VOICE", "ENTER")
    )

    override fun onCreate() {
        super.onCreate()
        settingsManager = SettingsManager(this)
        voiceManager = VoiceManager(this, this)
    }

    override fun onCreateInputView(): View {
        val root = layoutInflater.inflate(R.layout.keyboard_view, null)
        val table = root.findViewById<LinearLayout>(R.id.keys_table)
        
        setupKeyboard(table)
        return root
    }

    private fun setupKeyboard(parent: LinearLayout) {
        parent.removeAllViews()
        for (row in qwertyLayout) {
            val tableRow = TableRow(this).apply {
                layoutParams = LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
                )
                weightSum = row.size.toFloat()
            }

            for (key in row) {
                val keyView = layoutInflater.inflate(R.layout.item_key, tableRow, false)
                val keyText = keyView.findViewById<TextView>(R.id.key_text)
                
                keyText.text = if (isShifted && key.length == 1) key.uppercase() else key
                
                keyView.setOnClickListener {
                    handleKeyPress(key)
                }
                
                tableRow.addView(keyView)
            }
            parent.addView(tableRow)
        }
    }

    private fun handleKeyPress(key: String) {
        if (settingsManager.isVibrationEnabled) {
            val vibrator = getSystemService(VIBRATOR_SERVICE) as Vibrator
            vibrator.vibrate(VibrationEffect.createOneShot(50, VibrationEffect.DEFAULT_AMPLITUDE))
        }

        when (key) {
            "SHIFT" -> {
                isShifted = !isShifted
                setInputView(onCreateInputView())
            }
            "DEL" -> {
                if (currentWord.isNotEmpty()) currentWord.deleteCharAt(currentWord.length - 1)
                currentInputConnection.deleteSurroundingText(1, 0)
            }
            "SPACE" -> {
                if (isBanglishMode && currentWord.isNotEmpty()) {
                    val translated = BanglishTranslator.translate(currentWord.toString())
                    // Replace the typed letters with translated word
                    currentInputConnection.deleteSurroundingText(currentWord.length, 0)
                    currentInputConnection.commitText(translated + " ", 1)
                    currentWord.clear()
                } else {
                    currentInputConnection.commitText(" ", 1)
                    currentWord.clear()
                }
            }
            "ENTER" -> {
                currentInputConnection.commitText("\n", 1)
                currentWord.clear()
            }
            "MODE" -> {
                isBanglishMode = !isBanglishMode
                // Visual feedback would be good here
            }
            "VOICE" -> {
                if (settingsManager.isVoiceTypingEnabled) {
                    voiceManager.startListening()
                }
            }
            else -> {
                val text = if (isShifted) key.uppercase() else key
                currentInputConnection.commitText(text, 1)
                if (isBanglishMode) currentWord.append(text)
            }
        }
    }

    // Voice Callbacks
    override fun onVoiceResult(text: String) {
        val output = if (isBanglishMode) {
            // Very simple tokenization and translation
            text.split(" ").joinToString(" ") { BanglishTranslator.translate(it) }
        } else {
            text
        }
        currentInputConnection.commitText(output, 1)
    }

    override fun onVoiceError(error: String) {
        Log.e("KeyboardService", "Voice Error: $error")
    }

    override fun onVoiceStarted() {}
    override fun onVoiceStopped() {}
}
