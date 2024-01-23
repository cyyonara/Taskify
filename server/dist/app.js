"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const task_router_1 = __importDefault(require("./routes/task.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const errorHandler_1 = require("./middlewares/errorHandler");
const connect_1 = require("./config/connect");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT || 4001;
(0, connect_1.connect)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(
  (0, cors_1.default)({
    credentials: true,
    origin: ["https://taskify-rosy-nine.vercel.app"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/auth", auth_router_1.default);
app.use("/api/tasks", task_router_1.default);
app.use("/api/user", user_router_1.default);
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
server.listen(port, () => console.log(`Server is running at port ${port}`));
