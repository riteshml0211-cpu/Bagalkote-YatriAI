import { GoogleGenAI } from '@google/genai';

const LOCAL_KNOWLEDGE = `
Bagalkote District Heritage Knowledge Base:
- Badami: Capital of Badami Chalukyas (543–753 CE). Famous for 4 rock-cut cave temples: Cave 1 (Shaivite, 18-armed Nataraja with 81 mudras), Cave 2 (Vaishnavite, Trivikrama), Cave 3 (consecrated 578 CE by King Mangalesha, magnificent Varaha and Narasimha), Cave 4 (Jain Tirthankaras Mahavira and Parshvanatha).
- Agastya Lake & Bhootanatha Temples: 7th-century sandstone shrines projecting into holy lake; best sunset viewpoint in Karnataka.
- Pattadakal (UNESCO World Heritage Site): Group of 8th-century monuments on Malaprabha river. Virupaksha Temple built in 740 CE by Queen Lokamahadevi commemorating King Vikramaditya II's victory over Pallavas; served as model for Kailasa temple at Ellora.
- Aihole: Known as the Cradle of Indian Temple Architecture with over 120 stone temples from 450–750 CE. Famous apsidal (horseshoe-shaped) Durga temple, Lad Khan temple, and Ravana Phadi cave.
- Mahakuta: 6th-7th century sacred Shaivite complex nestled in banyan grove with perennial natural spring pool (Vishnu Pushkarini) and submerged 4-faced Shiva Linga.
- Banashankari Devi: Kuladevi of Chalukyas at Cholachagudd with grand Haridra Tirtha lake and stepped lamp towers.
- Kudalasangama: Holy confluence of Krishna and Malaprabha rivers, where 12th-century social reformer and philosopher Jagadguru Basaveshwara studied and attained Mahasamadhi (Aikya Mantapa).
- Ilkal Sarees & Guledgudda Khun: GI Tag #43 certified handloom weaving since 8th century, famous for Topetenchi/Topetenwe pallu and ancient Kondi joint technique.
- Food: Jolada Rotti, Ennegayi (spiced baby brinjals), Shenga chutney powder with curd, Shenga Holige, Girmit, Mirchi Bajji.
`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message = '', language = 'en', history = [] } = req.body || {};

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && message) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are "YatriAI", the warm, expert, bilingual cultural travel guide for Bagalkote District (Badami, Pattadakal, Aihole, Mahakuta, Banashankari, Kudalasangama, Ilkal).
Respond in ${language === 'kn' ? 'fluent conversational Kannada (ಕನ್ನಡ)' : 'fluent, engaging English'}.
Answer the user's question concisely with rich cultural insights, practical travel tips, and authentic local knowledge.

Context:
${LOCAL_KNOWLEDGE}

User message: ${message}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({
        reply: response.text || 'Information retrieved.',
        source: 'gemini',
      });
    } catch (e: any) {
      console.warn('Gemini chat error on serverless:', e);
    }
  }

  return res.json({
    reply:
      language === 'kn'
        ? 'ಬಾಗಲಕೋಟೆ ಯಾತ್ರಿಯಲ್ಲಿ ಬಾದಾಮಿ ಗುಹೆಗಳು, ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ತಾಣ, ಐಹೊಳೆ, ಭೂತನಾಥ ದೇವಾಲಯ, ಮಹಾಕೂಟ, ಕುಡಲಸಂಗಮ ಅಥವಾ ಇಳಕಲ್ ಸೀರೆಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ಯಾವುದೇ ಮಾಹಿತಿ ಬೇಕಿದ್ದರೂ ಕೇಳಬಹುದು!'
        : 'Welcome to Bagalkote YatriAI! Feel free to ask about Badami cave sculptures, UNESCO Pattadakal, Aihole architecture, Bhootanatha sunset, local Jolada Rotti dining, or direct Ilkal handloom purchases.',
    source: 'knowledge-base',
  });
}
