from keras.datasets import mnist
import matplotlib.pyplot as plt
# load (downloaded if needed) the MNIST dataset
(X_train, y_train), (X_test, y_test) = mnist.load_data()
# plot 4 images as gray scale
# plt.subplot(221)
# plt.imshow(X_train[0], cmap=plt.get_cmap('gray'))
# plt.subplot(222)
# plt.imshow(X_train[1], cmap='gray')
# plt.subplot(223)
# plt.imshow(X_train[2], cmap=plt.get_cmap('gray'))
# plt.subplot(224)
img = X_train[3]
for i,row in enumerate(img):
    for j,col in enumerate(row):
        if col != 0:
            col = 255
        else:
            col = 0
        img[i][j] = col
plt.imshow(img, cmap='gray')
plt.show()