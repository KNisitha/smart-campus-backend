const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {

    console.log('================ ROLE CHECK ================');
    console.log('User Role:', req.user?.role);
    console.log('Allowed Roles:', allowedRoles);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log('❌ ROLE DENIED');

      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not have permission.'
      });
    }

    console.log('✅ ROLE ALLOWED');

    next();
  };
};

module.exports = authorizeRoles;