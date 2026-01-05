# VibeSync - Waitlist Site

A modern, interactive waitlist landing page for VibeSync - the social music listening platform.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variable in Vercel dashboard:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: Your Gemini API key
4. Deploy!

**Important:** The app will work without the API key, but AI-generated features (vibe descriptions, room name suggestions) will use fallback responses.

## Features

- Persistent countdown timer
- Email waitlist integration with SheetBest
- Interactive app demo preview
- Responsive design (mobile & desktop)
- AI-powered features (optional, requires API key)
