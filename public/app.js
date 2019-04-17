var app = {};

app.handlers = {};


app.request = function(headers,path,method,queryStringObject,payload,callback){
	headers = typeof(headers) == 'object' && headers !== null ? headers : {};
	path = typeof(path) == 'string' ? path : '/';
	method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method : 'GET';
	queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
	payload = typeof(payload) == 'object' && payload !== null ? payload : {};
	callback = typeof(callback) == 'function' ? callback : false;
	
	var requestUrl = path + '?';
	var counter = 0;

	for(var queryKey in queryStringObject){
		if(queryStringObject.hasOwnProperty(queryKey)){
			counter++;

			if(counter > 1){
				requestUrl += '&';
			}

			requestUrl += queryKey + '=' + queryStringObject[queryKey];
		}
	}

	var xhr = new XMLHttpRequest();
	xhr.open(method, requestUrl, true);
	xhr.setRequestHeader('Content-Type','application/json');

	for(var headerKey in headers){
		if(headers.hasOwnProperty(headerKey)){
			xhr.setRequestHeader(headerKey, headers[headerKey]);
		}
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState == XMLHttpRequest.DONE){
			var statusCode = xhr.status;
			var responseReturned = xhr.responseText;

			if(callback){
				try{
					var parsedResponse = JSON.parse(responseReturned);
					callback(statusCode, parsedResponse);
				} catch(e){
					callback(statusCode,false);
				}
			}
		}
	};

	var payloadString = JSON.stringify(payload);
	xhr.send(payloadString);
};


app.loadDataOnPage = function(){
	var bodyClasses = document.querySelector("body").classList;
	var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;


	if(primaryClass == 'theory_h'){
		app.handlers.theory();
	}
};


