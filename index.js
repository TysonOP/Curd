const {Client , MessageAttachment , MessageEmbed , Attachment} = require('discord.js');

const client = new Client();
client.on('ready', () => {
	 console.log('i am ready!');
});

var prefix = "$"


const rm = require('./example')
client.on('message', message => {
    if(message.content == '$menu') {
        new rm.menu(
            message.channel,
            message.author.id,
            [
                new MessageEmbed({ title:'__**MODERATION COMMNADS**__'  ,color: '#00FFFF', description: "```$kick``` ```$warn``` ```$mute``` ```$clear``` ```$ban``` ```$lock``` ```$unlock```"  }),
               
                new MessageEmbed({ title:'__**FUN COMMNADS**__', color: '#00FFFF', description: "```$coin``` ```$roll``` ```$random```" }),
                new MessageEmbed({ title:'__**UTILITY COMMNADS**__', color: '#00FFFF', description: "```$avatar``` ```$embed``` ```$announce``` ```$say``` ```$help```" }),
                new MessageEmbed({ title:'__** INTERNALLY MANAGED MODULES**__', color: '#00FFFF', description: "```Welcome``` ```Antispam``` ```Reactroles``` ```Logs``` ```WelcomeDm``` ```InviteLogs``` ```Goodbye``` ```Membercounter```" }),
                new MessageEmbed({ title:'__**CONTACT**__', color: '#00FFFF', description:`**For More Information And Queries Regarding Bot And Bot Development Contact <@628498212050698260>   or <@515031544742805504> If You Guys Are Having Any Trouble In Bot Just Type $report with your problem **` })
            ]
        )
    }
});
client.on('guildMemberUpdate', function ( oldMember, newMember) {
  const guild = newMember.guild;
  // declare changes
  var Changes = {
    unknown: 0,
    username: 3,
    nickname: 4,
    avatar: 5
  }
  var change = Changes.unknown

  // check if roles were removed
  

  // check if username changed
  if (newMember.user.username != oldMember.user.username) {
    change = Changes.username
  }
  // check if nickname changed
  if (newMember.nickname != oldMember.nickname) {
    change = Changes.nickname
  }
  
  
  // check if avatar changed
  if (newMember.user.avatarURL !== oldMember.user.avatarURL) {
    change = Changes.avatar
  }
  // post in the guild's log channel
  var log = guild.channels.cache.find(channel => channel.name === 'envo-logs')
  if (log != null) {
    switch (change) {
      case Changes.unknown:
        log.send('**[User Update]** ' + newMember)
        break
      
      case Changes.username:
        log.send('**[User Username Changed]** ' + newMember + ': Username changed from ' +
          oldMember.user.username + '#' + oldMember.user.discriminator + ' to ' +
          newMember.user.username + '#' + newMember.user.discriminator)
        break
        
      case Changes.nickname:
       log.send('**[User Nickname Changed]** ' + newMember + ': ' +
          (oldMember.nickname != null ? 'Changed nickname from ' + oldMember.nickname +
            +newMember.nickname : 'Set nickname') + ' to ' +
          (newMember.nickname != null ? newMember.nickname + '.' : 'original username.'))
        break
      case Changes.avatar:
       log.send('**[User Avatar Changed]** ' + newMember)
        break
    }
  }
})
client.on('messageUpdate', function(oldMessage, newMessage) {

    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {

        //l

        //post in the guild's log channel
        var log = newMessage.guild.channels.cache.find(channel => channel.name === 'envo-logs');
        if (log != null)
            log.send('**[Message Updated]** *' + newMessage.author + '*:\n*Old Message*: ' + oldMessage.cleanContent +
                '\n*New Message*: ' + newMessage.cleanContent);
    }

});
var cheerio = require("cheerio"); /* Used to extract html content, based on jQuery || install with npm install cheerio */
var request = require("request"); /* Used to make requests to URLs and fetch response  || install with npm install request */
 
client.on("message", function(message) {
 
    var parts = message.content.split(" "); // Splits message into an array for every space, our layout: "<command> [search query]" will become ["<command>", "search query"]
 
    /* Simple command manager */
    if (parts[0] === "!image") { // Check if first part of message is image command
 
        // call the image function
        image(message, parts); // Pass requester message to image function
 
    }
 
});

