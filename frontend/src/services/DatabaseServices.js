class DatabaseServices {
  constructor() {
    // ${import.meta.env.VITE_BACKEND_URL}
    this.BASE_URL = `/api/v1/user`;
  }

  async getCurrentUser() {
    try {
      const response = await fetch(`${this.BASE_URL}/getuser`, {
        method: "GET",
        credentials: "include",
      });

      const userData = await response.json();

      if (!response.ok) {
        console.log(userData);
        return null;
      } else {
        return userData;
      }
    } catch (error) {
      console.log("Failed to fetch user data", error);
      return null;
    }
  }

  async login(inputData) {
    try {
      const response = await fetch(`${this.BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inputData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("Request not sent: ", error);
    }
  }

  async signup(inputData) {
    try {
      const response = await fetch(`${this.BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  }

  async logout() {
    try {
      const response = await fetch(`${this.BASE_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    }
  }
}

const databaseServices = new DatabaseServices();

export default databaseServices;
