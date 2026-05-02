const teams = {
    SF: {
        name: "Warriors",
        G: {
            attributes: {
                name: "Curry",
                threePoint: 1,
                twoPoint: 0.75,
                contest: 0.3,
                threePreference: .65,
                shotShare: 0.6,
            },
            stats: {
                ppg: 0,
                points: 0,
                shots: 0,
                makes: 0,
        },},
        F: {
            attributes: {
                name: "Butler",
                threePoint: .5,
                twoPoint: 0.75,
                contest: 0.75,
                threePreference: .3,
                shotShare: 0.4,
            }, 
            stats: {
                ppg: 0,
                points: 0,
                shots: 0,
                makes: 0,
            },
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
        name: "Lakers",
        G: {
            attributes: {
                name: "Doncic",
                threePoint: .95,
                twoPoint: 0.8,
                contest: 0.2,
                threePreference: .6,
                shotShare: 0.65
            },
            stats: {
                ppg: 0,
                points: 0,
                shots: 0,
                makes: 0,
            },},
        F: {
            attributes: {
                name: "James",
                threePoint: 0.55,
                twoPoint: 0.75,
                contest: 0.7,
                threePreference: .45,
                shotShare: 0.35,
            },
            stats: {
                ppg: 0,
                points: 0,
                shots: 0,
                makes: 0,
            },},
        stats: {
            wins: 0,
            losses: 0,
            totalSeasonPoints: 0,
            totalSeasonPointsAllowed: 0,
            gamesPlayed: 0
            },
    },
}

const seasons = {
    currentDay: 0,
    games: {

    }
}

function CalculateScores(homeTeam, awayTeam) {
    let homeScore = 0
    let awayScore = 0
    for (let i = 0; i < 89; i++) {
        if (isEven(i)) {
            const shooter = designateShooter(homeTeam);
            const defender = designateDefender(awayTeam, shooter.position);

            const shotAttempt = rollThreePointProbability(shooter.attributes)
                ? CalculateThreePointShot(shooter.attributes, defender)
                : CalculateTwoPointShot(shooter.attributes, defender);

            homeScore += shotAttempt.points;
            shooter.stats.points += shotAttempt.points;
            shooter.stats.shots += 1;
            if (shotAttempt.make) {shooter.stats.makes += 1}

        } else {
            const shooter = designateShooter(awayTeam);
            const defender = designateDefender(homeTeam, shooter.position);

            const shotAttempt = rollThreePointProbability(shooter.attributes)
                ? CalculateThreePointShot(shooter.attributes, defender)
                : CalculateTwoPointShot(shooter.attributes, defender);

            awayScore += shotAttempt.points;
            shooter.stats.points += shotAttempt.points;
            shooter.stats.shots += 1;
            if (shotAttempt.make) {shooter.stats.makes += 1}
        }
    }

    return {
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeScore: homeScore,
        awayScore: awayScore,
    }
    
}

function designateDefender(defendingTeam, offenderPosition){
    return defendingTeam[offenderPosition].attributes
}

function designateShooter(team){
    const players = Object.entries(team).filter(
        ([key, value]) => value && value.attributes
    );

    const roll = Math.random();
    let runningTotal = 0;

    for (const [position, player] of players){
        runningTotal += player.attributes.shotShare;
        if (roll < runningTotal){
            return {position, attributes: player.attributes, stats: player.stats}
        }
    }
}

function rollThreePointProbability(player){
    if (Math.random() * player.threePreference > Math.random()){
        return true;
    } else {
        return false;
    }
}

function CalculateThreePointShot(shooter, defender) {
    if (Math.random() * shooter.threePoint > Math.random() * defender.contest) {
        return {points: 3, make: true};
    } else {
        return {points: 0, make: false}
    }
}

function CalculateTwoPointShot(shooter, defender) {
    if (Math.random() * shooter.twoPoint > Math.random() * defender.contest){
        return {points: 2, make: true};
    } else {
        return {points: 0, make: false};
    }
}

function resetGameScoreStats(team){
    const players = Object.values(team).filter(
        value => value && value.attributes
    )
    for (player of players){
        player.stats.points = 0;
        player.stats.shots = 0;
        player.stats.makes = 0;
    }
}

function simulateGame(homeTeam, awayTeam) {
    resetGameScoreStats(homeTeam)
    resetGameScoreStats(awayTeam)
    const scores = CalculateScores(homeTeam, awayTeam)
    let winner = scores.homeScore > scores.awayScore ? homeTeam : awayTeam
    if (winner.name == homeTeam.name) {
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
    winner: winner.name
    };
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isEven(num) {
  return num % 2 === 0;
}

document.getElementById("playBtn").addEventListener("click", () => {
    seasons.currentDay += 1    
    document.querySelector(".seasons").textContent = `Day: ${seasons.currentDay}`;
    
    const result = simulateGame(teams.SF, teams.LA);
  document.getElementById("output").innerHTML = `<div id="ui">
  <div class="team"><h1>${result.homeScore}</h1><h2>${result.homeTeam.name}</h2><p><strong>(${result.homeTeam.stats.wins} - ${result.homeTeam.stats.losses})</strong><br>
    avg points: ${Math.round(result.homeTeam.stats.totalSeasonPoints / result.homeTeam.stats.gamesPlayed)}<br> 
    ${result.homeTeam.G.attributes.name}: ${result.homeTeam.G.stats.points} (${result.homeTeam.G.stats.makes}/${result.homeTeam.G.stats.shots})<br>
    ${result.homeTeam.F.attributes.name}: ${result.homeTeam.F.stats.points} (${result.homeTeam.F.stats.makes}/${result.homeTeam.F.stats.shots})</p></div>
  <div id="game-results"><h1>Winner: ${result.winner}</h1> </div>
    <div class="team"><h1>${result.awayScore}</h1><h2>${result.awayTeam.name}</h2><p><strong> (${result.awayTeam.stats.wins} - ${result.awayTeam.stats.losses})</strong><br>
    avg points: ${Math.round(result.awayTeam.stats.totalSeasonPoints / result.awayTeam.stats.gamesPlayed)}<br>
    ${result.awayTeam.G.attributes.name}: ${result.awayTeam.G.stats.points} (${result.awayTeam.G.stats.makes}/${result.awayTeam.G.stats.shots})<br>
    ${result.awayTeam.F.attributes.name}: ${result.awayTeam.F.stats.points} (${result.awayTeam.F.stats.makes}/${result.awayTeam.F.stats.shots})</p></div>
  </div>`;
});