const handlerHttpError = (res, mesg = 'ERROR', code = 403) => {
  res.status(code)
  res.send({ error: mesg })
}
module.exports = { handlerHttpError }