const sendMessage = async (req, res) => {
  const { name, phone, message } = req.body;
  try {
    res.status(201).json({
      message: 'Message received successfully',
      data: { name, phone, message }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage };