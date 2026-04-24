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
            totalPoints: 0,
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
            totalPoints: 0,
        }
    }
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
  const result = simulateGame(teams.SF, teams.LA);

  document.getElementById("output").innerHTML = `
    Winner: ${result.winner} <br>
    ${result.homeTeam.attributes.name} (${result.homeTeam.stats.wins} - ${result.homeTeam.stats.losses}): ${result.homeScore} <br>
    ${result.awayTeam.attributes.name} (${result.awayTeam.stats.wins} - ${result.awayTeam.stats.losses}): ${result.awayScore} <br>
  `;
});