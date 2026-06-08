require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

console.log('API Key carregada:', process.env.GROQ_API_KEY ? 'Sim' : 'Não');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post('/simplificar', async (req, res) => {
  console.log('Requisição recebida em /simplificar');
  console.log('Body:', req.body);
  
  try {
    const { texto } = req.body;

    if (!texto || texto.trim() === '') {
      return res.status(400).json({ error: 'Por favor, forneça um texto para simplificar.' });
    }

    console.log('Chamando API Groq...');
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente que simplifica textos complexos para pessoas neurodivergentes (TDAH e Dislexia). Use linguagem clara, frases curtas, evite jargões e mantenha o significado original. Formate o texto de forma fácil de ler.'
        },
        {
          role: 'user',
          content: `Simplifique o seguinte texto: ${texto}`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
    });

    console.log('Resposta da API Groq recebida');
    
    const textoSimplificado = completion.choices[0]?.message?.content || 'Desculpe, não foi possível simplificar o texto.';
    res.json({ textoSimplificado });
  } catch (error) {
    console.error('Erro detalhado:', error.message);
    if (error.response) {
      console.error('Resposta do erro:', error.response.data);
    }
    res.status(500).json({ error: 'Ocorreu um erro ao simplificar o texto: ' + error.message });
  }
});

app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});