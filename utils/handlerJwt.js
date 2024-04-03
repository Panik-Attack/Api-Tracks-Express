const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = async (user) => {
  console.log(JWT_SECRET)
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
      JWT_SECRET,
    {
      expiresIn: '2h',
    }
  )
    return sign
}

const verifyToken = async (jwtToken) => {
  try {
      return jwt.verify( jwtToken, JWT_SECRET )
  } catch (error) {
    return null
  }
}

module.exports = { tokenSign, verifyToken }