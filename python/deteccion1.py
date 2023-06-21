# ********* Deteccion por Haar-cascade  in OpenCV ******
# by link: https://opencv24-python-tutorials.readthedocs.io/en/latest/py_tutorials/py_objdetect/py_face_detection/py_face_detection.html

import numpy as np
import cv2

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')
"""
img = cv2.imread('imagen.jpg')
cv2.imshow('Imagen original',img)
cv2.waitKey(3600)
print(img.shape) #shape para saber el tamaño
img = cv2.resize(img, (720,480))
print(img.shape)
cv2.imshow('Imagen redimensionada',img)
cv2.waitKey(3600)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
cv2.imshow('Imagen escala de grises',gray)
cv2.waitKey(3600)"""

# ************** Tomar foto **************

cap = cv2.VideoCapture(0) # abrir la cámara

# establecer dimensiones
cap.set(cv2.CAP_PROP_FRAME_WIDTH,2560) # ancho
cap.set(cv2.CAP_PROP_FRAME_HEIGHT,1440) # alto

# Tomar una imagen
ret, img = cap.read()
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

cv2.imshow('Imagen Capturada',img)
""" Si se encuentran rostros,devuelve las posiciones de los rostros detectados como Rect(x,y,w,h). 
  Una vez que obtengamos estas ubicaciones, podemos crear un ROI para la cara y aplicar la detección de ojos en este ROI (¡ya que los ojos siempre están en la cara!)."""
faces = face_cascade.detectMultiScale(gray, 1.3, 5)
for (x,y,w,h) in faces:
    img = cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
    roi_gray = gray[y:y+h, x:x+w]
    roi_color = img[y:y+h, x:x+w]
    eyes = eye_cascade.detectMultiScale(roi_gray)
    for (ex,ey,ew,eh) in eyes:
        cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)
#se puede comentar la linea 27 a la 31 que es para la deteccion de ojos
#Liberamos la cámara
cap.release()
cv2.imshow('Deteccion de rostro',img)
# Guardamos la imagen en un archivo
cv2.imwrite('rostro.jpg',img)



#cv2.waitKey(3600) # Se espera 360milisegundos
cv2.waitKey(0)
cv2.destroyAllWindows()