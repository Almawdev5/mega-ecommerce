const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const services = await Service.find(filter).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Admin
const createService = async (req, res) => {
  try {
    const { title, type, platform, description, price, isAvailable } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const service = await Service.create({
      title,
      type,
      platform,
      description,
      price,
      imageUrl,
      isAvailable
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Admin
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const { title, type, platform, description, price, isAvailable } = req.body;
    if (req.file) service.imageUrl = req.file.path;
    if (title) service.title = title;
    if (type) service.type = type;
    if (platform) service.platform = platform;
    if (description) service.description = description;
    if (price) service.price = price;
    if (isAvailable !== undefined) service.isAvailable = isAvailable;

    const updated = await service.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Admin
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.deleteOne();
    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};