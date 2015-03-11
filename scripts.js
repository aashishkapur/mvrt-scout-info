var eventKey = "2015cama"
var tbaID = "115:scouting-teams:v0.2";
var red = [];
var blue = [];

var teams = [];

function Team(teamNum, position)
{
	this.teamNum = teamNum;
	this.position = position;
}


/*

rank
qa
auto
container
coop
litter
tote
played
opr
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
					teams.push(new Team(data[i]["alliances"]["blue"]["teams"][0].substring(3), "blue1"));
					teams.push(new Team(data[i]["alliances"]["blue"]["teams"][1].substring(3), "blue2"));
					teams.push(new Team(data[i]["alliances"]["blue"]["teams"][2].substring(3), "blue3"));

					teams.push(new Team(data[i]["alliances"]["red"]["teams"][0].substring(3), "red1"));
					teams.push(new Team(data[i]["alliances"]["red"]["teams"][1].substring(3), "red2"));
					teams.push(new Team(data[i]["alliances"]["red"]["teams"][2].substring(3), "red3"));
				}
			}

		}
	});
}

function getStats()
{
	$.ajax({
		type:"GET",
		url: "http://www.thebluealliance.com/api/v2/event/" + eventKey + "/stats",
		data: {"X-TBA-App-Id": tbaID},
		dataType: "json",
		async: false,
		success: function(data){
			for(var i = 0; i < teams.length; i++)
			{
				var teamNum = teams[i]["teamNum"];
				teams[i]["opr"] = data["oprs"][teamNum];
			}

		}
	});

}

function getRankingInfo()
{
	$.ajax({
		type:"GET",
		url: "http://www.thebluealliance.com/api/v2/event/" + eventKey + "/rankings",
		data: {"X-TBA-App-Id": tbaID},
		dataType: "json",
		async: false,
		success: function(data){
			for(var i = 0; i < data.length; i++)
			{
				console.log(data[i]);
			}

		}
	});

}
/*

rank
qa
auto
container
coop
litter
tote
played
opr*/

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