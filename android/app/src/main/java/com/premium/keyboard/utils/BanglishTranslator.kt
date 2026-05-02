package com.premium.keyboard.utils

/**
 * Phonetic translator for Banglish (English letters) to Bangla script.
 * Simplified mapping for demonstration.
 */
object BanglishTranslator {
    private val phoneticMap = mapOf(
        "ami" to "আমি",
        "tumi" to "তুমি",
        "bhalo" to "ভালো",
        "kemon" to "কেমন",
        "acho" to "আছো",
        "bangla" to "বাংলা",
        "desh" to "দেশ",
        "dhaka" to "ঢাকা",
        "shonar" to "সোনার",
        "a" to "অ",
        "aa" to "আ",
        "i" to "ই",
        "ee" to "ঈ",
        "u" to "উ",
        "oo" to "ঊ",
        "e" to "এ",
        "o" to "ও",
        "k" to "ক",
        "kh" to "খ",
        "g" to "গ",
        "gh" to "ঘ",
        "ch" to "চ",
        "chh" to "ছ",
        "j" to "জ",
        "jh" to "ঝ",
        "t" to "ত",
        "th" to "থ",
        "d" to "দ",
        "dh" to "ধ",
        "n" to "ন",
        "p" to "প",
        "ph" to "ফ",
        "f" to "ফ",
        "b" to "ব",
        "bh" to "ভ",
        "v" to "ভ",
        "m" to "ম",
        "r" to "র",
        "l" to "ল",
        "s" to "স",
        "sh" to "শ",
        "h" to "হ"
    )

    fun translate(input: String): String {
        return phoneticMap[input.lowercase()] ?: input
    }
}
