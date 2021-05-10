# Bird Identification App

Bird Identification App is a react native(expo cli) application for identification of Indian birds species using convolutional neural networks. We have used convolutional neural networks (CNNs) to build and train a model which can classify the birds from their images. 
We have used Keras, a deep learning framework built on top of TensorFlow 2.0, for building,training and testing our deep learning model.
Frontend is built using react native and firebase for authentication.

* You can find the traning code **[here](https://drive.google.com/file/d/1ds1OQ1P0pXGASGQY4oUv3b0wvyWxRbPj/view?usp=sharing)**. This contains the code for the initial model we built.

### Team Members :

1.  <a href ="https://github.com/saukr1006">Saurabh Kumar</a> 
2.  <a href ="https://github.com/sid-tiw">Siddhartha Tiwari</a>
3.  <a href ="https://github.com/Devanshk2">Devansh Khandelwal</a>
4.  <a href ="https://github.com/RishabhShukla1511">Rishabh Shukla</a>


### Mobile Application:

Here are some screenshots of the Bird Identification App mobile application:

### 1. Login Page
<img src="https://github.com/saukr1006/Bird-Identification-App/blob/master/images/login.PNG" height="550px" width="300px">

<br/>

### 2. SignUp Page

<img src="https://github.com/saukr1006/Bird-Identification-App/blob/master/images/signup.PNG" height="550px" width="300px">


<br/>

### 3. Profile

<img src="https://github.com/saukr1006/Bird-Identification-App/blob/master/images/Profile1.PNG" height="550px" width="300px">
<img src="https://github.com/saukr1006/Bird-Identification-App/blob/master/images/profile2.PNG" height="550px" width="300px">

<br/>

### 4. Details


<img src="https://github.com/saukr1006/Bird-Identification-App/blob/master/images/MoreInfo.PNG" height="550px" width="300px">

<br/>

## Steps to run

### Frontend
1. Open Frontend directory.
2. Change the IP address in the /screens/Profile file to your own IP address as commented in the file itself.
3. Add your firebase configuration in /config/firebaseconfig file.
4. Type npm install.
5. npm start to start the frontend server.
6. Open the app in android emulator.

### Backend
1. Open Backend directory.
2. Paste the model in the directory. **[Model link](https://drive.google.com/file/d/1ab-XmG6NZfxSDH212ndtU3zxOp_kHCqo/view?usp=sharing)**
3. Add your IP to the allowed hosts in /birdi/settings.py as commented in the file itself.
4. type python manage.py runserver your_IP:port (Eg. python manage.py runserver 192.168.1.1:80)


