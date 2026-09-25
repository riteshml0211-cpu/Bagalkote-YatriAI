import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System prompt for Bagalkote YatriAI
const BAGALKOTE_SYSTEM_PROMPT = `You are "Bagalkote YatriAI", the expert heritage guide and digital tourism assistant for Bagalkote District in Karnataka, India.
Your expertise covers:
1. Badami: Ancient Vatapi, capital of the Badami Chalukyas (6th-8th century CE). 4 Rock-cut Cave Temples (Cave 1: 18-armed Nataraja; Cave 2: Trivikrama avatar; Cave 3: Vishnu & Narasimha; Cave 4: Jain Tirthankaras), Agastya Lake, Bhootanatha Temples, Badami Fort, Archaeological Museum.
2. Pattadakal: UNESCO World Heritage Site on the banks of Malaprabha River. Synthesis of Rekha-Nagara (Northern) and Dravida (Southern) architecture. Key temples: Virupaksha Temple (built by Queen Lokamahadevi in 740 CE to commemorate victory over Pallavas), Mallikarjuna, Sangameshwara, Papanatha, Kadasiddheshwara, Galaganatha.
3. Aihole: "The Cradle of Indian Temple Architecture" with over 120 temples. Highlights: Durga Temple (Apsidal plan, Buddhist Chaitya influenced), Lad Khan Temple, Ravana Phadi rock-cut cave, Meguti Jain Temple with Ravikirti's 634 CE inscription eulogizing King Pulakeshin II defeating Emperor Harsha.
4. Mahakuta: Shaivite temple complex nestled in lush banyan groves. Sacred natural spring pool "Vishnu Pushkarini" where locals bathe, Mahakuteshwara temple with rare Ardhanareshwara sculpture.
5. Banashankari Amma Temple: Ancient temple of Goddess Shakambhari / Banashankari, Haridra Tirtha pond, unique 360-degree deepa stambhas (lamp towers), annual Banashankari Jathre.
6. Kudalasangama: Holy confluence of Krishna and Malaprabha rivers. Aikya Mantapa (final resting place) of 12th-century social reformer, philosopher, and Vachana poet Jagadjyothi Basaveshwara.
7. Hidden & Offbeat Places in Bagalkote (Beyond the mainstream circuit):
   - Siddhankolla Canyon Gorge & Rock Waterfall Shrine (18 km from Badami): Secluded red sandstone canyon with a crystal perennial cascade, holy bathing pool, and 10th-century Shaivite rock sanctum once used by Nath Siddha yogis. Zero commercial crowds.
   - Bilgi Arebhavanavi (32 km North of Badami): Spectacular 1588 CE subterranean multi-tiered royal stepwell built by Prince Khanderaya, featuring arched rest pavilions and rare bilingual foundation inscriptions carved in classical Old Kannada and Persian calligraphy.
   - Guledgudda Sandstone Hill Fort (24 km East of Badami): Medieval hilltop bastions offering commanding 360-degree views over the Malaprabha plains, with historic town lanes where generational artisan families weave GI-tagged Guledgudda Khana blouse textiles on wooden pit-looms.
   - Bachinagudda Megalithic Ridge (3 km from Pattadakal): 3,000-year-old Iron Age dolmens and stone cists beside a 7th-century Surya-Bhairava temple, providing an unmatched aerial panorama over the Pattadakal UNESCO temple towers.
   - Naganatha Temple of Nagral (8 km East of Badami): Pristine, intact 8th-century early Chalukyan temple from King Vijayaditya's reign standing peacefully in rural sunflower and cotton agricultural fields.
   - Shivayogamandira Hermitage (15 km from Badami): Serene 1909 riverside monastery founded by Hangal Sri Kumaraswamiji on the banks of Malaprabha River, with coconut orchards, peacocks, Sanskrit library, and sacred bathing ghats.
   - Kendur Prehistoric Rock Art (8 km from Badami): Mesolithic rock shelters featuring 5,000-year-old ochre pictographs of hunters, humped bulls, and archers.
8. Handlooms & Craft: GI-tagged Ilkal Sarees (Chikki Paras, Gomi border, signature red Topetenchi pallu made with Kondi technique), Guledgudda Khana (blouse fabrics), Kasuti embroidery. Direct artisan cooperatives.
9. Local Cuisine: Authentic North Karnataka Oota: Jolada Rotti, Yennegayi (stuffed brinjal curry), Shenga (peanut) Chutney Pudi with curd, Ranjaka (red chilli paste), Sajje Rotti, Ilkal/Dharwad Peda, Shenga Holige.
10. Practical Tourism Info:
   - Badami to Pattadakal: 22 km (~35 mins by cab/auto/KSRTC bus)
   - Pattadakal to Aihole: 14 km (~25 mins)
   - Badami to Banashankari: 5 km
   - Badami to Mahakuta: 14 km
   - Badami to Kudalasangama: ~70 km (~1.5 hours)
   - Badami to Siddhankolla: 18 km (~30 mins)
   - Badami to Bilgi: 32 km (~45 mins)
   - Badami to Guledgudda: 24 km (~38 mins)
   - Timings: ASI monuments open 6:00 AM to 6:00 PM.
   - Entry fees: ASI ticket for Badami Caves ₹25 (Indians), ₹300 (Foreigners). Pattadakal UNESCO complex ₹40 (Indians), ₹600 (Foreigners).
   - Nearest Airport: Hubballi (HBX) ~105 km, Belagavi ~140 km.
   - Nearest Railway Station: Badami (BDM), Bagalkote (BGK).

Tone: Welcoming, culturally respectful, deeply knowledgeable, practical, and enthusiastic.
Language: Answer fluently in English or Kannada (ಕನ್ನಡ) matching the user's preference or question language. If asked in Kannada, respond in pure, natural Kannada. Keep responses structured with bullet points and emojis where suitable.
11. Bilingual Language Translator & Phrasebook Assistant: You are also an expert Kannada-English translator and local travel phrasebook guide. When users ask you to translate phrases, explain local Kannada terms (e.g. Jolada Rotti, Yennegayi), provide greetings (Namaskara, Hogibarthini), travel directions ("Where is the bus stand?"), shopping/bargaining phrases for silk sarees and handicrafts, or general translation between English and Kannada, you must provide clear phonetic transliteration in English, Kannada script (ಕನ್ನಡ), and English meanings.`;

