
export const getData = async () => {
    try {
      const response = await fetch("/course.json"); 
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  export const updateData = async (updatedData) => {
    try {
      await fetch("/course.json", {
        method: "PUT", // or "POST" depending on your needs
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };
  