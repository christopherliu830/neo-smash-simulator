var MarkovChain = require('markovchain');
const random = require('random');
var data = require('./data');

var init = false;

simulators = new Array();

exports.generateMessage = () => {
  if (!init) {
    parseData();
    init = true;
  }
  var num = random.int(min = 0, max = data.personStrings.length);
  if (data.personStrings[num] != null) {
    var person = data.personStrings[num];
    return {
      name: person.name, 
      message:simulators[num].process()//() => random.float(min=0, max=1) < 0.3).process()
    };
  }
  return {
    name: 'corrupted',
    message: 'corrupted'
  }
};

var parseData = () => {
  data.personStrings.forEach((p) => {
    console.log(p.name);
    let markov = new MarkovChain();
    simulators.push(markov);
    p.messages.forEach((msg) => markov.parse(msg));
  });
};
