// Hotel ERP v2 - Complete Email Integration with Logs and Automatic Triggers

import express from 'express';
import nodemailer from 'nodemailer';
import prisma from '../config/prisma.js';

const router = express.Router();

// -------------------------
// Nodemailer Transporter
// -------------------------
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) console.error('Email connection error:', error);
  else console.log('Email server ready');
});

// -------------------------
// Email Templates
// -------------------------
const emailLayout = (title, content) => `
<html>
<body style="font-family:Arial;background:#f5f6fa;padding:40px;">
<table width="600" align="center" style="background:white;border-radius:10px;overflow:hidden;">
<tr><td style="background:#1e293b;color:white;padding:20px;font-size:22px;font-weight:bold;text-align:center;">Grand Horizon Hotel</td></tr>
<tr><td style="padding:30px;"><h2>${title}</h2>${content}</td></tr>
<tr><td style="background:#f1f5f9;padding:20px;text-align:center;font-size:12px;color:#555">Grand Horizon Hotel • Luxury • Comfort • Experience</td></tr>
</table>
</body>
</html>
`;

const bookingTemplate = (data) => {
  const content = `<p>Hello <b>${data.guestName}</b>,</p><p>Your booking is confirmed.</p><ul><li>Room: ${data.room}</li><li>Check-in: ${data.checkIn}</li><li>Check-out: ${data.checkOut}</li></ul>`;
  return emailLayout('Booking Confirmation', content);
};

const reservationTemplate = (data) => {
  const content = `<p>Hello <b>${data.guestName}</b>,</p><p>Your reservation is recorded.</p><p>Reservation ID: ${data.reservationId}</p>`;
  return emailLayout('Reservation Confirmed', content);
};

const orderTemplate = (data) => {
  const items = data.items.map(i => `<li>${i.name} x ${i.qty}</li>`).join('');
  const content = `<p>Hello <b>${data.guestName}</b>,</p><p>Your order has been received.</p><ul>${items}</ul><p>Total: $${data.total}</p>`;
  return emailLayout('Order Confirmation', content);
};

const preArrivalTemplate = (data) => {
  const content = `<p>Hello <b>${data.guestName}</b>,</p><p>Your stay is coming soon!</p><p>Check-in Date: ${data.checkIn}</p>`;
  return emailLayout('Your Stay is Coming Soon', content);
};

// -------------------------
// Send Email & Log
// -------------------------
export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `Grand Horizon Hotel <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    // Log in database
    await prisma.emailLog.create({
      data: { to, subject, status: 'sent' }
    });
  } catch (error) {
    await prisma.emailLog.create({
      data: { to, subject, status: 'failed' }
    });
    throw error;
  }
};

// -------------------------
// Automatic Triggers
// -------------------------
export const triggerBookingEmail = async (booking) => {
  const html = bookingTemplate(booking);
  await sendEmail(booking.email, 'Booking Confirmation', html);
};

export const triggerReservationEmail = async (reservation) => {
  const html = reservationTemplate(reservation);
  await sendEmail(reservation.email, 'Reservation Confirmed', html);
};

export const triggerOrderEmail = async (order) => {
  const html = orderTemplate(order);
  await sendEmail(order.email, 'Order Confirmation', html);
};

export const triggerPreArrivalEmail = async (guest) => {
  const html = preArrivalTemplate(guest);
  await sendEmail(guest.email, 'Your Stay is Coming Soon', html);
};

export const runPreArrivalScheduler = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const bookings = await prisma.reservation.findMany({
    where: { checkIn: { gte: new Date() } },
    include: { user: true, room: true }
  });

  for (const b of bookings) {
    const checkInDate = new Date(b.checkIn);
    if (checkInDate.toDateString() === tomorrow.toDateString()) {
      await triggerPreArrivalEmail({
        guestName: b.user.username,
        email: b.user.email,
        checkIn: b.checkIn
      });
    }
  }
};

// -------------------------
// Express Routes
// -------------------------
router.post('/booking', async (req, res) => {
  try {
    await triggerBookingEmail(req.body);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err }); }
});

router.post('/reservation', async (req, res) => {
  try {
    await triggerReservationEmail(req.body);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err }); }
});

router.post('/order', async (req, res) => {
  try {
    await triggerOrderEmail(req.body);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err }); }
});

router.get('/logs', async (req, res) => {
  const logs = await prisma.emailLog.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(logs);
});

export default router;
