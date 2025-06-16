export const errorResponse = (error) => {
 const response = error.response;
      const data = response.data;
      if (data && typeof data === 'object') {
        Object.entries(data).forEach(([field, messages]) => {
          console.log(`${field}: ${messages[0]}`);
        });
      }
}