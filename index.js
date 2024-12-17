const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Update CORS configuration
app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? process.env.FRONTEND_URL
				: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

// Serve static files (e.g., data.csv)
app.use(express.static(path.join(__dirname, "public")));

let users = [
	{ id: 1, username: "user1", password: "$2b$10$1234567890123456789012" },
];

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

app.post("/api/signup", async (req, res) => {
    console.log(process.env.FRONTEND_URL);
	const { username, password } = req.body;

	if (users.find((u) => u.username === username)) {
		res.status(400).json({ message: "Username already exists" });
		return;
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = {
		id: users.length + 1,
		username,
		password: hashedPassword,
	};

	users.push(newUser);

	const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, {
		expiresIn: "1h",
	});
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		maxAge: 3600000, // 1 hour
	});
	res.status(201).json({ message: "User created successfully" });
});

app.post("/api/login", async (req, res) => {
	const { username, password } = req.body;
	const user = users.find((u) => u.username === username);

	if (user && (await bcrypt.compare(password, user.password))) {
		const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
			expiresIn: "1h",
		});
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			maxAge: 3600000, // 1 hour
		});
		res.json({ message: "Logged in successfully" });
	} else {
		res.status(401).json({ message: "Invalid credentials" });
	}
});

app.post("/api/logout", (req, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	});
	res.json({ message: "Logged out successfully" });
});

app.get("/api/check-auth", (req, res) => {
	const token = req.cookies.token;
	if (!token) {
		res.status(401).json({ message: "Not authenticated" });
		return;
	}

	try {
		jwt.verify(token, SECRET_KEY);
		res.json({ message: "Authenticated" });
	} catch (error) {
		res.status(401).json({ message: "Invalid token" });
	}
});

app.get("/api/data", (req, res) => {
	const filePath = path.join(__dirname, "public", "data.csv");
	res.sendFile(filePath);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
