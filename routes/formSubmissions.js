const router = require('express').Router();
const { FormSubmission } = require('../models/formSubmission');
const Joi = require('joi');

// POST route to handle form submissions
router.post('/', async (req, res) => {
    try {
        // Validate the incoming request body
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Log received form data for debugging
        console.log('Form Data Received:', req.body);

        // Create and save the new form submission
        await new FormSubmission(req.body).save();
        res.status(201).send({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Function to validate the incoming request body
const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label('Name'),
        workplace: Joi.string().required().label('Workplace'),
        contact: Joi.string().required().label('Contact'),
        clientemail: Joi.string().required().label('clientemail'),
        demoApproved: Joi.string().valid('Yes', 'No').required().label('Demo Approved'),
        nextMeetingDate: Joi.date().required().label('Next Meeting Date'),
        specialPrice: Joi.number().required().label('Special Price'),
        meetingOutput: Joi.string().required().label('Meeting Output'),
        employeeId: Joi.string().optional().label('Employee ID'),
        owner: Joi.string().required().label('Owner'),
        uniqueId: Joi.string().optional().label('Unique ID'),
        date: Joi.date().required().label('Date'),
        time: Joi.string().required().label('Time'),
    });
    return schema.validate(data);
};

module.exports = router;
