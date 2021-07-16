const { getVideo, getSuggestions } = require('../_services/fakeapi')

const videoDetails = (req, res) => {
  const videoId = req.params.id
  const video = getVideo(videoId)
  const teases = getSuggestions(6)
  res.render('video-player', { video: video, teases: teases })
}
const videoHome = (req, res) => {
  const cards = getSuggestions(30)
  res.render('video-home', { cards: cards })
}

module.exports = {
  videoDetails,
  videoHome
}
