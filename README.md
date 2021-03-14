# Zettai (a.k.a. Emotou)

Another simple Bot of mine, this time - maybe even more useful than the other
one!

## Planned Features
### Guild - Based Configurations
The configuration for each guild will be stored in a database in the
corresponding part of the `Guild` collection! The default entry should be
added using then `onJoin`-event and should be modifieable using the
following pretty self explanatory commands: `reset`, `set`. The available
config options will probably be documented at a later point in time
using section-help commands (this section: config)!
### Music Feature
I think this feature speaks for itself! Add Music support, best would be for
Search, YouTube and Spotify! Commands would be: `play`, `playtop`, `clear`,
`queue`, `remove`, `now`, `pause`, `resume`, `loop`, `loopqueue`! Later 
functionality might include: `create-playlist`, `add-to-playlist`,
`remove-from-playlist` and similar commands!
### Emote Database
This feature will allow to save emotes and type them using an emoji prefix!
So, as soon as the bot detects the emoji prefix, it'll start searching the
database for fitting emoji's, temporarily change it's name to the according
user if possible, take the message and replace the correctly placed emoji
identifiers with the according emoji! Commands will include: `emoji-add`,
`emoji-remove`, `emoji-search`! The emoji's will probably be stored in a
relational database, due to their clear structure!
### Reminders
Reminders are also gonna be included with the commands: `remind` and `bday`.
`remind` will take parameters such as date, simple recurrence (hourly,daily,
weekly,monthly) all with specifiable intervals, such as in the following
example: `remind r 2h ToDo: Stuff!`. Which when parse will mean: Set Up a 
recurrent 2 hour reminder, which will ping the command author and message
"ToDo: Stuff!". Birth Days are a bit simpler, you simply specify user-id and
date in following format (dd/mm/yyyy)! The User ID is being used instead of 
a ping to assure that the User is correct and that Discord isn't messing up
the ping! Keep in mind, for now there will be no option to delete data - 
other than messaging me (the bot dev) and telling me to manually remove the
entry!
### Purposeful Channels
This feature is also a bit more complicated. This will allow guild owners,
admins and developers to adjust the area controlled, checked, etc - by the
bot. So, an admin could define an _exclude channel_, _reminder channel_,
_include channel_, _change log channel_, _music channel_, and so on! The 
amount of "channel tags", will increase as new features will be added and
each tag, will be regarded by the bot during message parsing, for each guild!
These channel tags, would be stored in a `Guild`-collection, inside a MongoDB.
