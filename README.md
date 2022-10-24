# RTOS_example

 The goal of this web application is to time with high accuracy the time taken by a person to run a certain distance.

 Two devices are needed: the first one will give the start to the runner while the other one will detect the passage to the arrival line. An initial synchronization phase is required

 The passage of the runner is detected with a motion detection system, implemented using the camera of the device. The application constantly compares the frames in the stream arriving from the camera. The system calculates the average value of the central column of pixels of each image and compares it with the previous one. When the difference is greater than a certain threshold, a movement is detected.

 The system works on the assumption that the vriation of latency for the connection to the server from the two devices does not exceed a range of few milliseconds

This application has been deployed on a Heroku server and can be tested at the following link: [VirgilianoTime](https://fathomless-plains-73904.herokuapp.com/)

I am currently developing this application in Android Studio
