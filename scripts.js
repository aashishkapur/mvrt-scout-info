var eventKey = "2015cama"
var tbaID = "115:scouting-teams:v0.2";
var red = [];
var blue = [];

var teams = [];

function Team(teamNum, position)
{
	this.teamNum = parseInt(teamNum);
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
				for(var j = 0; j < teams.length; j++)
				{
					// console.log(data[i][1]);

					if(data[i][1] == teams[j]["teamNum"])
					{
						// console.log(data[i][1]);
						teams[j]["rank"] = data[i][0];
						teams[j]["qa"] = data[i][2];
						teams[j]["auto"] = data[i][3];
						teams[j]["container"] = data[i][4];
						teams[j]["coop"] = data[i][5];
						teams[j]["litter"] = data[i][6];
						teams[j]["tote"] = data[i][7];
						teams[j]["played"] = data[i][8];
						console.log(teams[j]);

					}
				}

			}

		}
	});

}
/*
	0 		1 		2 			3 		4 				5 			6			7 		8  	
["Rank", "Team", "Qual Avg", "Auto", "Container", "Coopertition", "Litter", "Tote", "Played"]
rank
qa
auto
container
coop
litter
tote
played
opr*/

/*
			<td id="blue1-teamNum">115</td>
			<td id="blue1-rank">1</td>
			<td id="blue1-qa">100.00</td>
			<td id="blue1-auto">100</td>
			<td id="blue1-container">100</td>
			<td id="blue1-coop">100</td>
			<td id="blue1-litter">100</td>
			<td id="blue1-tote">100</td>
			<td id="blue1-played">100</td>
			<td id="blue1-opr">100.3232</td>

*/

function writeData()
{
	for(var i = 0; i < teams.length; i++)
	{
		// console.log(i);
		var position = teams[i]["position"];
		console.log(position + "  " + teams[i]["teamNum"]);
		$("#" + position + "-teamNum").text(teams[i]["teamNum"]);
		$("#" + position + "-rank").text(teams[i]["rank"]);
		$("#" + position + "-qa").text(teams[i]["qa"]);
		$("#" + position + "-auto").text(teams[i]["auto"]);
		$("#" + position + "-container").text(teams[i]["container"]);
		$("#" + position + "-coop").text(teams[i]["coop"]);
		$("#" + position + "-litter").text(teams[i]["litter"]);
		$("#" + position + "-tote").text(teams[i]["tote"]);
		$("#" + position + "-played").text(teams[i]["played"]);
		$("#" + position + "-opr").text(teams[i]["opr"]);
	}
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
			getRankingInfo();
			writeData();
		}
	});




});