exports.name = `{PREFIX}${__filename.split(/[\\/]/).pop().slice(0,-3)}`
exports.description = `The help command is a command for getting help information on other commands.`
exports.usage = `Running **{PREFIX}${__filename.split(/[\\/]/).pop().slice(0,-3)}** without any arguments will result in this message and general information about the bot.
    Running: **{PREFIX}${__filename.split(/[\\/]/).pop().slice(0,-3)}** ***(command)*** you can get help information about specific commands and their usage.`
exports.clearance = `USER`
exports.nsfw = false

exports.run = (client, message) => {
    message.command(false,async () => {
        if(message.args.length >= 3){throw "Too many arguments!"}
        if(message.args.length === 1){
            var cmd = client.commands.get("help")
            var embed = {
                color: parseInt("0x99ff66"),
                author: {
                    name:`${client.user.tag} ${client.version}`,
                    icon_url: client.user.avatarURL
                }, 
                description:client.description,
                thumbnail: {
                    url: client.user.avatarURL
                },
                fields:[
                    {
                        name:"**Help**",
                        value:`${cmd.usage.replace(/{PREFIX}/g, client.config.prefix)}
                            If you're not sure where to start, try running **${client.config.prefix}commands** to get a list of commands!`
                    },
                ],
            }
        }else if(message.args.length === 2){
            var cmd = client.commands.get(message.args[1].toLowerCase())
            if(!cmd){
                message.delete()
                throw "That's not a command!"
            }
            // if(cmd.clearance === "CREATOR" && !message.gus.user.clearance === "CREATOR"){
            //     message.delete()
            //     throw "That's not a command!"
            // }
            // if(cmd.nsfw === true && !message.channel.nsfw){
            //     message.delete()
            //     throw "That's not a command!"
            // }
            // if(cmd.clearance === "ADMINISTRATOR" && (!message.gus.user.clearance === "ADMINISTRATOR" && !message.gus.user.clearance === "CREATOR" && !message.member.hasPermissions("ADMINISTRATOR"))){throw "You are not an Administrator!"}
            // if (!cmd){
            //     throw "Cannot get help for invalid command! Check your spelling!"
            // }
            var embed = {
                color: parseInt("0x99ff66"),
                author: {
                    name:`${cmd.name.replace(/{PREFIX}/g, client.config.prefix)}`,
                    icon_url: client.user.avatarURL
                }, 
                description:cmd.description.replace(/{PREFIX}/g, client.config.prefix),
                fields:[
                    {
                        name:"**Usage:**",
                        value:cmd.usage.replace(/{PREFIX}/g, client.config.prefix)
                    },
                ],
            }
        }
        message.channel.send({embed:embed}).then(msg => msg.delete(90000))
    })
}