app.handlers.theory = function(){
		document.getElementById('navuniv').addEventListener('click', function(e){
			document.getElementsByClassName('theoryv2')[0].style.display = 'block';
			document.getElementsByClassName('theorycalc')[0].style.display = 'none';
			document.getElementsByClassName('theoryuniv')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries1')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries2')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign1')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign2')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2marks')[0].style.display = 'none';
		});

		document.getElementById('navseries1').addEventListener('click', function(e){
			document.getElementsByClassName('theoryv2')[0].style.display = 'none';
			document.getElementsByClassName('theorycalc')[0].style.display = 'none';
			document.getElementsByClassName('theoryuniv')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries1')[0].style.display = 'block';
			document.getElementsByClassName('theoryseries1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries2')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign1')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign2')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2marks')[0].style.display = 'none';
		});

		document.getElementById('navseries2').addEventListener('click', function(e){
			document.getElementsByClassName('theoryv2')[0].style.display = 'none';
			document.getElementsByClassName('theorycalc')[0].style.display = 'none';
			document.getElementsByClassName('theoryuniv')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries1')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries2')[0].style.display = 'block';
			document.getElementsByClassName('theoryseries2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign1')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign2')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2marks')[0].style.display = 'none';
		});

		document.getElementById('navassign1').addEventListener('click', function(e){
			document.getElementsByClassName('theoryv2')[0].style.display = 'none';
			document.getElementsByClassName('theorycalc')[0].style.display = 'none';
			document.getElementsByClassName('theoryuniv')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries1')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries2')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign1')[0].style.display = 'block';
			document.getElementsByClassName('theoryassign1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign2')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2marks')[0].style.display = 'none';
		});

		document.getElementById('navassign2').addEventListener('click', function(e){
			document.getElementsByClassName('theoryv2')[0].style.display = 'none';
			document.getElementsByClassName('theorycalc')[0].style.display = 'none';
			document.getElementsByClassName('theoryuniv')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries1')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryseries2')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign1')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1marks')[0].style.display = 'none';

			document.getElementsByClassName('theoryassign2')[0].style.display = 'block';
			document.getElementsByClassName('theoryassign2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2marks')[0].style.display = 'none';
		});




		document.getElementById('theoryv2n').addEventListener('click', function(e){
			document.getElementsByClassName('theoryv2')[0].style.display = 'none';
			document.getElementsByClassName('theorycalc')[0].style.display = 'block';
		});

		document.getElementById('theorycalcb').addEventListener('click', function(e){
			document.getElementsByClassName('theoryv2')[0].style.display = 'block';
			document.getElementsByClassName('theorycalc')[0].style.display = 'none';
		});

		document.getElementById('theorycalcn').addEventListener('click', function(e){
			document.getElementsByClassName('theorycalc')[0].style.display = 'none';
			document.getElementsByClassName('theoryuniv')[0].style.display = 'block';

			var no_of_students = document.getElementsByClassName('theorycalc')[0].getElementsByTagName('input')[0].value;

			document.getElementsByClassName('tbl')[0].innerHTML = '<tr><th>Sl No</th><th>Roll No</th><th>Name</th><th>Univ Marks</th></tr>'
			for(i=0;i<no_of_students;++i){
				document.getElementsByClassName('tbl')[0].innerHTML += '<tr><td><input type="number" name="slno' + (i + 1) + '" value="' + (i + 1) + '" ></td><td><input type="number" name="rollno' + (i + 1) + '" ></td><td><input type="text" name="name' + (i + 1) + '" ></td><td><input type="number" name="marks' + (i + 1) + '" ></td></tr>'
			}
		});

		document.getElementById('theoryunivb').addEventListener('click', function(e){
			document.getElementsByClassName('theorycalc')[0].style.display = 'block';
			document.getElementsByClassName('theoryuniv')[0].style.display = 'none';
		});

		document.getElementById('theoryunivn').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries1')[0].style.display = 'block';
			document.getElementsByClassName('theoryuniv')[0].style.display = 'none';
		});

		document.getElementById('theoryseries1b').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries1')[0].style.display = 'none';
			document.getElementsByClassName('theoryuniv')[0].style.display = 'block';

			var no_of_students = document.getElementsByClassName('theorycalc')[0].getElementsByTagName('input')[0].value;

			document.getElementsByClassName('tbl')[0].innerHTML = '<tr><th>Sl No</th><th>Roll No</th><th>Name</th><th>Univ Marks</th></tr>'
			for(i=0;i<no_of_students;++i){
				document.getElementsByClassName('tbl')[0].innerHTML += '<tr><td><input type="number" name="slno' + (i + 1) + '" value="' + (i + 1) + '" ></td><td><input type="number" name="rollno' + (i + 1) + '" ></td><td><input type="text" name="name' + (i + 1) + '" ></td><td><input type="number" name="marks' + (i + 1) + '" ></td></tr>'
			}	
		});

		document.getElementById('theoryseries1n').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries1calc')[0].style.display = 'block';
			document.getElementsByClassName('theoryseries1')[0].style.display = 'none';
		});

		document.getElementById('theoryseries1calcn').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1marks')[0].style.display = 'block';

			var no_of_students = document.getElementsByClassName('theoryseries1calc')[0].getElementsByTagName('input')[0].value;
			var serials = ['a','b','c','d'];
			var table = document.getElementsByClassName('theoryseries1marks')[0].getElementsByTagName('table')[0];

			table.innerHTML = '<tr><th>Roll No</th><th width="30%">Name of the student</th><th>Enter marks scored in the examination</th></tr>';

			for(i=0;i<no_of_students;++i){
				var row = table.insertRow(i + 1);
				
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);

				cell1.innerHTML = '<div class="inputWrapper"><input type="number" name="series1marksrollno' + (i + 1) + '"/></div>';
				cell2.innerHTML = '<div class="inputWrapper"><input type="text" name="series1marksname' + (i + 1) + '" /></div>';
				
				var str3 = '<table border="1"><tr><th>div</th><th>&#8544;</th><th>&#8545;</th><th>&#8546;</th><th>&#8547;</th><th>&#8548;</th><th>&#8549;</th><th>&#8550;</th><th>&#8551;</th><th>&#8552;</th><th>&#8553;</th><th>&#8554;</th><th>&#8555;</th></tr>';
				for(idx in serials){
					str3 += '<tr><th>' + serials[idx] + '</th>';					
					for(k=0;k<12;++k){
						str3 += '<td><div class="inputWrapper"><input type="number" name="series1marksmark' + (k + 1) + serials[idx] + (i + 1) + '" /></div></td>';
					}
					str3 += '</tr>';
				}
				cell3.innerHTML = str3;
			}
		});

		document.getElementById('theoryseries1calcb').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1')[0].style.display = 'block';
		});

		document.getElementById('theoryseries1marksn').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries1marks')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2')[0].style.display = 'block';
		});

		document.getElementById('theoryseries1marksb').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries1marks')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1calc')[0].style.display = 'block';
		});



		document.getElementById('theoryseries2b').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries2')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries1marks')[0].style.display = 'block';	
		});

		document.getElementById('theoryseries2n').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries2calc')[0].style.display = 'block';
			document.getElementsByClassName('theoryseries2')[0].style.display = 'none';
		});

		document.getElementById('theoryseries2calcn').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2marks')[0].style.display = 'block';

			var no_of_students = document.getElementsByClassName('theoryseries2calc')[0].getElementsByTagName('input')[0].value;
			var serials = ['a','b','c','d'];
			var table = document.getElementsByClassName('theoryseries2marks')[0].getElementsByTagName('table')[0];

			table.innerHTML = '<tr><th>Roll No</th><th width="30%">Name of the student</th><th>Enter marks scored in the examination</th></tr>';

			for(i=0;i<no_of_students;++i){
				var row = table.insertRow(i + 1);
				
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);

				cell1.innerHTML = '<div class="inputWrapper"><input type="number" name="series2marksrollno' + (i + 1) + '"/></div>';
				cell2.innerHTML = '<div class="inputWrapper"><input type="text" name="series2marksname' + (i + 1) + '" /></div>';
				
				var str3 = '<table border="1"><tr><th>div</th><th>&#8544;</th><th>&#8545;</th><th>&#8546;</th><th>&#8547;</th><th>&#8548;</th><th>&#8549;</th><th>&#8550;</th><th>&#8551;</th><th>&#8552;</th><th>&#8553;</th><th>&#8554;</th><th>&#8555;</th></tr>';
				for(idx in serials){
					str3 += '<tr><th>' + serials[idx] + '</th>';					
					for(k=0;k<12;++k){
						str3 += '<td><div class="inputWrapper"><input type="number" name="series2marksmark' + (k + 1) + serials[idx] + (i + 1) + '" /></div></td>';
					}
					str3 += '</tr>';
				}
				cell3.innerHTML = str3;
			}
		});

		document.getElementById('theoryseries2calcb').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2')[0].style.display = 'block';
		});

		document.getElementById('theoryseries2marksn').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries2marks')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1')[0].style.display = 'block';
		});

		document.getElementById('theoryseries2marksb').addEventListener('click', function(e){
			document.getElementsByClassName('theoryseries2marks')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2calc')[0].style.display = 'block';
		});





		document.getElementById('theoryassign1b').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign1')[0].style.display = 'none';
			document.getElementsByClassName('theoryseries2marks')[0].style.display = 'block';	
		});

		document.getElementById('theoryassign1n').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign1calc')[0].style.display = 'block';
			document.getElementsByClassName('theoryassign1')[0].style.display = 'none';
		});

		document.getElementById('theoryassign1calcn').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1marks')[0].style.display = 'block';

			var no_of_students = document.getElementsByClassName('theoryassign1calc')[0].getElementsByTagName('input')[0].value;
			var serials = ['a'];
			var table = document.getElementsByClassName('theoryassign1marks')[0].getElementsByTagName('table')[0];

			table.innerHTML = '<tr><th>Roll No</th><th width="30%">Name of the student</th><th>Enter marks scored in the examination</th></tr>';

			for(i=0;i<no_of_students;++i){
				var row = table.insertRow(i + 1);
				
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);

				cell1.innerHTML = '<div class="inputWrapper"><input type="number" name="assign1marksrollno' + (i + 1) + '"/></div>';
				cell2.innerHTML = '<div class="inputWrapper"><input type="text" name="assign1marksname' + (i + 1) + '" /></div>';
				
				var str3 = '<table border="1"><tr><th>div</th><th>&#8544;</th><th>&#8545;</th><th>&#8546;</th><th>&#8547;</th><th>&#8548;</th><th>&#8549;</th><th>&#8550;</th><th>&#8551;</th><th>&#8552;</th><th>&#8553;</th><th>&#8554;</th><th>&#8555;</th></tr>';
				for(idx in serials){
					str3 += '<tr><th>' + serials[idx] + '</th>';					
					for(k=0;k<12;++k){
						str3 += '<td><div class="inputWrapper"><input type="number" name="assign1marksmark' + (k + 1) + serials[idx] + (i + 1) + '" /></div></td>';
					}
					str3 += '</tr>';
				}
				cell3.innerHTML = str3;
			}
		});

		document.getElementById('theoryassign1calcb').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign1calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1')[0].style.display = 'block';
		});

		document.getElementById('theoryassign1marksn').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign1marks')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2')[0].style.display = 'block';
		});

		document.getElementById('theoryassign1marksb').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign1marks')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1calc')[0].style.display = 'block';
		});




		document.getElementById('theoryassign2b').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign2')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign1marks')[0].style.display = 'block';	
		});

		document.getElementById('theoryassign2n').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign2calc')[0].style.display = 'block';
			document.getElementsByClassName('theoryassign2')[0].style.display = 'none';
		});

		document.getElementById('theoryassign2calcn').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2marks')[0].style.display = 'block';

			var no_of_students = document.getElementsByClassName('theoryassign2calc')[0].getElementsByTagName('input')[0].value;
			var serials = ['a'];
			var table = document.getElementsByClassName('theoryassign2marks')[0].getElementsByTagName('table')[0];

			table.innerHTML = '<tr><th>Roll No</th><th width="30%">Name of the student</th><th>Enter marks scored in the examination</th></tr>';

			for(i=0;i<no_of_students;++i){
				var row = table.insertRow(i + 1);
				
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);

				cell1.innerHTML = '<div class="inputWrapper"><input type="number" name="assign2marksrollno' + (i + 1) + '"/></div>';
				cell2.innerHTML = '<div class="inputWrapper"><input type="text" name="assign2marksname' + (i + 1) + '" /></div>';
				
				var str3 = '<table border="1"><tr><th>div</th><th>&#8544;</th><th>&#8545;</th><th>&#8546;</th><th>&#8547;</th><th>&#8548;</th><th>&#8549;</th><th>&#8550;</th><th>&#8551;</th><th>&#8552;</th><th>&#8553;</th><th>&#8554;</th><th>&#8555;</th></tr>';
				for(idx in serials){
					str3 += '<tr><th>' + serials[idx] + '</th>';					
					for(k=0;k<12;++k){
						str3 += '<td><div class="inputWrapper"><input type="number" name="assign2marksmark' + (k + 1) + serials[idx] + (i + 1) + '" /></div></td>';
					}
					str3 += '</tr>';
				}
				cell3.innerHTML = str3;
			}
		});

		document.getElementById('theoryassign2calcb').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign2calc')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2')[0].style.display = 'block';
		});

		document.getElementById('theoryassign2marksb').addEventListener('click', function(e){
			document.getElementsByClassName('theoryassign2marks')[0].style.display = 'none';
			document.getElementsByClassName('theoryassign2calc')[0].style.display = 'block';
		});


		document.getElementsByClassName('theorycalc')[0].style.display = 'none';
		document.getElementsByClassName('theoryuniv')[0].style.display = 'none';

		document.getElementsByClassName('theoryseries1')[0].style.display = 'none';
		document.getElementsByClassName('theoryseries1calc')[0].style.display = 'none';
		document.getElementsByClassName('theoryseries1marks')[0].style.display = 'none';

		document.getElementsByClassName('theoryseries2')[0].style.display = 'none';
		document.getElementsByClassName('theoryseries2calc')[0].style.display = 'none';
		document.getElementsByClassName('theoryseries2marks')[0].style.display = 'none';

		document.getElementsByClassName('theoryassign1')[0].style.display = 'none';
		document.getElementsByClassName('theoryassign1calc')[0].style.display = 'none';
		document.getElementsByClassName('theoryassign1marks')[0].style.display = 'none';

		document.getElementsByClassName('theoryassign2')[0].style.display = 'none';
		document.getElementsByClassName('theoryassign2calc')[0].style.display = 'none';
		document.getElementsByClassName('theoryassign2marks')[0].style.display = 'none';
}


