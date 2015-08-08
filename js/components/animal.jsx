var React = require('react');

var Animal = React.createClass({
  //http://macaulaylibrary.org/audio/127299
  //http://animalrecordings.org/Audio/1/10000.mp3
  //# between 10000 - 130000
  //var audio = new Audio();
  //audio.src = 'audio files/song.mp3';
  //audio.controls = true;
  //audio.autoplay = true;
  //document.body.appendChild(audio);
  _audioUrl: function() {
    var idString = this.props.animalId.toString();
    var folderCharCount = idString.length % 4;
    var folderId = idString.substr(0, folderCharCount);

    return "http://animalrecordings.org/Audio/" +
           folderId + "/" +
           idString + ".mp3";
  },

  componentDidMount: function() {
    React.findDOMNode(this.refs.audio).addEventListener('canplay', this._beginPlaying);
  },

  _beginPlaying: function() {
    var node = React.findDOMNode(this.refs.audio);
    node.currentTime = 7;
    node.play();
  },

  render: function() {
    return(
      <div>
        <audio ref='audio' src={ this._audioUrl() }></audio>
      </div>
    );
  }
});

module.exports = Animal;
