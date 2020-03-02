NEIU MeetUp Documentation

Project Description

On-line heat map that represents the congregation of a specified area, students throughout campus and the near-by facilities. The student, through Smartphone, may share her/his location by publishing their gps coordinates onto an MQTT Broker. Based on the aggregate data collected through incoming requests from devices, a document containing distinct coordinates and their frequency are published onto an MQTT Broker for the client to recieve.

Dynamic representation of population density depends on the continuous connection between the individual users and the server that is measured through a finite lapse of time in which the database will verify current connections, update accordingly, and ultimately reflect the data onto the heat map.

Database 

We used MongoDB, a schema-less database to store map coordinates and their corresponding count which, represented the number of individuals at a particular location. Mongoose, a library used to translate information between our run-time environment and our database was used conjunction with MongoDB to to facilitate object representation between NodeJS and MongoDB. The stored information in MongoDB was then retrieved and used to represent the data onto the heat map . NodeJS, a javascript run-time environment was used to develop our server which, listened for incoming requests and reacted accordingly by returning a corresponding response based on the request to the client.