function image(message, parts) {
 
    /* extract search query from message */
 
    var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            // handle error
            return;
        }
 
        /* Extract image URLs from responseBody using cheerio */
 
        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
 
        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");
 
        
        
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        if (!urls.length) {
           
            return;
        }
        const embed = new MessageEmbed()
        .setColor("#00FFFF")
        .setTitle("__**IMAGES**__")
        .setImage( urls[0] );
 
       
        message.channel.send( embed );
    });
 
}
client.on('guildBanAdd', function(guild, user) {



    //post in the guild's log channel
    var log = guild.channels.cache.find(channel => channel.name === 'envo-logs');
    if (log != null)
        log.send('**[Banned]** ' + user);

});

//user has been unbanned
client.on('guildBanRemove', function(guild, user) {

    //log to console
    

    //post in the guild's log channel
    var log = guild.channels.cache.find(channel => channel.name === 'envo-logs');
    if (log != null)
        log.send('**[Unbanned]** ' + user);

});
client.on('guildBanRemove', member => {

    //log to console
    

    //post in the guild's log channel
    var log = member.channels.cache.find(channel => channel.name === 'envo-logs');
    if (log != null)
        log.send('**[removed or kicked]** ' + member);

});
client.on('guildBanAdd', member => {

    //log to console
    

    //post in the guild's log channel
    var log = member.channels.cache.find(channel => channel.name === 'envo-logs');
    if (log != null)
        log.send('**[Joined]** ' + member);

});

client.on('message', message =>{
  
  if(message.content === "$antiraidon") {
    if(message.member.hasPermission(["ADMINISTRATOR"])) {
    
 client.on('guildMemberAdd', member => {
   var role = member.guild.roles.cache.find(role => role.name === 'Muted')
   member.roles.add(role);
 },)
 message.channel.send('**antiraid on**')
    } else {
      message.reply("You don't have permission for that")
    }
  }
});

 client.on('message', message => {
  if (message.content === '$servers') {
    message.reply(`${client.guilds.cache.size}`)
  }
});  
 client.on('message', message =>{

  if(message.content === "$antiraidoff") {
    if(message.member.hasPermission(["ADMINISTRATOR"])) {
    var role = message.guild.roles.cache.find(role => role.name === 'Muted')
   message.guild.members.cache.forEach(member => member.roles.remove(role));
  message.channel.send('**antiraid mode off**')
    } else {
      message.reply('You Dnt Have permission')
    }
  }
    
});

