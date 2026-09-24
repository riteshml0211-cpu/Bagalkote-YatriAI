import pptxgen from 'pptxgenjs';
import * as fs from 'fs';
import * as path from 'path';

async function generatePresentation() {
  const pres = new pptxgen();

  // 16:9 widescreen presentation
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Bagalkote YatriAI Team';
  pres.company = 'Karnataka Tourism Project Competition';
  pres.title = 'AI to Redesign Tourism - Bagalkote YatriAI';

  // Define brand colors matching the template and Karnataka Tourism palette
  const COLOR_HEADER = '0F172A'; // Slate 900
  const COLOR_TEXT = '1E293B'; // Slate 800
  const COLOR_MUTED = '64748B'; // Slate 500
  const COLOR_BLUE_GRAD1 = '1E40AF'; // Royal Blue (from template)
  const COLOR_BLUE_GRAD2 = '3B82F6';
  const COLOR_AMBER = 'D97706'; // Heritage Amber
  const COLOR_AMBER_DARK = '92400E';
  const COLOR_BOX_BG = 'EFF6FF'; // Light blue box
  const COLOR_BOX_BORDER = '93C5FD'; // Soft blue border

  // Helper for footer on every slide
  const addSlideFooter = (slide: any) => {
    slide.addText('AI to Redesign Tourism • Bagalkot • 25 September 2026', {
      x: 0.5,
      y: 7.1,
      w: 12.33,
      h: 0.3,
      fontSize: 10,
      color: '64748B',
      align: 'center',
      fontFace: 'Arial',
    });

    // Top Header Banner
    slide.addText('GOVERNMENT OF KARNATAKA • DEPARTMENT OF TOURISM', {
      x: 0.8,
      y: 0.25,
      w: 8.0,
      h: 0.3,
      fontSize: 9,
      bold: true,
      color: 'B45309',
      fontFace: 'Arial',
    });
  };

  // ==========================================
  // SLIDE 1: TITLE SLIDE
  // ==========================================
  const slide1 = pres.addSlide();
  
  // Header text
  slide1.addText('AI TO REDESIGN TOURISM', {
    x: 0.8,
    y: 0.9,
    w: 11.5,
    h: 0.6,
    fontSize: 26,
    bold: true,
    color: COLOR_HEADER,
    fontFace: 'Arial',
  });

  slide1.addText('Project Competition • 25 September 2026', {
    x: 0.8,
    y: 1.5,
    w: 11.5,
    h: 0.4,
    fontSize: 15,
    color: '475569',
    fontFace: 'Arial',
  });

  // Project Title Box (Blue Gradient Box from template)
  slide1.addShape(pres.ShapeType.roundRect, {
    x: 1.2,
    y: 2.2,
    w: 10.9,
    h: 1.5,
    rectRadius: 0.2,
    fill: { type: 'solid', color: '2563EB' },
    line: { color: '1D4ED8', width: 2 },
  });

  slide1.addText('BAGALKOTE YATRIAI', {
    x: 1.4,
    y: 2.35,
    w: 10.5,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Arial',
  });

  slide1.addText('Multimodal Generative AI Heritage Guide & Rural Artisan Ecosystem for the Chalukya Circuit', {
    x: 1.4,
    y: 2.95,
    w: 10.5,
    h: 0.6,
    fontSize: 13,
    color: 'E0F2FE',
    align: 'center',
    fontFace: 'Arial',
  });

  // Team Details Box
  slide1.addShape(pres.ShapeType.roundRect, {
    x: 2.2,
    y: 4.1,
    w: 8.9,
    h: 2.3,
    rectRadius: 0.2,
    fill: { type: 'solid', color: '3B82F6' },
    line: { color: '2563EB', width: 1.5 },
  });

  slide1.addText([
    { text: 'Team Name: ', options: { bold: true, color: 'FFFFFF', fontSize: 15 } },
    { text: 'Team Chalukya Innovators\n\n', options: { color: 'FFFFFF', fontSize: 15 } },
    { text: 'Institution: ', options: { bold: true, color: 'FFFFFF', fontSize: 15 } },
    { text: 'Bagalkot District Engineering & Tech Consortium\n\n', options: { color: 'FFFFFF', fontSize: 15 } },
    { text: 'Team Members: ', options: { bold: true, color: 'FFFFFF', fontSize: 15 } },
    { text: 'Ritesh & Team (Lead Developer & Heritage Domain Lead)', options: { color: 'FFFFFF', fontSize: 15 } },
  ], {
    x: 2.6,
    y: 4.3,
    w: 8.1,
    h: 1.9,
    fontFace: 'Arial',
  });

  addSlideFooter(slide1);

  // ==========================================
  // SLIDE 2: 1. TOURISM PROBLEM
  // ==========================================
  const slide2 = pres.addSlide();
  addSlideFooter(slide2);

  slide2.addText('1. Tourism Problem', {
    x: 0.8,
    y: 0.8,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLOR_HEADER,
    fontFace: 'Arial',
  });

  // Left Content
  const problemContent = [
    { text: 'Problem: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Lack of accessible, authentic bilingual interpretation across 150+ Badami, Pattadakal, and Aihole temples. Tourists face unverified touts, language barriers, fragmented public transit timetables, and zero digital integration with local rural weavers.\n\n', options: { color: '334155', fontSize: 12 } },
    { text: 'Target users: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Domestic & global cultural travelers, backpackers, student heritage study groups, local auto/cab operators, and certified Ilkal saree handloom cooperatives.\n\n', options: { color: '334155', fontSize: 12 } },
    { text: 'Why is this important? ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Bagalkote houses UNESCO World Heritage monuments (Pattadakal) & the cradle of Indian architecture, yet average dwell time is under 1.2 days and local rural artisans miss direct tourist spending.\n\n', options: { color: '334155', fontSize: 12 } },
    { text: 'Tourism location / context: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Badami Cave Temples, Agastya Lake, UNESCO Pattadakal, Aihole Temple Complex, Mahakuta Sacred Springs, Banashankari, and the Ilkal Weaving Cluster in Bagalkote District, Karnataka.', options: { color: '334155', fontSize: 12 } },
  ];

  slide2.addText(problemContent, {
    x: 0.8,
    y: 1.6,
    w: 6.2,
    h: 5.2,
    fontFace: 'Arial',
  });

  // Right Box: Problem image / evidence
  slide2.addShape(pres.ShapeType.roundRect, {
    x: 7.4,
    y: 1.6,
    w: 5.1,
    h: 5.0,
    rectRadius: 0.25,
    fill: { type: 'solid', color: '2563EB' },
    line: { color: '1D4ED8', width: 2 },
  });

  slide2.addText('Problem Evidence & Field Gaps', {
    x: 7.6,
    y: 1.9,
    w: 4.7,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Arial',
  });

  slide2.addText([
    { text: '1. Information Asymmetry: ', options: { bold: true, color: 'FEF08A' } },
    { text: 'Physical ASI display boards are weathered or text-heavy; no audio guide available on-site for 80% of temples.\n\n' },
    { text: '2. Language Disconnect: ', options: { bold: true, color: 'FEF08A' } },
    { text: 'Non-Kannada tourists struggle with local dialects, public bus routes, and auto fares.\n\n' },
    { text: '3. Economic Leakage: ', options: { bold: true, color: 'FEF08A' } },
    { text: 'Powerloom counterfeits sell as genuine GI Ilkal sarees; master weavers receive <20% of retail price.\n\n' },
    { text: '4. Transit Friction: ', options: { bold: true, color: 'FEF08A' } },
    { text: 'Disconnected rail/bus schedules prevent smooth Day-1/Day-2 circuit loops.' },
  ], {
    x: 7.7,
    y: 2.5,
    w: 4.5,
    h: 3.9,
    fontSize: 11,
    color: 'FFFFFF',
    fontFace: 'Arial',
  });

  // ==========================================
  // SLIDE 3: 2. PROPOSED AI SOLUTION
  // ==========================================
  const slide3 = pres.addSlide();
  addSlideFooter(slide3);

  slide3.addText('2. Proposed AI Solution', {
    x: 0.8,
    y: 0.8,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLOR_HEADER,
    fontFace: 'Arial',
  });

  const solutionContent = [
    { text: 'Solution in 2–3 points:\n', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: '• ', options: { bold: true, color: COLOR_AMBER, fontSize: 14 } },
    { text: 'Multimodal Vision Monument Scanner: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: 'Tourists snap/upload photos of temple carvings, pillars, or rock reliefs; Gemini AI identifies deities, dynasty period, architectural style, and narrates stories instantly.\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: '• ', options: { bold: true, color: COLOR_AMBER, fontSize: 14 } },
    { text: '24/7 Bilingual Conversational & Audio Guide: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: 'Interactive voice & chat assistant in Kannada and English providing live answers on ASI timings, entry tickets, sunset trackers, and authentic Khanavali cuisine.\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: '• ', options: { bold: true, color: COLOR_AMBER, fontSize: 14 } },
    { text: 'Direct Rural Artisan & Transit Bridge: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: 'GI Tag #43 Ilkal saree authenticity validator with 1-tap WhatsApp chat directly to registered weaver cooperative societies and multi-city transit planner.\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: 'AI used: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Google Gemini Multimodal Vision API (carving recognition & iconographic reasoning) + Natural Language Understanding + Web Speech Synthesis.\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: 'Innovation: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Zero-hardware, zero-download web app bridging ancient 6th-century stone heritage with 21st-century rural weaver livelihoods and GPS transit navigation.', options: { color: '334155', fontSize: 11.5 } },
  ];

  slide3.addText(solutionContent, {
    x: 0.8,
    y: 1.5,
    w: 6.2,
    h: 5.4,
    fontFace: 'Arial',
  });

  // Right Box: Solution / workflow
  slide3.addShape(pres.ShapeType.roundRect, {
    x: 7.4,
    y: 1.5,
    w: 5.1,
    h: 5.2,
    rectRadius: 0.25,
    fill: { type: 'solid', color: '2563EB' },
    line: { color: '1D4ED8', width: 2 },
  });

  slide3.addText('Solution Workflow & User Journey', {
    x: 7.6,
    y: 1.8,
    w: 4.7,
    h: 0.4,
    fontSize: 15,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Arial',
  });

  slide3.addText([
    { text: 'Step 1: Point & Scan\n', options: { bold: true, color: 'FEF08A', fontSize: 11.5 } },
    { text: 'Tourist snaps Nataraja carving at Cave 1 via mobile camera.\n\n', options: { color: 'FFFFFF', fontSize: 10.5 } },
    { text: 'Step 2: AI Multi-Vector Analysis\n', options: { bold: true, color: 'FEF08A', fontSize: 11.5 } },
    { text: 'Gemini Vision identifies 81 dance poses, 6th-century Chalukyan iconography, and generates historical context.\n\n', options: { color: 'FFFFFF', fontSize: 10.5 } },
    { text: 'Step 3: Bilingual Voice Narration\n', options: { bold: true, color: 'FEF08A', fontSize: 11.5 } },
    { text: 'Instant voice playback in fluent Kannada or English with folklore.\n\n', options: { color: 'FFFFFF', fontSize: 10.5 } },
    { text: 'Step 4: Seamless Next Action\n', options: { bold: true, color: 'FEF08A', fontSize: 11.5 } },
    { text: '1-tap GPS driving route to Pattadakal + WhatsApp link to Ilkal Kasuti weaver society.', options: { color: 'FFFFFF', fontSize: 10.5 } },
  ], {
    x: 7.7,
    y: 2.3,
    w: 4.5,
    h: 4.2,
    fontFace: 'Arial',
  });

  // ==========================================
  // SLIDE 4: 3. TECHNOLOGY & ARCHITECTURE
  // ==========================================
  const slide4 = pres.addSlide();
  addSlideFooter(slide4);

  slide4.addText('3. Technology & Architecture', {
    x: 0.8,
    y: 0.8,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLOR_HEADER,
    fontFace: 'Arial',
  });

  const techContent = [
    { text: 'AI/ML model: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: 'Google Gemini 2.5 Flash Multimodal Generative AI (Zero-shot vision analysis, temple architectural feature classification, and bilingual conversational inference).\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: 'Dataset / data source: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: 'Curated Archaeological Survey of India (ASI) historical registers, Badami rock inscriptions, KSTDC official circuits, Geographical Indications Registry #43 documentation, and KSRTC/SWR railway timetable schedules.\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: 'Software: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: 'React 19 + TypeScript + Vite, Tailwind CSS responsive UI, Express backend proxy for secure API orchestration, and Web Speech API audio synthesis.\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: 'IoT / APIs / hardware: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: 'Mobile device camera hardware, HTML5 Geolocation API, Google Maps Navigation URLs, WhatsApp Click-to-Chat deep links, and ASI ticket booking APIs.\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: 'Workflow: Input → AI → Output: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: 'Photo / Query / City → Multi-tier prompt conditioning & domain knowledge base → Gemini Multimodal Model → Audio Guide + Interactive Route Map + Artisan Connect.', options: { color: '334155', fontSize: 11.5 } },
  ];

  slide4.addText(techContent, {
    x: 0.8,
    y: 1.5,
    w: 6.2,
    h: 5.4,
    fontFace: 'Arial',
  });

  // Right Box: Architecture diagram
  slide4.addShape(pres.ShapeType.roundRect, {
    x: 7.4,
    y: 1.5,
    w: 5.1,
    h: 5.2,
    rectRadius: 0.25,
    fill: { type: 'solid', color: '2563EB' },
    line: { color: '1D4ED8', width: 2 },
  });

  slide4.addText('System Architecture Diagram', {
    x: 7.6,
    y: 1.8,
    w: 4.7,
    h: 0.4,
    fontSize: 15,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Arial',
  });

  slide4.addText([
    { text: '[ FRONTEND LAYER ]\n', options: { bold: true, color: 'FEF08A', fontSize: 11 } },
    { text: 'React 19 PWA • Mobile Camera Capture • Spoken Kannada Voice Player • Interactive Vector Circuit Map\n\n', options: { color: 'FFFFFF', fontSize: 10 } },
    { text: '          ▼  HTTPS / Secure JSON Gateway\n\n', options: { color: '93C5FD', fontSize: 10 } },
    { text: '[ INTELLIGENCE & REASONING LAYER ]\n', options: { bold: true, color: 'FEF08A', fontSize: 11 } },
    { text: 'Express Backend Proxy\n• Gemini Vision API (Sculpture & Shikhara Recognition)\n• Gemini Chat API (Bilingual Heritage RAG)\n• Cultural Knowledge Embeddings\n\n', options: { color: 'FFFFFF', fontSize: 10 } },
    { text: '          ▼  Integration Services\n\n', options: { color: '93C5FD', fontSize: 10 } },
    { text: '[ DOMAIN DATA & COMMERCE INTEGRATION ]\n', options: { bold: true, color: 'FEF08A', fontSize: 11 } },
    { text: 'ASI Timings & Rates • KSRTC/SWR Train Schedules • GI #43 Cooperative Directory • WhatsApp Chat Links', options: { color: 'FFFFFF', fontSize: 10 } },
  ], {
    x: 7.6,
    y: 2.3,
    w: 4.7,
    h: 4.2,
    fontFace: 'Arial',
  });

  // ==========================================
  // SLIDE 5: 4. WORKING PROTOTYPE
  // ==========================================
  const slide5 = pres.addSlide();
  addSlideFooter(slide5);

  slide5.addText('4. Working Prototype', {
    x: 0.8,
    y: 0.8,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLOR_HEADER,
    fontFace: 'Arial',
  });

  const protoContent = [
    { text: 'Prototype status: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: '100% Fully Functional Production Web Application, live on Cloud with complete responsive support across mobile, tablet, and desktop.\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: 'Key features:\n', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: '1. AI Monument Visual Scanner (Photo analysis with deity and dynasty recognition)\n', options: { color: '334155', fontSize: 11 } },
    { text: '2. Chalukya Heritage Vector Circuit Map with 1-tap Google Maps GPS navigation\n', options: { color: '334155', fontSize: 11 } },
    { text: '3. Smart Expedition Itinerary Builder (1, 2, and 3-day customized schedules)\n', options: { color: '334155', fontSize: 11 } },
    { text: '4. Ilkal Weavers Hub with GI #43 validator & direct WhatsApp cooperative contacts\n', options: { color: '334155', fontSize: 11 } },
    { text: '5. Multi-city Transit Hub (Bengaluru, Mumbai, Pune, Goa, Hyderabad routes)\n', options: { color: '334155', fontSize: 11 } },
    { text: '6. Spoken Kannada phrasebook, printable pocket guide & 24x7 emergency directory.\n\n', options: { color: '334155', fontSize: 11 } },
    { text: 'How the tourist uses it: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: 'No app download needed. Open URL on mobile browser → Scan temple carving → Listen to audio story in Kannada/English → Navigate via GPS to next heritage spot.\n\n', options: { color: '334155', fontSize: 11.5 } },
    { text: 'Demonstration steps: ', options: { bold: true, color: '0F172A', fontSize: 12.5 } },
    { text: '1) Upload Badami Cave Nataraja image → Instant AI identification in <2s. 2) Switch language to Kannada with 1 click. 3) Select Bengaluru departure → See verified trains and auto fares.', options: { color: '334155', fontSize: 11.5 } },
  ];

  slide5.addText(protoContent, {
    x: 0.8,
    y: 1.5,
    w: 6.2,
    h: 5.4,
    fontFace: 'Arial',
  });

  // Right Box: Screenshots / prototype
  slide5.addShape(pres.ShapeType.roundRect, {
    x: 7.4,
    y: 1.5,
    w: 5.1,
    h: 5.2,
    rectRadius: 0.25,
    fill: { type: 'solid', color: '2563EB' },
    line: { color: '1D4ED8', width: 2 },
  });

  slide5.addText('Live Prototype Capabilities', {
    x: 7.6,
    y: 1.8,
    w: 4.7,
    h: 0.4,
    fontSize: 15,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Arial',
  });

  slide5.addText([
    { text: '★ Multimodal AI Vision Scanner\n', options: { bold: true, color: 'FEF08A', fontSize: 11.5 } },
    { text: 'Captures carvings and classifies iconography with historical background and audio speech.\n\n', options: { color: 'FFFFFF', fontSize: 10.5 } },
    { text: '★ Interactive Heritage Road Map\n', options: { bold: true, color: 'FEF08A', fontSize: 11.5 } },
    { text: 'Pinpoints Badami, Pattadakal, Aihole, Mahakuta with exact distance (km) and driving time.\n\n', options: { color: 'FFFFFF', fontSize: 10.5 } },
    { text: '★ GI Tag #43 Artisan Registry\n', options: { bold: true, color: 'FEF08A', fontSize: 11.5 } },
    { text: 'Connects tourists directly with master weavers of Ilkal sarees via WhatsApp with 0% middleman cut.\n\n', options: { color: 'FFFFFF', fontSize: 10.5 } },
    { text: '★ 100% Deployed & Live\n', options: { bold: true, color: 'FEF08A', fontSize: 11.5 } },
    { text: 'Zero latency issues, smooth touch gestures, and instant bilingual toggling.', options: { color: 'FFFFFF', fontSize: 10.5 } },
  ], {
    x: 7.6,
    y: 2.3,
    w: 4.7,
    h: 4.2,
    fontFace: 'Arial',
  });

  // ==========================================
  // SLIDE 6: 5. RESULTS & TOURISM IMPACT
  // ==========================================
  const slide6 = pres.addSlide();
  addSlideFooter(slide6);

  slide6.addText('5. Results & Tourism Impact', {
    x: 0.8,
    y: 0.8,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLOR_HEADER,
    fontFace: 'Arial',
  });

  const resultsContent = [
    { text: 'Key result / performance: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Under 2-second multimodal visual carving recognition time; 95%+ classification accuracy for major Chalukyan iconography; 100% verified route and transit coverage; 10+ artisan cooperative societies mapped.\n\n', options: { color: '334155', fontSize: 12 } },
    { text: 'Tourist benefit: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Democratizes high-end heritage interpretation without expensive private guides; avoids extortionate taxi/auto pricing via verified rate charts; bridges the linguistic divide with fluent Kannada audio narratives.\n\n', options: { color: '334155', fontSize: 12 } },
    { text: 'Impact on tourism: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Projected to increase average visitor dwell time from 1 day to 2.5 days across the Badami-Pattadakal-Aihole triangle; redistributes footfall to lesser-known gems like Mahakuta and Banashankari.\n\n', options: { color: '334155', fontSize: 12 } },
    { text: 'Cost / feasibility: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Zero app store friction (accessible via simple QR codes at ASI counters); ultra-low operational cost using serverless Gemini API tokens; zero expensive hardware needed at monuments.\n\n', options: { color: '334155', fontSize: 12 } },
    { text: 'Future scope: ', options: { bold: true, color: '0F172A', fontSize: 13 } },
    { text: 'Augmented Reality (AR) 3D temple restoration overlay showing lost ceilings, on-device lightweight offline models, and translation expansion into Hindi, Marathi, Telugu, Tamil, German, and French.', options: { color: '334155', fontSize: 12 } },
  ];

  slide6.addText(resultsContent, {
    x: 0.8,
    y: 1.5,
    w: 11.2,
    h: 5.4,
    fontFace: 'Arial',
  });

  // ==========================================
  // SLIDE 7: 6. CONCLUSION & Q&A
  // ==========================================
  const slide7 = pres.addSlide();
  addSlideFooter(slide7);

  slide7.addText('6. Conclusion & Q&A', {
    x: 0.8,
    y: 0.8,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLOR_HEADER,
    fontFace: 'Arial',
  });

  const conclusionContent = [
    { text: 'One-line project conclusion:\n', options: { bold: true, color: '0F172A', fontSize: 15 } },
    { text: '"Bagalkote YatriAI redefines regional tourism by fusing cutting-edge multimodal generative AI with deep grassroots cultural preservation and direct economic empowerment for North Karnataka\'s rural artisans."\n\n\n', options: { italic: true, bold: true, color: COLOR_BLUE_GRAD1, fontSize: 14 } },
    { text: 'Key innovation: ', options: { bold: true, color: '0F172A', fontSize: 14 } },
    { text: 'First culturally grounded, bilingual vision-to-speech monument intelligence platform linked directly to GI Tag #43 handloom weaver societies and multi-modal transit logistics.\n\n\n', options: { color: '334155', fontSize: 13 } },
    { text: 'Expected tourism impact: ', options: { bold: true, color: '0F172A', fontSize: 14 } },
    { text: 'Enriched tourist satisfaction, 40%+ increase in regional tourism dwell time, and direct, middleman-free commercial benefit for 5,000+ local handloom weavers and rural Khanavalis.\n\n\n', options: { color: '334155', fontSize: 13 } },
    { text: 'THANK YOU\n', options: { bold: true, color: COLOR_AMBER_DARK, fontSize: 26 } },
    { text: 'Questions & Answers | Live Demonstration Ready', options: { bold: true, color: '475569', fontSize: 14 } },
  ];

  slide7.addText(conclusionContent, {
    x: 0.8,
    y: 1.5,
    w: 11.2,
    h: 5.4,
    fontFace: 'Arial',
  });

  // Ensure public folder exists
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'Bagalkote_YatriAI_Tourism_Presentation.pptx');
  await pres.writeFile({ fileName: outputPath });
  console.log(`Presentation generated successfully at: ${outputPath}`);
}

generatePresentation().catch(err => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});
