# cege0043-apps-template
Question Setting App

This is a technical guide for Question Setting App. The app functions as a location-based system which allows user to input questions and several candidate answers for options. The primary aim of the app is to allow user to add questions based on coordinates. The location information (latitude and longitude) can be stored by clicking on the map. Secondly, the app also allows user to monitor app information by retrieving data from database.

Table of Content

- Systems Requirement
- Deployment
- Testing
- File Description
- Code Reference

## Getting Started

**System Requirement**

- In order to run the app, the browser that the user is using must allow geolocation function and doesn&#39;t block https function. The app will track user location and zoom to the area. During the testing, the app has been tested successfully under Chrome, Safari and Microsoft Edge environment. The version of each system is Chrome (81.0.4044.92), Safari (13) and Edge (44.17763.831.0).
- For system connection, the app is required to stay connected with UCL VPN (vpn.ucl.ac.uk) all the time. Official Instruction from UCL is provided below:
 MacOS: [https://www.ucl.ac.uk/isd/how-to/connecting-to-ucl-vpn-macos](https://www.ucl.ac.uk/isd/how-to/connecting-to-ucl-vpn-macos)
 Windows: [https://www.ucl.ac.uk/isd/how-to/connecting-to-ucl-vpn-microsoft-windows](https://www.ucl.ac.uk/isd/how-to/connecting-to-ucl-vpn-microsoft-windows)
- For question setting app, the system also requires user to connect ubuntu server by using BitVise or any other applications that can connect.

**Deployment**

In order to run the app on ubuntu server, user needs to clone the GitHub repository to code folder under CEGE server (path: studentuser/code). Use &quot;cd&quot; command to navigate to the folder.

1. Clone apps file to the folder:

Location: (studentuser@cegeg077-HVM-domU:~/code)

>> git clone [https://github.com/ucl-geospatial/cege0043-apps-ucessie.git](https://github.com/ucl-geospatial/cege0043-apps-ucessie.git)

2. Clone the dataAPI file to the folder:

Location: (studentuser@cegeg077-HVM-domU:~/code)

>> git clone [https://github.com/ucl-geospatial/cege0043-data-api-ucessie.git](https://github.com/ucl-geospatial/cege0043-data-api-ucessie.git)

3. Navigate to cege0043-apps-ucessie folder and use pm2 command to start the app.

Location: (studentuser@cegeg077-HVM-domU:~/code/ cege0043-apps-ucessie)

>> pm2 start app.js

4. Navigate to cege0043-data-api-ucessie folder and user pm2 command to start the dataAPI server

Location: (studentuser@cegeg077-HVM-domU:~/code/cege0043-data-api-ucessie)

>> pm2 start dataAPI.js

5. If any error occurs during the operation. User may switch to debug mode to see detail error message. Navigate to the cege0043-data-api-ucessie folder, and type in following command.

Location: (studentuser@cegeg077-HVM-domU:~/code/cege0043-data-api-ucessie)

>> node dataAPI.js

**Testing**

After the prerequisite is accomplished, the user may try the following steps to test the functions of the app.

1. Always keep connected to UCL VPN.
2. Make sure the ubuntu server is operating (pm2 mode or debug mode).
3. User can open any browser that supports geolocation functions and http connection. The user is recommend using the browser mentioned above. Then type in the follow URL to start the question app.

[https://developer.cege.ucl.ac.uk:31071/main.html#](https://developer.cege.ucl.ac.uk:31071/main.html)

4. While the user is testing the functions of the app, it is recommended that user also opens the developer tools and use the console tab to keep track of the app.

**File Description**

The files that are relevant to the question setting app is all provided on GitHub with several sub folders.

1. **cege0043-apps-ucessie**

**Main folder:**

- main.html

| tag | id | desciption |
| --- | --- | --- |
| div | Content wrapper | This section holds the main content/ leaflet map. |
| button | loadformdata | Load the question layer and insert on the main map. |
|| removeformdata | Remove the question layer. |
|| Delete record | Insert ID and port ID can remove the question inserted previously. |
|| startUpload | Once the question and detail are entered, then the user click on the button will upload the question to the database. |
|| getLocation | Get your current location and display below by lat and lon. Meanwhile, it will automatically load 5 nearest questions around the user. |
| a | Help documentation | Navigate user to help page. |
|| App Statistic | Navigate user to statistic summary of question app. |
| p | Timer | Get the current time. |
| | User\_id | Get the user id and display on the bottom. |

- statistic.html

| Display content ID | description |
| --- | --- |
| Top 5 Ranking participants | Load the top 5 ranking user in a table. |
| Daily participation (current user) | Display current user participation (correct answered and total question answered) in histogram. |
| Daily participation(all user) | Display current user participation (correct answered and total question answered) in histogram. |
| Question table of current user | Display all the question current user have inserted to database in a table. |
| Question table added last week | Display all the question added by all users last week in a table. |

- help.html
- statistic\_user.html

| Display Content ID | Description |
| --- | --- |
| Corrected Answer | Display the number of questions that the user has answered correct so far. |
| Current Rank | Display the Ranking of the user. |
| Top 5 Ranking participants | Load the top 5 ranking user in a table. |

- help\_user.html

**Sub folder:**

js:

- loadBasemap.js

| Function | Description |
| --- | --- |
| onMapClick | The functions will pop up a location marker that include location information in latitude and longitude of the location user has clicked. |
| trackLocation() | This function will track user location and continue updating while the app is working.An error message will popup if the browser doesn&#39;t support the geolocation function. |
| showPosition() | Holds the position data from trackLocation function and display on the main page.Also, this function will set the current user position to the center of the map. |
| loadLeafletMap() | This function will load the OpenStreetMap (OSM) to the content wrapper on the main page. |

- utilities.js

| Function | Description |
| --- | --- |
| getPorts() | The function will automatically detect the user port id (both API and App). This function forms the fundamental element of the app. |

- upload\_question.js

| Function | Description |
| --- | --- |
| startDataUpload() | This function collects and organize the data user has inserted to create question and pass it to processData() function. |
| processData() | The function takes the organized data string and create a POST request to the database |
| deleteRecord() | This function allows user to delete question that already exist by inserting question id. |

- popForm.js

| Function | Description |
| --- | --- |
| loadFormData() | This function will display the all the question that are currently in the database as a question layer on leaflet map. |
| checkedAnswer() | The function will review the checked answer of the question and determine whether it is correct or not. Then the function will send a POST request to the database and store the record. |

- testResponse.js

| Function | Description |
| --- | --- |
| calculateNearest() | This function creates a POST request to database with the current user position. Then, pass the result to the drawNearest function to display the result on the map. |
| drawNearest() | This function takes the result of the POST request and display the question marker on question layer which further display on the map. |

- drawGraph.js

| Function | Description |
| --- | --- |
| getMyParticipate() | The function is the get request to retrieve user participation |
| loadMyPart() | The function is used to display user daily participate rate and uses D3 to draw a histogram in the statistic page. |
| getAllParticipate() | The function is the get request to retrieve All user participation in the database. |
| loadAllPart() | The function is used to display all user daily participate rate and uses D3 to draw a histogram in the statistic page. |

- drawTable.js

| Function | Description |
| --- | --- |
| getHighFive() | Get request of Top five participants in the database. |
| loadHighFive() | The functions take the result of Top five participants and display it in a data table using D3. |
| getQuestionTable() | Get request of the total question created by current user in the database. |
| loadQuestion() | The functions take the result and display it as a question data table using D3. |
| getLastweekTable() | Get request of all the questions added in the database by all user. |
| loadLastweek() | The functions take the result and display it as a question data table using D3. |
| getDiffFiveTable() | Get the table of five most difficult questions in the database and display. |

- userInfo.js

| Function | Description |
| --- | --- |
| getCorrectAnswer() | The function returns the number of question that the user has answered correctly. |
| getQuizRanking() | The function returns the ranking of the current user comparing to all the participants in the database. |

css: The folder contains the formatting style applies in bootstrap.

- sb-admin-2.css

res: The folder contains the file that to retrieve the port number of current users.

- ports.xml

img: The folder contains the images used in the help page.



**Code Reference**

- The majority of the code is adapted from CEGE0043 Web and Mobile GIS course material provided by Claire including:
 - Basic bootstrap template of main.html
 - Various functions such as utilities.js get port id function, SQL queries, crud.js insert and delete function, draw graph function etc.
 - Useful practical materials and detail documentation.
- The D3 graph and table is references the example from d3noob.

bar graph: [https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4](https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4)

- The D3 table creation is adapted from [https://gist.github.com/jfreels/6734025](https://gist.github.com/jfreels/6734025)
- The map function is adapted from Leaflet map and OpenStreetMap.
- The word documentation is used the Markdown Converter https://word2md.com/
