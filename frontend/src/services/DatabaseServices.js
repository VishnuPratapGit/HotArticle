class DatabaseServices {
  constructor() {
    // ${import.meta.env.VITE_BACKEND_URL}
    this.BASE_URL = `/api/v1`;
  }

  async getCurrentUser() {
    try {
      const response = await fetch(`${this.BASE_URL}/user/getuser`, {
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
      const response = await fetch(`${this.BASE_URL}/user/login`, {
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
      const response = await fetch(`${this.BASE_URL}/user/signup`, {
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
      const response = await fetch(`${this.BASE_URL}/user/logout`, {
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

  async fetchArticles() {
    try {
      const response = await fetch(`${this.BASE_URL}/articles/get`, {
        method: "GET",
        credentials: "include",
      });

      const dataObj = await response.json();

      if (!response.ok) return null;

      return dataObj.data;
    } catch (error) {
      console.log("Failed to fetch articles");
      return null;
    }
  }
}

const databaseServices = new DatabaseServices();

export default databaseServices;
