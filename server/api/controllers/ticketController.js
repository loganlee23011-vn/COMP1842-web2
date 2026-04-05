const mongoose = require("mongoose");
const Ticket = mongoose.model("Ticket");

exports.list_all_tickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).sort({ updatedAt: -1, ticketCode: 1 });
    return res.json(tickets);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.create_a_ticket = async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    const ticket = await newTicket.save();
    return res.json(ticket);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.read_a_ticket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    return res.json(ticket);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.update_a_ticket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.ticketId,
      req.body,
      { new: true, runValidators: true }
    );
    return res.json(ticket);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.delete_a_ticket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.ticketId);
    return res.json({ message: "Ticket successfully deleted" });
  } catch (err) {
    return res.status(500).send(err);
  }
};
