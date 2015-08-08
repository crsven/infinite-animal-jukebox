var React = require('react');
var Animal = require('./animal');

var AnimalAudioscape = React.createClass({
  _randFrom(min, max) {
    return (Math.random() * (max - min) + min);
  },
  getInitialState: function() {
    var animalIds = [];
    while(animalIds.length < 5) {
      var newRand = Math.floor(this._randFrom(10000, 130000));
      if(animalIds.indexOf(newRand) < 0) {
        animalIds.push(newRand);
      }
    };
    return {
      animalIds: animalIds
    };
  },

  render: function() {
    return(
      <div>
        <h3>What if...</h3>
        {
          this.state.animalIds.map(function(animalId) {
            return <Animal key={ animalId }
                           animalId={ animalId } />
          })
        }
        <h3>lived together.</h3>
      </div>
    );
  }
});

module.exports = AnimalAudioscape;
