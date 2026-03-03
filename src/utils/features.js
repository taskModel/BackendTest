export const checkEmailFormat = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const response = (res, status = 200, message, data = []) => {
  res.status(status).json({
    success: true,
    message,
    users_count: data.length || 1,
    data,
  });
};
