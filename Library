    state.skills = state.skills || {
        Strength: { level: 0, experience: 0, nextLevelExp: 10 },
        Intelligence: { level: 0, experience: 0, nextLevelExp: 10 },
        Charisma: { level: 0, experience: 0, nextLevelExp: 10 },
        Agility: { level: 0, experience: 0, nextLevelExp: 10 },
        Endurance: { level: 0, experience: 0, nextLevelExp: 10 }
    };

        const classStatMods = {
        "Guardian": { Strength: +18, Intelligence: +8, Charisma: +10, Agility: +6, Endurance: +20 },
        "Assassin": { Strength: +14, Intelligence: +12, Charisma: +9, Agility: +18, Endurance: +7 },
        "Mage": { Strength: +6, Intelligence: +20, Charisma: +12, Agility: +10, Endurance: +12 },
        "Healer": { Strength: +7, Intelligence: +17, Charisma: +15, Agility: +8, Endurance: +13 },
        "Berserker": { Strength: +20, Intelligence: +7, Charisma: +9, Agility: +12, Endurance: +17 },
        "Archer": { Strength: +12, Intelligence: +14, Charisma: +8, Agility: +18, Endurance: +13 },
        "guardian": { Strength: +18, Intelligence: +8, Charisma: +10, Agility: +6, Endurance: +20 },
        "assassin": { Strength: +14, Intelligence: +12, Charisma: +9, Agility: +18, Endurance: +7 },
        "mage": { Strength: +6, Intelligence: +20, Charisma: +12, Agility: +10, Endurance: +12 },
        "healer": { Strength: +7, Intelligence: +17, Charisma: +15, Agility: +8, Endurance: +13 },
        "berserker": { Strength: +20, Intelligence: +7, Charisma: +9, Agility: +12, Endurance: +17 },
        "archer": { Strength: +12, Intelligence: +14, Charisma: +8, Agility: +18, Endurance: +13 },
    };
        const raceStatMods = {
        "Elvarin": { Strength: -2, Intelligence: +3, Charisma: +1, Agility: +1, Endurance: +1 },
        "Titan": { Strength: +3, Intelligence: -1, Charisma: +0, Agility: -2, Endurance: +4 },
        "Mage": { Strength: +6, Intelligence: +20, Charisma: +12, Agility: +10, Endurance: +12 },
        "Human": { Strength: +1, Intelligence: +1, Charisma: +1, Agility: +1, Endurance: +1 },
        "Sylvan": { Strength: -1, Intelligence: +1, Charisma: +0, Agility: +4, Endurance: -2 },
        "Dwarf": { Strength: +2, Intelligence: +0, Charisma: -2, Agility: -1, Endurance: +3 },
        "elvarin": { Strength: -2, Intelligence: +3, Charisma: +1, Agility: +1, Endurance: +1 },
        "titan": { Strength: +3, Intelligence: -1, Charisma: +0, Agility: -2, Endurance: +4 },
        "mage": { Strength: +6, Intelligence: +20, Charisma: +12, Agility: +10, Endurance: +12 },
        "human": { Strength: +1, Intelligence: +1, Charisma: +1, Agility: +1, Endurance: +1 },
        "sylvan": { Strength: -1, Intelligence: +1, Charisma: +0, Agility: +4, Endurance: -2 },
        "dwarf": { Strength: +2, Intelligence: +0, Charisma: -2, Agility: -1, Endurance: +3 },
    };

        if (!state.alignment) {
        state.alignment = { Alignment: 0 };
    }
    
    // Function to display alignment and reputation
