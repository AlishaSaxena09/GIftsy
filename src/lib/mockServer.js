import md5 from "md5";
import { nanoid } from "nanoid";
import createResource from "./createResource";
import productMockData from "./mock-data/product";

const User = createResource("users");
const Product = createResource("products", productMockData);
const SessionToken = createResource("session_tokens", []);
const Order = createResource("orders", []);

export const getProducts = () => {
  return Product.getAll();
};

export const getDiscounts = () => {
  return Product.getAll().slice(0, 4);
};

export const createAccount = ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    return {
      success: false,
      message: "Invalid fields!",
    };
  }
  const user = User.findByFields({ email: email.trim().toLowerCase() });
  if (!user) {
    User.create({
      id: nanoid(8),
      email: email.trim().toLowerCase(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      password: md5(password),
    });
    return {
      success: true,
      message: "Account created. You may login now!",
    };
  }
  return {
    success: false,
    message: "Account already exists with same email address!",
  };
};

export const loginUser = ({ email, password }) => {
  if (!email || !password) {
    return {
      success: false,
      message: "Invalid Credentials!",
    };
  }
  const user = User.findByFields({ email: email.trim().toLowerCase() });
  if (!user) {
    return {
      success: false,
      message: "Invalid Credentials!",
    };
  }
  if (md5(password) !== user.password) {
    return {
      success: false,
      message: "Invalid Credentials!",
    };
  }

  const token = nanoid(20);
  SessionToken.create({ id: token, userId: user.id });
  return {
    success: true,
    token,
    user,
    message: "You're successfully logged in!",
  };
};

export const getMe = ({ token }) => {
  const sessionRecord = SessionToken.getById(token);
  const user = User.getById(sessionRecord.userId);
  if (!user) {
    return {
      success: false,
      message: "Invalid Credentials!",
    };
  }

  return {
    success: true,
    user,
  };
};

export const createOrder = ({ token, products, totalPrice }) => {
  const sessionRecord = SessionToken.getById(token);
  const user = User.getById(sessionRecord.userId);
  if (!user) {
    return {
      success: false,
      message: "Invalid Credentials!",
    };
  }
  if (!totalPrice) {
    return {
      success: false,
      message: "Invalid Order!",
    };
  }

  Order.create({
    products,
    totalPrice,
    userId: user.id,
    creationTime: Date.now(),
  });

  return { success: true };
};
export const getPreviousOrders = ({ token }) => {
  const sessionRecord = SessionToken.getById(token);
  const user = User.getById(sessionRecord.userId);
  if (!user) {
    return {
      success: false,
      message: "Invalid Credentials!",
    };
  }
  return Order.getAllByFields({
    userId: user.id,
  });
};
