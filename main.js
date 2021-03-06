const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

const ws = new WebSocket('ws://localhost:8080');
var value_cookie = readCookie("token");
/**
* When authenticating or registering a user on the site, he is given a token, which is stored in cookies.
* The readCookie () function receives the user's cookies as an input, then takes the desired value from the cookie at the "token" address and returns it.
* In case the token is not found, the function returns null.
*
*@param {string} Cookie - cookies received
*@returns {string} token value
*/
      function readCookie(Cookie) {
      	var name_cook = Cookie+"=";
      	var spl = document.cookie.split(";");

        for(var i = 0; i < spl.length; i++) {
        	var c = spl[i];
        	while(c.charAt(0) == " ") {
        		c = c.substring(1, c.length);
        	}

        	if(c.indexOf(name_cook) == 0) {
                tok =  c.substring(name_cook.length, c.length);
        		return tok;
        	}
        }
        return null;
    }
/**
* A function that sets the current status of the connection to the server.
* Status is displayed on the users chat page.
*
*@param {string} value - server connection status
*/
    function setStatus(value){
    	status.innerHTML = value;
    }
/**
* A function that receives a message from the server and prints it on the users page.
* The server does forwarding messages to all connected clients, in case it receives a message from someone.
*
*@param {string} value - received response from server.
*@returns {string} message that was received in the response from the server.
*/
    function printMessage(value){
    	const li = document.createElement('li');
    	li.innerHTML = value;
        messages.appendChild(li);
    }

    var words = ["Exit", "exit", "Q", "Quit", "q", "quit", "Out", "out"];
    var bot = ["!новости", "!Новости", "!News", "!news"];
    var point = '';
/**
* A function that monitors the actions of the user, and if the event 'submit' occurs, then the user should receive a message at the input.
* Then, if the keyword "exit" was entered, the function erases cookies and redirects the user to index.php
* If the keyword "! News" was entered, the function returns a news line and sends it to the server, but in json format.
* If plain text was entered, the function sends it to the server in json format.
*
*@param {string} input - user entered message.
*/

function listen(input){

    for(i=0; i<words.length; i++){
            if(input == words[i]){
                point = input;
                point = JSON.stringify({"token": value_cookie, "text": point});
                ws.send(point);
                location.replace("/Four/index.php");
                return 0;
            }else if(input == bot[i]){
                let news = 'news';

                $.ajax({
                    url: "bot/parser.php",
                    method: "POST",
                    contentType: 'application/json',
                    data: JSON.stringify({"text": news}),
                    success: function(data){
                        data = JSON.parse(data);
                        point = 'Полученные новости: ' + '</br>';
                        for (i = 1; i<11; i++){
                            point += i + '. ' + data[i] + '.' + '</br>';
                        }

                        point = JSON.stringify({"token": value_cookie, "text": point});
                        ws.send(point);
                        point = '';
                        input = '';
                    }
                });
                return 0;
            }
        }

        point = input;     
        point = JSON.stringify({"token": value_cookie, "text": point});
        ws.send(point);      
        input = '';
        point = '';
}


    form.addEventListener('submit', function(event){
    	event.preventDefault();
    	input.value.trim();
        listen(input.value);
        input.value = '';
        });      
/**
* If a connection to the server via web sockets has been established, the setStatus () method will be called and pass the 'ONLINE' parameter.
*/
    ws.onopen = () => setStatus('ONLINE');
/**
* If the connection to the server via web sockets was disconnected, the setStatus () method will be called and will pass the 'DISCONNECTED' parameter.
*/
    ws.onclose = () => setStatus('DISCONNECTED');
/**
* If a message was received from the server via web sockets, the printMessage () method will be called and will transmit the received data from the server to it.
*/
    ws.onmessage = response => printMessage(response.data);
