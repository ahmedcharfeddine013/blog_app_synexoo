// Define the User interface
interface User {
    id: string;
    // Add other properties of your User model if needed
  }
  
  // Define the Result interface
  interface Result {
    success: boolean;
    error?: string | Record<string, string>;
  }
  
  // Define the FormData interface
  interface FormData {
    title: string;
    summary: string;
    content: string;
    cover: File;
  }
  