import pyaudio
import wave

# Configurar los parámetros de grabación
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
RECORD_SECONDS = 5
WAVE_OUTPUT_FILENAME = "voz/archivo_de_audio.wav"

# Inicializar el objeto PyAudio
audio = pyaudio.PyAudio()

# Configurar la grabación de audio
stream = audio.open(format=FORMAT, channels=CHANNELS,
                rate=RATE, input=True,
                frames_per_buffer=CHUNK)

print("Grabando audio...")

# Inicializar la lista de frames
frames = []

# Grabar el audio en frames
for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
    data = stream.read(CHUNK)
    frames.append(data)

print("Grabación finalizada.")

# Detener la grabación y cerrar el objeto PyAudio
stream.stop_stream()
stream.close()
audio.terminate()

# Guardar el archivo de audio en formato WAV
wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
wf.setnchannels(CHANNELS)
wf.setsampwidth(audio.get_sample_size(FORMAT))
wf.setframerate(RATE)
wf.writeframes(b''.join(frames))
wf.close()
