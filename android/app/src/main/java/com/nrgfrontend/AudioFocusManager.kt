package com.nrgfrontend

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.media.MediaPlayer
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

private val handler = Handler(Looper.getMainLooper())


@RequiresApi(Build.VERSION_CODES.O)
class AudioFocusManager(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), AudioManager.OnAudioFocusChangeListener {

    override fun getName(): String {
        return "AudioFocusManager"
    }

    private val tag: String = "AudioFocusManager"

    private val audioManager: AudioManager =
        reactContext.getSystemService(Context.AUDIO_SERVICE) as AudioManager


    private val playbackAttributes: AudioAttributes = AudioAttributes.Builder()
        .setUsage(AudioAttributes.USAGE_MEDIA)
        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
        .build()
    private val mediaPlayer: MediaPlayer = MediaPlayer()

    init {
        mediaPlayer.setAudioAttributes(playbackAttributes)
    }

    private val focusRequest: AudioFocusRequest =
        AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK)
            .setAudioAttributes(playbackAttributes)
            .setAcceptsDelayedFocusGain(true)
            .setWillPauseWhenDucked(true)
            .setOnAudioFocusChangeListener(this, handler)
            .build()

    @ReactMethod
    fun requestAudioFocus(promise: Promise) {
        try {
            val result = audioManager.requestAudioFocus(focusRequest)
            Log.d(tag, "Audio focus gained")
            if (result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
                promise.resolve(true)
            } else {
                promise.resolve(false)
            }
        } catch (e: Exception) {
            Log.e(tag, "Error in gaining audio focus", e)
            promise.reject("AUDIO_FOCUS_GAIN_ERROR", e)
        }
    }

    @ReactMethod
    fun abandonAudioFocus(promise: Promise) {
        try {
            Log.d(tag, "Audio focus removed")
            val result = audioManager.abandonAudioFocusRequest(focusRequest)
            promise.resolve(result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED)
        } catch (e: Exception) {
            Log.e(tag, "Error in abandoning audio focus", e)
            promise.reject("AUDIO_FOCUS_ABANDON_ERROR", e)
        }
    }

    override fun onAudioFocusChange(focusChange: Int) {
        when (focusChange) {
            AudioManager.AUDIOFOCUS_GAIN -> {
                Log.d(tag, "AUDIOFOCUS_GAIN")
            }

            AudioManager.AUDIOFOCUS_LOSS -> {
                Log.d(tag, "AUDIOFOCUS_LOSS")
            }

            AudioManager.AUDIOFOCUS_LOSS_TRANSIENT -> {
                Log.d(tag, "AUDIOFOCUS_LOSS_TRANSIENT")
            }

            AudioManager.AUDIOFOCUS_GAIN_TRANSIENT -> {
                Log.d(tag, "AUDIOFOCUS_GAIN_TRANSIENT")
            }

            AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK -> {
                Log.d(tag, "AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK")
            }

            AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK -> {
                Log.d(tag, "AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK")
            }
        }
    }

}