client.on('message', message => {
  if (message.content === '$help') {
    message.react('707535184492232765')
   const embed6 = new MessageEmbed()
   .setColor('#00FFFF')
   .setTitle('__**HELP**__')
   .setDescription('This bot is mainly for using embeds and moderation and a membercounter bot with various kinds of modules in it which can be used for various purpose use $help (module) to get to know about modules')
   .addField("__**SETUP**__","For Moderation Setup Do `$setup` And `$setupmute` And For Membercount Setup Do `$membercount` `$set` And tlThen `$membercountset` For Completing Membercount Setup ")
   .addField('__**MODULES**__', '```$ban``` ```$warn``` ```$mute``` ```$vatar``` ```$announce``` ```$clear``` ```$antispam``` ```$say``` ```$embed``` ```$coin``` ```$lock``` ```$unlock``` ```$antiraidon``` ```$antiraidoff``` ```$botavatar``` ```invite``` ```roll```')
   .addField('__**INTERNALLY MANAGED MODULES**__',' ```Antispam```  ```Logs``` ```WelcomeDm``` ```InviteLogs``` ```Goodbye``` ````Membercounter```')
   .addField('__** MORE INFO**__','Type $menu In Any Text Channel For More Info ')
   .addField('** **','** **')
   .addField('__**CONTACT**__','If You Guys Are Having Any Trouble In Bot Just Type $report with your problem or join our official server')
   .addField('** **','<a:emoji_4:707535297768063029> [Discord](https://discord.gg/Fk2zfxj)')
   message.author.send(embed6);
   message.channel.send('__**List Has Been Provided To You In Your Dm**__')
  }
});
client.on('message', message => {
  if (message.content === '$botavatar') {
  const embed = new MessageEmbed()
  .setColor('#00FFFF')
  .setTitle('__**BOT AVATAR**__')
  .setImage('https://cdn.discordapp.com/attachments/700395972089479279/707560418163294269/images_24.jpeg')
  message.channel.send(embed)
}
});
client.on('message', message => {
  if (message.content === '$invite') {
    const embed = new MessageEmbed()
    .setColor('#00FFFF')
    .setTitle('__**INVITE**__')
    .addField('Click Here To Invite Me To Your Server','[INVITE](https://discord.com/oauth2/authorize?client_id=706999514338426950&permissions=8&scope=bot)')
    .setImage('https://cdn.discordapp.com/attachments/700395972089479279/707560418163294269/images_24.jpeg')
    message.author.send(embed)
    message.channel.send('__**CHECK YOUR DM**__')
    
  }
});
client.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith(`${prefix}ban`)) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
        .ban({reason:'voilation',})
        .then(() => {
          message.reply(`banned ${user.tag}`);
        })
        .catch(err => {
          message.reply('i was missing perm');
          console.error(err);
          
      });
    } else {
      message.reply('user is not in server');
    }
  } else {
    message.reply('mention someone');
  }
  
} else {
  message.reply("You Don't Have Permission")
}
}

});  
client.on('message', message => {
if (message.content === '$help embed') {
    message.channel.send('** $embed (message)  to make it an embed message **')
}
});
client.on('message', message => {
if (message.content === '$help mute  ') {
    message.channel.send('**s the user fo $ (usertag) (time) to  someone**')
}
});
client.on('message', message => {
if (message.content === '$help game') {
    message.channel.send('** two games one is $random and one is $coin**')
}
});
client.on('message', message => {
if (message.content === '$help say') {
    message.channel.send('** $say (message) says your message **')
}
});
client.on('message', message => {
if (message.content === '$help clear') {
    message.channel.send('** $clear clear messages **')
}
});
client.on('message' , message => {
if (message.content === '$tag') {
message.channel.send(`${message.author}`)
}
});
client.on('message', message => {

if (message.content === '$help kick ') {
    message.channel.send('**kicks user from your guild do $kick (usertag) to   **')
}
});
client.on('message', message => {
if (message.content === '$help announce') {
    message.channel.send('**$announce (channel) (message) for announment**')
}
});

client.on('message', message => {
if (message.content === '$help avatar') {
    message.channel.send('**shows user his/her avatar**')
}
});
client.on('message', message =>{
  if (message.content === '$help ban') {
    message.channel.send('**it bans user from your guild do $ban (usertag)to ban someone');
  }
});
client.on('message', message => {
  if(message.content === '$roll') {
var roll = (Math.floor(Math.random()*200)+1);
if (roll <=100){message.reply('Thats not enough, keep rolling')}
else{message.reply('Uuuuuh now those are some monies goy, you may get help')}
}
});
client.on('message', message => {
  const channel = client.channels.cache.find(channel => channel.name === 'envo-logs')
  if (message.mentions.users.size >= 4) 
  if(!message.member.hasPermission(["KICK_MEMBERS"])) {
  
    message.delete()
  const embed = new MessageEmbed()
  .setColor('#00FFFF')
  .setTitle("__**WARN**__")
  .setDescription(` ${message.author}To Many Mentions`)
  message.channel.send(embed)
  
  const embed1 = new MessageEmbed()
  .setColor('#00FFFF')
  .setTitle('__**MASS MENTION**__')
  .setDescription('Member warned for mass mention')
  channel.send(embed1)
  
  
  } 
});

