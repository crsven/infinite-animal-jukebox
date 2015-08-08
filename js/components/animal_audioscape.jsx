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

  componentDidMount: function() {
    this._nodesReady = 0;
    Object.keys(this.refs).forEach(function(refKey) {
      React.findDOMNode(this.refs[refKey]).addEventListener('canplay', function() {
        this._nodesReady++;
        this._beginPlaying();
      }.bind(this));
    }.bind(this));
  },

  _beginPlaying: function() {
    var refKeys = Object.keys(this.refs);
    if(refKeys.length !== this._nodesReady) return;

    refKeys.forEach(function(refKey) {
      var node = React.findDOMNode(this.refs[refKey]);
      if(node.played.length === 0) {
        node.currentTime = 7;
        node.play();
      }
    }.bind(this));
  },

  render: function() {
    return(
      <div>
        <h3>What if...</h3>
        {
          this.state.animalIds.map(function(animalId) {
            return <Animal ref={ "audio-" + animalId }
                           key={ animalId }
                           animalId={ animalId } />
          })
        }
        <h3>lived together.</h3>
      </div>
    );
  }
});

module.exports = AnimalAudioscape;
