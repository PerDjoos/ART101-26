const teams = {
    SF: {
        attributes: {
            name: "SF",
            maxPoints: 150,
            minPoints: 100,
            maxDefense: 30,
            minDefense: 5
        },
        stats: {
            wins: 0,
            losses: 0,
            totalSeasonPoints: 0,
            totalSeasonPointsAllowed: 0,
            gamesPlayed: 0
        },
    },
    LA: {
        attributes: {
            name: "LA",
            maxPoints: 150,
            minPoints: 100,
            maxDefense: 30,
            minDefense: 5
        },
        stats: {
            wins: 0,
            losses: 0,
            totalSeasonPoints: 0,
            totalSeasonPointsAllowed: 0,
            gamesPlayed: 0
        }
    }
}

const seasons = {
    currentDay: 0,
}

function CalculateScores(homeTeam, awayTeam) {
    let homePoints = randomBetween(homeTeam.attributes.minPoints, homeTeam.attributes.maxPoints)
    let awayPoints = randomBetween(awayTeam.attributes.minPoints, awayTeam.attributes.maxPoints)
    let homeDefensePts = randomBetween(homeTeam.attributes.minDefense, homeTeam.attributes.maxDefense)
    let awayDefensePts = randomBetween(awayTeam.attributes.minDefense, awayTeam.attributes.maxDefense)
    let homeScore = homePoints - awayDefensePts
    let awayScore = awayPoints - homeDefensePts
    return {
        homeTeam : homeTeam,
        awayTeam : awayTeam,
        homeScore: homeScore,
        awayScore: awayScore
    }
    
}

function simulateGame(homeTeam, awayTeam) {
    const scores = CalculateScores(homeTeam, awayTeam)
    let winner = scores.homeScore > scores.awayScore ? homeTeam : awayTeam
    if (winner.attributes.name == homeTeam.attributes.name) {
        homeTeam.stats.wins += 1;
        awayTeam.stats.losses += 1;
    }
    else {
        homeTeam.stats.losses += 1;
        awayTeam.stats.wins += 1;
    }
    homeTeam.stats.totalSeasonPoints += scores.homeScore
    awayTeam.stats.totalSeasonPoints += scores.awayScore
    homeTeam.stats.gamesPlayed += 1
    awayTeam.stats.gamesPlayed += 1
    return {
    homeTeam : homeTeam,
    awayTeam : awayTeam,
    homeScore: scores.homeScore,
    awayScore: scores.awayScore,
    winner: winner.attributes.name
    };
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("playBtn").addEventListener("click", () => {
    seasons.currentDay += 1    
    document.querySelector(".seasons").textContent = `day: ${seasons.currentDay}`;
    
    const result = simulateGame(teams.SF, teams.LA);
  document.getElementById("output").innerHTML = `<div id="ui">
  <div class="team">${result.homeTeam.attributes.name} (${result.homeTeam.stats.wins} - ${result.homeTeam.stats.losses}): ${result.homeScore} <br>
  avg points: ${Math.round(result.homeTeam.stats.totalSeasonPoints / result.homeTeam.stats.gamesPlayed)} </div><br>
  <div id="game-results">Winner: ${result.winner} </div><br>
    <div class="team">${result.awayTeam.attributes.name} (${result.awayTeam.stats.wins} - ${result.awayTeam.stats.losses}): ${result.awayScore} <br>
    avg points: ${Math.round(result.awayTeam.stats.totalSeasonPoints / result.awayTeam.stats.gamesPlayed)} </div><br>
  </div>`;
});