import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Modality } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON with large limits for base64 image uploads
  app.use(express.json({ limit: '20mb' }));

  // Initialize Gemini AI client lazy or top-level with process.env.GEMINI_API_KEY
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not defined.');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: 'ELITE Luxury Fashion' });
  });

  // 1. AI Fashion Stylist Chatbot Route
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'پیام ارسال نشده است.' });
      }

      const ai = getGenAI();
      const systemInstruction = `
شما "مشاور هوشمند استایل و مد برند لوکس الیت (ELITE)" هستید.
وظیفه شما راهنمایی مشتریان ایرانی در انتخاب لباس، پالتو، کت و شلوار، مانتو، کیف و کفش چرم و ست کردن رنگ‌ها بر اساس ترند روز، فصل و مناسبت‌ها است.
لحن شما بسیار محترمانه، فاخر، لوکس، صمیمی و حرفه‌ای است.
پاسخ‌ها را کاملاً به زبان فارسی شلیس، روان و زیبا بنویسید.
در صورت نیاز، پیشنهاد بدهید که کاربر از محصولات کالکشن جدید الیت (مثل پالتوهای کشمیر، کت و شلوارهای پشمی ایتالیایی و شال‌های ابریشمی) دیدن کند.
پاسخ‌ها کوتاه، کاربردی و جذاب باشند.
`;

      const chatMessages = (history || []).map((h: { sender: string; text: string }) => ({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      }));

      chatMessages.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: chatMessages,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'در حال حاضر مشاور هوشمند در دسترس نیست، لطفاً دوباره تلاش کنید.';
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      res.status(500).json({
        reply: 'متأسفانه در برقراری ارتباط با مشاور هوشمند مشکلی پیش آمده است. لطفاً لحظاتی دیگر تلاش کنید.',
      });
    }
  });

  // 2. Visual Search / Image Analysis Route
  app.post('/api/analyze-image', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', prompt = 'تحلیل استایل این پوشاک و پیشنهاد ست با کالکشن الیت' } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'تصویر دریافت نشد.' });
      }

      // Clean base64 string if data URL prefix exists
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType,
              },
            },
            {
              text: `به عنوان کارشناس ارشد مد و فشن برند ELITE، تصویر ارسال شده را به زبان فارسی تحلیل کن:
1. جنس، رنگ و استایل لباس داخل تصویر چیست؟
2. این لباس برای چه مناسبت‌هایی (رسمی، نیمه‌رسمی، روزمره) مناسب است؟
3. ۳ پیشنهاد ست‌سازی با محصولات لوکس (پالتو کشمیر، کیف چرم طبیعی، شال ابریشم یا کت‌وشلوار) ارائه کن.
پاسخ را شکیل، مرتب و با لحنی لوکس و مشوق بنویس.`,
            },
          ],
        },
      });

      const analysisText = response.text || 'تحلیل تصویر امکان‌پذیر نشد.';
      res.json({ analysis: analysisText });
    } catch (err: any) {
      console.error('Error in /api/analyze-image:', err);
      res.status(500).json({
        error: 'خطا در تحلیل تصویر با هوش مصنوعی.',
        analysis: 'این تصویر لباس با تم کلاسیک و الیاف باکیفیت همخوانی دارد. پیشنهاد می‌شود آن را با پالتو کشمیر خاکی یا کیف چرم تبریز الیت ست نمایید.',
      });
    }
  });

  // 3. Text-to-Speech (TTS) Route
  app.post('/api/tts', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'متن ارائه نشده است.' });
      }

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: [{ parts: [{ text: `خوانش با لحن شیک و فاخر: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        res.json({ audioBase64: base64Audio });
      } else {
        res.status(500).json({ error: 'صدا تولید نشد.' });
      }
    } catch (err: any) {
      console.error('Error in /api/tts:', err);
      res.status(500).json({ error: 'خطا در تولید فایل صوتی.' });
    }
  });

  // Vite Middleware handling development mode vs production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server ELITE Fashion is running on http://localhost:${PORT}`);
  });
}

startServer();
