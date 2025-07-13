/* eslint-disable linebreak-style */
class AdminService {
  constructor() {
    this.baseUrl = '/api/v1/admin';
  }

  async getDashboardStats() {
    try {
      const response = await fetch(`${this.baseUrl}/dashboard-stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      throw error;
    }
  }

  async getUsers() {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getUsers:', error);
      throw error;
    }
  }

  async updateUserRole(userId, role) {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role })
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in updateUserRole:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      return true;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  }
}

export default new AdminService();