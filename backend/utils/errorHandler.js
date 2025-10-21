// utils/errorHandler.js
const handleMysqlError = (err, res) => {
  console.error(err); // Log full error for debugging

  let statusCode = 500;
  let message = 'Something went wrong';

  // Duplicate entry (violating UNIQUE constraint)
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 400;
    // Extract field name if possible
    const match = err.message.match(/for key '(.+?)'/);
    const field = match ? match[1] : 'field';
    message = `${field} must be unique`;
  }

  // Foreign key constraint failure
  else if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_ROW_IS_REFERENCED_2') {
    statusCode = 400;
    message = 'Foreign key constraint failed';
  }

  // Invalid column or table
  else if (err.code === 'ER_BAD_FIELD_ERROR') {
    statusCode = 400;
    message = `Invalid column name`;
  }

  // Syntax error in SQL query
  else if (err.code === 'ER_PARSE_ERROR') {
    statusCode = 400;
    message = 'SQL syntax error';
  }

  // Access denied (wrong user/password)
  else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    statusCode = 401;
    message = 'Database access denied';
  }

  // Connection refused or lost
  else if (err.code === 'ECONNREFUSED' || err.code === 'PROTOCOL_CONNECTION_LOST') {
    statusCode = 503;
    message = 'Database connection lost';
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default handleMysqlError;
