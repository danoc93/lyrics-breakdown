const request = require('request');

/* API communication essentials.*/
const API_ROOT = 'http://api.musixmatch.com/ws/1.1';
const TRACKS_RESOURCE = 'chart.tracks.get';
const LYRICS_RESOURCE = 'track.lyrics.get';
const API_KEY = '6f4058c9c9aa23141dcad0c42b9197b5';

class MusicService {

  constructor(dataLoadedCallback) {
    this.dataLoadedCallback = dataLoadedCallback;
    this.prepareBindings();
  }

  /* Bind 'this' to all handlers. */
  prepareBindings() {
    this.getTracks = this.getTracks.bind(this);
    this.getLyrics = this.getLyrics.bind(this);
    this.processTracks = this.processTracks.bind(this);
    this.getTrackData = this.getTrackData.bind(this);
  }

  getTracks(num_artists, country) {
    let url_req = `${API_ROOT}/${TRACKS_RESOURCE}?apikey=${API_KEY}&page=1&page_size=${num_artists}&country=${country}&f_has_lyrics=1`;
    let promise = new Promise((resolve, reject) => {
      request(url_req, {json: true}, (err, res, body) => {
        resolve(res);
        reject(err);
      });
    });
    promise.then(this.processTracks);

  }

  getLyrics(track_id) {
    let url_req = `${API_ROOT}/${LYRICS_RESOURCE}?apikey=${API_KEY}&track_id=${track_id}`;
    return new Promise((resolve, reject) => {
      request(url_req, {json: true}, (err, res, body) => {
        resolve(res.body.message.body.lyrics.lyrics_body);
        reject(err);
      });
    });
  }

  processTracks(response) {

    if (response === undefined) {
      this.dataLoadedCallback();
      return;
    }

    let tracks = response.body.message.body.track_list;

    var lyrics_promises = [];
    MusicService.shuffle(tracks);
    let artists = tracks.map((track) => {
      return track.track.artist_name;
    });

    for (let i = tracks.length - 1; i >= 0; i--) {
      let promise = this.getLyrics(
        tracks[i].track.track_id).then((lyrics) => {

        if (lyrics === undefined) {
          this.dataLoadedCallback();
          return;
        }

        let trackData = this.getTrackData(artists, tracks[i].track, 4);
        return {
          lyrics: lyrics.split('*******')[0],
          options: trackData.options,
          track_name: trackData.track_name,
          correct: trackData.correct
        };

      });
      lyrics_promises.push(promise);
    }

    return Promise.all(lyrics_promises)
      .then(questionData => {
        this.dataLoadedCallback(questionData)
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTrackData(artists, currentTrack, n) {

    // Remove duplicate artists.
    artists = artists.filter((artist, pos) => {
      return artists.indexOf(artist) === pos;
    });

    let options = [];
    let index = artists.indexOf(currentTrack.artist_name);
    options.push(artists[index]);
    artists.splice(index, 1);


    for (var i = (n - 1) - 1; i >= 0; i--) {
      index = Math.floor(Math.random() * n);
      options.push(artists[index % artists.length]);
      artists.splice(index, 1);
    }

    MusicService.shuffle(options);

    let trackVanityId = currentTrack.commontrack_vanity_id;
    let trackName = trackVanityId.substring(trackVanityId.indexOf('/') + 1, trackVanityId.length);
    trackName = trackName.replace(/-/g, ' ');

    return {
      options: options,
      track_name: trackName,
      correct: options.indexOf(currentTrack.artist_name)
    };

  }

  static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

}

module.exports = MusicService;
