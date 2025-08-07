/**
 * Copies text to clipboard with fallback support
 * @param {string} text - The text to copy to clipboard
 * @returns {Promise<boolean>} - Returns true if copy was successful, false otherwise
 */
export const copyToClipboard = async (text) => {
  try {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for environments where clipboard API is not available
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      
      return successful;
    }
  } catch (error) {
    console.error("Error copying text to clipboard:", error);
    
    // Try fallback method if modern API failed
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      
      if (!successful) {
        console.error("Fallback copy also failed");
      }
      
      return successful;
    } catch (fallbackError) {
      console.error("Fallback copy also failed:", fallbackError);
      return false;
    }
  }
};
