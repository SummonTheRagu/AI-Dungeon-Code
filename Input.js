
const modifier = (input) => {
    // Skill System and Dice Roll Input Processing
    let modifiedInput = input;
    let skillUpdateMessage = "";
    let alignmentMsg = "";
    let skillsLevelUp = ""
    if (state.forceSetup === undefined){
        state.forceSetup = false
    }

    const lowerInput = input.toLowerCase();


    if (state.setup === undefined) {
        state.setup = true; // Prevents this script from running again
        initializeCharacterDetails(input);
    }

    // Check for 'check skills' command
    if (lowerInput.includes("check skills")) {
        displaySkills();
        state.useCustomResponse = true;
        state.customResponse = displaySkills();
    }
    // Check for 'check alignment' command
    else if (lowerInput.includes("check alignment")) {
        displayStatus();
        state.useCustomResponse = true;
        state.customResponse = displayStatus();
    }

    if (lowerInput.includes("/setchar") && state.forceSetup === false){
        state.useCustomResponse = true
        state.forceSetup = true
        forceSetChar(lowerInput)
    }
    else if (lowerInput.includes("/setchar") && state.forceSetup === true){
        state.useCustomResponse = true
        state.customResponse = "You already force set your character.\n If stats are not correctly added, leave a comment with the command you used. Remember its: /setchar Name Gender Race Class."
    }

    function updateAlignment(action) {
    if (action.includes("help") || action.includes("save") || action.includes("protect")) {
        state.alignment.Alignment += 2;
        alignmentMsg = "\n[Alignment Change +2]"
    } else if (action.includes("steal") || action.includes("destroy") || action.includes("murder")) {
        state.alignment.Alignment -= 2;
        alignmentMsg = "\n[Alignment Change -2]"
    }

    // Ensure alignment values stay within logical boundaries
    state.alignment.Alignment = Math.max(-20, Math.min(20, state.alignment.Alignment));
}

    // Example of updating alignment based on player input
    updateAlignment(input.toLowerCase());


// Update the memory section with the current alignment
    let alignmentDescription;
    if (state.alignment.Alignment === -20) {
        alignmentDescription = "Evil";
    } else if (state.alignment.Alignment === 20) {
        alignmentDescription = "Good";
    } else {
        // Consider the character Neutral if there is no clear Good or Evil dominance
        alignmentDescription = "Neutral";
    }
    state.memory.frontMemory = `[Player is known as a ${alignmentDescription} character.]`;


    // Dice Roll Function
    const rollDice = () => Math.floor(Math.random() * 20) + 1;
    const rollDiceTied = () => Math.floor(Math.random() * 2) + 1;
    let rollDiceTiedN = rollDiceTied();
    let playerRoll = rollDice();
    let failText = " Action Failed!)\n\n"
    let critFailText = " Action Failed!) Crit Fail - Auto Succeed Next Roll\n\n"
    let successText = " Action Success!)\n\n"

    // Process Skill System Based on Input
    // Example: Increase Strength experience if the player says they're exercising
    if (input.toLowerCase().includes("exercise") || input.toLowerCase().includes("fight") || input.toLowerCase().includes("attack") || input.toLowerCase().includes("stretch") || input.toLowerCase().includes("lift") || input.toLowerCase().includes("push") || input.toLowerCase().includes("carry") || input.toLowerCase().includes("smash") || input.toLowerCase().includes("hit") || input.toLowerCase().includes("throw") || input.toLowerCase().includes("grapple") || input.toLowerCase().includes("climb")) {
        increaseSkillExperience("Strength");
        playerRoll += Math.round(state.skills["Strength"].level/2)
        skillUpdateMessage += "\n[Stength XP +1]\n"
    }
    else if (input.toLowerCase().includes("meditate") || input.toLowerCase().includes("cast") || input.toLowerCase().includes("conjure") || input.toLowerCase().includes("make") || input.toLowerCase().includes("study") || input.toLowerCase().includes("read") || input.toLowerCase().includes("analyze") || input.toLowerCase().includes("solve") || input.toLowerCase().includes("calculate") || input.toLowerCase().includes("plan") || input.toLowerCase().includes("deduce") || input.toLowerCase().includes("think")) {
        increaseSkillExperience("Intelligence");
        playerRoll += Math.round(state.skills["Intelligence"].level/2)
        skillUpdateMessage += "\n[Intelligence XP +1]\n"
    }
    else if (input.toLowerCase().includes("convince") || input.toLowerCase().includes("persuade") || input.toLowerCase().includes("negotiate") || input.toLowerCase().includes("tell") || input.toLowerCase().includes("charm") || input.toLowerCase().includes("flatter") || input.toLowerCase().includes("entertain") || input.toLowerCase().includes("lead") || input.toLowerCase().includes("inspire") || input.toLowerCase().includes("seduce")) {
        increaseSkillExperience("Charisma");
        playerRoll += Math.round(state.skills["Charisma"].level/2)
        skillUpdateMessage += "\n[Charisma XP +1]\n"
    }
    else if (input.toLowerCase().includes("run") || input.toLowerCase().includes("walk") || input.toLowerCase().includes("dodge") || input.toLowerCase().includes("jump") || input.toLowerCase().includes("dance") || input.toLowerCase().includes("flip") || input.toLowerCase().includes("slide") || input.toLowerCase().includes("sprint") || input.toLowerCase().includes("evade")) {
        increaseSkillExperience("Agility");
        playerRoll += Math.round(state.skills["Agility"].level/2)
        skillUpdateMessage += "\n[Agility XP +1]\n"
    }
    else if (input.toLowerCase().includes("block") || input.toLowerCase().includes("endure") || input.toLowerCase().includes("tank") || input.toLowerCase().includes("resist") || input.toLowerCase().includes("sustain") || input.toLowerCase().includes("persist") || input.toLowerCase().includes("survive") || input.toLowerCase().includes("outlast") || input.toLowerCase().includes("labor")) {
        increaseSkillExperience("Endurance");
        playerRoll += Math.round(state.skills["Endurance"].level/2)
        skillUpdateMessage += "\n[Endurance XP +1]\n"
    }

    // Dice Roll Logic
    let checkRoll = rollDice();
    let result = ' (Player Rolled: ' + playerRoll + ' | Check: ' + checkRoll + '. ';

    if(state.critFail === true){
        result = ' (Player Rolled:' + playerRoll + ' | Check: ' + checkRoll +'. Auto Success)'
        state.memory.frontMemory += "\nPLAYER ACTION SUCCEEDS NO MATTER WHAT"
        state.critFail = false;
    }
    else if(playerRoll > checkRoll){
        result += successText
        state.memory.frontMemory += "\nPLAYER ACTION SUCCEEDS NO MATTER WHAT"
    }
    else if (checkRoll > playerRoll && playerRoll === 1){
        if(state.critFail === true){
            result = ' (Player Rolled:' + playerRoll + ' | Check: ' + checkRoll +'. Auto Success)'
            state.memory.frontMemory += "\nPLAYER ACTION SUCCEEDS NO MATTER WHAT"
            state.critFail = false;
        }
        else{
            state.critFail = true;
            result += critFailText
            state.memory.frontMemory += "\nPLAYER ACTION FAILS DO NOT ALLOW THE ACTION TO GO WELL"
        }
    }
    else if (checkRoll > playerRoll){
        result += failText
        state.memory.frontMemory += "\nPLAYER ACTION FAILS DO NOT ALLOW THE ACTION TO GO WELL"
    }
    else if (checkRoll == playerRoll && rollDiceTiedN == 1){
        result += "Tied; Random; " + successText
        state.memory.frontMemory += "\nPLAYER ACTION SUCCEEDS NO MATTER WHAT"
    }
    else if (checkRoll == playerRoll && rollDiceTiedN == 2){
        result += "Tied; Random; " + failText
        state.memory.frontMemory += "\nPLAYER ACTION FAILS DO NOT ALLOW THE ACTION TO GO WELL"
    }
    //result += playerRoll > checkRoll ? "Action Success!)\n\n" : "Action Fail)\n\n";


    // Combine the messages and append to input
    modifiedInput += '\n' + skillUpdateMessage + result  +'\n' +skillsLevelUp + '\n'+ alignmentMsg;

    return { text: modifiedInput };
}




// Don't modify this part
modifier(text)
