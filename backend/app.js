const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const planRoutes = require('./routes/plans');
const checklistRoutes = require('./routes/checklist');
const reportRoutes = require('./routes/reports');
const paymentRoutes = require('./routes/payments');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/matrix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});