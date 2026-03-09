// backend/src/routes/emailRoutes.js
import express from "express";
import { triggerBookingEmail, triggerReservationEmail, triggerOrderEmail } from "../services/email.js";

const router = express.Router();

router.post("/booking", async (req, res) => {
  try {
    await triggerBookingEmail(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/reservation", async (req, res) => {
  try {
    await triggerReservationEmail(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TODO: add /order, /logs endpoints

export default router;