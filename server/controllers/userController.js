const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

exports.getMe = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const users = await User.find({ _id: { $ne: currentUser._id } });
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});