client.on('message', message => {
  let args = message.content.substring(prefix.length).split(' ');
  switch(args[0]) {
    case 'mute':
      if (message.member.hasPermission(["KICK_MEMBERS"])) {
    let person = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
    if (!person) return message.reply('mention user');

    let role = message.guild.roles.cache.find(role => role.name === 'Muted');
    if(!role) return message.reply("coudn't find the  role")
    let time =args[2];
    if(!time) {
      return message.reply('specify time');
    }
   
    person.roles.add(role);
    
    let embed = new MessageEmbed()
    .setColor('#00FFFF')
    .setDescription(`${person} has been muted `)
    .setTitle("__**MUTE**__")
     message.channel.send(embed)
     
   const channel = client.channels.cache.find(channel => channel.name === 'envo-logs')
     const embed1 = new MessageEmbed()
     .setColor('#00FFFF')
     .setTitle('__**LOGS**__')
     .addField(`**MUTED**`,`**${person}**`)
     .addField('**CHANNEL**',`**${message.channel.name}**`)
     .addField(`**TIME**`,time)
     .setFooter(`${message.author.username}`)
     .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
  channel.send(embed1)
     
    
     setTimeout(function(){
       person.roles.remove(role);
      
       
     }, ms(time));
     
     
     break;
  } else {
    message.reply("You Don't Have Permission")
  }
     
  }
});
  client.on('message', message => {
    if (message.content === '$serverinfo') {

    let embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setTitle("__**SERVER INFO**__")
            .setImage(message.guild.iconURL)
            
            .addField("**Owner**", `The owner of this server is ${message.guild.owner}`)
            .addField("**Member Count**", `This server has ${message.guild.memberCount} members`)
            .addField("**Emoji Count**", `This server has ${message.guild.emojis.cache.size} emojis`)
            .addField("**Roles Count**", `This server has ${message.guild.roles.cache.size} roles`)
            .setFooter(`${message.author.username}`)
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)

        message.channel.send(embed) 
    }
  });

  
client.on('message', message => {
  if(message.content.startsWith('$warn')) {
  if(message.member.hasPermission(["MANAGE_CHANNELS"])) {
   let member = message.mentions.members.first();
     let embed5 = new MessageEmbed()
     .setColor('#00FFFF')
     .setTitle('WARN')
     .setDescription(`${member}has been warned`)
   
     message.channel.send(embed5);
       
 var channel = message.guild.channels.cache.find(channel => channel.name === 'envo-logs')
   let embed6 = new MessageEmbed()
  .setTitle('__**LOGS**__')
  .addField(`**WARNED**`,`**${member}**`)
  .addField('**CHANNEL**',`**${message.channel.name}**`)
  .setFooter(`${message.author.username}`)
  .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
  
 channel.send(embed6)
  } else {
    message.reply("You Don't Have Permission")
  }
  }
});

client.on('message', (message) => {
  const channel = client.channels.cache.find(channel => channel.name === 'envo-logs')
  if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) {  
   if(!message.member.hasPermission(["KICK_MEMBERS"])) {
    message.delete() 
    const embed = new MessageEmbed()
    .setColor('#00FFFF')
    .setTitle('__**WARN**__')
    .setDescription(`${message.author} no links allowed`)
    message.channel.send(embed);
    
    const embed2 = new MessageEmbed()
    .setColor('#00FFFF')
    .setTitle('__**LINKS**__')
    .setDescription(`${message.author} posted links in ${message.channel.name}`)
    channel.send(embed2)
  } 
  }
  
});
client.on('message', message => {
const channel = client.channels.cache.find(channel => channel.name === 'envo-logs')

if (message.content.length >= 1000) {
if (!message.member.hasPermission(["KICK_MEMBERS"])) {
  message.delete({timeout: 0000});
  const embed = new MessageEmbed()
  .setColor('#00FFFF')
  .setTitle('__**WARN**__')
  .setDescription(`${message.author} To Many Character`)
  message.channel.send(embed);
  
  const embed2 = new MessageEmbed()
  .setColor('#00FFFF')
  .setTitle('__**CHARACTER**__')
  .setDescription(`${message.author} warned max Character`)
  channel.send(embed2);
}
}
});
client.on('message', message => {
  if(message.content === '$setup') {
    if (message.member.hasPermission(["KICK_MEMBERS"])) {
message.guild.channels.create('envo-logs', {
	type: 'text',
	permissionOverwrites: [
		{
			id: message.guild.id,
			deny: ['VIEW_CHANNEL'],
		},
		{
			id: message.author.id,
			allow: ['VIEW_CHANNEL'],
		},
	],
})



const embed = new MessageEmbed()
.setColor('#00FFFF')
.setTitle("__**SETUP COMPLETED**__")
.setDescription('created a Muted role')
.addField('created a logs channel','updated overwrites')
.addField('**Pls do $setupmute for completing bot setup**','** **')
.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
message.channel.send(embed);
} else {
  message.reply("You Don't Have Permission")
}
}
});
client.on('message', message => {
  if(message.content === '$setup') {
    
    if (message.member.hasPermission(["KICK_MEMBERS"])) {
message.guild.roles.create({
  data: {
    name: 'Muted',
    color: 'BLUE',
  },
  reason: 'To Mute People',
})
}
} 

});

