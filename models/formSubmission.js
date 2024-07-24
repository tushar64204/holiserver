const mongoose = require('mongoose');
const Joi = require('joi');

const formSubmissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workplace: { type: String, required: true },
    contact: { type: String, required: true },
    clientemail: { type: String, required: true },
    demoApproved: { type: String, enum: ['Yes', 'No'], required: true },
    nextMeetingDate: { type: Date, required: true },
    specialPrice: { type: Number, required: true },
    meetingOutput: { type: String, required: true },
    employeeId: { type: String, optional: true },
    owner: { type: String, required: true },
    uniqueId: { type: String, optional: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports = { FormSubmission };
