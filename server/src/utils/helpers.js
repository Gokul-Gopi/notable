export const getErrorCodeAndMessage = (error) => {
  if (error.name === "MongoServerError") {
    return getMongoErrorMessage(error);
  } else {
    const status = error?.status_code || 400;
    const message = error?.message || "Something went wrong";
    return { status, message };
  }
};

export const getMongoErrorMessage = (error) => {
  const field = Object.keys(error.keyValue)[0];

  let code = error.code;
  switch (code) {
    case 11000:
      return { status: 400, message: `${field} already registered` };

    default:
      return { status: 500, message: "Database error" };
  }
};

export const validateBody = (schema, body) => {
  return new Promise((resolve, reject) => {
    const { value, error } = schema.validate(body);
    if (error) {
      reject({ success: false, message: error.details[0].message });
    } else {
      resolve(value);
    }
  });
};
