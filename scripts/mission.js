// The Mission(S!) object will manipulate all information having to do with levels/missions, and will be responsible for populating
// the sidebar with relevant data, as well as calling individual missions from the missions library.

class Mission {
    // Expected root is sidebar, and subject is of course the player, followed by the contents of the array imported from the mission data file:
    constructor(root, subject, missionData) {
        this.root = root;
        this.subject = subject;
        // this is fucked but it *may* work!
        this.levelNumber = missionData[0];
        this.difficulty = missionData[1];
        this.brief = missionData[2];
        // from the list of objectivesRemaining the objectives objects will be generated.
        this.objectivesRemaining = [];
        missionData[3].forEach(setOfInstructions => {
            let obj = new Objective(this.subject, setOfInstructions);
            this.objectivesRemaining.push(obj);
        });
        // We'll store achieved objectives to keep, crossed off so we know we did them.
        this.objectivesAchieved = [];
        this.accomplished = false;
        this.victoryMessageAwarded = false;
    }

    // Engine will call this if an objective goes ping:
    manageAchievements() {
        // Filter out accomplished objectives first:
        this.objectivesRemaining = this.objectivesRemaining.filter(objective => objective.achieved !== true);
        this.objectivesRemaining.forEach(objective => {
            objective.test();
            if (objective.achieved) {
                this.objectivesAchieved.push(objective);
                console.log("objective accomplished!");
            }
        })
        if ((this.objectivesRemaining.length === 0) && !(this.victoryMessageAwarded)) {
            this.accomplished = true;
            console.log("You visited the sides. You win a fucking medal.")
            this.victoryMessageAwarded = true;
        }
    }
};