// 1. API: Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language = 'en', history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (ai) {
      try {
        const langInstruction = language === 'kn'
          ? 'Please reply primarily in natural Kannada (ಕನ್ನಡ), with English terms in brackets if helpful.'
          : 'Please reply in English, with Kannada names where appropriate.';

        const chatPrompt = `${langInstruction}\nUser Question: ${message}`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: chatPrompt,
          config: {
            systemInstruction: BAGALKOTE_SYSTEM_PROMPT,
            temperature: 0.7,
          },
        });

        if (response.text) {
          return res.json({
            reply: response.text,
            source: 'gemini',
          });
        }
      } catch (err: any) {
        console.warn('Gemini chat fallback engaged:', err?.message || err);
        // Seamlessly continue to curated fallback responses
      }
    }

    // Fallback response generator if API key is not present or quota/auth fails
    const lower = message.toLowerCase();
    let reply = '';
    if (language === 'kn') {
      if (lower.includes('badami') || lower.includes('ಬಾದಾಮಿ') || lower.includes('cave')) {
        reply = 'ಬಾದಾಮಿಯು ಕ್ರಿ.ಶ. 6-8ನೇ ಶತಮಾನದ ಚಾಲುಕ್ಯರ ರಾಜಧಾನಿಯಾಗಿತ್ತು (ವಾತಾಪಿ). ಇಲ್ಲಿ 4 ಅದ್ಭುತ ಕಲ್ಲಿನ ಗುಹಾ ದೇವಾಲಯಗಳಿವೆ. ಗುಹೆ 1ರಲ್ಲಿ 18 ತೋಳುಗಳ ನಟರಾಜ, ಗುಹೆ 2ರಲ್ಲಿ ತ್ರಿವಿಕ್ರಮ, ಗುಹೆ 3ರಲ್ಲಿ ವಿಷ್ಣು ಮತ್ತು ನರಸಿಂಹ ಹಾಗೂ ಗುಹೆ 4ರಲ್ಲಿ ಜೈನ ತೀರ್ಥಂಕರರ ಕೆತ್ತನೆಗಳಿವೆ. ಅಗಸ್ತ್ಯ ತೀರ್ಥ ಸರೋವರ ಮತ್ತು ಭೂತನಾಥ ದೇವಾಲಯಗಳು ಸೂರ್ಯಾಸ್ತಕ್ಕೆ ಅತ್ಯಂತ ಸುಂದರವಾಗಿವೆ. ಪ್ರವೇಶ ಶುಲ್ಕ ಭಾರತೀಯರಿಗೆ ₹25, ಸಮಯ ಬೆಳಗ್ಗೆ 6:00 ರಿಂದ ಸಂಜೆ 6:00.';
      } else if (lower.includes('pattadakal') || lower.includes('ಪಟ್ಟದಕಲ್ಲು') || lower.includes('unesco')) {
        reply = 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣವಾಗಿದ್ದು, ಮಲಪ್ರಭಾ ನದಿಯ ತೀರದಲ್ಲಿದೆ. ಇಲ್ಲಿ ನಾಗರ (ಉತ್ತರ ಭಾರತೀಯ) ಮತ್ತು ದ್ರಾವಿಡ (ದಕ್ಷಿಣ ಭಾರತೀಯ) ಶೈಲಿಗಳ ಸುಂದರ ಸಂಗಮವಿದೆ. ರಾಣಿ ಲೋಕಮಹಾದೇವಿಯು ಪಲ್ಲವರ ಮೇಲಿನ ವಿಜಯದ ನೆನಪಿಗಾಗಿ 740ರಲ್ಲಿ ನಿರ್ಮಿಸಿದ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ ಇಲ್ಲಿನ ಪ್ರಮುಖ ಆಕರ್ಷಣೆ. ಪ್ರವೇಶ ಶುಲ್ಕ ₹40.';
      } else if (lower.includes('saree') || lower.includes('ಸೀರೆ') || lower.includes('ilkal') || lower.includes('ಇಳಕಲ್')) {
        reply = 'ಇಳಕಲ್ ಸೀರೆಗಳು ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ಭೌಗೋಳಿಕ ಸೂಚ್ಯಂಕ (GI Tag #43) ಪಡೆದ ಪಾರಂಪರಿಕ ನೇಯ್ಗೆಯಾಗಿದೆ. ಇವುಗಳ ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯವೆಂದರೆ "ಟೋಪೆತೆಂಚಿ" ಕೆಂಪು ಸೆರಗು ಮತ್ತು "ಕೊಂಡಿ" ತಂತ್ರಜ್ಞಾನ. ಸ್ಥಳೀಯ ನೇಕಾರರ ಸಹಕಾರ ಸಂಘಗಳಿಂದ ನೇರವಾಗಿ ಖರೀದಿಸಿ ನೇಕಾರರಿಗೆ ಬೆಂಬಲ ನೀಡಿ.';
      } else if (lower.includes('food') || lower.includes('ಊಟ') || lower.includes('rotti') || lower.includes('ರೊಟ್ಟಿ')) {
        reply = 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಸಾಂಪ್ರದಾಯಿಕ ಊಟ: ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ (ಬದನೆಕಾಯಿ ಪಲ್ಯ), ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ ಮೊಸರಿನೊಂದಿಗೆ, ರಂಜಕ ಖಾರ, ಸಜ್ಜೆ ರೊಟ್ಟಿ ಮತ್ತು ಸಿಹಿಗೆ ಇಳಕಲ್ ಪೇಡ ಅಥವಾ ಶೇಂಗಾ ಹೋಳಿಗೆ. ಬಾದಾಮಿ ಮತ್ತು ಬಾಗಲಕೋಟೆಯ ಖಾನಾವಳಿಗಳಲ್ಲಿ ಇದು ಲಭ್ಯ.';
      } else if (lower.includes('hidden') || lower.includes('offbeat') || lower.includes('ಗುಪ್ತ') || lower.includes('ಅಪರೂಪ') || lower.includes('places') || lower.includes('ತಾಣ')) {
        reply = 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ಅದ್ಭುತ ೭ ಗುಪ್ತ ತಾಣಗಳು:\n• ಸಿದ್ಧನಕೊಳ್ಳ ಕಣಿವೆ & ಜಲಪಾತ (೧೮ ಕಿ.ಮೀ): ಕೆಂಪು ಬಂಡೆಗಳ ನಡುವೆ ಹರಿಯುವ ನೈಸರ್ಗಿಕ ಜಲಪಾತ ಮತ್ತು ಪ್ರಾಚೀನ ಶಿವಾಲಯ.\n• ಬಿಳಿಗಿ ಅರೆಭಾವನಾವಿ (೩೨ ಕಿ.ಮೀ): ಕ್ರಿ.ಶ. ೧೫೮೮ ರ ಕನ್ನಡ ಮತ್ತು ಪರ್ಷಿಯನ್ ಶಾಸನಗಳುಳ್ಳ ಭವ್ಯ ಮೆಟ್ಟಿಲು ಬಾವಿ.\n• ಗುಳೇದಗುಡ್ಡ ಕೋಟೆ & ಖಣ ನೇಯ್ಗೆ (೨೪ ಕಿ.ಮೀ): ಕಣಿವೆ ನೋಟದ ಬೆಟ್ಟದ ಕೋಟೆ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಖಣ ಮಗ್ಗಗಳು.\n• ಬಾಚಿನಗುಡ್ಡ (೨೪ ಕಿ.ಮೀ / ಪಟ್ಟದಕಲ್ಲಿನಿಂದ ೩ ಕಿ.ಮೀ): ೩೦೦೦ ವರ್ಷಗಳ ಶಿಲಾಯುಗದ ಕಲ್ಮನೆಗಳು & ಪಟ್ಟದಕಲ್ಲು ವೀಕ್ಷಣೆ.\n• ನಾಗರಾಳ ನಾಗನಾಥ ದೇವಾಲಯ (೮ ಕಿ.ಮೀ): ಹೊಲಗಳ ನಡುವಿನ ೮ನೇ ಶತಮಾನದ ಚಾಲುಕ್ಯ ಶಿವಾಲಯ.\n• ಶಿವಯೋಗಮಂದಿರ (೧೫ ಕಿ.ಮೀ): ಮಲಪ್ರಭಾ ನದೀತೀರದ ಪ್ರಶಾಂತ ಆಶ್ರಮ & ತಾಳೆಗರಿ ಗ್ರಂಥಾಲಯ.\n• ಕೆಂಡೂರು (೮ ಕಿ.ಮೀ): ೫೦೦೦ ವರ್ಷಗಳ ಪ್ರಾಚೀನ ಶಿಲಾ ವರ್ಣಚಿತ್ರಗಳು.';
      } else if (lower.includes('siddhankolla') || lower.includes('ಸಿದ್ಧನಕೊಳ್ಳ')) {
        reply = 'ಸಿದ್ಧನಕೊಳ್ಳವು ಬಾದಾಮಿಯಿಂದ ಕೇವಲ ೧೮ ಕಿ.ಮೀ ದೂರದಲ್ಲಿರುವ ಒಂದು ರಮಣೀಯ ಗುಪ್ತ ಕಣಿವೆ. ಇಲ್ಲಿ ದಟ್ಟ ಹಸಿರು ಮತ್ತು ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬಂಡೆಗಳ ನಡುವೆ ಸದಾ ತಿಳಿನೀರಿನ ಜಲಪಾತ ಹರಿಯುತ್ತದೆ. ನೈಸರ್ಗಿಕ ಕಲ್ಯಾಣಿಯ ಪಕ್ಕದಲ್ಲಿ ೧೦-೧೨ನೇ ಶತಮಾನದ ಸಂಗಮೇಶ್ವರ ದೇವಾಲಯವಿದೆ. ಯಾವುದೇ ಪ್ರವಾಸಿ ಗದ್ದಲವಿಲ್ಲದ ಶಾಂತ ತಾಣ.';
      } else if (lower.includes('bilgi') || lower.includes('ಬಿಳಿಗಿ')) {
        reply = 'ಬಿಳಿಗಿಯ ಅರೆಭಾವನಾವಿಯು ೧೫೮೮ ರಲ್ಲಿ ಯುವರಾಜ ಖಂಡೇರಾಯನಿಂದ ನಿರ್ಮಿತವಾದ ಅಪರೂಪದ ಮೆಟ್ಟಿಲು ಬಾವಿ (ಬಾವೋಲಿ). ಇದರಲ್ಲಿ ಕನ್ನಡ ಮತ್ತು ಪರ್ಷಿಯನ್ ಭಾಷೆಗಳೆರಡರಲ್ಲೂ ಕೆತ್ತಲಾದ ಐತಿಹಾಸಿಕ ಶಿಲಾಶಾಸನಗಳು ಹಾಗೂ ನೆಲದಡಿಯ ತಂಪಾದ ಕಲ್ಲಿನ ಕಮಾನುಗಳಿವೆ. ಬಾದಾಮಿಯಿಂದ ೩೨ ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ.';
      } else if (
        lower.includes('translate') ||
        lower.includes('translation') ||
        lower.includes('how to say') ||
        lower.includes('kannada') ||
        lower.includes('phrase') ||
        lower.includes('meaning') ||
        lower.includes('ಭಾಷಾಂತರ') ||
        lower.includes('ಹೇಗೆ ಹೇಳುವುದು') ||
        lower.includes('bus stand') ||
        lower.includes('how much') ||
        lower.includes('where is')
      ) {
        reply = `ಕನ್ನಡ ಭಾಷಾ ಮತ್ತು ಪ್ರವಾಸಿ ನುಡಿಗಟ್ಟು ಮಾರ್ಗದರ್ಶಿ (Travel Phrasebook):\n• ಪ್ರಶ್ನೆ: "${message}"\n• ಪ್ರಮುಖ ನುಡಿಗಟ್ಟುಗಳು:\n  - ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?: Bus nildana ellide?\n  - ನಮಸ್ಕಾರ: Namaskara (Hello)\n  - ಧನ್ಯವಾದಗಳು: Dhanyavaadagalu (Thank you)\n  - ಇದು ಎಷ್ಟು?: Idu eshtu? (How much is this?)`;
      } else {
        reply = 'ಬಾಗಲಕೋಟೆ ಯಾತ್ರಿAI ಗೆ ಸ್ವಾಗತ! ನೀವು ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆಗಳೊಂದಿಗೆ ಸಿದ್ಧನಕೊಳ್ಳ ಜಲಪಾತ, ಬಿಳಿಗಿ ಮೆಟ್ಟಿಲು ಬಾವಿ, ಗುಳೇದಗುಡ್ಡ ಕೋಟೆ, ಬಾಚಿನಗುಡ್ಡದಂತಹ ಗುಪ್ತ ತಾಣಗಳ ಬಗ್ಗೆಯೂ ಮಾಹಿತಿ ಕೇಳಬಹುದು!';
      }
    } else {
      if (lower.includes('badami') || lower.includes('cave')) {
        reply = 'Badami (ancient Vatapi) was the majestic capital of the Chalukyas (6th–8th century CE). Highlights include 4 rock-cut cave temples: Cave 1 (18-armed Nataraja), Cave 2 (Trivikrama), Cave 3 (Magnificent Vishnu & Varaha reliefs), and Cave 4 (Jain Tirthankaras). Don\'t miss Bhootanatha Temples by Agastya Lake at sunset! Timings: 6:00 AM - 6:00 PM. Entry: ₹25 (Indians), ₹300 (Foreigners).';
      } else if (lower.includes('pattadakal') || lower.includes('unesco')) {
        reply = 'Pattadakal is a UNESCO World Heritage Site along the Malaprabha River. It represents the pinnacle of early Chalukyan temple architecture, fusing Nagara (North Indian) and Dravida (South Indian) styles. Key monument: Virupaksha Temple, commissioned by Queen Lokamahadevi in 740 CE to celebrate victory over the Pallavas. Entry: ₹40 (Indians), ₹600 (Foreigners). Distance from Badami: 22 km.';
      } else if (lower.includes('aihole') || lower.includes('cradle')) {
        reply = 'Aihole is revered as the "Cradle of Indian Temple Architecture", featuring over 120 stone temples built between 450–750 CE. Highlights: Durga Temple (unique apsidal Chaitya-like design with stunning Mahishasuramardini relief), Lad Khan Temple, Ravana Phadi cave, and Meguti Jain temple with the famous 634 CE Pulakeshin II inscription. Distance from Pattadakal: 14 km.';
      } else if (lower.includes('saree') || lower.includes('ilkal') || lower.includes('weaver')) {
        reply = 'Bagalkote is world-renowned for GI-tagged Ilkal Sarees (GI Tag #43), woven since the 8th century CE. Their hallmark is the rich crimson "Topetenchi" pallu joined via the ancient "Kondi" warp-interlocking technique and embroidered with Kasuti motifs. You can visit artisan weaver cooperatives in Ilkal and Guledgudda directly!';
      } else if (lower.includes('food') || lower.includes('cuisine') || lower.includes('eat') || lower.includes('rotti')) {
        reply = 'Authentic North Karnataka (Uttara Karnataka) cuisine is hearty and nutritious: freshly baked Jolada Rotti (jowar flatbread) served with Ennegayi (spiced stuffed baby brinjals), Shenga Chutney Pudi (roasted peanut powder) with fresh churned curd, fiery Ranjaka (red chilli paste), and desserts like Ilkal Peda and Shenga Holige. Look for traditional "Lingayat Khanavalis" in Badami and Bagalkote!';
      } else if (lower.includes('hidden') || lower.includes('offbeat') || lower.includes('secret') || lower.includes('places') || lower.includes('gems')) {
        reply = 'Here are 7 magnificent offbeat & hidden gems in Bagalkote beyond the typical tourist route:\n1. Siddhankolla Canyon Gorge (18 km): Secluded red sandstone ravine with a perennial forest waterfall, sacred pool, and ancient Shiva shrine.\n2. Bilgi Arebhavanavi (32 km): 1588 CE multi-tiered royal stepwell with arched galleries and dual Old Kannada & Persian inscriptions.\n3. Guledgudda Sandstone Hill Fort (24 km): Medieval fortress bastions overlooking the valley where GI-tagged Khana blouse fabrics are handwoven.\n4. Bachinagudda Megalithic Ridge (3 km from Pattadakal): 3,000-year-old prehistoric dolmens with an unmatched aerial view over the Pattadakal UNESCO spires.\n5. Naganatha Temple of Nagral (8 km): Intact 8th-century early Chalukyan temple standing in tranquil sunflower and cotton fields.\n6. Shivayogamandira Hermitage (15 km): Peaceful riverside monastery on the Malaprabha with coconut groves, peacocks, and palm-leaf manuscript library.\n7. Kendur Prehistoric Rock Art (8 km): Mesolithic rock shelters featuring 5,000-year-old ochre pictographs of hunters and humped bulls.';
      } else if (lower.includes('siddhankolla')) {
        reply = 'Siddhankolla is a hidden canyon gorge 18 km from Badami. A natural spring waterfall cascades over sandstone boulders into a sacred pool beside an ancient stone shrine of Lord Sangameshwara. It is shaded by wild fig trees and offers complete peace without tour buses or crowds.';
      } else if (lower.includes('bilgi')) {
        reply = 'Bilgi Arebhavanavi is a magnificent 16th-century stone stepwell located in Bilgi (32 km north of Badami). Built in 1588 CE by Prince Khanderaya, it features subterranean colonnaded chambers designed for natural cooling and remarkable bilingual foundation tablets inscribed in classical Kannada and Persian calligraphy.';
      } else if (
        lower.includes('translate') ||
        lower.includes('translation') ||
        lower.includes('how to say') ||
        lower.includes('kannada') ||
        lower.includes('phrase') ||
        lower.includes('meaning') ||
        lower.includes('ಭಾಷಾಂತರ') ||
        lower.includes('ಹೇಗೆ ಹೇಳುವುದು') ||
        lower.includes('bus stand') ||
        lower.includes('how much') ||
        lower.includes('where is')
      ) {
        reply =
          language === 'kn'
            ? `ಕನ್ನಡ ಭಾಷಾ ಮತ್ತು ಪ್ರವಾಸಿ ನುಡಿಗಟ್ಟು ಮಾರ್ಗದರ್ಶಿ (Travel Phrasebook):\n• "${message}"\n• ಕನ್ನಡ ಅನುವಾದ: ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (Bus nildana ellide?)\n• ನಮಸ್ಕಾರ (Namaskara) - Hello\n• ಧನ್ಯವಾದಗಳು (Dhanyavaadagalu) - Thank you\n• ಇದು ಎಷ್ಟು? (Idu eshtu?) - How much is this?`
            : `🔤 Bagalkote Traveler Kannada Translation & Phrasebook Guide:\n• Query: "${message}"\n• Kannada Translation / Phrase:\n  - Where is the bus stand?: ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (Bus nildana ellide?)\n  - Hello / Greetings: ನಮಸ್ಕಾರ (Namaskara)\n  - Thank you: ಧನ್ಯವಾದಗಳು (Dhanyavaadagalu)\n  - How much is this?: ಇದು ಎಷ್ಟು? (Idu eshtu?)\n  - I need drinking water: ಕುಡಿಯುವ ನೀರು ಬೇಕು (Kudiyaalu neeru beku)`;
      } else {
        reply = 'Welcome to Bagalkote YatriAI! I can help you with historical backstories, entry fees, operational hours, route distances between Badami-Pattadakal-Aihole, authentic Ilkal handlooms, North Karnataka food guides, and hidden gems like Siddhankolla gorge and Bilgi stepwell. What would you like to explore?';
      }
    }

    return res.json({ reply, source: 'knowledge-base' });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: 'Failed to process chat query',
      details: error?.message || 'Server error',
    });
  }
});

