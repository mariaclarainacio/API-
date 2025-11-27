const mongoose = require('mongoose');

const connectDB = async (uri = process.env.MONGODB_URI) => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado ao MongoDB');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;