const { createClient } = require('timber-sdk-dev');

const timberClient = createClient('3f6037ccc5a2ca67c08153a1830a109r');

(async () => {
  try {
    const response = await timberClient.expense.list();
    console.log(response.data);
  } catch (err) {
    console.error('Error fetching expenses:', err);
  }
})();
