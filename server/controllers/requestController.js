import Request from '../models/Request.js';

export const submitRequest = async (req, res) => {
  try {
    const request = await Request.create({ ...req.body, userId: req.user.id });
    res.status(201).json(request);
  } catch (err) {
    console.error("error submitting req" + err?.message);
    res.status(400).json({ error: 'Invalid submission' });
  }
};

export const getUserRequests = async (req, res) => {
  const requests = await Request.find({ userId: req.user.id });
  res.json(requests);
};

export const getAllRequestsWithStats = async (req, res) => {
  const requests = await Request.find();
  const stats = {
    recycled: requests.filter(r => r.type === 'recycle').length,
    upcycled: requests.filter(r => r.type === 'upcycle').length,
    pending: requests.filter(r => r.status === 'pending').length,
    accepted: requests.filter(r => r.status === 'accepted').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };
  res.json({ requests, stats });
};

export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await Request.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
};
