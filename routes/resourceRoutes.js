const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const {
  uploadResource,
  getApprovedResources,
  approveResource
} = require('../controllers/resourceController');

router.post('/', auth, role('ngo', 'admin'), uploadResource);
router.get('/', auth, getApprovedResources);
router.put('/:id/approve', auth, role('admin'), approveResource);

module.exports = router;
