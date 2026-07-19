/**
 * CARD Technocrats & Engineers LLP - System Module
 * 
 * Senior Developer Notes:
 * - Supporting component powering the corporate engineering advisory portal.
 */

class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