function displayStatus() {
    let alignStatus = "You open up a panel on your UI and text appears:\n";
    for (const align in state.alignment) {
        alignStatus += `- ${align}: ${state.alignment[align]}\n Note: -20 is Evil, 20 is Good, Anything inbetween is Neutral.\n Your choices have consequences in this world...`;
    }
    
    state.useCustomResponse = true;
    state.customResponse = alignStatus + "\n Note: -20 is Evil, 20 is Good, Anything inbetween is Neutral.\n Your choices have consequences in this world..."
    return alignStatus;
}

    // Function to display current skills with their levels and experience
    function displaySkills() {
        let skillsDisplay = "A UI Appears on your screen showing your stats:\n"
        for (const skill in state.skills) {
            skillsDisplay += `${skill} - Level ${state.skills[skill].level}, Experience: ${state.skills[skill].experience}/${state.skills[skill].nextLevelExp}\n`;
        }
        state.useCustomResponse = true;
        state.customResponse = skillsDisplay
        return skillsDisplay;
    }


    // Function to increment experience in a skill and check for level up
    function increaseSkillExperience(skill) {
        let skillsLevelUp = ""
        if (state.skills[skill]) {
            state.skills[skill].experience++;
            // Check if the skill has reached the next level
            if (state.skills[skill].experience >= state.skills[skill].nextLevelExp) {
                state.skills[skill].level++;
                state.skills[skill].experience = 0; // Reset experience
                state.skills[skill].nextLevelExp *= 2; // Increase the threshold for next level
                skillsLevelUp = "\n[Skill: "+ skill+" Leveled Up!]\n"
                return skillsLevelUp
            }
        } else {
            return `Skill ${skill} not found.`;
        }
    }



function initializeCharacterDetails(text) {
    // Regular expression to match both patterns
    const pattern = /You are (\w+) a (\w+) (\w+) (\w+)|You are (\w+), a (\w+) (\w+) (\w+)|(\w+) is a (\w+) (\w+) (\w+)/;
    const match = text.match(pattern);

    if (match) {
        // Determine which pattern matched and extract details
        const name = match[1] || match[5] || match[9]
        const gender = match[2] || match[6] || match[10]
        const race = match[3] || match[7] || match[11]
        const charClass = match[4] || match[8] || match[12]

        // Store character details in state.memory
        state.memory = {
            ...state.memory,
            character: {
                name: name,
                gender: gender,
                race: race,
                class: charClass
            }
        };

        // Apply any class or race-based stat modifications
        applyStatMods(race, charClass);
    }
}

function forceSetChar(input){

    // Regular expression to parse the /setchar command
    const commandRegex = /(?:You\s(?:say\s)?)?\/setchar (\w+) (\w+) (\w+) (\w+)/i;
    const match = input.match(commandRegex);

    // Check if the input matches the /setchar command format
    if (match) {
        const [, name, gender, race, charClass] = match;

        // Set character details and update memory
        setCharacter(name, gender, race, charClass);
        applyStatMods(race, charClass);
        updateMemory(name, gender, race, charClass);
        state.customResponse = `You have force changed your character to ${name} the ${gender} ${race} ${charClass}`
    }
}

function setCharacter(name, gender, race, charClass) {
    state.character = { name, gender, race, class: charClass };
}

function updateMemory(name, gender, race, charClass) {
    // Update the memory card with the character's details
    state.memory = `The player is ${name}, a ${gender} ${race} ${charClass}.`;
}


function applyStatMods(race, charClass) {
    const classMods = classStatMods[charClass] || {};
    const raceMods = raceStatMods[race] || {};

    state.skills = state.skills || initializeSkills();

    for (const skill in classMods) {
        if (state.skills[skill]) {
            state.skills[skill].level += classMods[skill];
        }
    }

    for (const skill in raceMods) {
        if (state.skills[skill]) {
            state.skills[skill].level += raceMods[skill];
        }
    }
}

function initializeSkills() {
    return {
        Strength: { level: 0, experience: 0, nextLevelExp: 10 },
        Intelligence: { level: 0, experience: 0, nextLevelExp: 10 },
        Charisma: { level: 0, experience: 0, nextLevelExp: 10 },
        Agility: { level: 0, experience: 0, nextLevelExp: 10 },
        Endurance: { level: 0, experience: 0, nextLevelExp: 10 }
    };
}
