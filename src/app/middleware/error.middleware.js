const handleErrors = (err, res) => {
    res.status(400).json({ data: null, error: err.message });
  };

module.exports = handleErrors;