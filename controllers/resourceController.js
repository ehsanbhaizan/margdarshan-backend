const Resource = require('../models/Resource');

exports.uploadResource = async (req, res) => {
  const resource = await Resource.create({
    ...req.body,
    uploadedBy: req.user._id
  });
  res.json(resource);
};

exports.getApprovedResources = async (req, res) => {
  const resources = await Resource.find({ isApproved: true });
  res.json(resources);
};

exports.approveResource = async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true }
  );
  res.json(resource);
};
