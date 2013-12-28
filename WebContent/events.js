

  	function validateDate(form) { 
  		
  		// regular expression to match required date format 
  		re = /^\d{1,2}\/\d{1,2}\/\d{4}$/; 
   		
  		if(form["date"].value != '' && !form["date"].value.match(re)) { 
  			alert("Invalid date format: " + form["date"].value); 
  			form["date"].focus();
  			
  			return false;
  		} 
  		else {
  			//parse the date to month, day and year
  			var monthfield=parseInt(form["date"].value.split("/")[0]);
        	var dayfield=parseInt(form["date"].value.split("/")[1]);
        	var yearfield=parseInt(form["date"].value.split("/")[2]);
  			console.log(yearfield, monthfield, dayfield);
  		// Create list of days of a month [assume there is no leap year by default]  
  		  var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];  
  		  if (monthfield==1 || monthfield>2)  {  
  		  	if (dayfield>ListofDays[monthfield-1])  {  
  		  		alert('Invalid date!');
  		  		form["date"].focus();
  		  		return false;  
  		  	}  
  		  }  
  		  if (monthfield==2)  {  
  		  	var lyear = false;  
  		  	if ( (!(yearfield % 4) && yearfield % 100) || !(yearfield % 400))  {  
  		  		lyear = true;  
  		  	}  
  		  	if ((lyear==false) && (dayfield>=29)) {  
  		  		alert('Invalid date! Not a leap year.');
  		  		form["date"].focus();
  		  		return false;  
  		  	}  
  		  	if ((lyear==true) && (dayfield>29)) {  
  		  		alert('Invalid date! Too many days in February');
  		  		form["date"].focus();
  		  		return false;  
  		  	}  
  		  }    
  		  if (monthfield>12) {
  			  alert('Invalid month!');
  			  form["date"].focus();
  			  return false;
  		  }  
  		
  		return true;
    	} 
  	}	
  	
	
	  
	
	  function validateHours(form) { 
  		
  		// regular expression to match required date format 
  		re = /^-{0,1}\d*\.{0,1}\d+$/; 
  	
  		
  		if(form["hours"].value != '' && !form["hours"].value.match(re)) { 
  			//alert(form["hours"].value);
  			alert("Invalid hours format: " + form["hours"].value); 
  			form["hours"].focus(); 
  			return false; 
  		} 
  		return true;
    } 

	  

	  function cleanseNotes(notesValue) { 
  		
  		var goodQuotes = notesValue
  			.replace(/[“]/g,"\"")
  			.replace(/[”]/g,"\"")
  			.replace(/[‘]/g,"\'")
  			.replace(/[’]/g,"\'");
   		 
  		return goodQuotes;
	  }
	
	   	
    
      	function createOrUpdateDone() {
      		
      		var notesValue = document.forms["EVENT"]["notes"].value;
      		var hoursValue = document.forms["EVENT"]["hours"].value;
      		var dateValue = document.forms["EVENT"]["date"].value;
      		var projectValue = document.forms["EVENT"]["project"].value;
      		var gkeyValue = document.forms["EVENT"]["gkey"].value;
      		var updateInfo = new Array();
      		
     
      		if (hoursValue ==""){
    	 		alert("Please enter number of hours");
    	 		document.forms["EVENT"]["hours"].focus();
    	 	}
      		
      		else if (dateValue == "") { // use () around boolean test; check for "" and not null
    	 		alert("Please enter a date" );
    	 		document.forms["EVENT"]["date"].focus();
    	 	}
    	 	else if (dateValue != "" && hoursValue!= ""){

    	 		if (validateDate(document.forms["EVENT"]) && validateHours(document.forms["EVENT"])) {
					var testNotes=notesValue;
    	 			notesValue = cleanseNotes(testNotes);
    	 			updateInfo[0] = {field:'notes', value:notesValue};
    	      		updateInfo[1] = {field:'hours', value:hoursValue};
    	      		updateInfo[2] = {field:'date', value:dateValue};
    	      		updateInfo[3] = {field:'project', value:projectValue};
    	      		if (gkeyValue != "") {
    	          		updateInfo[3] = {field:'gkey', value:gkeyValue};
    	      			}
    	
    	      		var eventResult = domainEntityCrud.createOrUpdateDomainEntity('PJIEventsFrontServlet', 'Event', updateInfo);
    	      		window.location.href="index.html";
    	 		}
    	 	}
      	}
      	

  	  
	
      	function createOrUpdateContinue() {
      		
      		var notesValue = document.forms["EVENT"]["notes"].value;
      		var hoursValue = document.forms["EVENT"]["hours"].value;
      		var dateValue = document.forms["EVENT"]["date"].value;
      		var projectValue = document.forms["EVENT"]["project"].value;
      		var gkeyValue = document.forms["EVENT"]["gkey"].value;
      		var updateInfo = new Array();
      		
     
      		if (hoursValue ==""){
    	 		alert("Please enter number of hours");
    	 		document.forms["EVENT"]["hours"].focus();
    	 	}
      		
      		else if (dateValue == "") { // use () around boolean test; check for "" and not null
    	 		alert("Please enter a date" );
    	 		document.forms["EVENT"]["date"].focus();
    	 	}
    	 	else if (dateValue != "" && hoursValue!= ""){

    	 		if (validateDate(document.forms["EVENT"]) && validateHours(document.forms["EVENT"])) {
    	 			
    	 			var testNotes=notesValue;
    	 			notesValue = cleanseNotes(testNotes);
    	 			
    	 			updateInfo[0] = {field:'notes', value:notesValue};
    	      		updateInfo[1] = {field:'hours', value:hoursValue};
    	      		updateInfo[2] = {field:'date', value:dateValue};
    	      		updateInfo[3] = {field:'project', value:projectValue};
    	      		if (gkeyValue != "") {
    	          		updateInfo[3] = {field:'gkey', value:gkeyValue};
    	      			}
    	      		gkeyValue = domainEntityCrud.createOrUpdateDomainEntity('PJIEventsFrontServlet', 'Event', updateInfo);
    	      		
    	      		//Clear event window
    	      		//notesValue = "";
    	      		//hoursValue="";
    	      		//dateValue="";
    	      		//projectValue="";
    	      		//gkeyValue = "";
    	      		window.location.href="event.html?gkey="+ gkeyValue;
    	 		}
    	 	}
      	}
      	
  



      	function createOrUpdateNew() {
      	
      		var notesValue = document.forms["EVENT"]["notes"].value;
      		var hoursValue = document.forms["EVENT"]["hours"].value;
      		var dateValue = document.forms["EVENT"]["date"].value;
      		var projectValue = document.forms["EVENT"]["project"].value;
      		var gkeyValue = document.forms["EVENT"]["gkey"].value;
      		var updateInfo = new Array();
      		
     
      		if (hoursValue ==""){
    	 		alert("Please enter number of hours");
    	 		document.forms["EVENT"]["hours"].focus();
    	 	}
      		
      		else if (dateValue == "") { // use () around boolean test; check for "" and not null
    	 		alert("Please enter a date" );
    	 		document.forms["EVENT"]["date"].focus();
    	 	}
    	 	else if (dateValue != "" && hoursValue!= ""){
    	 		
    	 		if (validateDate(document.forms["EVENT"]) && validateHours(document.forms["EVENT"])) {
    	 			
    	 			var testNotes=notesValue;
    	 			notesValue = cleanseNotes(testNotes);
    	 			
    	 			updateInfo[0] = {field:'notes', value:notesValue};
    	      		updateInfo[1] = {field:'hours', value:hoursValue};
    	      		updateInfo[2] = {field:'date', value:dateValue};
    	      		updateInfo[3] = {field:'project', value:projectValue};
    	      		if (gkeyValue != "") {
    	          		updateInfo[3] = {field:'gkey', value:gkeyValue};
    	      			}
    	      		gkeyValue = domainEntityCrud.createOrUpdateDomainEntity('PJIEventsFrontServlet', 'Event', updateInfo);
    	      		
    	      		//Clear event window
    	      		notesValue = "";
    	      		hoursValue="";
    	      		dateValue="";
    	      		projectValue="";
    	      		gkeyValue = "";
    	      		window.location.href="event.html";
    	 		}
    	 	}
      	}
      	
  	 
	  
      	function search() {
      		
      		notesValue = document.forms["EVENT"]["notes"].value;
      		hoursValue = document.forms["EVENT"]["hours"].value;
      		dateValue = document.forms["EVENT"]["date"].value;
      		projectValue = document.forms["EVENT"]["project"].value;
      		gkeyValue = document.forms["EVENT"]["gkey"].value;
      		
      		var searchInfo = new Array();
      		var i = -1;
      		if (notesValue != "") {
          		i++;
          		searchInfo[i] = {field:'notes', value:notesValue};
      		}
      		if (hoursValue != "") {
          		i++;
          		searchInfo[i] = {field:'hours', value:hoursValue};
      		}
      		if (dateValue != "") {
          		i++;
          		searchInfo[i] = {field:'date', value:dateValue};
      		}
      		if (projectValue != "") {
          		i++;
          		searchInfo[i] = {field:'project', value:projectValue};
      		}
      		/*
      		if (gkeyValue != "") {
          		i++;
          		searchInfo[i] = {field:'gkey', value:gkeyValue};
      		}
      		*/
      		
      		if (i > -1) {
          		var displayInfo = new Array();
    			displayInfo[0] = "notes";
    			displayInfo[1] = "hours";
    			displayInfo[2] = "date";
    			displayInfo[3] = "gkey";
    			displayInfo[4] = "project";
          		
          		var itemsArray = domainEntityCrud.getMatchingDomainEntities("PJIEventsFrontServlet", "Event", searchInfo, displayInfo);	

          		var query = "?";
          		for (i=0; i < searchInfo.length; i++) {
          			if (i > 0) {
          				query = query + "&";
          			}
          			query = query + searchInfo[i].field + "=" + searchInfo[i].value;
          		}
                window.location.href="index.html" + query;
      		}
      		else {
      			alert("No matches found.");
      			}
      		}
      	
      
	
	  
	 
	  	function goToList() {
	  		window.location.href="index.html";
	  	}
	  
	  	
	  
	  	function clearForm(){
	  		document.forms["EVENT"].reset();
	  	}
	  	
	  	function preferenceBuilder(){
	  		//allow user to enter default project title when creating new event
	  	}
	  	

	  
