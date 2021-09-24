const options = {
  host: process.env.BUDGETIM_HOST,
  user: process.env.BUDGETIM_USER,
  password: process.env.BUDGETIM_PASSWORD,
  database: process.env.BUDGETIM_DATABASE,
  port: +process.env.BUDGETIM_PORT,
};

console.log('opt', options);
export { options };
