const { createClient } = require('timber-sdk-dev');

const timberClient = createClient('3f6037ccc5a2ca67c08153a1830a109r');

(async () => {
  try {
    // const response = await timberClient.expense.list();
    const response = await timberClient.billPayment.list({invoice:'67ff852d7fafc6b339ce2500'});
    console.log(response.data);
  } catch (err) {
    console.error('Error fetching expenses:', err);
  }
})();