client.on('message', message => {

if(message.content == "$coin")
{
      function doRandHT() {
var rand = ['HEADS!','TAILS!'];

return rand[Math.floor(Math.random()*rand.length)];
}
var prefix = "$"
 const embed = {
"title": `Here is the winner!`,
"description": doRandHT(),
"color": 7584788,
};
message.channel.send({ embed });


}
});


client.on('message', message => {
   if(message.content.startsWith(`${prefix}say`)) {
     let text = message.content.split(' ').slice(1).join(' ')
     if(!text) return message.reply('write some input')
     message.channel.send(text)
     message.delete()
   }
 });
 client.on('message', message => {
   if(message.content.startsWith(`${prefix}embed`)) {
     let text = message.content.split(' ').slice(1).join(' ')
     if(!text) return message.reply('write some input')
     const embed = new MessageEmbed()
     .setColor('#6f00ff')
     .setDescription(text)
     message.channel.send(embed);
     
     message.delete()
   }
 });
 client.on('message', message => {

if (message.content.toLowerCase().startsWith(prefix + `announce`)) {
  if (message.member.hasPermission("KICK_MEMBERS")) {
    // I've added this part
    let channel   = message.mentions.channels.first(); // you get the first mentioned 
    if (!channel) return message.reply("No  mentioned."); // if it doesn't exist, you exit
    let args = message.content.split(" ").slice(2).join(" "); // if it exist, you remove the command AND the 

    let split = args.split("-");
    let url = args[2];
    channel.send("** **", { // here you send it to your  instead of the same one
      embed: {
        color:  0X6f00ff,
        title: "ANNOUNMENT",
        description: split[0],
        url: split[1],
       
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.username
        }
      }
    });
  } else {
    message.reply("You Don't Have Permission")
  }
}
});
client.on('message', message => {
  if (message.content.startsWith(`${prefix}clear`)) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
    
    let args = message.content.substring(6)
    if (!args[0]) return message.channel.send('plz provide the number of messages').then(msg => msg.delete('3000'))
    message.channel.bulkDelete(args)
    message.channel.send(`deleted ${args} messages`).then(msg => msg.delete({timeout:0000}))
    } else {
      message.reply("You Don't Have permission")
    }
    
  }
});
client.on('message', message => {
  if(message.content === "$setupmute") {
    if (message.member.hasPermission(["KICK_MEMBERS"])) {
    var smartrole = message.guild.roles.cache.find(role => role.name === 'Muted')
    message.guild.channels.cache.forEach(channel => {message.channel.updateOverwrite(smartrole.id, { SEND_MESSAGES: false , VIEW_CHANNEL: true  , KICK_MEMBERS: false , BAN_MEMBERS: false , MANAGE_CHANNELS: false , MANAGE_GUILD: false , VIEW_AUDIT_LOG: false , ADD_REACTIONS: false , ATTACH_FILES: false , MENTION_EVERYONE: false , CONNECT: false , MANAGE_ROLES: false, MANAGE_NICKNAMES: false , MANAGE_EMOJIS: false ,})
    })
    
  message.channel.send('Setup Completed')
  } else {
    message.reply("You Don't Have Permission")
  }
  }
  
});

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('$kick')) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
        .kick('voilation')
        .then(() => {
          message.reply(`kicked ${user.tag}`);
        })
        .catch(err => {
          message.reply('i was missing perm');
          console.error(err);
      });
    } else {
      message.reply('user is not in server');
    }
  } else {
    message.reply('mention someone');
  }
  
} else {
  message.reply("You Don't Have Permission")
}
} 
});
client.on ('message', message=> {
if (message.content ==='$ping') {
  const ping = Date.now() - message.createdTimestamp + " ms";
  message.channel.send("Your ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`");
}
});

