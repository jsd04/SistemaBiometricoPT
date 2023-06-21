import librosa
import numpy as np
import wave


# Cargar el archivo de audio
audio_file = 'voz/archivo_de_audio.wav'
signal, sr = librosa.load(audio_file, sr=22050)

# Calcular el espectro de potencia
power_spectrum = np.abs(librosa.stft(signal))**2

# Calcular el espectro de frecuencia
freq_spectrum = librosa.fft_frequencies(sr=sr, n_fft=2048)

# Filtrar las frecuencias bajas (menores a 85Hz) y altas (mayores a 255Hz)
low_freq = freq_spectrum < 85
high_freq = freq_spectrum > 255
power_spectrum[low_freq] = 0
power_spectrum[high_freq] = 0

# Calcular la energía de la señal
energy = np.sum(power_spectrum, axis=0)

# Detectar los intervalos de tiempo donde hay voz
threshold = np.mean(energy) + np.std(energy)
is_voiced = energy > threshold

# Recortar los intervalos de tiempo con voz
voiced_times = librosa.core.times_like(is_voiced, sr=sr, hop_length=512, n_fft=2048)
voiced_intervals = librosa.core.times_to_frames(voiced_times[is_voiced], sr=sr, hop_length=512, n_fft=2048)
voiced_signal = librosa.util.frame(signal, frame_length=2048, hop_length=512)[:, voiced_intervals]

# Mostrar los resultados
print('Intervalos de tiempo con voz:', is_voiced)
print('Número de intervalos de tiempo con voz:', np.sum(is_voiced))
print('Duración total de la señal de voz:', librosa.core.samples_to_time(voiced_signal.shape[-1], sr=sr))


# Guardar la señal de voz recortada en un archivo de audio
wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
wf.setnchannels(CHANNELS)
wf.setsampwidth(audio.get_sample_size(FORMAT))
wf.setframerate(RATE)
wf.writeframes(b''.join(frames))
wf.close()
