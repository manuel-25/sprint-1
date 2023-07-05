function isAuthenticated(req, res, next) {
  console.log(req.session?.role)
  if (req.session.email) {
    return next()
  } else {
    return res.status(403
      ).json({
      success: false,
      message: 'You must be logged in',
    })
  }
}

export default isAuthenticated