const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

 wait(1000);
  // Load all invites for all guilds and save them to the cache.
  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
client.on('guildMemberAdd', member => {
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.cache.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    const Channel14 = member.guild.channels.cache.find(channel => channel.name === 
    "envo-logs");
    const embed = new MessageEmbed()
    .setColor('#00FFFF')
    .setTitle('__**INVITE**__')
    .setDescription(`${member} joined using invite code ${invite.code} from **${inviter}**. Invite was used **${invite.uses}** times since its creation.`)
    Channel14.send(embed);
  });
});
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
	kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 15, // Amount of messages sent in a row that will cause a ban.
	muteThreshold: 5, // Amount of messages sent in a row that will cause a mute.
	maxInterval: 3000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
	banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
	muteMessage: '**{user_tag}** has been muted for spamming.', // Message that will be sent in chat upon muting a user.
	maxDuplicatesWarning: 5, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 9, // Amount of duplicate messages that trigger a warning.
	// Discord permission flags: https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS
	exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions(These are not roles so use the flags from link above).
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: [], // Array of User IDs that get ignored.
	// And many more options... See the documentation.
	logchannel: "anonymous-logs"
});
 
client.on('message', (message) => antiSpam.message(message));
const ms = require('ms');
client.on('message', message => {
  if (message.content === '$lock') {
    if(message.member.hasPermission(["KICK_MEMBERS"])) {
message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false , VIEW_CHANNEL: false  });
const embed = new MessageEmbed()
.setColor('#00FFFF')
.setTitle('__**LOCK**__')
.setDescription(`${message.author} channel locked`)
message.channel.send(embed)
} else {
  message.reply(" You Don't Have permissions")
}
}
});
client.on('message', message => {
  if (message.content === '$unlock') {
    if(message.member.hasPermission(["KICK_MEMBERS"])) {
message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true , VIEW_CHANNEL: true  });
const embed = new MessageEmbed()
.setColor('#00FFFF')
.setTitle('__**UNLOCK**__')
.setDescription(`${message.author} channel Unlocked`)
message.channel.send(embed)
} else {
  message.reply("You Don't Have Permissions")
}
}
});
const actvs = [
    "with the $help command.",
    "PREFIX $",
    "WITH $invite command",
    "PREFIX $"
];

client.on('ready', () => {
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
    }, 3000);
});
client.on('message', message => {
  if (message.channel.type == "dm") {
    const embed = new MessageEmbed()
    .setColor('#00FFFF')
    .setTitle('__**BOT**__')
    .setDescription('**YOU ARE DMING ME NOW**')
    .addField('** **','If You Are Facing Any Bugs The Just Type $report (bug) In Official Server And If U Wnaa invite me to your  Server type $invite in any text channel ')
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    message.author.send(embed)
    return;
  }
});
client.on('message', message =>{
  
  if(message.content === "$antiraidon") {
    if(message.member.hasPermission(["ADMINISTRATOR"])) {
    
 client.on('guildMemberAdd', member => {
   var role = member.guild.roles.cache.find(role => role.name === 'Muted')
   member.roles.add(role);
 });
 message.channel.send('__**antiraid on**__')
    } else {
      message.reply("You don't have permission for that")
    }
  }
});
client.on('guildMemberAdd', member => {
let embed1 = new MessageEmbed()
  .setColor('#00FFFF')
  .setTitle(`**WELCOME**`)
  .addField('** **',`**<a:emoji_1:707248808433811458>Welcome To  ${member.guild.name} ${member} <a:emoji_1:707248808433811458>**`)
  .addField('<a:emoji_1:707248742285312010>**Enjoy And Have Fun**<a:emoji_1:707248742285312010>','** **')
  member.send(embed1)
  
 });
