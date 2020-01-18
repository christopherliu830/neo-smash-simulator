const fs = require('fs');

var participants = {};
var messages;
var personStrings = new Array();

module.exports = {
  personStrings: personStrings
};

for(i = 0; i < 17; i++) {
  fs.readFile(`./data/message_${i+1}.json`, (err, data) => {
    console.log("HELL YEAH\n\n\n\n\n", i);
    if (err) {
      console.log('error reading data');
      console.log(err.message);
    } else {
      obj = JSON.parse(data);
      obj.participants.forEach((participant) => {
        let person = personStrings.find((p) => p.name === participant.name);
        if (person == null) {
          let newLength = personStrings.push({
            name: participant.name,
          })
          person = personStrings[newLength-1];
        }
        if (person.messages) {
          person.messages = [...person.messages, ...obj.messages.filter( (msg) => 
            msg.content && msg.sender_name === person.name).map((msg) => msg.content)
          ];
        } else {
          person.messages = obj.messages.filter( (msg) => msg.content && msg.sender_name === person.name).map((msg) => msg.content);
        }
        console.log(person.name, person.messages.length);
      })
    }
  });
}



