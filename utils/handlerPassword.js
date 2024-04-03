const bcryptjs = require('bcryptjs')

const encrypt = async (textPlain) => {
  const hash = await bcryptjs.hash(textPlain, 10)
  return hash
}

const compare = async (textPlain, hashedText) => {
  return await bcryptjs.compare(textPlain, hashedText);
}

module.exports = { encrypt, compare }