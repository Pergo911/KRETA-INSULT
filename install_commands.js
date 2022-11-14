// Installing slash commands on a Discord server is neccessary to be able to use
// them. Use this script to install them.
//______________________________________________________________________________
// Get your guild id by navigating to your server in the Discord app. Right
// click on the server icon and select "Copy ID".
// Put here your guild id and run "node install_commands.js" in your terminal.
   const guildId = "990198640943452224";
//______________________________________________________________________________
// Optionally, you can uninstall commands by setting 'uninstall' to true.
// To uninstall a command, copy the command id from your Discord app and put it
// here. To get the command id: server settings > interactions > commands > right
// click on the command > copy id.
   const uninstall = false;
   const ids_to_uninstall = [
     "EXAMPLE_ID_1",
   ];
//______________________________________________________________________________


import { HasGuildCommands, INSULT_COMMAND, UninstallGuildCommand } from './commands.js';
const commands = [
    INSULT_COMMAND,
];

if (!uninstall) {
    HasGuildCommands(process.env.APP_ID, guildId, commands);
}
else {
    for (let id of ids_to_uninstall) {
        UninstallGuildCommand(process.env.APP_ID, guildId, id);
    }
}