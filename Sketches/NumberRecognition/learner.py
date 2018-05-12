import numpy as np
np.random.seed(123)  # for reproducibility
 
from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Convolution2D, MaxPooling2D
from keras.utils import np_utils
from keras.datasets import mnist
# from keras.models import load_model
import matplotlib.pyplot as plt
# 4. Load pre-shuffled MNIST data into train and test sets
# (X_train, y_train), (X_test, y_test) = mnist.load_data()
# for i,x in enumerate(X_train):
#     for j,row in enumerate(x):
#         for k,col in enumerate(row):
#             if col != 0:
#                 col = 255
#             else:
#                 col = 0
#             X_train[i][j][k] = col

# np.save("training.npy", X_train)
y_train = np.load("labels.npy")
X_train = np.load("training.npy")


# # with open("Sketches/NumberRecognition/arr.txt", "w") as f:
# #     X_train = X_train[0].reshape(1, 28, 28, 1)
# #     X_train = X_train.astype('float32')
# #     X_train /= 255
# #     f.write(str(X_train.tolist()))
# # import sys    
# # sys.exit()
# # 5. Preprocess input data
X_train = X_train.reshape(X_train.shape[0], 28, 28, 1)
# X_test = X_test.reshape(X_test.shape[0], 28, 28,1)

X_train = X_train.astype('float32')
# X_test = X_test.astype('float32')
X_train /= 255
# X_test /= 255
 
# # 6. Preprocess class labels
Y_train = np_utils.to_categorical(y_train, 10)
# # Y_test = np_utils.to_categorical(y_test, 10)


# # model = load_model('my_model.h5')
# # to_predict = np.expand_dims(X_test[2], 0)
# # print(model.predict(to_predict))
# # print(Y_test[2])
# # # # 7. Define model architecture
model = Sequential()

model.add(Convolution2D(32, (3, 3), activation='relu', input_shape=(28,28,1)))
model.add(Convolution2D(32, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.25))
 
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(10, activation='softmax'))
 
# 8. Compile model
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['top_k_categorical_accuracy'])
 
# 9. Fit model on training data
model.fit(X_train, Y_train, 
          batch_size=32, epochs=10, verbose=1)
to_predict = np.expand_dims(X_train[0], 0)
print(model.predict(to_predict))
# print(Y_train[0])
# # with open("Sketches/NumberRecognition/arr.txt","w") as f:
# #     s+='['
# #     for i in to_predict:
# #         s+=str(i)
# #         s+=','
# #     s+=']'
# #     f.write(s)
# # #print(model.predict(to_predict))
# # #print(Y_test[0])

model.save("my_model.h5")

# # # import json
# # # weights_list = model.get_weights()
# # # js = ''
# # # for arr in weights_list:
# # #     js += json.dumps(arr.tolist())
# # # with open("Sketches/NumberRecognition/weights.json", "w") as f:
# # #     f.write(js)
# # # 10. Evaluate model on test data
# # # score = model.evaluate(X_test, Y_test, verbose=0)