client.on('messageDelete', message => {
const channel = message.guild.channels.cache.find(channel => channel.name === 'envo-logs')
const embed = new MessageEmbed()
.setColor('#00FFFF')
.setTitle('__**MESSAGE DELETED**__')
.addField('**MESSAGE**',`${message.cleanContent}`)
.addField('**DELETED IN**',`${message.channel.name}`)
.addField('**DELETED BY**',`${message.author.tag}`)
channel.send(embed)
  
});
client.on('message', message => {
  if(message.content === '$membercount') {
  if (message.member.hasPermission("MANAGE_CHANNELS")) {
message.guild.channels.create('⏤͟͟͞-│MEMBERS:', {
	type: 'voice',
	permissionOverwrites: [
		{
			id: message.guild.id,
			allow: ['VIEW_CHANNEL'],
		},
		{
			id: message.author.id,
			allow: ['VIEW_CHANNEL'],
		},
	],
});
} else {
  message.reply("You Don't Have Permission")
}
const embed = new MessageEmbed()
.setTitle('__**CHANNEL CREATED**__')
.setDescription('Channel created now do $set and $membercountset for completing')
.setColor('#00FFFF')

message.channel.send(embed)
}
});



 client.on('message', message =>{

  if(message.content === "$antiraidoff") {
    if(message.member.hasPermission(["ADMINISTRATOR"])) {
    var role = message.guild.roles.cache.find(role => role.name === 'Muted')
   message.guild.members.cache.forEach(member => member.roles.remove(role));
  message.channel.send('__**antiraid mode off**__')
    } else {
      message.reply('You Dnt Have permission')
    }
  }
    
});
client.on('message', message => {
	if (!message.content.startsWith(prefix)) return;

	const withoutPrefix = message.content.slice(prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
	const args = split.slice(1);
if (command === 'avatar') {
	if (args[0]) {
		const user = message.mentions.users.first();
		if (!user) {
			return message.reply('Please use a proper mention if you want to see someone else\'s .');
		}
    let embed26 = new MessageEmbed()
    .setColor('#00FFFF')
    .setTitle('**Avatar**')
    .setImage(` ${user.displayAvatarURL({dynamic: true})}`);
      message.channel.send(embed26);
	}

	
}

});


client.on('message', message => {
  if(message.content === '$set') {
  var channel = client.channels.cache.find( channel => channel.name === '⏤͟͟͞-│MEMBERS:') 
  var idd = (`${channel.id}`)
  console.log(idd)

 client.on('message', message => {
   if(message.content === '$membercountset') {
   let id = message.guild.id
   
let myguild = client.guilds.cache.get(id)
let memberCount = myguild.memberCount;

  let memberCountchannel = myguild.channels.cache.get(idd)
  memberCountchannel.setName('⏤͟͟͞-│MEMBERS:' + memberCount)
 
.catch(error => console.log(error));

}
});

client.on('guildMemberAdd', member => {
let id1 = member.guild.id
let myguild = client.guilds.cache.get(id1)
let memberCount = myguild.memberCount;

let memberCountchannel = myguild.channels.cache.get(idd)
memberCountchannel.setName('⏤͟͟͞-│MEMBERS:' + memberCount)
.catch(error => console.log(error));  
});


client.on('guildMemberRemove', member => {
  let id2 = member.guild.id
let myguild = client.guilds.cache.get(id2)
let memberCount = myguild.memberCount;
var channel = client.channels.cache.find( channel => channel.name === '⏤͟͟͞-│MEMBERS:' + memberCount)

let memberCountchannel = myguild.channels.cache.get(idd)
memberCountchannel.setName('⏤͟͟͞-│MEMBERS:' + memberCount)
.catch(error => console.log(error));
});

client.on('message', message => {
  if (message.content === '$idd') {
    let memberCount = message.guild.memberCount;
    var channel = client.channels.cache.find( channel => channel.name === 'MEMBERS:' + memberCount) || message.channel.id
  message.reply(`${channel.id}`)
  }
})
}
});
client.on('message', message => {
if (message.content === '$help antiraidon') {
    message.channel.send('**Antiraid mode pervents your server from raid on it by `$antiraidon` **')
}
});
client.on('message', message => {
if (message.content === '$help antiraidoff') {
    message.channel.send('**Antiraid mode pervents your server from raid off it by `$antiraidoff` **')
}
});




client.login(process.env.TOKEN);