app.bindForms = function(){
  if(document.querySelector("form")){
    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();


        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){

            var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            var elementIsChecked = elements[i].checked;

            var nameOfElement = elements[i].name;
            if(nameOfElement == '_method'){
              method = valueOfElement;
            } else {

              if(nameOfElement == 'httpmethod'){
                nameOfElement = 'method';
              }

              if(nameOfElement == 'uid'){
                nameOfElement = 'id';
              }

              if(classOfElement.indexOf('multiselect') > -1){
                if(elementIsChecked){
                  payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                  payload[nameOfElement].push(valueOfElement);
                }
              } else {
                payload[nameOfElement] = valueOfElement;
              }

            }
          }
        }

        console.log(payload);
        var queryStringObject = method == 'DELETE' ? payload : {};

        app.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          if(statusCode !== 200){

            if(statusCode == 403){
 
              //app.logUserOut();

            } else {


              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';


              document.querySelector("#"+formId+" .error").innerHTML = error;


              document.querySelector("#"+formId+" .error").style.display = 'block';
            }
          } else {

            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    }
  }
};

 
app.formResponseProcessor = function(formId, payload, responsePayload){
	/*if(formId == 'theoryv2'){
		localStorage.setItem('info', JSON.stringify(payload));
		window.location = 'theory/indexcalc';
	}
	else if(formId == 'theorycalc'){
		localStorage.setItem('settings', JSON.stringify(payload));
		window.location = 'theory/univ';
	}*/

	if(formId == 'theoryh'){
		
	}
 };


 app.init = function(){
	app.bindForms();
	//app.getSessionStatus();
	//app.bindLogout();
	app.loadDataOnPage();
}


window.onload = function(){
	app.init();
};