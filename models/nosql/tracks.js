const mongoose = require('mongoose')

const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String
    },
    album: {
      type: String
    },
    cover: {
      type: String,
      validate: (req) => {
        return true
      }
    },
    artist: {
      name: {
        type: String
      },
      nickname: {
        type: String
      },
      nationality: {
        type: String
      },
    },
    duration: {
      start: {
        type: Number
      },
      end: {
        type: Number
      }
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    }
  },
  { 
    timestamps: true,
    versionKey: false,
  }
)

module.exports = mongoose.model('tracks', TracksScheme)