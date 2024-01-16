export const getTokenUsername = (token) => {
    if (!token) {
      return null;
    }
  
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      // Invalid token format
      return null;
    }
  
    try {
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload.userName || null;
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return null;
    }
  };