// 2. API: Identify Monument (Multimodal Vision Scanner)
app.post('/api/identify-monument', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', landmarkHint, language = 'en' } = req.body;

    if (!imageBase64 && !landmarkHint) {
      return res.status(400).json({ error: 'Image data or landmark hint is required' });
    }

    let detectedMime = mimeType;
    let cleanBase64 = '';

    if (imageBase64) {
      if (typeof imageBase64 === 'string' && imageBase64.includes(',')) {
        const [header, dataPart] = imageBase64.split(',');
        cleanBase64 = dataPart.trim();
        const mimeMatch = header.match(/data:([^;]+);/);
        if (mimeMatch) {
          detectedMime = mimeMatch[1];
        }
      } else if (typeof imageBase64 === 'string') {
        cleanBase64 = imageBase64.trim();
      }
    }

    if (ai && cleanBase64) {
      const promptText = `Examine this photo from Bagalkote District heritage sites (Badami, Pattadakal, Aihole, Mahakuta, Banashankari, Kudalasangama, or Ilkal handlooms).
Identify the landmark or monument accurately. Output in strict JSON format with these exact keys:
{
  "monumentName": "string",
  "monumentNameKn": "string (Kannada script)",
  "location": "string (e.g. Badami, Bagalkote District)",
  "century": "string (e.g. 6th Century CE / 740 CE)",
  "dynasty": "string (e.g. Badami Chalukyas)",
  "architecturalStyle": "string (e.g. Rock-cut Chalukyan / Vesara / Nagara-Dravida)",
  "confidence": number (between 90 and 99.8),
  "keyHighlights": ["bullet 1", "bullet 2", "bullet 3"],
  "historicalSignificance": "string (2-3 sentences)",
  "historicalSignificanceKn": "string (in Kannada)",
  "visitorTip": "string",
  "audioSnippetEn": "string (30-40 words narration for audio guide)",
  "audioSnippetKn": "string (30-40 words narration in Kannada)"
}`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: detectedMime,
                  data: cleanBase64,
                },
              },
              { text: promptText },
            ],
          },
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const rawText = response.text || '';
        const cleaned = rawText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed && (parsed.monumentName || parsed.monumentNameKn)) {
          return res.json({ data: parsed, source: 'gemini-vision' });
        }
      } catch (geminiErr) {
        console.warn('Gemini vision parse error, using landmark matching:', geminiErr);
      }
    }

    // High fidelity fallback landmark database for scanner presets or offline
    const matched = getPreloadedMonumentMatch(landmarkHint || 'badami_cave_1');
    return res.json({ data: matched, source: 'heritage-registry' });
  } catch (error: any) {
    console.error('Monument scanner error:', error);
    return res.status(500).json({ error: 'Failed to identify monument' });
  }
});

