var eventKey = "2015cama"
var tbaID = "115:scouting-teams:v0.2";
var teams = [];

function getData(matchNum)
{
	$.ajax({
		type:"POST",
		url: "http://www.thebluealliance.com/api/v2/event/" + eventKey + "/matches",
		data: {"X-TBA-App-Id": tbaID},
		dataType: "json",
		success: function(data){
			for(var i = 0; i < data.length; i++)
			{
				console.log(data[i]);
			}

		}
	});
}

$(document).ready(function() {

	$("#submit").click(function(e){
		e.preventDefault();
		if($("#matchNum").val() === "")
			alert("please enter the match number");
		else
			getData(parseInt($("#matchNum").val()));
	});




});