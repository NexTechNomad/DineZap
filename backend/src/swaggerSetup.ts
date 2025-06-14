import { readFileSync } from "fs";
import { join } from "path";
import * as yaml from "js-yaml";
import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const authRoutes = yaml.load(
  readFileSync(join(__dirname, "../docs/authRoutes.yaml"), "utf8")
) as any;
const subscriptionRoutes = yaml.load(
  readFileSync(join(__dirname, "../docs/subscriptionRoutes.yaml"), "utf8")
) as any;
const customerRoutes = yaml.load(
  readFileSync(join(__dirname, "../docs/customerRoutes.yaml"), "utf8")
) as any;
const orderRoutes = yaml.load(
  readFileSync(join(__dirname, "../docs/orderRoutes.yaml"), "utf8")
) as any;
const restaurantRoutes = yaml.load(
  readFileSync(join(__dirname, "../docs/restaurantRoutes.yaml"), "utf8")
) as any;
const menuRoutes = yaml.load(
  readFileSync(join(__dirname, "../docs/menuRoutes.yaml"), "utf8")
) as any;

const combinedSchemas = {
  Restaurant: authRoutes.components.schemas.Restaurant,
  ErrorResponse: authRoutes.components.schemas.ErrorResponse,
  RegisterRestaurantRequest:
    authRoutes.components.schemas.RegisterRestaurantRequest,
  RegisterRestaurantResponse:
    authRoutes.components.schemas.RegisterRestaurantResponse,
  LoginRestaurantRequest: authRoutes.components.schemas.LoginRestaurantRequest,
  LoginRestaurantResponse:
    authRoutes.components.schemas.LoginRestaurantResponse,
  Subscription: subscriptionRoutes.components.schemas.Subscription,
  ActivateSubscriptionRequest:
    subscriptionRoutes.components.schemas.ActivateSubscriptionRequest,
  VerifyPaymentRequest:
    subscriptionRoutes.components.schemas.VerifyPaymentRequest,
  SubscriptionResponse:
    subscriptionRoutes.components.schemas.SubscriptionResponse,
  MenuItem: customerRoutes.components.schemas.MenuItem,
  MenuCategory: customerRoutes.components.schemas.MenuCategory,
  Menu: customerRoutes.components.schemas.Menu,
  Table: customerRoutes.components.schemas.Table,
  MenuAndTableResponse: customerRoutes.components.schemas.MenuAndTableResponse,
  TrackOrderRequest: customerRoutes.components.schemas.TrackOrderRequest,
  Order: customerRoutes.components.schemas.Order,
  OrderItem: customerRoutes.components.schemas.OrderItem,
  CreateOrderRequest: orderRoutes.components.schemas.CreateOrderRequest,
  UpdateOrderStatusRequest:
    orderRoutes.components.schemas.UpdateOrderStatusRequest,
  OrderAnalytics: orderRoutes.components.schemas.OrderAnalytics,
  UpdateRestaurantRequest:
    restaurantRoutes.components.schemas.UpdateRestaurantRequest,
  RestaurantAnalytics: restaurantRoutes.components.schemas.RestaurantAnalytics,
  CreateTablesRequest: restaurantRoutes.components.schemas.CreateTablesRequest,
  UpdateMenuRequest: menuRoutes.components.schemas.UpdateMenuRequest,
  AddMenuItemRequest: menuRoutes.components.schemas.AddMenuItemRequest,
  UpdateMenuItemRequest: menuRoutes.components.schemas.UpdateMenuItemRequest,
  DeleteMenuItemRequest: menuRoutes.components.schemas.DeleteMenuItemRequest,
};

const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "DineZap API",
    version: "1.0.0",
    description:
      "API for managing restaurants, orders, menus, customers, and subscriptions",
  },
  servers: [{ url: "/api", description: "Local server" }],
  paths: {
    ...authRoutes.paths,
    ...subscriptionRoutes.paths,
    ...customerRoutes.paths,
    ...orderRoutes.paths,
    ...restaurantRoutes.paths,
    ...menuRoutes.paths,
  },
  components: {
    schemas: combinedSchemas,
    securitySchemes: authRoutes.components.securitySchemes,
  },
};

const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export { setupSwagger };