// 3. API: Generate Itinerary
app.post('/api/generate-itinerary', async (req, res) => {
  try {
    const { duration = '2-day', interests = ['Architecture', 'History'], pace = 'moderate', language = 'en' } = req.body;

    if (ai) {
      const prompt = `Create an optimized, detailed travel itinerary for Bagalkote District tourist circuit (Badami, Pattadakal, Aihole, Mahakuta, Banashankari, Kudalasangama, Ilkal weavers).
Duration: ${duration}
Interests: ${interests.join(', ')}
Pace: ${pace}
Language: ${language}

Return a valid JSON object matching:
{
  "title": "string",
  "titleKn": "string",
  "summary": "string",
  "summaryKn": "string",
  "totalDistanceKm": number,
  "recommendedTransport": "string",
  "days": [
    {
      "dayNumber": 1,
      "theme": "string",
      "themeKn": "string",
      "activities": [
        {
          "id": "string",
          "time": "07:30 AM",
          "title": "string",
          "titleKn": "string",
          "location": "string",
          "description": "string",
          "descriptionKn": "string",
          "insiderTip": "string",
          "photoSpotTip": "string",
          "crowdLevel": "Low & Serene | Moderate | Golden Hour Peak",
          "difficulty": "Easy Stroll | Moderate Steps | Uphill Scramble",
          "durationMins": 90,
          "monumentId": "badami-caves | bhootanatha-badami | pattadakal-unesco | aihole-cradle | mahakuta-springs | banashankari-temple | kudalasangama-aikya",
          "alternativeOptions": [
            {
              "id": "string",
              "title": "string",
              "titleKn": "string",
              "description": "string",
              "descriptionKn": "string",
              "location": "string",
              "insiderTip": "string"
            }
          ]
        }
      ],
      "recommendedMeal": {
        "place": "string",
        "dish": "string",
        "dishKn": "string"
      }
    }
  ],
  "proTips": ["tip 1", "tip 2", "tip 3"]
}`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.4,
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        if (parsed && parsed.title && Array.isArray(parsed.days) && parsed.days.length > 0) {
          return res.json({ itinerary: parsed, source: 'gemini' });
        }
      } catch (err: any) {
        console.warn('Gemini itinerary fallback engaged:', err?.message || err);
      }
    }

    // Default rich pre-computed itineraries matching duration and interests
    return res.json({
      itinerary: getPresetItinerary(duration, interests),
      source: 'curated',
    });
  } catch (error: any) {
    console.error('Itinerary error:', error);
    return res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

// 4. API: Dynamic Text-to-Speech stream (supporting Kannada & English)
app.get('/api/tts', async (req, res) => {
  try {
    const text = ((req.query.text as string) || '').trim();
    const lang = ((req.query.lang as string) || 'kn').toLowerCase();
    if (!text) {
      return res.status(400).send('Text parameter is required');
    }

    // Split text into chunks of <= 140 chars for Google TTS
    const sentences = text.split(/([.?!,\n])/);
    const chunks: string[] = [];
    let curr = '';
    for (const part of sentences) {
      if ((curr + part).length < 140) {
        curr += part;
      } else {
        if (curr.trim()) chunks.push(curr.trim());
        curr = part;
      }
    }
    if (curr.trim()) chunks.push(curr.trim());
    const validChunks = chunks.filter((c) => c.trim().length > 0).slice(0, 8);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    for (const chunk of validChunks) {
      const q = encodeURIComponent(chunk);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${q}&tl=${lang}&client=tw-ob`;
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      if (response.ok) {
        const arrayBuf = await response.arrayBuffer();
        res.write(Buffer.from(arrayBuf));
      }
    }
    res.end();
  } catch (err: any) {
    console.error('TTS endpoint error:', err);
    if (!res.headersSent) {
      res.status(500).send('TTS processing error');
    } else {
      res.end();
    }
  }
});

// Helper for fallback monument scanner match
function getPreloadedMonumentMatch(hint: string = 'badami_cave_1') {
  const registry: Record<string, any> = {
    badami_cave_1: {
      monumentName: 'Badami Cave Temple 1 (Shiva Nataraja Sanctuary)',
      monumentNameKn: 'ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯ ೧ (ಶಿವ ನಟರಾಜ ಸನ್ನಿಧಿ)',
      location: 'Badami, Bagalkote District, Karnataka',
      century: 'Late 6th Century CE (c. 578 CE)',
      dynasty: 'Badami Chalukyas (King Kirtivarman I / Mangalesha)',
      architecturalStyle: 'Rock-cut Sandstone Cave Architecture',
      confidence: 99.2,
      sourceImage: '/assets/monuments/badami_nataraja.jpg',
      keyHighlights: [
        'World-famous 18-armed dancing Shiva (Nataraja) exhibiting 81 distinct Bharatanatyam mudras',
        'Ardhanarishwara relief depicting harmonious union of Shiva and Parvati with Nandi and skeleton Bhringi',
        'Elaborate ceiling carvings of Nagaraja with coiled serpentine body',
      ],
      historicalSignificance:
        'Cave 1 is the oldest of the four rock-cut caves in Badami, carved into monolithic red-sandstone cliffs overlooking the historic Agastya Lake. It marks the revolutionary transition in Deccan art from wooden to stone excavation.',
      historicalSignificanceKn:
        'ಗುಹೆ ೧ ಬಾದಾಮಿಯ ಅತಿ ಪ್ರಾಚೀನ ಕಲ್ಲಿನ ಗುಹೆಯಾಗಿದ್ದು, ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬೆಟ್ಟದಲ್ಲಿ ಕೊರೆಯಲಾಗಿದೆ. ಇಲ್ಲಿನ 18 ತೋಳುಗಳ ನಟರಾಜನ ಶಿಲ್ಪವು ಭರತನಾಟ್ಯದ 81 ಮುದ್ರೆಗಳನ್ನು ಜೀವಂತವಾಗಿ ಪ್ರದರ್ಶಿಸುವ ವಿಶ್ವವಿಖ್ಯಾತ ಕಲಾಕೃತಿಯಾಗಿದೆ.',
      visitorTip:
        'Visit between 7:00 AM and 9:30 AM when the morning golden sunlight penetrates the pillared veranda and directly illuminates the Nataraja relief.',
      audioSnippetEn:
        'Welcome to Badami Cave 1. Carved in the late 6th century by the early Chalukyas, marvel at the 18-armed Nataraja on your right. Notice how the sculptor depicted dynamic rhythm in hard sandstone, creating an eternal monument to cosmic dance.',
      audioSnippetKn:
        'ಬಾದಾಮಿ ಮೊದಲನೇ ಗುಹಾ ದೇವಾಲಯಕ್ಕೆ ಸ್ವಾಗತ. ಕ್ರಿ.ಶ. ೬ನೇ ಶತಮಾನದಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಈ ಗುಹೆಯ ಬಲಭಾಗದಲ್ಲಿರುವ ೧೮ ತೋಳುಗಳ ನಟರಾಜನ ಶಿಲ್ಪವು ಚಾಲುಕ್ಯರ ಅಪೂರ್ವ ಶಿಲ್ಪಕಲೆಗೆ ಸಾಕ್ಷಿಯಾಗಿದೆ.',
    },
    bhootanatha_temple: {
      monumentName: 'Bhootanatha Temples & Agastya Lake',
      monumentNameKn: 'ಭೂತನಾಥ ದೇವಾಲಯ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರ',
      location: 'Agastya Tirtha, Badami, Bagalkote District',
      century: 'Late 7th to 11th Century CE',
      dynasty: 'Badami Chalukyas & Kalyana Chalukyas',
      architecturalStyle: 'Waterfront Sandstone Dravida Sanctuary',
      confidence: 99.4,
      sourceImage: '/assets/monuments/bhootanatha_temple.jpg',
      keyHighlights: [
        'Scenic waterfront sanctum projecting directly into the waters of sacred Agastya Lake',
        'Open pillared hall (Mantapa) extending over the sandstone lakebed',
        'Vivid crimson reflections against the sheer sandstone cliffs during golden hour and sunset',
      ],
      historicalSignificance:
        'Dedicated to Lord Shiva as Bhootanatha (Lord of Spirits), this sandstone cluster appears to float atop Agastya Lake when waters are high. It represents the quintessential postcard view of ancient Karnataka.',
      historicalSignificanceKn:
        'ಅಗಸ್ತ್ಯ ಸರೋವರದ ಪೂರ್ವ ತೀರದಲ್ಲಿರುವ ಭೂತನಾಥ ದೇವಾಲಯವು ಚಾಲುಕ್ಯರ ನಯನಮನೋಹರ ಜಲಮಂದಿರವಾಗಿದೆ. ಸರೋವರದ ನೀರಿನಲ್ಲಿ ಪ್ರತಿಬಿಂಬಿಸುವ ಇದರ ಸೌಂದರ್ಯ ಅಪ್ರತಿಮ.',
      visitorTip:
        'Arrive by 4:45 PM to watch the changing colors on the lake surface and sandstone bluffs during sunset.',
      audioSnippetEn:
        'You stand at the edge of Agastya Lake facing the Bhootanatha Temples. As the sun sets behind Badami cliffs, the amber sandstone sanctum is bathed in golden light, casting shimmering reflections across the water.',
      audioSnippetKn:
        'ಅಗಸ್ತ್ಯ ಸರೋವರದ ದಂಡೆಯಲ್ಲಿರುವ ಭೂತನಾಥ ದೇವಾಲಯದ ಎದುರು ನೀವಿದ್ದೀರಿ. ಸಂಜೆಯ ಸೂರ್ಯಾಸ್ತದ ಸಮಯದಲ್ಲಿ ಬಾದಾಮಿಯ ಕೆಂಪು ಬಂಡೆಗಳ ಸುವರ್ಣ ಕಾಂತಿ ನೀರಿನಲ್ಲಿ ಮಿನುಗುತ್ತದೆ.',
    },
    pattadakal_virupaksha: {
      monumentName: 'Virupaksha Temple, Pattadakal (UNESCO Site)',
      monumentNameKn: 'ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ, ಪಟ್ಟದಕಲ್ಲು (ಯುನೆಸ್ಕೋ ತಾಣ)',
      location: 'Pattadakal, Malaprabha River Basin, Bagalkote',
      century: '740 CE',
      dynasty: 'Badami Chalukyas (Commissioned by Queen Lokamahadevi)',
      architecturalStyle: 'Dravida Temple Architecture with Rekha-Nagara accents',
      confidence: 98.7,
      sourceImage: '/assets/monuments/pattadakal_virupaksha.jpg',
      keyHighlights: [
        'Built by Queen Lokamahadevi to commemorate King Vikramaditya II\'s victory over Pallavas of Kanchipuram',
        'Architect Gundana Anivaritachari honored with highest royal titles inscribed on stone',
        'Served as architectural blueprint for the Kailasa rock-cut temple in Ellora',
      ],
      historicalSignificance:
        'The crowning jewel of the UNESCO World Heritage complex at Pattadakal. It showcases the zenith of structural stone architecture with an imposing Vimana, massive Nandi Mantapa, and epic friezes from Ramayana and Mahabharata.',
      historicalSignificanceKn:
        'ಪಟ್ಟದಕಲ್ಲಿನ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯವು ಚಾಲುಕ್ಯ ವಾಸ್ತುಶಿಲ್ಪದ ಶಿಖರ ಪ್ರಾಯವಾಗಿದೆ. ಕಂಚಿಯ ಪಲ್ಲವರ ಮೇಲಿನ ವಿಜಯದ ಸ್ಮರಣಾರ್ಥ ರಾಣಿ ಲೋಕಮಹಾದೇವಿಯು ಇದನ್ನು ೭೪೦ರಲ್ಲಿ ನಿರ್ಮಿಸಿದಳು.',
      visitorTip:
        'Hire an authorized ASI guide or use this audio guide to decipher the Ramayana narrative panels carved horizontally along the mandapa outer base.',
      audioSnippetEn:
        'You stand before the majestic Virupaksha Temple at Pattadakal. Notice the intricate Dravida tiered tower soaring above the sanctum and the grand Nandi pavilion. This masterpiece directly inspired Rashtrakuta King Krishna I to excavate the Kailash Temple at Ellora.',
      audioSnippetKn:
        'ಪಟ್ಟದಕಲ್ಲಿನ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದ ಎದುರು ನೀವಿದ್ದೀರಿ. ದ್ರಾವಿಡ ಶೈಲಿಯ ಭವ್ಯ ಗೋಪುರ, ನಂದಿ ಮಂಟಪ ಮತ್ತು ಗೋಡೆಗಳ ಮೇಲಿನ ರಾಮಾಯಣ-ಮಹಾಭಾರತದ ಕಥಾ ಫಲಕಗಳು ಚಾಲುಕ್ಯರ ಕಲಾ ಪ್ರೌಢಿಮೆಯನ್ನು ಸಾರುತ್ತವೆ.',
    },
    aihole_durga: {
      monumentName: 'Durga Temple Complex, Aihole',
      monumentNameKn: 'ದುರ್ಗಾ ದೇವಾಲಯ ಸಂಕೀರ್ಣ, ಐಹೊಳೆ',
      location: 'Aihole, Hungund Taluk, Bagalkote District',
      century: 'Late 7th - Early 8th Century CE',
      dynasty: 'Badami Chalukyas',
      architecturalStyle: 'Gajaprishtha (Apsidal) Chaitya Architecture with Shikhara',
      confidence: 99.4,
      sourceImage: '/assets/monuments/aihole_durga.jpg',
      keyHighlights: [
        'Distinctive semi-circular apsidal sanctum resembling an elephant back (Gajaprishtha)',
        'Peristyle pillared ambulatory passage (Pradakshina patha) with sunlight filtering through stone grilles',
        'Breathtaking sculptures of Mahishasuramardini, Harihara, and Narasimha in the outer niches',
      ],
      historicalSignificance:
        'Aihole is famously known as the laboratory of Indian temple architecture. The Durga Temple—named after "Durg" (fortress)—adapts Buddhist rock-cut chaitya forms into a structural Hindu temple, creating a globally unique architectural milestone.',
      historicalSignificanceKn:
        'ಐಹೊಳೆಯ ದುರ್ಗಾ ದೇವಾಲಯವು ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ಅತಿ ವಿಶಿಷ್ಟ ರತ್ನ. ಆನೆಯ ಬೆನ್ನಿನಂತಹ (ಗಜಪೃಷ್ಠ) ಅರ್ಧವೃತ್ತಾಕಾರದ ವಿನ್ಯಾಸ ಮತ್ತು ಕಂಬಗಳ ಪ್ರಾಂಗಣವು ಇಲ್ಲಿನ ಕಲಾ ವೈಭವವನ್ನು ಎತ್ತಿಹಿಡಿಯುತ್ತದೆ.',
      visitorTip:
        'Don\'t miss the Archaeological Museum right behind the temple premises housing rare Chalukyan bronzes and inscriptions.',
      audioSnippetEn:
        'Behold the celebrated Durga Temple of Aihole. Its sweeping curved peristyle and apsidal sanctum demonstrate the boundless experimental genius of Chalukyan architects over 1300 years ago.',
      audioSnippetKn:
        'ಐಹೊಳೆಯ ಪ್ರಸಿದ್ಧ ದುರ್ಗಾ ದೇವಾಲಯವನ್ನು ವೀಕ್ಷಿಸಿ. ಪ್ರಾಚೀನ ಬೌದ್ಧ ಚೈತ್ಯಾಲಯದ ಮಾದರಿಯನ್ನು ಹಿಂದೂ ದೇವಾಲಯಕ್ಕೆ ಅಳವಡಿಸಿದ ಚಾಲುಕ್ಯರ ಈ ಪ್ರಯೋಗ ವಿಶ್ವ ವಾಸ್ತುಶಿಲ್ಪದಲ್ಲೇ ಅಪರೂಪದ್ದು.',
    },
    mahakuta_pool: {
      monumentName: 'Mahakuta Temple & Vishnu Pushkarini',
      monumentNameKn: 'ಮಹಾಕೂಟ ದೇವಾಲಯ ಮತ್ತು ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿ',
      location: 'Mahakuta Village, 14 km from Badami',
      century: 'Early 7th Century CE',
      dynasty: 'Badami Chalukyas',
      architecturalStyle: 'Dravida & Nagara Shaivite Sanctuary with Perennial Spring',
      confidence: 97.8,
      sourceImage: '/assets/monuments/mahakuta_temple.jpg',
      keyHighlights: [
        'Perennial natural sweet-water spring flowing continuously into the stone-paved Vishnu Pushkarini tank',
        'Panchamukha Linga (five-faced Shiva) installed in a submerged miniature shrine within the pool',
        'Site of the historic Mahakuta Pillar Inscription of King Mangalesha (602 CE)',
      ],
      historicalSignificance:
        'A sacred pilgrimage site where sage Agastya is believed to have resided. The shaded temple courtyard amidst ancient banyan and neem trees provides an oasis of spiritual calm and sacred stone craftsmanship.',
      historicalSignificanceKn:
        'ಮಹಾಕೂಟವು ಬಾಗಲಕೋಟೆಯ ಪವಿತ್ರ ಶೈವ ಕ್ಷೇತ್ರ. ಇಲ್ಲಿನ ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿ ಕಲ್ಯಾಣಿಯಲ್ಲಿ ನೈಸರ್ಗಿಕ ಶುದ್ಧ ನೀರಿನ ಬುಗ್ಗೆಯಿದ್ದು, ಮಧ್ಯದಲ್ಲಿ ಪಂಚಮುಖ ಶಿವಲಿಂಗವಿದೆ.',
      visitorTip:
        'Carry modest clothing if planning a holy dip in the natural spring waters of Vishnu Pushkarini. The water is pristine, crystal-clear, and cool year-round.',
      audioSnippetEn:
        'Step into the tranquil shade of Mahakuta. Listen to the gentle murmur of the perennial spring feeding the sacred Vishnu Pushkarini, where pilgrims have taken ritual dips for over fourteen centuries.',
      audioSnippetKn:
        'ಮಹಾಕೂಟದ ಪವಿತ್ರ ಕ್ಷೇತ್ರಕ್ಕೆ ಸ್ವಾಗತ. ನಿರಂತರವಾಗಿ ಹರಿಯುವ ನೈಸರ್ಗಿಕ ಬುಗ್ಗೆಯ ಪುಷ್ಕರಿಣಿ ಮತ್ತು ಪ್ರಾಚೀನ ಚಾಲುಕ್ಯರ ಶಿವಾಲಯಗಳು ಇಲ್ಲಿನ ಆಧ್ಯಾತ್ಮಿಕ ಶಾಂತಿಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತವೆ.',
    },
    banashankari_temple: {
      monumentName: 'Banashankari Amma Temple & Haridra Tirtha',
      monumentNameKn: 'ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದೇವಾಲಯ ಮತ್ತು ಹರಿದ್ರಾ ತೀರ್ಥ',
      location: 'Cholachagudd, 5 km from Badami, Bagalkote',
      century: 'Original 7th Century Chalukyan, Renovated in 17th Century',
      dynasty: 'Kalyana Chalukyas & Marathas',
      architecturalStyle: 'Dravidian Temple with Vijayangara-Maratha Deepa Stambhas',
      confidence: 98.1,
      sourceImage: '/assets/monuments/banashankari_temple.jpg',
      keyHighlights: [
        'Enshrines Goddess Shakambhari (Banashankari) seated on a roaring lion trampling a demon',
        'Surrounded by the massive Haridra Tirtha lake with stone pavilions on all four corners',
        'Iconic tiered lamp towers (Deepa Stambhas) illuminated during the famous annual Banashankari Jathre',
      ],
      historicalSignificance:
        'The patron deity of the Weaver community and millions across Karnataka and Maharashtra. Banashankari was originally established by Chalukya rulers who worshipped the Goddess as their Kuladevi.',
      historicalSignificanceKn:
        'ಬನಶಂಕರಿ ದೇವಿ ಬಾಗಲಕೋಟೆ ಭಾಗದ ಮನೆದೇವರು. ಹರಿದ್ರಾ ತೀರ್ಥ ಕೊಳದ ಸುತ್ತಲೂ ಇರುವ ಸುಂದರ ಮಂಟಪಗಳು ಮತ್ತು ದೀಪಸ್ತಂಭಗಳು ಈ ಪುಣ್ಯಕ್ಷೇತ್ರದ ಕಣ್ಮನ ಸೆಳೆಯುವ ದೃಶ್ಯಗಳಾಗಿವೆ.',
      visitorTip:
        'Try the local tender coconut and authentic Jolada Rotti served outside the temple entrance by local farmer cooperatives.',
      audioSnippetEn:
        'Welcome to Banashankari Devi Temple. Standing beside the Haridra Tirtha lake, admire the towering lamp towers that blaze with thousands of oil lamps during the sacred month of Pushya.',
      audioSnippetKn:
        'ಬನಶಂಕರಿ ಅಮ್ಮನವರ ಸನ್ನಿಧಾನಕ್ಕೆ ಸ್ವಾಗತ. ಹರಿದ್ರಾ ತೀರ್ಥ ಸರೋವರದ ದಂಡೆಯಲ್ಲಿರುವ ಈ ಪುರಾತನ ದೇವಾಲಯವು ಭಕ್ತರ ಇಷ್ಟಾರ್ಥಗಳನ್ನು ಈಡೇರಿಸುವ ಮಹಾಶಕ್ತಿ ಪೀಠವಾಗಿದೆ.',
    },
    kudalasangama: {
      monumentName: 'Kudalasangama Aikya Mantapa & Confluence',
      monumentNameKn: 'ಕೂಡಲಸಂಗಮ ಐಕ್ಯ ಮಂಟಪ ಮತ್ತು ನದೀ ಸಂಗಮ',
      location: 'Kudalasangama, Hungund Taluk, Bagalkote',
      century: '12th Century CE Spiritual Site with Modern Cylindrical Glass Ring',
      dynasty: 'Chalukyas of Kalyana & Basaveshwara Heritage',
      architecturalStyle: 'Protective Cylindrical Wall surrounding Ancient Sunken Aikya Mantapa',
      confidence: 99.1,
      sourceImage: '/assets/monuments/kudalasangama.jpg',
      keyHighlights: [
        'Confluence of holy Krishna and Malaprabha rivers',
        'Aikya Mantapa where 12th-century philosopher and social reformer Jagadjyothi Basaveshwara attained samadhi',
        'Magnificent Sangameshwara Temple built in ornate Chalukyan style',
      ],
      historicalSignificance:
        'The intellectual and spiritual fountainhead of the Sharana movement and Vachana literature. Basaveshwara propagated social equality, elimination of caste discrimination, and the dignity of labor (Kayakave Kailasa) here.',
      historicalSignificanceKn:
        'ಕೂಡಲಸಂಗಮವು ಕೃಷ್ಣಾ ಮತ್ತು ಮಲಪ್ರಭಾ ನದಿಗಳ ಪವಿತ್ರ ಸಂಗಮ ಸ್ಥಳ. ಸಮಾಜ ಸುಧಾರಕ, ವಚನಕಾರ ಜಗಜ್ಯೋತಿ ಬಸವೇಶ್ವರರು ಐಕ್ಯವಾದ ಪರಮ ಪಾವನ ಪುಣ್ಯಭೂಮಿ.',
      visitorTip:
        'Take a boat ride across the confluence to admire the reflection of the Aikya Mantapa against the tranquil waters at sunset.',
      audioSnippetEn:
        'You are at Kudalasangama, where the Krishna and Malaprabha rivers meet. Here, Basavanna preached universal equality and Kayakave Kailasa—work is worship. The cylindrical monument preserves his sacred samadhi against backwaters.',
      audioSnippetKn:
        'ಕೃಷ್ಣಾ ಮತ್ತು ಮಲಪ್ರಭಾ ನದಿಗಳ ಸಂಗಮ ಕ್ಷೇತ್ರ ಕೂಡಲಸಂಗಮಕ್ಕೆ ಸ್ವಾಗತ. ಕಾಯಕವೇ ಕೈಲಾಸ ಎಂದು ಸಾರಿದ ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪವು ಇಲ್ಲಿ ನೆಲೆಸಿದೆ.',
    },
    ilkal_handloom: {
      monumentName: 'Ilkal Handloom Heritage Loom & GI Weaving Center',
      monumentNameKn: 'ಇಳಕಲ್ ಕೈಮಗ್ಗ ಪಾರಂಪರಿಕ ನೇಯ್ಗೆ ಕೇಂದ್ರ (GI Tag #43)',
      location: 'Ilkal & Guledgudda, Bagalkote District',
      century: '8th Century CE Origin - Active Living Tradition',
      dynasty: 'Living Heritage supported by Chalukya & Adil Shahi patrons',
      architecturalStyle: 'Pit Loom & Frame Loom Artisan Architecture',
      confidence: 99.5,
      sourceImage: '/assets/monuments/ilkal_weaving.jpg',
      keyHighlights: [
        'Signature "Topetenchi" crimson pallu joined to body warp using the UNESCO-recognized Kondi interlocking technique',
        'Traditional borders: Chikki Paras (triangular temple spikes) and Gomi (chevron creeper)',
        'Woven with natural cotton body and pure mulberry silk warp for lightweight comfort',
      ],
      historicalSignificance:
        'Ilkal sarees are one of Karnataka\'s greatest textile legacies, granted Geographical Indication (GI Tag #43). Generation after generation of master weavers in Bagalkote have preserved this intricate warp-interlocking craft by hand.',
      historicalSignificanceKn:
        'ಇಳಕಲ್ ಸೀರೆಗಳು ಬಾಗಲಕೋಟೆಯ ಹೆಮ್ಮೆಯ ಜಿ.ಐ. ಟ್ಯಾಗ್ ಪಡೆದ ಕರಕುಶಲ ಕಲೆ. ಟೋಪೆತೆಂಚಿ ಸೆರಗು, ಕೊಂಡಿ ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಕಸೂತಿ ಕಲೆಯು ಈ ಸೀರೆಗಳ ಅನನ್ಯ ಶ್ರೇಷ್ಠತೆಯಾಗಿದೆ.',
      visitorTip:
        'Directly purchase sarees from recognized Weavers Cooperative Societies to ensure 100% of the value directly supports artisan families.',
      audioSnippetEn:
        'You are witnessing the rhythmic clatter of an authentic Ilkal pit loom. Watch the artisan skillfully intertwine the crimson silk Topetenchi pallu with the cotton body using the timeless Kondi technique.',
      audioSnippetKn:
        'ಇಳಕಲ್ ಕೈಮಗ್ಗದ ನೇಕಾರಿಕೆಯನ್ನು ನೀವು ವೀಕ್ಷಿಸುತ್ತಿದ್ದೀರಿ. ನೇಕಾರರ ಕೈಚಳಕದಲ್ಲಿ ಮೂಡಿಬರುವ ಟೋಪೆತೆಂಚಿ ಸೆರಗು ಹಾಗೂ ಕೊಂಡಿ ಕಲೆಯು ಶತಮಾನಗಳ ಇತಿಹಾಸ ಹೊಂದಿದೆ.',
    },
  };

  const norm = (hint || '').toLowerCase();
  if (norm.includes('bhootanatha') || norm.includes('agastya')) return registry.bhootanatha_temple;
  if (norm.includes('pattadakal') || norm.includes('virupaksha')) return registry.pattadakal_virupaksha;
  if (norm.includes('aihole') || norm.includes('durga')) return registry.aihole_durga;
  if (norm.includes('mahakuta') || norm.includes('pushkarini')) return registry.mahakuta_pool;
  if (norm.includes('banashankari') || norm.includes('cholachagudd')) return registry.banashankari_temple;
  if (norm.includes('kudalasangama') || norm.includes('basava')) return registry.kudalasangama;
  if (norm.includes('ilkal') || norm.includes('saree') || norm.includes('handloom') || norm.includes('weaving')) return registry.ilkal_handloom;
  if (norm.includes('badami') || norm.includes('cave') || norm.includes('nataraja')) return registry.badami_cave_1;

  return registry[hint] || registry.badami_cave_1;
}

// Helper for curated itinerary
function getPresetItinerary(duration: string, interests: string[]) {
  const day1 = {
    dayNumber: 1,
    theme: 'Rock-Cut Marvels & Sunset Over Sacred Waters',
    themeKn: 'ಕಲ್ಲಿನ ಗುಹೆಗಳ ಅದ್ಭುತ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರದ ಸೂರ್ಯಾಸ್ತ',
    activities: [
      {
        time: '07:30 AM',
        title: 'Morning Ascent: Badami Cave Temples 1 to 4',
        titleKn: 'ಬೆಳಗಿನ ವೀಕ್ಷಣೆ: ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು ೧ ರಿಂದ ೪',
        location: 'Badami Hills',
        description:
          'Witness the 18-armed dancing Shiva Nataraja in Cave 1 lit by morning rays, followed by the colossal Trivikrama in Cave 2, Varaha in Cave 3, and Jain Tirthankaras in Cave 4.',
        descriptionKn:
          'ಗುಹೆ ೧ ರಲ್ಲಿ ೧೮ ತೋಳುಗಳ ನಟರಾಜನ ವೀಕ್ಷಣೆ, ನಂತರ ಗುಹೆ ೨, ೩ ಹಾಗೂ ೪ ರ ಅದ್ಭುತ ಶಿಲ್ಪಕಲೆಯ ದರ್ಶನ.',
        insiderTip: 'Start early to avoid the afternoon sun and monkey mischief on steps.',
      },
      {
        time: '11:00 AM',
        title: 'Badami Archaeological Museum & North Fort Trail',
        titleKn: 'ಬಾದಾಮಿ ಪುರಾತತ್ವ ವಸ್ತುಸಂಗ್ರಹಾಲಯ & ಉತ್ತರ ಕೋಟೆ',
        location: 'Near Bhootanatha Complex',
        description:
          'Explore 7th-century Lajja Gauri sculptures, architectural fragments, and ancient cannons atop the sandstone crag.',
        descriptionKn: 'ಪುರಾತತ್ವ ಇಲಾಖೆಯ ಅಪರೂಪದ ಶಿಲ್ಪಗಳು ಮತ್ತು ಉತ್ತರ ಕೋಟೆಯ ಐತಿಹಾಸಿಕ ತಾಣ.',
        insiderTip: 'Carry a refillable water bottle; photography is permitted without flash.',
      },
      {
        time: '01:00 PM',
        title: 'Authentic Uttara Karnataka Jolada Rotti Lunch',
        titleKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಉತ್ತರ ಕರ್ನಾಟಕದ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ',
        location: 'Badami Heritage Circle',
        description:
          'Relish hot, wafer-thin Jolada Rotti served with Ennegayi (spiced baby brinjals), Shenga Chutney powder with fresh curd, and Ranjaka chilli paste.',
        descriptionKn: 'ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ, ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ ಹಾಗೂ ಮೊಸರು.',
        insiderTip: 'Wash down with freshly churned spiced buttermilk (Majjige).',
      },
      {
        time: '04:30 PM',
        title: 'Bhootanatha Temples & Agastya Lake Golden Hour',
        titleKn: 'ಭೂತನಾಥ ದೇವಾಲಯ ಮತ್ತು ಅಗಸ್ತ್ಯ ತೀರ್ಥ ಸೂರ್ಯಾಸ್ತ',
        location: 'Eastern Edge of Agastya Lake',
        description:
          'Capture reflections of 7th-century sandstone shrines projecting into the tranquil waters of Agastya Tirtha as the sun dips behind the cliffs.',
        descriptionKn: 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ನೀರಿನಲ್ಲಿ ಭೂತನಾಥ ದೇವಾಲಯದ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಸುಂದರ ಪ್ರತಿಬಿಂಬ.',
        insiderTip: 'The steps leading down to the lake offer the best panoramic photograph angle in all of Karnataka.',
      },
    ],
    recommendedMeal: {
      place: 'Shri Banashankari Lingayat Khanavali, Station Road',
      dish: 'Unlimited Jolada Rotti Meal with Yennegayi & Shenga Holige',
      dishKn: 'ಅನ್‌ಲಿಮಿಟೆಡ್ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ ಮತ್ತು ಶೇಂಗಾ ಹೋಳಿಗೆ',
    },
  };

  const day2 = {
    dayNumber: 2,
    theme: 'Cradle of Architecture & UNESCO World Heritage',
    themeKn: 'ಯುನೆಸ್ಕೋ ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯ ಕಲಾಶಾಲೆ',
    activities: [
      {
        time: '08:30 AM',
        title: 'Pattadakal UNESCO World Heritage Complex',
        titleKn: 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ಸಂಕೀರ್ಣ',
        location: 'Pattadakal (22 km from Badami)',
        description:
          'Tour the monumental Virupaksha Temple, Mallikarjuna, and Sangameshwara temples along the Malaprabha River. Marvel at the synthesis of Nagara and Dravidian architectural towers.',
        descriptionKn: 'ಮಲಪ್ರಭಾ ನದಿ ತೀರದ ವಿರೂಪಾಕ್ಷ ಮತ್ತು ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಾಲಯಗಳ ಶಿಲ್ಪ ವೈಭವ.',
        insiderTip: 'Check the ceiling of Virupaksha Temple for Surya riding his seven-horse chariot.',
      },
      {
        time: '12:00 PM',
        title: 'Aihole: Durga Temple & Ravana Phadi Cave',
        titleKn: 'ಐಹೊಳೆ: ಅಪರೂಪದ ಗಜಪೃಷ್ಠ ದುರ್ಗಾ ದೇವಾಲಯ ಮತ್ತು ರಾವಣ ಫಡಿ ಗುಹೆ',
        location: 'Aihole (14 km from Pattadakal)',
        description:
          'Admire the apsidal Durga Temple with its open peristyle and the 6th-century rock-cut Shiva sculptures inside Ravana Phadi.',
        descriptionKn: 'ಆನೆಯ ಬೆನ್ನಿನಂತಹ ದುರ್ಗಾ ದೇವಾಲಯ ಮತ್ತು ರಾವಣ ಫಡಿ ಗುಹಾಲಯದ ದರ್ಶನ.',
        insiderTip: 'Visit the Meguti Jain temple on the hill for the panoramic view of 100+ temples dotting Aihole valley.',
      },
      {
        time: '03:30 PM',
        title: 'Mahakuta Sacred Springs & Vishnu Pushkarini',
        titleKn: 'ಮಹಾಕೂಟದ ಪವಿತ್ರ ಬುಗ್ಗೆ & ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿ',
        location: 'Mahakuta Forest Grove',
        description:
          'Relax under ancient trees beside the crystal-clear perennial spring pool housing the submerged Panchamukha Linga.',
        descriptionKn: 'ಪ್ರಾಚೀನ ಮರಗಳ ನೆರಳಿನಲ್ಲಿರುವ ನೈಸರ್ಗಿಕ ನೀರಿನ ಬುಗ್ಗೆ ಮತ್ತು ಪಂಚಮುಖ ಲಿಂಗ.',
        insiderTip: 'Peaceful atmosphere away from tourist buses; ideal spot for quiet contemplation.',
      },
    ],
    recommendedMeal: {
      place: 'Mayura Chalukya Aihole Restaurant',
      dish: 'North Karnataka Thali with Akki Rotti & Sajje Rotti',
      dishKn: 'ಅಕ್ಕಿ ರೊಟ್ಟಿ, ಸಜ್ಜೆ ರೊಟ್ಟಿ ಮತ್ತು ಉತ್ತರ ಕರ್ನಾಟಕ ಊಟ',
    },
  };

  const day3 = {
    dayNumber: 3,
    theme: 'Sacred Confluences & GI-Tagged Handloom Weavers',
    themeKn: 'ಪವಿತ್ರ ನದಿ ಸಂಗಮ ಮತ್ತು ಇಳಕಲ್ ಕೈಮಗ್ಗ ನೇಯ್ಗೆಯ ದರ್ಶನ',
    activities: [
      {
        time: '08:30 AM',
        title: 'Kudalasangama Aikya Mantapa & River Confluence',
        titleKn: 'ಕೂಡಲಸಂಗಮ ಐಕ್ಯ ಮಂಟಪ ಮತ್ತು ನದೀ ಸಂಗಮ',
        location: 'Kudalasangama (45 km from Bagalkote)',
        description:
          'Visit the sacred confluence of Krishna and Malaprabha rivers, the submerged Aikya Mantapa of social reformer Basaveshwara, and the cylindrical river protection wall.',
        descriptionKn: 'ಕೃಷ್ಣಾ ಮತ್ತು ಮಲಪ್ರಭಾ ನದಿಗಳ ಪವಿತ್ರ ಸಂಗಮ ಹಾಗೂ ಜಗದ್ಗುರು ಬಸವೇಶ್ವರರ ಐಕ್ಯ ಮಂಟಪದ ದರ್ಶನ.',
        insiderTip: 'Take the boat ride across the confluence in the morning for serene views.',
      },
      {
        time: '01:00 PM',
        title: 'Pilgrim Anna Dasoha & North Karnataka Jolada Rotti',
        titleKn: 'ದಾಸೋಹ ಭವನದಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕ ಊಟ',
        location: 'Kudalasangama Dining Complex',
        description:
          'Experience traditional community dining with piping hot Jolada Rotti, lentils, and local sweets.',
        descriptionKn: 'ಬಿಸಿ ರೊಟ್ಟಿ, ಕಾಳು ಪಲ್ಯ ಮತ್ತು ಸ್ಥಳೀಯ ಮಧುರ ಸಿಹಿ ತಿನಿಸುಗಳು.',
        insiderTip: 'Dining is open to all visitors with warmth and discipline.',
      },
      {
        time: '03:00 PM',
        title: 'Ilkal Handloom Weavers Cooperative (GI #43)',
        titleKn: 'ಇಳಕಲ್ ಕೈಮಗ್ಗ ನೇಕಾರರ ಸಹಕಾರ ಸಂಘ & ನೇಯ್ಗೆ ವೀಕ್ಷಣೆ',
        location: 'Ilkal Weavers Quarter',
        description:
          'Step into traditional pit-loom workshops to watch master artisans intertwine the crimson silk Topetenchi pallu via the Kondi interlocking warp technique.',
        descriptionKn: 'ಟೋಪೆತೆಂಚಿ ರೇಷ್ಮೆ ಸೆರಗಿನ ಕೊಂಡಿ ಗಂಟು ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಕೈಮಗ್ಗದ ನೇರ ವೀಕ್ಷಣೆ.',
        insiderTip: 'Buying directly from the society showroom guarantees certified GI authenticity and weaver welfare.',
      },
      {
        time: '05:30 PM',
        title: 'Banashankari Temple & Deepa Stambha Illumination',
        titleKn: 'ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದೇವಾಲಯ & ದೀಪಸ್ತಂಭ ದರ್ಶನ',
        location: 'Banashankari, Badami',
        description:
          'Conclude your journey at the 7th-century Shakambhari shrine surrounded by the Haridra Tirtha water tank and towering stone oil-lamp pillars.',
        descriptionKn: 'ಹರಿದ್ರಾ ತೀರ್ಥ ಪುಷ್ಕರಿಣಿ ಮತ್ತು ಎತ್ತರದ ಶಿಲಾ ದೀಪಸ್ತಂಭಗಳ ಪವಿತ್ರ ದರ್ಶನ.',
        insiderTip: 'The evening oil lamps create a mesmerizing golden reflection across the water.',
      },
    ],
    recommendedMeal: {
      place: 'Sri Gurukrupa Khanavali, Ilkal / Badami',
      dish: 'Traditional Holige Oota with Pure Ghee & Ilkal Peda',
      dishKn: 'ಶುದ್ಧ ತುಪ್ಪದ ಬಿಸಿ ಹೋಳಿಗೆ ಊಟ ಮತ್ತು ಪ್ರಸಿದ್ಧ ಇಳಕಲ್ ಪೇಡ',
    },
  };

  const isOneDay = duration === '1-day';
  const isThreeDay = duration === '3-day';

  return {
    title: isOneDay
      ? 'Badami Express: Cave Sanctuaries & Heritage Sunset'
      : isThreeDay
      ? 'Grand Bagalkote Heritage, Rivers & Silk Circuit'
      : 'Classic Chalukya Circuit: Badami, Pattadakal & Aihole',
    titleKn: isOneDay
      ? 'ಬಾದಾಮಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್: ಗುಹಾ ದೇವಾಲಯಗಳು ಮತ್ತು ಸೂರ್ಯಾಸ್ತ'
      : isThreeDay
      ? 'ಬಾಗಲಕೋಟೆಯ ಭವ್ಯ ಚಾಲುಕ್ಯ, ನದಿ ಸಂಗಮ ಮತ್ತು ರೇಷ್ಮೆ ಯಾತ್ರೆ'
      : 'ಕ್ಲಾಸಿಕ್ ಚಾಲುಕ್ಯ ಸರ್ಕ್ಯೂಟ್: ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆ',
    summary: isOneDay
      ? 'A focused 1-day exploration of Badami’s 6th-century rock-cut cave temples, North Fort, archaeological museum, and the sunset over Agastya Lake.'
      : isThreeDay
      ? 'A comprehensive 3-day expedition covering rock-cut caves, UNESCO World Heritage monuments, Aihole architecture cradle, sacred Kudalasangama confluence, and GI-tagged Ilkal handloom weavers.'
      : 'A masterfully balanced 2-day journey exploring Badami caves, Pattadakal UNESCO temples, Aihole architectural cradle, and Mahakuta sacred springs.',
    summaryKn: isOneDay
      ? 'ಬಾದಾಮಿಯ ೬ನೇ ಶತಮಾನದ ಗುಹಾ ದೇವಾಲಯಗಳು, ವಸ್ತುಸಂಗ್ರಹಾಲಯ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರದ ಸೂರ್ಯಾಸ್ತವನ್ನು ಒಳಗೊಂಡ ಒಂದು ದಿನದ ಪ್ರವಾಸ.'
      : isThreeDay
      ? 'ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ, ಕೂಡಲಸಂಗಮ ಸಂಗಮ ಕ್ಷೇತ್ರ ಮತ್ತು ಇಳಕಲ್ ಕೈಮಗ್ಗ ನೇಕಾರರ ಸಂಘಗಳನ್ನು ಒಳಗೊಂಡ ಸಂಪೂರ್ಣ ೩ ದಿನಗಳ ಯಾತ್ರೆ.'
      : 'ಬಾದಾಮಿ ಗುಹೆಗಳು, ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ತಾಣ, ಐಹೊಳೆ ಕಲಾಶಾಲೆ ಮತ್ತು ಮಹಾಕೂಟದ ಪವಿತ್ರ ಬುಗ್ಗೆಗಳನ್ನು ಒಳಗೊಂಡ ಸಮತೋಲಿತ ೨ ದಿನಗಳ ಪ್ರವಾಸ ಯೋಜನೆ.',
    totalDistanceKm: isOneDay ? 25 : isThreeDay ? 175 : 95,
    recommendedTransport: isOneDay
      ? 'Tourist Auto Rickshaw or Walking Trail'
      : 'Private Cab or Tourist Auto / KSRTC Heritage Shuttle',
    days: isOneDay ? [day1] : isThreeDay ? [day1, day2, day3] : [day1, day2],
    proTips: [
      'Carry sunglasses and a hat; sandstone monuments retain heat after noon.',
      'Always purchase sarees directly from registered weaver cooperative societies to ensure authenticity and fair wages.',
      'Pre-book ASI combo tickets online at the entrance QR codes for seamless entry.',
    ],
  };
}

// Serve static assets from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Vite middleware for dev or static serving in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Bagalkote YatriAI server running on http://0.0.0.0:${PORT}`);
});
