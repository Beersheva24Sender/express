import express from 'express';
import Joi from 'joi';

const schemaPost = Joi.object({
    "id": Joi.string().alphanum().pattern(/^J\d{3}/).required(),
    "name": Joi.string().valid("Front-End", "JAVA", "Back-End", "Node", "AWS", "C++").required(),
    "description": Joi.string().required(),
})

const schemaPut = Joi.object({
    "id": Joi.string().alphanum().pattern(/^J\d{3}/),
    "name": Joi.string().valid("Front-End", "JAVA", "Back-End", "Node", "AWS", "C++"),
    "description": Joi.string(),
})

const courses = {
    123: { id: '123', name: 'node', description: 'node description' },
    456: { id: '456', name: 'express', description: 'express description' },
    789: { id: '789', name: 'mongodb', description: 'mongodb description' },
};

const app = express();
const port = process.env.PORT || 3500;
app.use(express.json());

app.post('/api/v1/courses', (req, res) => {



    const { error } = schemaPost.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).send(error.details.map(d => d.message).join(";"));
    } else {
        const id = req.body.id;
        courses[id] = req.body;
        res.status(201).send(courses.id);
    }
});

app.get('/api/v1/courses/:id', (req, res) => {
    res.send(courses[req.params.id]).status(200);
});

app.put('/api/v1/courses/:id', (req, res) => {
    const id = req.params.id;
    courses[id] = { ...courses[id], ...req.body };
    res.send(courses[id]).status(200);
});

app.delete('/api/v1/courses/:id', (req, res) => {
    delete courses[req.params.id];
    res.send("deleted").status(200);
});

app.get('/api/v1/courses', (req, res) => {
    const { name, description } = req.query;
    res.send(Object.values(courses).filter(c => (name ? c.name === name : true)
        && (description ? c.description === description : true)))
});

app.listen(port, () => console.log(`server is listening on ${port}`));