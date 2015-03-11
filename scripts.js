var eventKey = "2015cama"
var tbaID = "115:scouting-teams:v0.2";
var red = [];
var blue = [];

var teams = [];

function Team(teamNum)
{
	this.teamNum = teamNum;
}


/*
			<th>Team Number</th>
			<th>Rank</th>
			<th>Qual Avg</th>
			<th>Auto</th>
			<th>Container</th>
			<th>Coop</th>
			<th>Litter</th>
			<th>Tote</th>
			<th>Played</th>
			<th>OPR</th>

*/

function getData(matchNum)
{
	$.ajax({
		type:"GET",
		url: "http://www.thebluealliance.com/api/v2/event/" + eventKey + "/matches",
		data: {"X-TBA-App-Id": tbaID},
		dataType: "json",
		async: false,
		success: function(data){
			for(var i = 0; i < data.length; i++)
			{
				if(data[i]["comp_level"] == "qm" && data[i]["match_number"] == matchNum)
				{
					console.log(data[i]);
					blue[0] = data[i]["alliances"]["blue"]["teams"][0].substring(3);
					blue[1] = data[i]["alliances"]["blue"]["teams"][1].substring(3);
					blue[2] = data[i]["alliances"]["blue"]["teams"][2].substring(3);

					red[0] = data[i]["alliances"]["red"]["teams"][0].substring(3);
					red[1] = data[i]["alliances"]["red"]["teams"][1].substring(3);
					red[2] = data[i]["alliances"]["red"]["teams"][2].substring(3);
				}
			}

		}
	});
}

function getStats()
{

}



$(document).ready(function() {

	$("#submit").click(function(e){
		e.preventDefault();
		if($("#matchNum").val() === "")
			alert("please enter the match number");
		else
		{
			getData(parseInt($("#matchNum").val()));
			getStats();
		}
	});




});